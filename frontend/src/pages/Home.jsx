import React from 'react'
import Hero from '../components/Layout/Hero'
import Collection from '../components/Products/Collection'
import NewArrivals from '../components/Products/NewArrivals'
function Home() {
  return (
    <div>
        <Hero/>
        <Collection/>
        <NewArrivals/>
    </div>
  )
}

export default Home