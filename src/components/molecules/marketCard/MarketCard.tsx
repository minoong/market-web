import { useQueryClient } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import { useAppSelector } from '~/features/hooks'
import { MarketTicker } from '~/interface/upbit/market/ticker'
import styles from '~/components/molecules/marketCard/MarketCard.module.scss'
import Image from 'next/image'
import Candle from '~/components/atoms/candle/Candle'
import { marketKrwSymbolSelector, marketSymbolSelector } from '~/features/upblit/market/symbolSlice'
import { shallowEqual } from 'react-redux'
import { MarketSymbol } from '~/interface/upbit/market/marketSymbol'

interface Props {
 marketSymbol: string
}

function MarketCard(props: Props) {
 const { marketSymbol } = props

 const marketsSymbol = useAppSelector((state) =>
  state.marketSymbol.symbol
   .slice(0, 10)
   .map(({ market }) => market)
   .join(','),
 )
 const { korean_name: koreanName } = useAppSelector(
  (state) => marketSymbolSelector(state, marketSymbol),
  shallowEqual,
 ) as MarketSymbol
 const splitSymbol = useAppSelector((state) => marketKrwSymbolSelector(state, marketSymbol), shallowEqual)

 const queryCleint = useQueryClient()
 const marketTicker = queryCleint
  .getQueryData<MarketTicker[]>(['markets', marketsSymbol])
  ?.find((d) => d.market === marketSymbol) as MarketTicker

 return (
  <div className={`${styles['market-card-wrapper']} ${styles[marketTicker.change]}`}>
   {marketTicker && (
    <>
     <div>
      <Image
       src={`https://static.upbit.com/logos/${marketTicker.market.split('-')[1]}.png`}
       width={26 * 1.2}
       height={26 * 1.2}
       alt={marketTicker.market}
      />
     </div>

     <div className={styles['market-symbol-wrapper']}>
      <div>{koreanName}</div>
      <div>{splitSymbol}</div>
     </div>
     <div className={styles['market-symbol-current-price']}>
      <div>{marketTicker.trade_price.toLocaleString()}</div>
     </div>
     <div className={styles['market-symbol-rate-wrapper']}>
      <div>{marketTicker.signed_change_price.toLocaleString()}</div>
      <div>
       {marketTicker.signed_change_rate > 0 ? '+' : ''}
       {(marketTicker.signed_change_rate * 100).toFixed(2)}%
      </div>
     </div>
     <div className={styles['market-candle-wrapper']}>
      <svg width={15} height={26 * 1.2} fill="black">
       <Candle
        fill={marketTicker.change === 'RISE' ? '#c84a31' : '#1261c4'}
        width={15}
        height={26 * 1.2}
        price={{
         openingPrice: marketTicker.opening_price,
         tradePrice: marketTicker.trade_price,
         highPrice: marketTicker.high_price,
         lowPrice: marketTicker.low_price,
        }}
       />
      </svg>
     </div>
    </>
   )}
  </div>
 )
}

export default MarketCard
