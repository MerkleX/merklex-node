const Big = require('big.js');

const Reports = {};

Reports.toJSON = (header) => {
	switch(header.type_id) {
		case Reports.Types.ORDER_RESTING: {
			return new Reports.OrderResting().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.ORDER_DONE: {
			return new Reports.OrderDone().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.ORDER_REJECTED: {
			return new Reports.OrderRejected().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.ORDER_DETAILS: {
			return new Reports.OrderDetails().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.TRADE_SESSION_OPENED: {
			return new Reports.TradeSessionOpened().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.MARKET_READY: {
			return new Reports.MarketReady().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.NEXT_ORDER_TOKEN: {
			return new Reports.NextOrderToken().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.CURRENT_BALANCE: {
			return new Reports.CurrentBalance().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.ERROR: {
			return new Reports.Error().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.ORDER_ACCEPTED: {
			return new Reports.OrderAccepted().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.ORDER_MODIFIED: {
			return new Reports.OrderModified().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.SESSION_DETAILS: {
			return new Reports.SessionDetails().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.MATCH: {
			return new Reports.Match().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.MARKET_STATE_DETAILS: {
			return new Reports.MarketStateDetails().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.DEPOSIT_APPLIED: {
			return new Reports.DepositApplied().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.TRADE_SESSION_CLOSED: {
			return new Reports.TradeSessionClosed().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.UPDATE_TRADING_LIMIT_RESULT: {
			return new Reports.UpdateTradingLimitResult().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.PONG: {
			return new Reports.Pong().wrap(header._data_view, header._offset).toJSON();
		}
		case Reports.Types.WITHDRAW_RESULT: {
			return new Reports.WithdrawResult().wrap(header._data_view, header._offset).toJSON();
		}
		default: {
			throw new Error('Unknown type_id: ' + header.type_id);
		}
	}
}
Reports.Types = {
	ORDER_RESTING: 10,
	ORDER_DONE: 8,
	ORDER_REJECTED: 7,
	ORDER_DETAILS: 14,
	TRADE_SESSION_OPENED: 1,
	MARKET_READY: 3,
	NEXT_ORDER_TOKEN: 13,
	CURRENT_BALANCE: 16,
	ERROR: 0,
	ORDER_ACCEPTED: 9,
	ORDER_MODIFIED: 11,
	SESSION_DETAILS: 15,
	MATCH: 6,
	MARKET_STATE_DETAILS: 17,
	DEPOSIT_APPLIED: 12,
	TRADE_SESSION_CLOSED: 2,
	UPDATE_TRADING_LIMIT_RESULT: 5,
	PONG: 4,
	WITHDRAW_RESULT: 18,
};
Reports.RejectReason = {
	INSUFFICIENT_FUNDS: 1,
	INVALID_QUANTITY: 2,
	TRADING_LIMIT: 3,
	NOT_A_REASON: 4,
	OUT_OF_MEMORY: 5,
	UNLOCKED: 6,
};
Reports.DoneReason = {
	FILLED: 1,
	CANCELED: 2,
	ERROR: 3,
	NO_LONGER_VALID: 4,
	REPLACED: 5,
	CANNOT_ADD: 6,
};
Reports.ErrorCode = {
	UNKNOWN_COMMAND_TYPE: 1,
	OUT_OF_MEMORY: 2,
	INTERNAL_ERROR: 899999,
	SESSION_DOES_NOT_EXIST: 900005,
	BAD_ACCESS_KEY: 900004,
	ASSET_NOT_PREPARED: 900001,
	INVALID_REQUEST: 900000,
	FEED_DROPPED: 900003,
	AT_CAPACITY: 900002,
};
Reports.RejectReason_LOOKUP = {
	1: 'INSUFFICIENT_FUNDS',
	2: 'INVALID_QUANTITY',
	3: 'TRADING_LIMIT',
	4: 'NOT_A_REASON',
	5: 'OUT_OF_MEMORY',
	6: 'UNLOCKED',
};
Reports.DoneReason_LOOKUP = {
	1: 'FILLED',
	2: 'CANCELED',
	3: 'ERROR',
	4: 'NO_LONGER_VALID',
	5: 'REPLACED',
	6: 'CANNOT_ADD',
};
Reports.ErrorCode_LOOKUP = {
	1: 'UNKNOWN_COMMAND_TYPE',
	2: 'OUT_OF_MEMORY',
	899999: 'INTERNAL_ERROR',
	900005: 'SESSION_DOES_NOT_EXIST',
	900004: 'BAD_ACCESS_KEY',
	900001: 'ASSET_NOT_PREPARED',
	900000: 'INVALID_REQUEST',
	900003: 'FEED_DROPPED',
	900002: 'AT_CAPACITY',
};
for (let i = 0; i < 3; ++i) {
	Reports.OrderResting_SIZE = Reports.Header_SIZE + 49;
	Reports.OrderDone_SIZE = Reports.Header_SIZE + 42;
	Reports.OrderRejected_SIZE = Reports.Header_SIZE + 18;
	Reports.OrderDetails_SIZE = Reports.Header_SIZE + 57;
	Reports.TradeSessionOpened_SIZE = Reports.Header_SIZE + 8;
	Reports.MarketReady_SIZE = Reports.Header_SIZE + 16;
	Reports.NextOrderToken_SIZE = Reports.Header_SIZE + 24;
	Reports.CurrentBalance_SIZE = Reports.Header_SIZE + 28;
	Reports.Error_SIZE = Reports.Header_SIZE + 12;
	Reports.OrderAccepted_SIZE = Reports.Header_SIZE + 49;
	Reports.OrderModified_SIZE = Reports.Header_SIZE + 49;
	Reports.SessionDetails_SIZE = Reports.Header_SIZE + 24;
	Reports.Match_SIZE = Reports.Header_SIZE + 74;
	Reports.MarketStateDetails_SIZE = Reports.Header_SIZE + 120;
	Reports.Header_SIZE = 12;
	Reports.DepositApplied_SIZE = Reports.Header_SIZE + 20;
	Reports.TradeSessionClosed_SIZE = Reports.Header_SIZE + 8;
	Reports.UpdateTradingLimitResult_SIZE = Reports.Header_SIZE + 25;
	Reports.Pong_SIZE = Reports.Header_SIZE + 8;
	Reports.WithdrawResult_SIZE = Reports.Header_SIZE + 21;
}
Reports.TYPE_NAMES = [
	'OrderResting',
	'OrderDone',
	'OrderRejected',
	'OrderDetails',
	'TradeSessionOpened',
	'MarketReady',
	'NextOrderToken',
	'CurrentBalance',
	'Error',
	'OrderAccepted',
	'OrderModified',
	'SessionDetails',
	'Match',
	'MarketStateDetails',
	'Header',
	'DepositApplied',
	'TradeSessionClosed',
	'UpdateTradingLimitResult',
	'Pong',
	'WithdrawResult',
];Reports.OrderResting_TYPE = 10;
Reports.OrderResting_ATTRIBUTES = ['header','user_id','quote_asset_id','base_asset_id','order_token','quantity_removed','quantity_resting','price','is_buy'];
class OrderResting {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get quote_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
	}
	set quote_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +value, true);
	}
	get base_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 12, true);
	}
	set base_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 12, +value, true);
	}
	get order_token() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 16, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 16, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set order_token(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 16, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 16, +b.mod('4294967296'), true);
	}
	get quantity_removed() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 24, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 24, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set quantity_removed(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 24, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 24, +b.mod('4294967296'), true);
	}
	get quantity_resting() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 32, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 32, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set quantity_resting(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 32, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 32, +b.mod('4294967296'), true);
	}
	get price() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 40, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 40, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set price(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 40, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 40, +b.mod('4294967296'), true);
	}
	get is_buy() {
		return this._data_view.getUint8(this._offset + Reports.Header_SIZE + 48, true) !== 0;
	}
	set is_buy(value) {
		this._data_view.setUint8(this._offset + Reports.Header_SIZE + 48, value ? 1 : 0);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'OrderResting',
			header: this.header.toJSON(),
			user_id: this.user_id,
			quote_asset_id: this.quote_asset_id,
			base_asset_id: this.base_asset_id,
			order_token: this.order_token,
			quantity_removed: this.quantity_removed,
			quantity_resting: this.quantity_resting,
			price: this.price,
			is_buy: this.is_buy,
		};
	}
}
Reports.OrderResting = OrderResting;

Reports.OrderDone_TYPE = 8;
Reports.OrderDone_ATTRIBUTES = ['header','user_id','quote_asset_id','base_asset_id','order_token','quantity_removed','price','is_buy','reason'];
class OrderDone {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get quote_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
	}
	set quote_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +value, true);
	}
	get base_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 12, true);
	}
	set base_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 12, +value, true);
	}
	get order_token() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 16, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 16, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set order_token(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 16, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 16, +b.mod('4294967296'), true);
	}
	get quantity_removed() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 24, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 24, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set quantity_removed(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 24, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 24, +b.mod('4294967296'), true);
	}
	get price() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 32, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 32, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set price(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 32, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 32, +b.mod('4294967296'), true);
	}
	get is_buy() {
		return this._data_view.getUint8(this._offset + Reports.Header_SIZE + 40, true) !== 0;
	}
	set is_buy(value) {
		this._data_view.setUint8(this._offset + Reports.Header_SIZE + 40, value ? 1 : 0);
	}
	get reason() {
		return this._data_view.getUint8(this._offset + Reports.Header_SIZE + 41, true);
	}
	set reason(value) {
		this._data_view.setUint8(this._offset + Reports.Header_SIZE + 41, +value, true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'OrderDone',
			header: this.header.toJSON(),
			user_id: this.user_id,
			quote_asset_id: this.quote_asset_id,
			base_asset_id: this.base_asset_id,
			order_token: this.order_token,
			quantity_removed: this.quantity_removed,
			price: this.price,
			is_buy: this.is_buy,
			reason: Reports.DoneReason_LOOKUP[this.reason],
		};
	}
}
Reports.OrderDone = OrderDone;

