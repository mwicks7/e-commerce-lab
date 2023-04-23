import { useState, useCallback, useEffect, useRef } from 'react'
import { getCategories } from '@/lib/dbCategories'
import { getProducts } from '@/lib/dbProducts'
import ShopLayout from '@/components/layout/shopLayout'
import Breadcrumbs from '@/components/global/breadcrumbs'
import Gallery from '@/components/global/gallery'
import ProductsGrid from '@/components/category/productsGrid'

export default function ProductsPage({ categories, product }) {
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
      fetchRelatedProducts(product)
  }, [product])

  const fetchRelatedProducts = (product) => {
    fetch('/api/products', { 
      method: 'POST',
      body: JSON.stringify({
        sort: {},
        filters: {
          slug: { $not: { $eq: product.slug} },
          $or: [
              { 'filters.type': product.filters.type },
              { category: product.category } 
          ]
        },
        limit: 3
      })
    })
      .then( (response) => response.json() )
      .then( (data) => setRelatedProducts(data))
  }

  return (
    <ShopLayout
      categories={categories}
    > 
      <div className="container">
        <Breadcrumbs 
          currentPageName={product.name}  
          links={[
            {href: '/', text: 'Home'},
            {href: `/categories/${categories.current.slug}`, text: categories.current.name}
          ]}
        />
      </div>

      <div className="divider--small"></div>

      <div className="container">
        <div className="grid grid--aside-right">
          <section className="grid__main">
            <Gallery
              images={product.images}
              height={1000}
              width={1000}
            />
          </section>
          
          <aside className="grid__aside grid__aside--lrg">
            <h1 className="h1">{product.name}</h1>
            <p>${product.price.toLocaleString("en-US")}</p>
            <p>{product.description}</p>
            {Object.entries(product.filters).map(detail => (
              <p key={detail[0]}>
                <b>{detail[0]}:</b> {detail[1]}
              </p>
            ))}
            <p>
              <button onClick={() => alert('Add to cart')} className="button">Add to cart</button>
            </p>
          </aside>
        </div>
        
        <div className="divider--med"></div>

        <ProductsGrid 
          heading="You may also like"
          products={relatedProducts}
        />
      </div>
    </ShopLayout>
  )
}

export async function getServerSideProps({ params }) {
  const productRes = await getProducts({}, { slug: params.slug }, 1)
  const categoriesRes = await getCategories()
  const categories = {
    current: categoriesRes.filter(cat => cat.slug === productRes[0].category)[0],
    nav: categoriesRes
  }
  
  return {
    props: { 
      categories, 
      product: productRes[0],
      key: params.slug
    },
  }
}