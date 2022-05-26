import Head from 'next/head'
import Navigation from '../components/Navigation'
import Delegate from '../components/Delegate'
import AddressInput from '../components/AddressInput'
import Footer from '../components/Footer'
import { useBalance, useAccount, useBlockNumber, useContractRead } from 'wagmi'
import snapshot from '@snapshot-labs/snapshot.js';
import { formatBytes32String } from '@ethersproject/strings'
import { useState, useEffect } from 'react'
import delegateAbi from '../utils/abis/delegate.json'
import { delegates } from '../delegates'


export default function Home() {
  const { data: account } = useAccount()
  const { data: blockNumber } = useBlockNumber()
  const { data, isError, isLoading } = useBalance({
    addressOrName: account?.address,
    token: process.env.NEXT_PUBLIC_VEAPW_TOKEN_ADDRESS,
    watch: true,
  })

  const space = process.env.NEXT_PUBLIC_APWINE_SPACE
  const strategies = [
    {
      name: 'erc20-balance-of-coeff',
      params: {
        coeff: 104,
        address: process.env.NEXT_PUBLIC_VEAPW_TOKEN_ADDRESS,
        symbol: process.env.NEXT_PUBLIC_VEAPW_TOKEN_SYMBOL,
        decimals: 18
      }
    }
  ];
  const network = '1';
  const voters = [
    account?.address,
  ];
  const zeroAdddress = '0x0000000000000000000000000000000000000000'
  const [votes, setVotes] = useState()
  const [currentDelegate, setCurrentDelegate] = useState(zeroAdddress)

  useEffect(() => {
    if (account)
      snapshot.utils.getScores(
        space,
        strategies,
        network,
        voters,
        blockNumber
      ).then(scores => {
        setVotes(scores[0][account?.address] || 0)
      });
  }, [voters, account])

  const { data: selectedDelegate } = useContractRead(
    {
      addressOrName: process.env.NEXT_PUBLIC_APWINE_DELEGATE_REGISTRY_ADDRESS,
      contractInterface: delegateAbi,
    },
    'delegation',
    {
      args: [account?.address, formatBytes32String(space)]

    }
  )

  useEffect(() => {
    if (selectedDelegate === zeroAdddress) {
      setCurrentDelegate(zeroAdddress)
    } else {
      const filteredFromDelegates = delegates.filter(delegate => delegate.address === selectedDelegate);
      if (filteredFromDelegates.length === 0) {
        setCurrentDelegate(
          {
            name: '',
            address: selectedDelegate,
            bio: '',
            discordId: '',
            twitter: '',
            imageUrl:
              '',
          },
        )
      } else {
        setCurrentDelegate(delegates.filter(delegate => delegate.address === selectedDelegate)[0])
      }
    }
  }, [selectedDelegate])

  return (
    <div className='transition-all duration-300 filter grayscale-2/3'>
      <Head>
        <title>APWINE - Voting Delegation Dashboard</title>
      </Head>
      <Navigation />
      <h1 className="text-xl md:text-2xl font-bold font-serif mx-10  md:mx-20 text-gray-100 text-center">
        Voting Delegation Dashboard
      </h1>
      <div className="mt-5 mx-10 md:mx-20 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {/* Token balance and voting power */}
        <div className="mt-11 text-gray-100 font-serif font-medium text-xl">
        {
          isLoading ?
            (
              <span className="text-brand-light-purple font-bold">Fetching balance...</span>
            ) : isError ? (
              <span className="text-brand-light-purple font-bold">Error fetching balance</span>
            ) : (
              <>
                    <h3>veAPW balance: <span className="text-brand-light-purple font-bold">{parseFloat(data?.formatted).toFixed(2)} {data?.symbol}</span></h3>
                    <h3>veAPW voting power: <span className="text-brand-light-purple font-bold">{parseFloat(votes).toFixed(2)} votes</span></h3>
              </>
            )
        }

        </div>
        {/* current delegate */}
        {currentDelegate === zeroAdddress ? (null) : (
          <div>
            <h2 className="mt-5 md:mt-0 font-serif font-bold text-xl text-gray-100">Current Delegate:</h2>
            <div className="mt-5">
              <Delegate delegate={currentDelegate} currentDelegateAddress={currentDelegate.address} />
            </div>
          </div>
        )
        }

        {/* select delegate by address */}
        <div className="mt-11 md:mt-0 max-w-sm">
          <h2 className="font-serif font-bold text-xl text-gray-100">Select Delegate by Address:</h2>
          <div className="mt-2 md:mt-5">
            <AddressInput />
          </div>
        </div>
      </div>
      {/* Candidate delegates */}
      <div className="mt-6 mx-10 md:mx-20">
        <h2 className="font-serif font-bold text-2xl text-gray-100 text-center">Candidate Delegates:</h2>
        <div className="mt-2">
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {delegates.map((delegate) => (
              <li key={delegate.address}>
                <Delegate delegate={delegate} currentDelegateAddress={currentDelegate.address} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  )
}
