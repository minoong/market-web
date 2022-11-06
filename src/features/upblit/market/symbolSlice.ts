import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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

export const { invoke } = symbolSlice.actions
export default symbolSlice