Reports.OrderRejected_TYPE = 7;
Reports.OrderRejected_ATTRIBUTES = ['header','user_id','order_token','reason','is_buy'];
class OrderRejected {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get order_token() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 8, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set order_token(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 8, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +b.mod('4294967296'), true);
	}
	get reason() {
		return this._data_view.getUint8(this._offset + Reports.Header_SIZE + 16, true);
	}
	set reason(value) {
		this._data_view.setUint8(this._offset + Reports.Header_SIZE + 16, +value, true);
	}
	get is_buy() {
		return this._data_view.getUint8(this._offset + Reports.Header_SIZE + 17, true) !== 0;
	}
	set is_buy(value) {
		this._data_view.setUint8(this._offset + Reports.Header_SIZE + 17, value ? 1 : 0);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'OrderRejected',
			header: this.header.toJSON(),
			user_id: this.user_id,
			order_token: this.order_token,
			reason: Reports.RejectReason_LOOKUP[this.reason],
			is_buy: this.is_buy,
		};
	}
}
Reports.OrderRejected = OrderRejected;

Reports.OrderDetails_TYPE = 14;
Reports.OrderDetails_ATTRIBUTES = ['header','user_id','quote_asset_id','base_asset_id','order_token','older_order_token','price','quantity','original_quantity','is_buy'];
class OrderDetails {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get quote_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
	}
	set quote_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +value, true);
	}
	get base_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 12, true);
	}
	set base_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 12, +value, true);
	}
	get order_token() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 16, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 16, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set order_token(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 16, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 16, +b.mod('4294967296'), true);
	}
	get older_order_token() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 24, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 24, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set older_order_token(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 24, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 24, +b.mod('4294967296'), true);
	}
	get price() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 32, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 32, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set price(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 32, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 32, +b.mod('4294967296'), true);
	}
	get quantity() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 40, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 40, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set quantity(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 40, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 40, +b.mod('4294967296'), true);
	}
	get original_quantity() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 48, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 48, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set original_quantity(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 48, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 48, +b.mod('4294967296'), true);
	}
	get is_buy() {
		return this._data_view.getUint8(this._offset + Reports.Header_SIZE + 56, true) !== 0;
	}
	set is_buy(value) {
		this._data_view.setUint8(this._offset + Reports.Header_SIZE + 56, value ? 1 : 0);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'OrderDetails',
			header: this.header.toJSON(),
			user_id: this.user_id,
			quote_asset_id: this.quote_asset_id,
			base_asset_id: this.base_asset_id,
			order_token: this.order_token,
			older_order_token: this.older_order_token,
			price: this.price,
			quantity: this.quantity,
			original_quantity: this.original_quantity,
			is_buy: this.is_buy,
		};
	}
}
Reports.OrderDetails = OrderDetails;

