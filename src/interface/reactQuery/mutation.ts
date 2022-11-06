import { type UseMutationOptions } from '@tanstack/react-query'

export type UseMutationOptionsOf<T extends (...args: any) => any, E = any> = UseMutationOptions<
 Awaited<ReturnType<T>>,
 E,
 Parameters<T>[0]
>
