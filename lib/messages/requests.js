const Big = require('big.js');

const Requests = {};

Requests.toJSON = (header) => {
	switch(header.type_id) {
		case Requests.Types.PING: {
			return new Requests.Ping().wrap(header._data_view, header._offset).toJSON();
		}
		case Requests.Types.PREPARE_MARKET: {
			return new Requests.PrepareMarket().wrap(header._data_view, header._offset).toJSON();
		}
		case Requests.Types.QUERY_ORDER_TOKEN: {
			return new Requests.QueryOrderToken().wrap(header._data_view, header._offset).toJSON();
		}
		case Requests.Types.LIST_OPEN_ORDERS: {
			return new Requests.ListOpenOrders().wrap(header._data_view, header._offset).toJSON();
		}
		case Requests.Types.OPEN_TRADE_SESSION: {
			return new Requests.OpenTradeSession().wrap(header._data_view, header._offset).toJSON();
		}
		case Requests.Types.NEW_ORDER: {
			return new Requests.NewOrder().wrap(header._data_view, header._offset).toJSON();
		}
		case Requests.Types.CANCEL_ORDER: {
			return new Requests.CancelOrder().wrap(header._data_view, header._offset).toJSON();
		}
		default: {
			throw new Error('Unknown type_id: ' + header.type_id);
		}
	}
}
Requests.Types = {
	PING: 3,
	PREPARE_MARKET: 6,
	QUERY_ORDER_TOKEN: 2,
	LIST_OPEN_ORDERS: 7,
	OPEN_TRADE_SESSION: 1,
	NEW_ORDER: 4,
	CANCEL_ORDER: 5,
};
for (let i = 0; i < 3; ++i) {
	Requests.Header_SIZE = 12;
	Requests.Ping_SIZE = Requests.Header_SIZE + 8;
	Requests.PrepareMarket_SIZE = Requests.Header_SIZE + 16;
	Requests.QueryOrderToken_SIZE = Requests.Header_SIZE + 8;
	Requests.ListOpenOrders_SIZE = Requests.Header_SIZE + 16;
	Requests.OpenTradeSession_SIZE = Requests.Header_SIZE + 40;
	Requests.NewOrder_SIZE = Requests.Header_SIZE + 49;
	Requests.CancelOrder_SIZE = Requests.Header_SIZE + 24;
}
Requests.TYPE_NAMES = [
	'Header',
	'Ping',
	'PrepareMarket',
	'QueryOrderToken',
	'ListOpenOrders',
	'OpenTradeSession',
	'NewOrder',
	'CancelOrder',
];Requests.Header_ATTRIBUTES = ['length','type_id','request_id'];
class Header {
	constructor() {
		this._data_view = null;
		this._offset = 0;
	}

	wrap(data_view, offset) {
		this._data_view = data_view;
		this._offset = offset;
		return this;
	}
	get length() {
		return this._data_view.getUint16(this._offset + 0, true);
	}
	set length(value) {
		this._data_view.setUint16(this._offset + 0, +value, true);
	}
	get type_id() {
		return this._data_view.getUint16(this._offset + 2, true);
	}
	set type_id(value) {
		this._data_view.setUint16(this._offset + 2, +value, true);
	}
	get request_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + 4, true);
		const u32_2 = this._data_view.getUint32(this._offset + 4, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set request_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + 4, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + 4, +b.mod('4294967296'), true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'Header',
			length: this.length,
			type_id: this.type_id,
			request_id: this.request_id,
		};
	}
}
Requests.Header = Header;

Requests.Ping_TYPE = 3;
Requests.Ping_ATTRIBUTES = ['header','request_id'];
class Ping {
	constructor() {
		this._data_view = null;
		this._offset = 0;
	}

	wrap(data_view, offset) {
		this._data_view = data_view;
		this._offset = offset;
		return this;
	}
	get header() {
		if (!this._header_Header) {
			this._header_Header = new Requests.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get request_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Requests.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Requests.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set request_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Requests.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Requests.Header_SIZE, +b.mod('4294967296'), true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'Ping',
			header: this.header.toJSON(),
			request_id: this.request_id,
		};
	}
}
Requests.Ping = Ping;

Requests.PrepareMarket_TYPE = 6;
Requests.PrepareMarket_ATTRIBUTES = ['header','user_id','quote_asset_id','base_asset_id'];
class PrepareMarket {
	constructor() {
		this._data_view = null;
		this._offset = 0;
	}