Reports.TradeSessionOpened_TYPE = 1;
Reports.TradeSessionOpened_ATTRIBUTES = ['header','user_id'];
class TradeSessionOpened {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'TradeSessionOpened',
			header: this.header.toJSON(),
			user_id: this.user_id,
		};
	}
}
Reports.TradeSessionOpened = TradeSessionOpened;

Reports.MarketReady_TYPE = 3;
Reports.MarketReady_ATTRIBUTES = ['header','user_id','quote_asset_id','base_asset_id'];
class MarketReady {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get quote_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
	}
	set quote_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +value, true);
	}
	get base_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 12, true);
	}
	set base_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 12, +value, true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'MarketReady',
			header: this.header.toJSON(),
			user_id: this.user_id,
			quote_asset_id: this.quote_asset_id,
			base_asset_id: this.base_asset_id,
		};
	}
}
Reports.MarketReady = MarketReady;

Reports.NextOrderToken_TYPE = 13;
Reports.NextOrderToken_ATTRIBUTES = ['header','user_id','next_order_token','used_tokens'];
class NextOrderToken {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get next_order_token() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 8, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set next_order_token(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 8, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +b.mod('4294967296'), true);
	}
	get used_tokens() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 16, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 16, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set used_tokens(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 16, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 16, +b.mod('4294967296'), true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'NextOrderToken',
			header: this.header.toJSON(),
			user_id: this.user_id,
			next_order_token: this.next_order_token,
			used_tokens: this.used_tokens,
		};
	}
}
Reports.NextOrderToken = NextOrderToken;

