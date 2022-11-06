import { useQuery } from '@tanstack/react-query'
import { getMarketsTicker } from '~/api/upbit/marketsTicker'
import { UseQueryOptionsOf } from '~/interface/reactQuery/query'

export function useMartetsTicker(marketsSymbol: string, options: UseQueryOptionsOf<typeof getMarketsTicker> = {}) {
 return useQuery(['markets', marketsSymbol], () => getMarketsTicker(marketsSymbol), options)
}
