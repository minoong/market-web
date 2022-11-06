import { type UseQueryOptions } from '@tanstack/react-query'

export type UseQueryOptionsOf<T extends (...args: any) => any> = UseQueryOptions<
 Awaited<ReturnType<T>>,
 unknown,
 Awaited<ReturnType<T>>,
 any[]
>