Reports.CurrentBalance_TYPE = 16;
Reports.CurrentBalance_ATTRIBUTES = ['header','user_id','asset_id','balance','hold'];
class CurrentBalance {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
	}
	set asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +value, true);
	}
	get balance() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 12, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 12, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set balance(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 12, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 12, +b.mod('4294967296'), true);
	}
	get hold() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 20, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 20, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set hold(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 20, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 20, +b.mod('4294967296'), true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'CurrentBalance',
			header: this.header.toJSON(),
			user_id: this.user_id,
			asset_id: this.asset_id,
			balance: this.balance,
			hold: this.hold,
		};
	}
}
Reports.CurrentBalance = CurrentBalance;

Reports.Error_TYPE = 0;
Reports.Error_ATTRIBUTES = ['header','request_id','code'];
class Error {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get request_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set request_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get code() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
	}
	set code(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +value, true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'Error',
			header: this.header.toJSON(),
			request_id: this.request_id,
			code: Reports.ErrorCode_LOOKUP[this.code],
		};
	}
}
Reports.Error = Error;

Reports.OrderAccepted_TYPE = 9;
Reports.OrderAccepted_ATTRIBUTES = ['header','user_id','quote_asset_id','base_asset_id','order_token','existing_order_token','is_buy','quantity','price'];
class OrderAccepted {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get quote_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
	}
	set quote_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +value, true);
	}
	get base_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 12, true);
	}
	set base_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 12, +value, true);
	}
	get order_token() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 16, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 16, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set order_token(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 16, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 16, +b.mod('4294967296'), true);
	}
	get existing_order_token() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 24, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 24, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set existing_order_token(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 24, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 24, +b.mod('4294967296'), true);
	}
	get is_buy() {
		return this._data_view.getUint8(this._offset + Reports.Header_SIZE + 32, true) !== 0;
	}
	set is_buy(value) {
		this._data_view.setUint8(this._offset + Reports.Header_SIZE + 32, value ? 1 : 0);
	}
	get quantity() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 33, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 33, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set quantity(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 33, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 33, +b.mod('4294967296'), true);
	}
	get price() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 41, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 41, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set price(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 41, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 41, +b.mod('4294967296'), true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'OrderAccepted',
			header: this.header.toJSON(),
			user_id: this.user_id,
			quote_asset_id: this.quote_asset_id,
			base_asset_id: this.base_asset_id,
			order_token: this.order_token,
			existing_order_token: this.existing_order_token,
			is_buy: this.is_buy,
			quantity: this.quantity,
			price: this.price,
		};
	}
}
Reports.OrderAccepted = OrderAccepted;

