import { useState, useCallback, useEffect, useRef } from 'react'
import ShopLayout from '@/components/layout/shopLayout'
import StickyContainer from '@/components/global/stickyContainer'
import Hero from '@/components/global/hero'
import Sort from '@/components/category/sort'
import Products from '@/components/category/products'
import Breadcrumbs from '@/components/global/breadcrumbs'
import Filters from '@/components/category/filters'
import { getCategories } from '@/lib/dbCategories'
import { getProducts } from '@/lib/dbProducts'

export default function Category({ categories, productData }) {
  const category = categories.current
  const [products, setProducts] = useState(productData)
  const [sortState, setSortState] = useState(category.sorts[0].value)
  const [filterState, setFilterState] = useState(buildFilterState(category.filters))
  const didMountRef = useRef(false)
  
  
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }
    
    fetchFilteredProducts(sortState, filterState)
  }, [sortState, filterState])
  
  function buildFilterState(filters) {
    let newObject = { category: category.slug }
    for (let i = 0; i < filters.length; i++) {
      newObject[filters[i].name] = filters[i].value
    }
    return newObject
  }
  
  const fetchFilteredProducts = async (sortState, filterState) => {
    const response = await fetch('/api/products', { 
      method: 'POST', 
      body: JSON.stringify({
        sort: sortState,
        filters: filterState
      })
    })
    const products = await response.json()
    
    setProducts(products)
  }
  
  const handleSortChange = (e) => setSortState(e.target.value)

  const handleFilterChange = useCallback((e) => {
    const name = e.target.name
    const newFilters = Object.assign({}, filterState, )
    if (name === 'includePluto') {
      newFilters[name] = e.target.checked
    } else {
      const checkboxes = document.getElementsByName(name)
      newFilters[name] = []
      checkboxes.forEach(cb => {
        if (cb.checked) newFilters[name].push(cb.value)
      })
    }
    console.log(newFilters)

    setFilterState(newFilters)
  }, [filterState])

  return (
    <ShopLayout
      categories={categories}
    > 
      <Hero 
        heading={category.name} 
        image={{
          url: category.hero.url,
          alt: category.hero.alt
        }}
      />

      <StickyContainer>
        <Breadcrumbs 
          currentPageName={category.name}  
          links={[
            {href: '/', text: 'Home'}
          ]}
        />
      </StickyContainer>

      <div className="container container--main">
        <div className="grid">
          <aside className="grid__aside">
            <Sort 
              options={category.sorts}
              onChange={handleSortChange}  
            />
            
            <Filters 
              fieldsets={category.filters}
              onChange={handleFilterChange}
            />
          </aside>

          <div className="grid__main">
            <h2>Shop {category.name} ({products.length})</h2>
            <Products 
              products={products}
            />
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}

export async function getServerSideProps({ params }) {
  // Products
  const defaultFilters = { category: params.slug, includePluto: false }
  const defaultSort = 'filters.distanceFromSun'
  const productData = await getProducts(defaultSort, defaultFilters )

  // Categories
  const categoriesRes = await getCategories()
  const categories = {
    current: categoriesRes.filter(cat => cat.slug === params.slug)[0],
    nav: categoriesRes
  }

  return {
    props: { 
      categories, 
      productData,
      key: params.slug
    },
  }
}