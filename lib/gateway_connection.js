const { EventEmitter } = require('events');
const WebSocket = require('ws');

const Requests = require('./messages/requests');
const Reports = require('./messages/reports');

const RequestObjects = {};
Requests.TYPE_NAMES.forEach(name => {
  const Type = Requests[name];
  RequestObjects[name] = new Type();
});

class GatewayConnection extends EventEmitter {
  constructor(gateway_uri) {
    super();

    this._request_buffer = new ArrayBuffer(1024);
    this._request_view = new DataView(this._request_buffer);

    this._rcv_header = new Requests.Header();

    this._gateway_uri = gateway_uri || 'wss://ws.merklex.io/gateway';
    this.connect();

    this.on('connect', () => {
      this._ping_interval = setInterval(this.ping.bind(this), 1000);
    });

    this.on('disconnect', () => {
      clearInterval(this._ping_interval);
    });
  }

  connect() {
    if (this._connecting) {
      return;
    }

    this.disconnect();
    this._connecting = true;

    const ws = new WebSocket(this._gateway_uri);

    ws.on('open', () => {
      if (this._ws === ws) {
        this._connecting = true;
        this.emit('connect', this);
      }
    });

    ws.on('message', msg => {
      if (this._ws === ws) {
        this._onData(msg);
      }
    });

    ws.on('error', err => {
      if (this._ws === ws) {
        this.emit('error', err);
      }
      else {
        const warn = new Error('Received error from old WebSocket');
        warn.cause = err;

        this.emit('warn', warn);
      }
    });

    ws.on('close', () => {
      if (this._ws === ws) {
        this.emit('disconnect', this);
        this._ws = null;
      }
    });

    this._ws = ws;
  }

  ping() {
    this.send({
      type: 'Ping',
      request_id: '10',
    });
  }

  disconnect() {
    if (this._ws) {
      this._ws.close();
    }
  }

  get is_connected() {
    return !!this._ws;
  }

  send(msg) {
    if (!this._ws) {
      throw new Error('not connected');
    }

    const req = RequestObjects[msg.type];
    if (!req) {
      throw new Error('Unknown request type: ' + msg.type);
    }

    req.wrap(this._request_view, 0);
    const length = req.header.length = Requests[msg.type + '_SIZE'];
    req.header.type_id = Requests[msg.type + '_TYPE'];

    let success = true;
    Requests[msg.type + '_ATTRIBUTES'].forEach(attr => {
      if (attr === 'header') {
        return;
      }

      const value = msg[attr];
      if (!value && value !== false && value !== 0) {
        success = false;
        throw new Error(msg.type + ' is missing attr ' + attr);
      }

      req[attr] = msg[attr];
      if (req[attr] != msg[attr]) { // eslint-disable-line
        success = false;
        console.error(req[attr], 'does not match', msg[attr]);
      }
    });

    if (!success) {
      throw new Error('failed to construct message');
    }

    this._ws.send(new DataView(this._request_buffer, 0, length));
    return true;
  }

  _onData(data) {
    this._rcv_header.wrap(new DataView(data.buffer, data.byteOffset, data.byteLength), 0);
    const payload = Reports.toJSON(this._rcv_header);

    if (!payload) {
      console.error('Do not have parser for', this._rcv_header.type_id);
      return;
    }

    this.emit('report', payload, this);
  }
}

module.exports = GatewayConnection;