Reports.OrderModified_TYPE = 11;
Reports.OrderModified_ATTRIBUTES = ['header','user_id','quote_asset_id','base_asset_id','order_token','quantity_removed','quantity_remaining','price','is_buy'];
class OrderModified {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get quote_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
	}
	set quote_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +value, true);
	}
	get base_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 12, true);
	}
	set base_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 12, +value, true);
	}
	get order_token() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 16, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 16, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set order_token(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 16, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 16, +b.mod('4294967296'), true);
	}
	get quantity_removed() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 24, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 24, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set quantity_removed(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 24, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 24, +b.mod('4294967296'), true);
	}
	get quantity_remaining() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 32, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 32, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set quantity_remaining(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 32, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 32, +b.mod('4294967296'), true);
	}
	get price() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 40, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 40, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set price(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 40, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 40, +b.mod('4294967296'), true);
	}
	get is_buy() {
		return this._data_view.getUint8(this._offset + Reports.Header_SIZE + 48, true) !== 0;
	}
	set is_buy(value) {
		this._data_view.setUint8(this._offset + Reports.Header_SIZE + 48, value ? 1 : 0);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'OrderModified',
			header: this.header.toJSON(),
			user_id: this.user_id,
			quote_asset_id: this.quote_asset_id,
			base_asset_id: this.base_asset_id,
			order_token: this.order_token,
			quantity_removed: this.quantity_removed,
			quantity_remaining: this.quantity_remaining,
			price: this.price,
			is_buy: this.is_buy,
		};
	}
}
Reports.OrderModified = OrderModified;

Reports.SessionDetails_TYPE = 15;
Reports.SessionDetails_ATTRIBUTES = ['header','user_id','session_tag','order_count','unlock_at'];
class SessionDetails {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get session_tag() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
	}
	set session_tag(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +value, true);
	}
	get order_count() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 12, true);
	}
	set order_count(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 12, +value, true);
	}
	get unlock_at() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 16, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 16, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set unlock_at(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 16, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 16, +b.mod('4294967296'), true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'SessionDetails',
			header: this.header.toJSON(),
			user_id: this.user_id,
			session_tag: this.session_tag,
			order_count: this.order_count,
			unlock_at: this.unlock_at,
		};
	}
}
Reports.SessionDetails = SessionDetails;

Reports.Match_TYPE = 6;
Reports.Match_ATTRIBUTES = ['header','user_id','quote_asset_id','base_asset_id','order_token','quantity','price','cost','sequence','fees','limit_version','is_maker','is_buy'];
class Match {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get quote_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
	}
	set quote_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +value, true);
	}
	get base_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 12, true);
	}
	set base_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 12, +value, true);
	}
	get order_token() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 16, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 16, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set order_token(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 16, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 16, +b.mod('4294967296'), true);
	}
	get quantity() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 24, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 24, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set quantity(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 24, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 24, +b.mod('4294967296'), true);
	}
	get price() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 32, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 32, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set price(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 32, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 32, +b.mod('4294967296'), true);
	}
	get cost() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 40, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 40, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set cost(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 40, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 40, +b.mod('4294967296'), true);
	}
	get sequence() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 48, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 48, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set sequence(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 48, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 48, +b.mod('4294967296'), true);
	}
	get fees() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 56, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 56, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set fees(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 56, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 56, +b.mod('4294967296'), true);
	}
	get limit_version() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 64, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 64, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set limit_version(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 64, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 64, +b.mod('4294967296'), true);
	}
	get is_maker() {
		return this._data_view.getUint8(this._offset + Reports.Header_SIZE + 72, true) !== 0;
	}
	set is_maker(value) {
		this._data_view.setUint8(this._offset + Reports.Header_SIZE + 72, value ? 1 : 0);
	}
	get is_buy() {
		return this._data_view.getUint8(this._offset + Reports.Header_SIZE + 73, true) !== 0;
	}
	set is_buy(value) {
		this._data_view.setUint8(this._offset + Reports.Header_SIZE + 73, value ? 1 : 0);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'Match',
			header: this.header.toJSON(),
			user_id: this.user_id,
			quote_asset_id: this.quote_asset_id,
			base_asset_id: this.base_asset_id,
			order_token: this.order_token,
			quantity: this.quantity,
			price: this.price,
			cost: this.cost,
			sequence: this.sequence,
			fees: this.fees,
			limit_version: this.limit_version,
			is_maker: this.is_maker,
			is_buy: this.is_buy,
		};
	}
}
Reports.Match = Match;

