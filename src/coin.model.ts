export interface CoinModel {
    id?: string
    symbol?: string
    base?: string
    quote?: string
    baseId?: string
    quoteId?: string
    type?: string
    spot?: boolean
    margin?: boolean
    swap?: boolean
    future?: boolean
    option?: boolean
    active?: boolean
    contract?: boolean
    taker?: number
    maker?: number
    precision?: Precision
    limits?: Limits
    info?: Info
    tierBased?: boolean
    percentage?: boolean
    tiers?: Tiers
}

export interface Precision {
    amount?: number
    price?: number
}

export interface Limits {
    leverage?: Leverage
    amount?: Amount
    price?: Price
    cost?: Cost
}

export interface Leverage {}

export interface Amount {
    min?: number
    max?: number
}

export interface Price {}

export interface Cost {
    min?: number
    max?: number
}

export interface Info {
    symbol?: string
    name?: string
    baseCurrency?: string
    quoteCurrency?: string
    feeCurrency?: string
    market?: string
    baseMinSize?: string
    quoteMinSize?: string
    baseMaxSize?: string
    quoteMaxSize?: string
    baseIncrement?: string
    quoteIncrement?: string
    priceIncrement?: string
    priceLimitRate?: string
    minFunds?: string
    isMarginEnabled?: boolean
    enableTrading?: boolean
}

export interface Tiers {
    taker?: number[][]
    maker?: number[][]
}
