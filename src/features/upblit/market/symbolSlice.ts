import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '~/features/store'
import { MarketSymbol } from '~/interface/upbit/market/marketSymbol'

export interface SymbolState {
 symbol: MarketSymbol[]
}

const initialState: SymbolState = {
 symbol: [],
}

export const symbolSlice = createSlice({
 name: 'market/symbol',
 initialState,
 reducers: {
  invoke: (state, action: PayloadAction<MarketSymbol[]>) => {
   state.symbol = action.payload
  },
 },
})

const selectMarketsSymbol = (state: RootState) => state.marketSymbol.symbol

export const marketSymbolSelector = createSelector(
 [selectMarketsSymbol, (_, marketSymbol: string) => marketSymbol],
 (marketsSymbol, marketSymbol) => marketsSymbol.find((market) => market.market === marketSymbol) as MarketSymbol,
)

export const marketKrwSymbolSelector = createSelector([marketSymbolSelector], (marketSymbol) => {
 const [krw, symbol] = marketSymbol.market.split('-')

 return `${symbol}/${krw}`
})

export const { invoke } = symbolSlice.actions
export default symbolSlice
