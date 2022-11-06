import axios from 'axios'
import { MarketTicker } from '~/interface/upbit/market/ticker'

export async function getMarketsTicker(symbols: string) {
 const { data } = await axios.get<MarketTicker[]>(`https://api.upbit.com/v1/ticker?markets=${symbols}`)
 return data
}
