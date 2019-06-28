merkleX NodeJS trading client
=============================

This is the offical trading API client for [merklex.io](https://merklex.io). More examples and documentation are on the way.

Can be installed with npm

```
npm i merklex
```

# Messages Reference
## Requests
### Key
#### Messages
 - [Header](#Header)
 - [Ping](#Ping)
 - [PrepareMarket](#PrepareMarket)
 - [QueryOrderToken](#QueryOrderToken)
 - [ListOpenOrders](#ListOpenOrders)
 - [OpenTradeSession](#OpenTradeSession)
 - [NewOrder](#NewOrder)
 - [CancelOrder](#CancelOrder)

### Messages
#### Header
| attribute | type |
| -- | -- |
| length | u16 |
| type_id | u16 |
| request_id | u64 |

#### Ping
| attribute | type |
| -- | -- |
| header | Header |
| request_id | u64 |

#### PrepareMarket
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |

#### QueryOrderToken
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |

#### ListOpenOrders
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| after_order_token | u64 |

#### OpenTradeSession
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| access_key | char |

#### NewOrder
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| order_token | u64 |
| replace_order_token | u64 |
| quantity | u64 |
| price | u64 |
| is_buy | bool |

#### CancelOrder
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| order_token | u64 |
| leaves_quantity | u64 |


## Reports
### Key
#### Messages
 - [OrderResting](#OrderResting)
 - [OrderDone](#OrderDone)
 - [OrderRejected](#OrderRejected)
 - [OrderDetails](#OrderDetails)
 - [TradeSessionOpened](#TradeSessionOpened)
 - [MarketReady](#MarketReady)
 - [NextOrderToken](#NextOrderToken)
 - [CurrentBalance](#CurrentBalance)
 - [Error](#Error)
 - [OrderAccepted](#OrderAccepted)
 - [OrderModified](#OrderModified)
 - [SessionDetails](#SessionDetails)
 - [Match](#Match)
 - [MarketStateDetails](#MarketStateDetails)
 - [Header](#Header)
 - [DepositApplied](#DepositApplied)
 - [TradeSessionClosed](#TradeSessionClosed)
 - [UpdateTradingLimitResult](#UpdateTradingLimitResult)
 - [Pong](#Pong)
 - [WithdrawResult](#WithdrawResult)

#### Types
 - [RejectReason](#RejectReason)
 - [DoneReason](#DoneReason)
 - [ErrorCode](#ErrorCode)

### Messages
#### OrderResting
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| order_token | u64 |
| quantity_removed | u64 |
| quantity_resting | u64 |
| price | u64 |
| is_buy | bool |

#### OrderDone
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| order_token | u64 |
| quantity_removed | u64 |
| price | u64 |
| is_buy | bool |
| reason | DoneReason |

#### OrderRejected
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| order_token | u64 |
| reason | RejectReason |
| is_buy | bool |

#### OrderDetails
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| order_token | u64 |
| older_order_token | u64 |
| price | u64 |
| quantity | u64 |
| original_quantity | u64 |
| is_buy | bool |

#### TradeSessionOpened
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |

#### MarketReady
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |

#### NextOrderToken
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| next_order_token | u64 |
| used_tokens | u64 |

#### CurrentBalance
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| asset_id | u32 |
| balance | u64 |
| hold | u64 |

#### Error
| attribute | type |
| -- | -- |
| header | Header |
| request_id | u64 |
| code | ErrorCode |

#### OrderAccepted
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| order_token | u64 |
| existing_order_token | u64 |
| is_buy | bool |
| quantity | u64 |
| price | u64 |

#### OrderModified
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| order_token | u64 |
| quantity_removed | u64 |
| quantity_remaining | u64 |
| price | u64 |
| is_buy | bool |

#### SessionDetails
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| session_tag | u32 |
| order_count | u32 |
| unlock_at | u64 |

#### Match
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| order_token | u64 |
| quantity | u64 |
| price | u64 |
| cost | u64 |
| sequence | u64 |
| fees | u64 |
| limit_version | u64 |
| is_maker | bool |
| is_buy | bool |

#### MarketStateDetails
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| fee_limit | u64 |
| limit_version | u64 |
| quote_qty | i64 |
| base_qty | i64 |
| quote_market_hold | u64 |
| base_market_hold | u64 |
| min_quote_qty | i64 |
| min_base_qty | i64 |
| long_max_price | u64 |
| short_min_price | u64 |
| quote_shift_qty_major | i32 |
| quote_shift_qty_minor | u64 |
| base_shift_qty_major | i32 |
| base_shift_qty_minor | u64 |

#### Header
| attribute | type |
| -- | -- |
| length | u16 |
| type_id | u16 |
| timestamp | u64 |

#### DepositApplied
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| asset_id | u32 |
| current_balance | u64 |

#### TradeSessionClosed
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |

#### UpdateTradingLimitResult
| attribute | type |
| -- | -- |
| header | Header |
# Messages Reference
## Requests
### Key
#### Messages
 - [Header](#Header)
 - [Ping](#Ping)
 - [PrepareMarket](#PrepareMarket)
 - [QueryOrderToken](#QueryOrderToken)
 - [ListOpenOrders](#ListOpenOrders)
 - [OpenTradeSession](#OpenTradeSession)
 - [NewOrder](#NewOrder)
 - [CancelOrder](#CancelOrder)

### Messages
#### Header
| attribute | type |
| -- | -- |
| length | u16 |
| type_id | u16 |
| request_id | u64 |

#### Ping
| attribute | type |
| -- | -- |
| header | Header |
| request_id | u64 |

#### PrepareMarket
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |

#### QueryOrderToken
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |

#### ListOpenOrders
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| after_order_token | u64 |

#### OpenTradeSession
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| access_key | char[32] |

#### NewOrder
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| order_token | u64 |
| replace_order_token | u64 |
| quantity | u64 |
| price | u64 |
| is_buy | bool |

#### CancelOrder
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| order_token | u64 |
| leaves_quantity | u64 |


## Reports
### Key
#### Messages
 - [OrderResting](#OrderResting)
 - [OrderDone](#OrderDone)
 - [OrderRejected](#OrderRejected)
 - [OrderDetails](#OrderDetails)
 - [TradeSessionOpened](#TradeSessionOpened)
 - [MarketReady](#MarketReady)
 - [NextOrderToken](#NextOrderToken)
 - [CurrentBalance](#CurrentBalance)
 - [Error](#Error)
 - [OrderAccepted](#OrderAccepted)
 - [OrderModified](#OrderModified)
 - [SessionDetails](#SessionDetails)
 - [Match](#Match)
 - [MarketStateDetails](#MarketStateDetails)
 - [Header](#Header)
 - [DepositApplied](#DepositApplied)
 - [TradeSessionClosed](#TradeSessionClosed)
 - [UpdateTradingLimitResult](#UpdateTradingLimitResult)
 - [Pong](#Pong)
 - [WithdrawResult](#WithdrawResult)

#### Types
 - [RejectReason](#RejectReason)
 - [DoneReason](#DoneReason)
 - [ErrorCode](#ErrorCode)

### Messages
#### OrderResting
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| order_token | u64 |
| quantity_removed | u64 |
| quantity_resting | u64 |
| price | u64 |
| is_buy | bool |

#### OrderDone
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| order_token | u64 |
| quantity_removed | u64 |
| price | u64 |
| is_buy | bool |
| reason | DoneReason |

#### OrderRejected
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| order_token | u64 |
| reason | RejectReason |
| is_buy | bool |

#### OrderDetails
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| order_token | u64 |
| older_order_token | u64 |
| price | u64 |
| quantity | u64 |
| original_quantity | u64 |
| is_buy | bool |

#### TradeSessionOpened
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |

#### MarketReady
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |

#### NextOrderToken
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| next_order_token | u64 |
| used_tokens | u64 |

#### CurrentBalance
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| asset_id | u32 |
| balance | u64 |
| hold | u64 |

#### Error
| attribute | type |
| -- | -- |
| header | Header |
| request_id | u64 |
| code | ErrorCode |

#### OrderAccepted
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| order_token | u64 |
| existing_order_token | u64 |
| is_buy | bool |
| quantity | u64 |
| price | u64 |

#### OrderModified
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| order_token | u64 |
| quantity_removed | u64 |
| quantity_remaining | u64 |
| price | u64 |
| is_buy | bool |

#### SessionDetails
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| session_tag | u32 |
| order_count | u32 |
| unlock_at | u64 |

#### Match
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| order_token | u64 |
| quantity | u64 |
| price | u64 |
| cost | u64 |
| sequence | u64 |
| fees | u64 |
| limit_version | u64 |
| is_maker | bool |
| is_buy | bool |

#### MarketStateDetails
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| fee_limit | u64 |
| limit_version | u64 |
| quote_qty | i64 |
| base_qty | i64 |
| quote_market_hold | u64 |
| base_market_hold | u64 |
| min_quote_qty | i64 |
| min_base_qty | i64 |
| long_max_price | u64 |
| short_min_price | u64 |
| quote_shift_qty_major | i32 |
| quote_shift_qty_minor | u64 |
| base_shift_qty_major | i32 |
| base_shift_qty_minor | u64 |

#### Header
| attribute | type |
| -- | -- |
| length | u16 |
| type_id | u16 |
| timestamp | u64 |

#### DepositApplied
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| asset_id | u32 |
| current_balance | u64 |

#### TradeSessionClosed
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |

#### UpdateTradingLimitResult
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| quote_asset_id | u32 |
| base_asset_id | u32 |
| limit_version | u64 |
| success | bool |

#### Pong
| attribute | type |
| -- | -- |
| header | Header |
| request_id | u64 |

#### WithdrawResult
| attribute | type |
| -- | -- |
| header | Header |
| user_id | u64 |
| asset_id | u32 |
| quantity | u64 |
| success | bool |

### Types
#### RejectReason
Data type: u8

| name | value |
| -- | -- |
| INSUFFICIENT_FUNDS | 1|
| INVALID_QUANTITY | 2|
| TRADING_LIMIT | 3|
| NOT_A_REASON | 4|
| OUT_OF_MEMORY | 5|
| UNLOCKED | 6|

#### DoneReason
Data type: u8

| name | value |
| -- | -- |
| FILLED | 1|
| CANCELED | 2|
| ERROR | 3|
| NO_LONGER_VALID | 4|
| REPLACED | 5|
| CANNOT_ADD | 6|

#### ErrorCode
Data type: u32

| name | value |
| -- | -- |
| UNKNOWN_COMMAND_TYPE | 1|
| OUT_OF_MEMORY | 2|
| INTERNAL_ERROR | 899999|
| SESSION_DOES_NOT_EXIST | 900005|
| BAD_ACCESS_KEY | 900004|
| ASSET_NOT_PREPARED | 900001|
| INVALID_REQUEST | 900000|
| FEED_DROPPED | 900003|
| AT_CAPACITY | 900002|
