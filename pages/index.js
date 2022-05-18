import Head from 'next/head'
import Navigation from '../components/Navigation'
import Delegates from '../components/Delegates'
import AddressInput from '../components/AddressInput'
import Footer from '../components/Footer'
import { useBalance, useAccount, useBlockNumber, useContractRead } from 'wagmi'
import snapshot from '@snapshot-labs/snapshot.js';
import { useState, useEffect } from 'react'
import delegateAbi from '../utils/abis/delegate.json'
import { delegates } from '../delegates'



export default function Home() {
  const { data: account } = useAccount()
  const { data: blockNumber } = useBlockNumber()
  const { data, isError, isLoading } = useBalance({
    addressOrName: account?.address,
    token: '0xC5ca1EBF6e912E49A6a70Bb0385Ea065061a4F09',
    watch: true,
  })

  const space = 'apwine.eth'
  const strategies = [
    {
      name: 'erc20-balance-of-coeff',
      params: {
        coeff: 104,
        address: '0xc5ca1ebf6e912e49a6a70bb0385ea065061a4f09',
        symbol: 'veAPW',
        decimals: 18
      }
    }
  ];
  const network = '1';
  const voters = [
    account?.address,
    '0x0edEFA91e99da1eDDD1372c1743A63B1595fC413',
    '0x9824697F7c12CAbAda9b57842060931c48dEA969',
    '0xb91bCC46BAA68F61D8D988898D8D3900BF7A364D'
  ];
  const [votes, setVotes] = useState()
  const [currentDelegate, setCurrentDelegate] = useState('0x0000000000000000000000000000000000000000')

  useEffect(() => {
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

  //get current delegate

  const { data: selectedDelegate } = useContractRead(
    {
      addressOrName: '0x469788fE6E9E9681C6ebF3bF78e7Fd26Fc015446',
      contractInterface: delegateAbi,
    },
    'delegation',
    {
      // args: ['0x3625eff632eab044489a46014dd168ccb5112240', '0x6c69646f2d736e617073686f742e657468000000000000000000000000000000']
      args: [account.address, '0x6c69646f2d736e617073686f742e657468000000000000000000000000000000']

    }
  )

  useEffect(() => {
    if (selectedDelegate === '0x0000000000000000000000000000000000000000') {
      setCurrentDelegate('0x0000000000000000000000000000000000000000')
    } else {
      const filteredFromDelegates = delegates.filter(delegate => delegate.address === selectedDelegate);
      if (filteredFromDelegates.length === 0) {
        setCurrentDelegate([
          {
            name: '',
            address: selectedDelegate,
            bio: '',
            discordId: '',
            twitter: '',
            imageUrl:
              '',
          },
        ])
      }
      setCurrentDelegate(delegates.filter(delegate => delegate.address === selectedDelegate))
    }
  }, [selectedDelegate])

  return (
    <>
      <Head>
        <title>Voting Delegation Dashboard</title>
      </Head>
      <Navigation />
      <h1 className="text-3xl md:text-5xl font-bold font-serif mt-11 ml-8  md:ml-20 text-brand-dark-purple">
        Voting Delegation Dashboard
      </h1>
      <div className="mt-11 ml-10 md:ml-24 text-brand-dark-purple font-serif font-medium text-lg">
        {
          isLoading ?
            (
              <span className="text-brand-indigo font-bold">Fetching balance...</span>
            ) : isError ? (
              <span className="text-brand-indigo font-bold">Error fetch balance</span>
            ) : (
              <>
                <h3>veAPW balance: <span className="text-brand-indigo font-bold">{data?.formatted} {data?.symbol}</span></h3>
                <h3>veAPW voting power: <span className="text-brand-indigo font-bold">{votes} votes</span></h3>
              </>
            )
        }

      </div>
      <div className="mt-11 ml-5 md:ml-16 lg:flex">
        {/* current delegate */}
        {currentDelegate === '0x0000000000000000000000000000000000000000' ? (null) : (
          <div >
          <h2 className="font-serif font-bold text-3xl text-brand-indigo">Current Delegate:</h2>
            <div className="mt-5 ml-5 md:ml-10">
            <Delegates delegates={currentDelegate} />
            </div>
          </div>
        )
        }

        {/* select delegate by address */}
        <div className={`mt-11 md:mt-0 ${currentDelegate === '0x0000000000000000000000000000000000000000' ? '' : 'md:ml-48'}`}>
          <h2 className="font-serif font-bold text-3xl text-brand-indigo">Select Delegate by Address:</h2>
          <div className="mt-2 md:mt-5 md:ml-12">
            <AddressInput />
          </div>
        </div>
      </div>
      {/* Candidate delegates */}
      <div className="mt-11 ml-14">
        <h2 className="font-serif font-bold text-3xl text-brand-indigo">Candidate Delegates:</h2>
        <div className="mt-5 mx-20">
          <Delegates delegates={delegates} />
        </div>
      </div>
      <Footer />
    </>
  )
}
