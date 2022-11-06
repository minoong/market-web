import { useQueryClient } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import { useAppSelector } from '~/features/hooks'
import { MarketTicker } from '~/interface/upbit/market/ticker'
import styles from '~/components/molecules/marketCard/MarketCard.module.scss'
import Image from 'next/image'
import Candle from '~/components/atoms/candle/Candle'

interface Props {
 logo: string
 marketSymbol: string
}

function MarketCard(props: Props) {
 const { logo, marketSymbol } = props

 const marketsSymbol = useAppSelector((state) =>
  state.marketSymbol.symbol
   .slice(0, 10)
   .map(({ market }) => market)
   .join(','),
 )
 const marketsKorSymbol = useAppSelector((state) => state.marketSymbol.symbol)

 const queryCleint = useQueryClient()
 const dataList = queryCleint
  .getQueryData<MarketTicker[]>(['markets', marketsSymbol])
  ?.find((d) => d.market === marketSymbol) as MarketTicker

 const enName = useMemo(() => {
  const [krw, symbol] = dataList.market.split('-')

  return `${symbol}/${krw}`
 }, [dataList])

 console.log(styles[dataList.change])

 return (
  <div className={`${styles['market-card-wrapper']} ${styles[dataList.change]}`}>
   {dataList && (
    <>
     <div>
      <Image
       src={`https://static.upbit.com/logos/${dataList.market.split('-')[1]}.png`}
       width={26 * 1.2}
       height={26 * 1.2}
       alt={dataList.market}
      />
     </div>

     <div className={styles['market-symbol-wrapper']}>
      <div>{marketsKorSymbol.find((d) => d.market === dataList.market)?.korean_name}</div>
      <div>{enName}</div>
     </div>
     <div className={styles['market-symbol-current-price']}>
      <div>{dataList.trade_price.toLocaleString()}</div>
     </div>
     <div className={styles['market-symbol-wrapper']}>
      <div>{dataList.signed_change_price.toLocaleString()}</div>
      <div>
       {dataList.signed_change_rate > 0 ? '+' : ''}
       {(dataList.signed_change_rate * 100).toFixed(2)}%
      </div>
     </div>
     <div className={styles['market-candle-wrapper']}>
      <svg width={15} height={26 * 1.2} fill="black">
       <Candle
        fill={dataList.change === 'RISE' ? '#c84a31' : '#1261c4'}
        width={15}
        height={26 * 1.2}
        price={{
         openingPrice: dataList.opening_price,
         tradePrice: dataList.trade_price,
         highPrice: dataList.high_price,
         lowPrice: dataList.low_price,
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