Reports.MarketStateDetails_TYPE = 17;
Reports.MarketStateDetails_ATTRIBUTES = ['header','user_id','quote_asset_id','base_asset_id','fee_limit','limit_version','quote_qty','base_qty','quote_market_hold','base_market_hold','min_quote_qty','min_base_qty','long_max_price','short_min_price','quote_shift_qty_major','quote_shift_qty_minor','base_shift_qty_major','base_shift_qty_minor'];
class MarketStateDetails {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get quote_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
	}
	set quote_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +value, true);
	}
	get base_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 12, true);
	}
	set base_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 12, +value, true);
	}
	get fee_limit() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 16, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 16, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set fee_limit(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 16, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 16, +b.mod('4294967296'), true);
	}
	get limit_version() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 24, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 24, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set limit_version(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 24, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 24, +b.mod('4294967296'), true);
	}
	get quote_qty() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 32, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 32, true);
		const r = Big(u32_1).mul('4294967296').add(u32_2);
		return (r.gt('9223372036854775807') ? r.sub('18446744073709551616') : r) + '';
	}
	get base_qty() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 40, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 40, true);
		const r = Big(u32_1).mul('4294967296').add(u32_2);
		return (r.gt('9223372036854775807') ? r.sub('18446744073709551616') : r) + '';
	}
	get quote_market_hold() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 48, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 48, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set quote_market_hold(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 48, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 48, +b.mod('4294967296'), true);
	}
	get base_market_hold() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 56, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 56, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set base_market_hold(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 56, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 56, +b.mod('4294967296'), true);
	}
	get min_quote_qty() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 64, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 64, true);
		const r = Big(u32_1).mul('4294967296').add(u32_2);
		return (r.gt('9223372036854775807') ? r.sub('18446744073709551616') : r) + '';
	}
	get min_base_qty() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 72, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 72, true);
		const r = Big(u32_1).mul('4294967296').add(u32_2);
		return (r.gt('9223372036854775807') ? r.sub('18446744073709551616') : r) + '';
	}
	get long_max_price() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 80, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 80, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set long_max_price(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 80, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 80, +b.mod('4294967296'), true);
	}
	get short_min_price() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 88, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 88, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set short_min_price(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 88, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 88, +b.mod('4294967296'), true);
	}
	get quote_shift_qty_major() {
		return this._data_view.getInt32(this._offset + Reports.Header_SIZE + 96, true);
	}
	set quote_shift_qty_major(value) {
		this._data_view.setInt32(this._offset + Reports.Header_SIZE + 96, +value, true);
	}
	get quote_shift_qty_minor() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 100, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 100, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set quote_shift_qty_minor(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 100, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 100, +b.mod('4294967296'), true);
	}
	get base_shift_qty_major() {
		return this._data_view.getInt32(this._offset + Reports.Header_SIZE + 108, true);
	}
	set base_shift_qty_major(value) {
		this._data_view.setInt32(this._offset + Reports.Header_SIZE + 108, +value, true);
	}
	get base_shift_qty_minor() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 112, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 112, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set base_shift_qty_minor(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 112, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 112, +b.mod('4294967296'), true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'MarketStateDetails',
			header: this.header.toJSON(),
			user_id: this.user_id,
			quote_asset_id: this.quote_asset_id,
			base_asset_id: this.base_asset_id,
			fee_limit: this.fee_limit,
			limit_version: this.limit_version,
			quote_qty: this.quote_qty,
			base_qty: this.base_qty,
			quote_market_hold: this.quote_market_hold,
			base_market_hold: this.base_market_hold,
			min_quote_qty: this.min_quote_qty,
			min_base_qty: this.min_base_qty,
			long_max_price: this.long_max_price,
			short_min_price: this.short_min_price,
			quote_shift_qty_major: this.quote_shift_qty_major,
			quote_shift_qty_minor: this.quote_shift_qty_minor,
			base_shift_qty_major: this.base_shift_qty_major,
			base_shift_qty_minor: this.base_shift_qty_minor,
		};
	}
}
Reports.MarketStateDetails = MarketStateDetails;

Reports.Header_ATTRIBUTES = ['length','type_id','timestamp'];
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
	get timestamp() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + 4, true);
		const u32_2 = this._data_view.getUint32(this._offset + 4, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set timestamp(value) {
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
			timestamp: this.timestamp,
		};
	}
}
Reports.Header = Header;

