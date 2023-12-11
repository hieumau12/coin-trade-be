import ccxt, {OHLCV} from "ccxt";
import {CoinModel} from "./coin.model";
import {CandleModel} from "./candle.model";

const kucoin = new ccxt.kucoin()

export async function main() {

    var marketDictionary = await kucoin.loadMarkets()
    let usdtPairList: any[] = []
    let btcPairList: any[] = []
    let coinList: CoinModel[] = []

    Object.keys(marketDictionary).forEach(key => {
        coinList.push(marketDictionary[key]!)
    })

    // clean coin list
    coinList = coinList.filter(c => c.active)

    coinList.forEach(coin => {
        if (!coin.active) {
            return
        }

        if (coin.quoteId == 'USDT') {
            usdtPairList.push(coin)
        }

        if (coin.quoteId == 'BTC') {
            btcPairList.push(coin)
        }
    })

    console.log('All coin count: ', coinList.length)

    console.log('USDT pair count: ', usdtPairList.length)
    console.log('BTC pair count: ', btcPairList.length)

    // console.log(coinList[4])
    for (const coin of coinList) {
        var candles = await getCandlesOfCoin(coin.symbol!)
        if (testPriceTrend(candles)) {
            console.log(coin.symbol)
        }
    }

}

async function getCandlesOfCoin(symbol: string) {
    // let ticker = await kucoin.fetchTicker(symbol)
    // console.log(ticker)
    var ohlcv = await kucoin.fetchOHLCV(symbol, '1w',
        new Date('2017-01-01T00:00:00.000Z').getTime(),
        // new Date('2023-11-30T00:00:00.000Z').getTime(),
    );
    var candles = ohlcvToCandle(ohlcv);

    return candles
}

function testPriceTrend(candles: CandleModel[]): boolean {
    let isPass = true

    var length = candles.length;
    let lastCandle: CandleModel = candles[length - 1]

    let candleRevert = [...candles].reverse()

    candleRevert.forEach((candle, index) => {
        if (index > 5) {
            return
        }

        if (lastCandle.closing >= candle.open) {

        } else {
            // console.log([lastCandle.high, candle.high])
            isPass = false
            return;
        }
    })


    let openClosePrices: number [] = []
    candleRevert.forEach((candle, index) => {
        if (index > 9) {
            return
        }
        openClosePrices.push(candle.open)
        openClosePrices.push(candle.closing)
    })

    let lowestPriceOfPreviousCandle = Math.min(...openClosePrices)

    if (lastCandle.closing / lowestPriceOfPreviousCandle < 1.5) {

    } else {
        isPass = false
    }

    let openPriceOfAllCandle: number[] = []
    candleRevert.forEach((candle, index) => {
        openPriceOfAllCandle.push(candle.open)
    })
    let maxPrice = Math.max(...openPriceOfAllCandle)

    if (maxPrice / lastCandle.closing >= 50) {

    } else {
        isPass = false
    }

    return isPass
}

function ohlcvToCandle(ohlcv: OHLCV[]): CandleModel[] {
    let candles: CandleModel [] = []

    ohlcv.forEach(o => {
        let candle: CandleModel = {
            timestamp: new Date(o[0]!),
            open: o[1]!,
            high: o[2]!,
            low: o[3]!,
            closing: o[4]!,
            volume: o[5]!
        }

        candles.push(candle)
    })

    return candles
}

main()