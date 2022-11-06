import {
 Action,
 AnyAction,
 CombinedState,
 combineReducers,
 configureStore,
 Reducer,
 ThunkAction,
} from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import symbolSlice from '~/features/upblit/market/symbolSlice'

const rootReducer = combineReducers({
 marketSymbol: symbolSlice.reducer,
})

let initialRootState: RootState

const reducer = (state: RootState, action: AnyAction): CombinedState<RootState> => {
 switch (action.type) {
  case HYDRATE:
   if (state === initialRootState) {
    return {
     ...state,
     ...action.payload,
    }
   } else {
    return state
   }
  default:
   return rootReducer(state, action)
 }
}

const initStore = () => {
 const store = configureStore({
  reducer: reducer as Reducer<CombinedState<RootState>, AnyAction>,
  devTools: true,
 })

 initialRootState = store.getState()

 return store
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof initStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>

export const wrapper = createWrapper<AppStore>(initStore)
