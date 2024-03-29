import { GetServerSideProps, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SubscribeButton } from '../components/SubscribeButton/SubscribeButton'
import { stripe } from '../services/stripe'
import styled from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({product}: HomeProps) {
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
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId}/>

        </section>

        <Image src="/images/avatar.svg" alt="Girl coding" width='500px' height='500px' />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1L6Lq3A2uYqlezlJriTJKX6y', {
    expand: ['product']
  })

  function formatNumber(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  } 

  const product = {
    priceId: price.id,
    amount: formatNumber(price.unit_amount / 100),
  }
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
