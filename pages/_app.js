import '../styles/globals.css'
import { Provider, chain, createClient, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const chains = defaultChains
const defaultChain = chain.mainnet

const client = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    const chain = chains.find((x) => x.id === chainId) ?? defaultChain
    return [
      new MetaMaskConnector({ chains })
    ]
  },
})


function MyApp({ Component, pageProps }) {
  return (
    <Provider client={client}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
