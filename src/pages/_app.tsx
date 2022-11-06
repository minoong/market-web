import '~/styles/globals.scss'
import '~/styles/tailwind.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Header from '~/components/organism/header/Header'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wrapper } from '~/features/store'
import { Provider } from 'react-redux'

function MyApp({ Component, ...rest }: AppProps) {
 const { store, props } = wrapper.useWrappedStore(rest)
 const [queryClient] = useState(
  () =>
   new QueryClient({
    defaultOptions: {
     queries: {
      staleTime: 0,
      refetchOnWindowFocus: false,
     },
    },
   }),
 )
 const { pageProps } = props

 return (
  <Provider store={store}>
   <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
     <ChakraProvider>
      <Header />
      <Component {...pageProps} />
     </ChakraProvider>
    </Hydrate>
   </QueryClientProvider>
  </Provider>
 )
}

export default MyApp
