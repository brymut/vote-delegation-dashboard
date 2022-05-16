import Head from 'next/head'
import Image from 'next/image'
import Navigation from '../components/Navigation'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Navigation />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </>
  )
}
