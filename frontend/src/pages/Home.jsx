import React from 'react'
import Hero from '../components/Layout/Hero'
import Collection from '../components/Products/Collection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import BestSeller from '../components/Products/BestSeller'
function Home() {
  return (
    <div>
        <Hero/>
        <Collection/>
        <NewArrivals/>
        <BestSeller/>
        <ProductDetails/>
    </div>
  )
}

export default Home