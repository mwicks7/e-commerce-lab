import { useState, useCallback, useEffect, useRef } from 'react'
import { getCategories } from '@/lib/dbCategories'
import { getProducts } from '@/lib/dbProducts'
import ShopLayout from '@/components/layout/shopLayout'
import Breadcrumbs from '@/components/global/breadcrumbs'
import Gallery from '@/components/global/gallery'
import ProductsGrid from '@/components/category/productsGrid'
import { mapFilters } from '@/lib/filterMap'

export default function ProductsPage({ categories, product }) {
  const [relatedProducts, setRelatedProducts] = useState([])
  const details = mapFilters(product, 'preview')

  useEffect(() => {
      fetchRelatedProducts(product)
  }, [product])

  const fetchRelatedProducts = (product) => {
    fetch('/api/products', { 
      method: 'POST',
      body: JSON.stringify({
        sort: '',
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

      <div className="container container--padded">
        <div className="flex">
          <section className="flex__col--fluid">
            <Gallery
              images={product.images}
              height={1000}
              width={1000}
            />
          </section>
          
          <section className="flex__col--right-aside">
            <h1 className="h1">{product.name}</h1>
            <p>${product.price.toLocaleString("en-US")}</p>
            <p>{product.description}</p>

            {details.map(d => (
              <p key={d.name + d.value + '_detail'}>
                <b>{d.label}</b>: {d.value} {d.units}
              </p>
            ))}

            <div className="p">
              <button 
                onClick={() => alert('Add to cart')} 
                className="button"
              >
                Add to cart
              </button>
            </div>
          </section>
        </div>  
      </div>

      <div className="container container--padded">
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