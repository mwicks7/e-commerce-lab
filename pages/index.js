import { useState, useCallback, useEffect, useRef } from 'react'
import ShopLayout from '@/components/layout/shopLayout'
import Hero from '@/components/global/hero'
import ProductsGrid from '@/components/category/productsGrid'
import { getCategories } from '@/lib/dbCategories'
import { getProducts } from '@/lib/dbProducts'

export default function HomePage({ categories, planetProducts, galaxyProducts }) {
  return (
    <ShopLayout
      categories={categories}
    > 
      <Hero 
        heading="Welcome" 
        image={{
          url: '/images/products/earth1.jpg', // page.hero.url
          alt: 'Earth seen from space' // page.hero.alt
        }}
      />

      <div className="container container--padded">
        <ProductsGrid 
          heading="Shop Planets"
          products={planetProducts}
        />
      </div>

      <div className="container container--padded">
        <ProductsGrid 
          heading="Shop Galaxies"
          products={galaxyProducts}
        />
      </div>

    </ShopLayout>
  )
}

export async function getServerSideProps({ params }) {
  // Products
  const defaultFilters = {}
  const defaultSort = 'filters.distanceFromSun'
  const planetProducts = await getProducts(defaultSort, { category: 'planets', includePluto: false }, 3)
  const galaxyProducts = await getProducts(defaultSort, { category: 'galaxies' }, 3 )

  // Categories
  const categoriesRes = await getCategories()
  const categories = {
    current: { slug: '' },
    nav: categoriesRes
  }

  return {
    props: { 
      categories, 
      planetProducts,
      galaxyProducts,
      key: 'home_page'
    },
  }
}