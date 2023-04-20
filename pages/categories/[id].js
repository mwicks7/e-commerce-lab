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
  const categories = getCategories()
  const currentCat = ''
  console.log(context)
  
  return {
    props: { categories, productData },
  }
}


export default function Home({ categories, productData }) {
  const [products, setProducts] = useState(productData)
  
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
      categories={categories}> 
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
          options={categories[0].sorts}
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
