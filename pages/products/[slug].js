import { useState, useCallback, useEffect, useRef } from 'react'
import { getCategories } from '@/lib/dbCategories'
import { getProducts } from '@/lib/dbProducts'
import ShopLayout from '@/components/layout/shopLayout'
import StickyContainer from '@/components/global/stickyContainer'
import Breadcrumbs from '@/components/global/breadcrumbs'
import Gallery from '@/components/global/gallery'
import Product from '@/components/category/product'

export async function getServerSideProps({ params }) {
  const productData = await getProducts({}, { slug: params.slug }, 1)
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

export default function Products({ categories, currentCat, productData }) {
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
      fetch(
        '/api/products', { 
        method: 'POST',
        body: JSON.stringify({
          sort: {},
          filters: {
            slug: { $not: { $eq: productData.slug} },
            $or: [
                { 'filters.type': productData.filters.type },
                { category: productData.category } 
            ]
          },
          limit: 3
        })
      })
        .then( (response) => response.json() )
        .then( (data) => setRelatedProducts(data))
  }, [productData])

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
        <section className="grid grid--aside-right">

          <div className="grid__main">
            <Gallery
              images={productData.images}
              height={1000}
              width={1000}
            />
          </div>
          
          <aside className="grid__aside grid__aside--lrg">
            <h1 className="h1">{productData.name}</h1>
            <p>${productData.price.toLocaleString("en-US")}</p>
            <p>{productData.description}</p>
            {Object.entries(productData.filters).map(detail => (
              <p key={detail[0]}>
                <b>{detail[0]}:</b> {detail[1]}
              </p>
            ))}
            <p><button className="button">Add to cart</button></p>
          </aside>
        </section>
        
        <section className="products">
          <h2>You may also like</h2>
          <div className="products__grid">
            {relatedProducts.map(rp => (
              <Product key={rp._id + 'rp'} product={rp} />
            ))}
          </div>
        </section>
      </div>
      <div className="container container--main">
      </div>
      
    </ShopLayout>
  )
}