	wrap(data_view, offset) {
		this._data_view = data_view;
		this._offset = offset;
		return this;
	}
	get header() {
		if (!this._header_Header) {
			this._header_Header = new Requests.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Requests.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Requests.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Requests.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Requests.Header_SIZE, +b.mod('4294967296'), true);
	}
	get quote_asset_id() {
		return this._data_view.getUint32(this._offset + Requests.Header_SIZE + 8, true);
	}
	set quote_asset_id(value) {
		this._data_view.setUint32(this._offset + Requests.Header_SIZE + 8, +value, true);
	}
	get base_asset_id() {
		return this._data_view.getUint32(this._offset + Requests.Header_SIZE + 12, true);
	}
	set base_asset_id(value) {
		this._data_view.setUint32(this._offset + Requests.Header_SIZE + 12, +value, true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'PrepareMarket',
			header: this.header.toJSON(),
			user_id: this.user_id,
			quote_asset_id: this.quote_asset_id,
			base_asset_id: this.base_asset_id,
		};
	}
}
Requests.PrepareMarket = PrepareMarket;

Requests.QueryOrderToken_TYPE = 2;
Requests.QueryOrderToken_ATTRIBUTES = ['header','user_id'];
class QueryOrderToken {
	constructor() {
		this._data_view = null;
		this._offset = 0;
	}

	wrap(data_view, offset) {
		this._data_view = data_view;
		this._offset = offset;
		return this;
	}
	get header() {
		if (!this._header_Header) {
			this._header_Header = new Requests.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Requests.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Requests.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Requests.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Requests.Header_SIZE, +b.mod('4294967296'), true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'QueryOrderToken',
			header: this.header.toJSON(),
			user_id: this.user_id,
		};
	}
}
Requests.QueryOrderToken = QueryOrderToken;

Requests.ListOpenOrders_TYPE = 7;
Requests.ListOpenOrders_ATTRIBUTES = ['header','user_id','after_order_token'];
class ListOpenOrders {
	constructor() {
		this._data_view = null;
		this._offset = 0;
	}

	wrap(data_view, offset) {
		this._data_view = data_view;
		this._offset = offset;
		return this;
	}
	get header() {
		if (!this._header_Header) {
			this._header_Header = new Requests.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Requests.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Requests.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Requests.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Requests.Header_SIZE, +b.mod('4294967296'), true);
	}
	get after_order_token() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Requests.Header_SIZE + 8, true);
		const u32_2 = this._data_view.getUint32(this._offset + Requests.Header_SIZE + 8, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set after_order_token(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Requests.Header_SIZE + 8, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Requests.Header_SIZE + 8, +b.mod('4294967296'), true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'ListOpenOrders',
			header: this.header.toJSON(),
			user_id: this.user_id,
			after_order_token: this.after_order_token,
		};
	}
}
Requests.ListOpenOrders = ListOpenOrders;

Requests.OpenTradeSession_TYPE = 1;
Requests.OpenTradeSession_ATTRIBUTES = ['header','user_id','access_key'];
class OpenTradeSession {
	constructor() {
		this._data_view = null;
		this._offset = 0;
	}

	wrap(data_view, offset) {
		this._data_view = data_view;
		this._offset = offset;
		return this;
	}
	get header() {
		if (!this._header_Header) {
			this._header_Header = new Requests.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Requests.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Requests.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Requests.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Requests.Header_SIZE, +b.mod('4294967296'), true);
	}
	get access_key() {
		const hex_array = [];
		const offset = this._offset + Requests.Header_SIZE + 8;
		for(let i = 0; i < 32; ++i) {
			const b = this._data_view.getUint8(offset + i).toString(16);
			hex_array.push('00'.substr(b.length) + b);
		}
		return hex_array.join('');
	}
	set access_key(value) {
		const offset = this._offset + Requests.Header_SIZE + 8;
		for(let i = 0; i < 32; ++i) {
			const b = parseInt(value[i * 2], 16) * 16 + parseInt(value[i * 2 + 1], 16);
			this._data_view.setUint8(offset + i, b);
		}
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'OpenTradeSession',
			header: this.header.toJSON(),
			user_id: this.user_id,
			access_key: this.access_key,
		};
	}
}
Requests.OpenTradeSession = OpenTradeSession;

