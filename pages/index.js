import Head from 'next/head'
import Image from 'next/image'
import Navigation from '../components/Navigation'
import Delegates from '../components/Delegates'
import AddressInput from '../components/AddressInput'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'

export default function Home() {
  const currentDelegate = [
    {
      name: 'Jane Cooper',
      title: 'Paradigm Representative',
      address: '0xE27F2E8321Fb4c32525a4ED86d2902dbA63491E4',
      bio: 'Went into crypto in 2016. Community builder @ early stage crypto startups. Building the Keep network and tBTC community. Early adopter of Paladin. Believe in what is best for Paladin in the long term and for contributors/community',
      email: 'janecooper@example.com',
      discordId: 'BryanMutai#6546',
      twitter: 'brymutai',
      telephone: '+1-202-555-0170',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
  ]
  const delegateCandidates = [
    {
      name: 'Jane Cooper',
      title: 'Paradigm Representative',
      address: '0xE27F2E8321Fb4c32525a4ED86d2902dbA63491E4',
      bio: 'Went into crypto in 2016. Community builder @ early stage crypto startups. Building the Keep network and tBTC community. Early adopter of Paladin. Believe in what is best for Paladin in the long term and for contributors/community',
      email: 'janecooper@example.com',
      discordId: 'BryanMutai#6546',
      twitter: 'brymutai',
      telephone: '+1-202-555-0170',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Jane Cooper',
      title: 'Paradigm Representative',
      address: '0xE27F2E8321Fb4c32525a4ED86d2902dbA63491E4',
      bio: 'Went into crypto in 2016. Community builder @ early stage crypto startups. Building the Keep network and tBTC community. Early adopter of Paladin. Believe in what is best for Paladin in the long term and for contributors/community',
      email: 'janecooper@example.com',
      discordId: 'BryanMutai#6546',
      twitter: 'brymutai',
      telephone: '+1-202-555-0170',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Jane Cooper',
      title: 'Paradigm Representative',
      address: '0xE27F2E8321Fb4c32525a4ED86d2902dbA63491E4',
      bio: 'Went into crypto in 2016. Community builder @ early stage crypto startups. Building the Keep network and tBTC community. Early adopter of Paladin. Believe in what is best for Paladin in the long term and for contributors/community',
      email: 'janecooper@example.com',
      discordId: 'BryanMutai#6546',
      twitter: 'brymutai',
      telephone: '+1-202-555-0170',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Jane Cooper',
      title: 'Paradigm Representative',
      address: '0xE27F2E8321Fb4c32525a4ED86d2902dbA63491E4',
      bio: 'Went into crypto in 2016. Community builder @ early stage crypto startups. Building the Keep network and tBTC community. Early adopter of Paladin. Believe in what is best for Paladin in the long term and for contributors/community',
      email: 'janecooper@example.com',
      discordId: 'BryanMutai#6546',
      twitter: 'brymutai',
      telephone: '+1-202-555-0170',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    }
  ]
  return (
    <>
      <Head>
        <title>Voting Delegation Dashboard</title>
      </Head>
      <Navigation />
      <h1 className="text-5xl font-bold font-serif mt-11 ml-8 text-brand-dark-purple">
        Voting Delegation Dashboard
      </h1>
      <div className="mt-11 ml-16 text-brand-dark-purple font-serif font-medium text-lg">
        <h3>veAPW balance: <span className="text-brand-indigo font-bold">5.1M veAPW</span></h3>
        <h3>veAPW voting power: <span className="text-brand-indigo font-bold">5.1M veAPW</span></h3>
      </div>
      <div className="mt-11 ml-16 flex">
        {/* current delegate */}
        <div>
          <h2 className="font-serif font-bold text-3xl text-brand-indigo">Current Delegate:</h2>
          <div className="mt-5 ml-10">
            <Delegates delegates={currentDelegate} />
          </div>
        </div>
        {/* select delegate by address */}
        <div className=" ml-48">
          <h2 className="font-serif font-bold text-3xl text-brand-indigo">Select Delegate by Address:</h2>
          <div className="mt-5 ml-12">
            <AddressInput />
          </div>
        </div>
      </div>
      {/* Candidate delegates */}
      <div className="mt-11 ml-10">
        <h2 className="font-serif font-bold text-3xl text-brand-indigo">Candidate Delegates:</h2>
        <div className="mt-5 mx-20">
          <Delegates delegates={delegateCandidates} />
        </div>
      </div>
      <Footer />
    </>
  )
}
