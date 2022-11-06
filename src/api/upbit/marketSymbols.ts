import axios from 'axios'
import { MarketSymbol } from '~/interface/upbit/market/marketSymbol'

export async function getMarketSymbols() {
 const { data } = await axios.get<MarketSymbol[]>('https://api.upbit.com/v1/market/all')
 return data
}
