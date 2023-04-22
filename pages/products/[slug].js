import { useState, useCallback, useEffect, useRef } from 'react'
import ShopLayout from '@/components/layout/shopLayout'
import StickyContainer from '@/components/global/stickyContainer'
import Image from 'next/image'
import Sort from '@/components/category/sort'
import Products from '@/components/category/products'
import Breadcrumbs from '@/components/global/breadcrumbs'
import Filters from '@/components/category/filters'
import { getCategories } from '@/lib/dbCategories'
import { getProduct } from '@/lib/dbProducts'

export async function getServerSideProps({ params }) {
  const productData = await getProduct(params.slug)
  const categories = await getCategories()
  const currentCat = categories.filter(cat => cat.slug === productData[0].category)[0]

  return {
    props: { 
      categories, 
      currentCat, 
      productData: productData[0],
      key: params.slug
    },
  }
}

export default function Product({ categories, currentCat, productData }) {
  return (
    <ShopLayout
      pageSlug={currentCat.slug}
      categories={categories}> 

      <StickyContainer>
        <Breadcrumbs 
          currentPageName={productData.name}  
          links={[
            {href: '/', text: 'Home'},
            {href: `/categories/${currentCat.slug}`, text: currentCat.name}
          ]}
        />
        
      </StickyContainer>

      <div className="container container--main">
        <div className="grid grid--aside-right">

          <div className="grid__main">
            <Image src={productData.images[0]} alt="" width={1000} height={1000}/>
          </div>
          
          <aside className="grid__aside grid__aside--lrg">
            <h1>{productData.name}</h1>
            <p>${productData.price.toLocaleString("en-US")}</p>
            <p>{productData.description}</p>
            {Object.entries(productData.filters).map(detail => (
              <p key={detail[0]}>
                <b>{detail[0]}</b> {detail[1]}
              </p>
            ))}
            <p><button>Add to cart</button></p>
          </aside>
        </div>
      </div>
    </ShopLayout>
  )
}