Reports.DepositApplied_TYPE = 12;
Reports.DepositApplied_ATTRIBUTES = ['header','user_id','asset_id','current_balance'];
class DepositApplied {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
	}
	set asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +value, true);
	}
	get current_balance() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 12, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 12, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set current_balance(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 12, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 12, +b.mod('4294967296'), true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'DepositApplied',
			header: this.header.toJSON(),
			user_id: this.user_id,
			asset_id: this.asset_id,
			current_balance: this.current_balance,
		};
	}
}
Reports.DepositApplied = DepositApplied;

Reports.TradeSessionClosed_TYPE = 2;
Reports.TradeSessionClosed_ATTRIBUTES = ['header','user_id'];
class TradeSessionClosed {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'TradeSessionClosed',
			header: this.header.toJSON(),
			user_id: this.user_id,
		};
	}
}
Reports.TradeSessionClosed = TradeSessionClosed;

Reports.UpdateTradingLimitResult_TYPE = 5;
Reports.UpdateTradingLimitResult_ATTRIBUTES = ['header','user_id','quote_asset_id','base_asset_id','limit_version','success'];
class UpdateTradingLimitResult {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get quote_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
	}
	set quote_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +value, true);
	}
	get base_asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 12, true);
	}
	set base_asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 12, +value, true);
	}
	get limit_version() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 16, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 16, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set limit_version(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 16, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 16, +b.mod('4294967296'), true);
	}
	get success() {
		return this._data_view.getUint8(this._offset + Reports.Header_SIZE + 24, true) !== 0;
	}
	set success(value) {
		this._data_view.setUint8(this._offset + Reports.Header_SIZE + 24, value ? 1 : 0);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'UpdateTradingLimitResult',
			header: this.header.toJSON(),
			user_id: this.user_id,
			quote_asset_id: this.quote_asset_id,
			base_asset_id: this.base_asset_id,
			limit_version: this.limit_version,
			success: this.success,
		};
	}
}
Reports.UpdateTradingLimitResult = UpdateTradingLimitResult;

Reports.Pong_TYPE = 4;
Reports.Pong_ATTRIBUTES = ['header','request_id'];
class Pong {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get request_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set request_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'Pong',
			header: this.header.toJSON(),
			request_id: this.request_id,
		};
	}
}
Reports.Pong = Pong;

Reports.WithdrawResult_TYPE = 18;
Reports.WithdrawResult_ATTRIBUTES = ['header','user_id','asset_id','quantity','success'];
class WithdrawResult {
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
			this._header_Header = new Reports.Header();
		}
		this._header_Header.wrap(this._data_view, this._offset + 0);
		return this._header_Header;
	}
	get user_id() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set user_id(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE, +b.mod('4294967296'), true);
	}
	get asset_id() {
		return this._data_view.getUint32(this._offset + Reports.Header_SIZE + 8, true);
	}
	set asset_id(value) {
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 8, +value, true);
	}
	get quantity() {
		const u32_1 = this._data_view.getUint32(4 + this._offset + Reports.Header_SIZE + 12, true);
		const u32_2 = this._data_view.getUint32(this._offset + Reports.Header_SIZE + 12, true);
		return Big(u32_1).mul('4294967296').add(u32_2) + '';
	}
	set quantity(value) {
		const b = Big(value);
		Big.DP = 0;
		Big.RM = 0;
		this._data_view.setUint32(4 + this._offset + Reports.Header_SIZE + 12, +b.div('4294967296'), true);
		this._data_view.setUint32(this._offset + Reports.Header_SIZE + 12, +b.mod('4294967296'), true);
	}
	get success() {
		return this._data_view.getUint8(this._offset + Reports.Header_SIZE + 20, true) !== 0;
	}
	set success(value) {
		this._data_view.setUint8(this._offset + Reports.Header_SIZE + 20, value ? 1 : 0);
	}
	toJSON() {
		return {
			META_TYPE_NAME: 'WithdrawResult',
			header: this.header.toJSON(),
			user_id: this.user_id,
			asset_id: this.asset_id,
			quantity: this.quantity,
			success: this.success,
		};
	}
}
Reports.WithdrawResult = WithdrawResult;

module.exports = Reports;
