import { useState } from 'react'
import ShopLayout from '@/components/layout/shopLayout'
import StickyContainer from '@/components/global/stickyContainer'
import Hero from '@/components/global/hero'
import Sort from '@/components/category/sort'
import Products from '@/components/category/products'
import Breadcrumbs from '@/components/global/breadcrumbs'
import Filters from '@/components/category/filters'
import { getProducts, getCategories } from '@/lib/dbProducts'

export async function getServerSideProps(context) {
  const productData = await getProducts()
  const categoryData = await getCategories()
  
  return {
    props: { categoryData, productData },
  }
}

export default function Home({ categoryData, productData }) {
  const [products, setProducts] = useState(productData)
  
  const sortOptions = [
    {value: "filters.distanceFromSun", name: "Distance From Sun"},
    {value: "filters.surfaceArea", name: "Surface Area"},
    {value: "priceHigh" , name: "Price - high to low"},
    {value: "priceLow", name: "Price - low to high" },
  ]

  function handleFilterChange(e) {
    console.log(e.target)
  }
  
  async function handleSortChange(e) {
    const response = await fetch('/api/products', { 
      method: 'POST', 
      body: JSON.stringify({
        sort: e.target.value
      })
    })
    const products = await response.json()
    console.log(products)
    setProducts(products)
  }

  return (
    <ShopLayout
      categories={categoryData}> 
      <Hero 
        heading="Buy Planets!" 
        image=""/>

      <StickyContainer>
        <Breadcrumbs 
          links={[
            {href: '/', text: 'Home'}
          ]}
          currentPageName="Planets"/>
        
        <Sort 
          options={sortOptions}
          onChange={handleSortChange}/>
      </StickyContainer>

      <div className="container container--main">
        <div className="grid">
          <aside className="grid__aside">
            <Filters 
              onClick={handleFilterChange}/>
          </aside>

          <div className="grid__main">
            <Products 
              products={products}/>
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}
