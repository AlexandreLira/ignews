import Head from 'next/head'
import Image from 'next/image'
import { SubscribeButton } from '../components/SubscribeButton/SubscribeButton'
import styled from './home.module.scss'
export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Ig.news</title>
      </Head>

      <main className={styled.contentContainer}>
        <section className={styled.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about <br />
            the <span> React </span>
            world
          </h1>

          <p>
            Get acess to all the publications <br />
            <span>for $9.90 month</span>
          </p>

          <SubscribeButton />

        </section>

        <Image src="/images/avatar.svg" alt="Girl coding" width='500px' height='500px' />
      </main>
    </>
  )
}