Requests.NewOrder_TYPE = 4;
Requests.NewOrder_ATTRIBUTES = ['header','user_id','quote_asset_id','base_asset_id','order_token','replace_order_token','quantity','price','is_buy'];
class NewOrder {
	constructor() {
		this._data_view = null;
		this._offset = 0;
	}

	wrap(data_view, offset) {
		this._data_view = data_view;
		this._offset = offset;
		return this;
	}
	get header() {
		if (!this._header_Header) {
			this._header_Header = new Requests.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Requests.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Requests.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Requests.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Requests.Header_SIZE, +b.mod('4294967296'), true);
	}
	get quote_asset_id() {
		return this._data_view.getUint32(this._offset + Requests.Header_SIZE + 8, true);
	}
	set quote_asset_id(value) {
		this._data_view.setUint32(this._offset + Requests.Header_SIZE + 8, +value, true);
	}
	get base_asset_id() {
		return this._data_view.getUint32(this._offset + Requests.Header_SIZE + 12, true);
	}
	set base_asset_id(value) {
		this._data_view.setUint32(this._offset + Requests.Header_SIZE + 12, +value, true);
	}
	get order_token() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Requests.Header_SIZE + 16, true);
		const u32_2 = this._data_view.getUint32(this._offset + Requests.Header_SIZE + 16, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set order_token(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Requests.Header_SIZE + 16, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Requests.Header_SIZE + 16, +b.mod('4294967296'), true);
	}
	get replace_order_token() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Requests.Header_SIZE + 24, true);
		const u32_2 = this._data_view.getUint32(this._offset + Requests.Header_SIZE + 24, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set replace_order_token(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Requests.Header_SIZE + 24, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Requests.Header_SIZE + 24, +b.mod('4294967296'), true);
	}
	get quantity() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Requests.Header_SIZE + 32, true);
		const u32_2 = this._data_view.getUint32(this._offset + Requests.Header_SIZE + 32, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set quantity(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Requests.Header_SIZE + 32, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Requests.Header_SIZE + 32, +b.mod('4294967296'), true);
	}
	get price() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Requests.Header_SIZE + 40, true);
		const u32_2 = this._data_view.getUint32(this._offset + Requests.Header_SIZE + 40, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set price(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Requests.Header_SIZE + 40, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Requests.Header_SIZE + 40, +b.mod('4294967296'), true);
	}
	get is_buy() {
		return this._data_view.getUint8(this._offset + Requests.Header_SIZE + 48, true) !== 0;
	}
	set is_buy(value) {
		this._data_view.setUint8(this._offset + Requests.Header_SIZE + 48, value ? 1 : 0);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'NewOrder',
			header: this.header.toJSON(),
			user_id: this.user_id,
			quote_asset_id: this.quote_asset_id,
			base_asset_id: this.base_asset_id,
			order_token: this.order_token,
			replace_order_token: this.replace_order_token,
			quantity: this.quantity,
			price: this.price,
			is_buy: this.is_buy,
		};
	}
}
Requests.NewOrder = NewOrder;

Requests.CancelOrder_TYPE = 5;
Requests.CancelOrder_ATTRIBUTES = ['header','user_id','order_token','leaves_quantity'];
class CancelOrder {
	constructor() {
		this._data_view = null;
		this._offset = 0;
	}

	wrap(data_view, offset) {
		this._data_view = data_view;
		this._offset = offset;
		return this;
	}
	get header() {
		if (!this._header_Header) {
			this._header_Header = new Requests.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Requests.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Requests.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Requests.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Requests.Header_SIZE, +b.mod('4294967296'), true);
	}
	get order_token() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Requests.Header_SIZE + 8, true);
		const u32_2 = this._data_view.getUint32(this._offset + Requests.Header_SIZE + 8, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set order_token(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Requests.Header_SIZE + 8, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Requests.Header_SIZE + 8, +b.mod('4294967296'), true);
	}
	get leaves_quantity() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Requests.Header_SIZE + 16, true);
		const u32_2 = this._data_view.getUint32(this._offset + Requests.Header_SIZE + 16, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set leaves_quantity(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Requests.Header_SIZE + 16, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Requests.Header_SIZE + 16, +b.mod('4294967296'), true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'CancelOrder',
			header: this.header.toJSON(),
			user_id: this.user_id,
			order_token: this.order_token,
			leaves_quantity: this.leaves_quantity,
		};
	}
}
Requests.CancelOrder = CancelOrder;

module.exports = Requests;
