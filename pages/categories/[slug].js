import { useState, useCallback, useEffect, useRef } from 'react'
import ShopLayout from '@/components/layout/shopLayout'
import StickyContainer from '@/components/global/stickyContainer'
import Hero from '@/components/global/hero'
import Sort from '@/components/category/sort'
import Products from '@/components/category/products'
import Breadcrumbs from '@/components/global/breadcrumbs'
import Filters from '@/components/category/filters'
import { getProducts, getCategories } from '@/lib/dbProducts'

export async function getServerSideProps({ params }) {
  const categories = getCategories()
  const currentCat = categories.filter(cat => cat.slug === params.slug)[0]
  const productData = await getProducts()
  
  return {
    props: { categories, currentCat, productData },
  }
}


export default function Home({ categories, currentCat, productData }) {
  const [products, setProducts] = useState(productData)
  const [sortState, setSortState] = useState(currentCat.sorts[0].value)
  const [filterState, setFilterState] = useState(buildFilterState(currentCat.filters))
  const didMountRef = useRef(false)

  function buildFilterState(filters) {
    let newObject = {}
    for (let i = 0; i < filters.length; i++) {
      newObject[filters[i].name] = filters[i].value
    }
    return newObject
  }
  
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    async function fetchData() {
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
    fetchData()
  }, [sortState, filterState])


  const handleSortChange = (e) => setSortState(e.target.value)

  const handleFilterChange = useCallback((e) => {
    const name = e.target.name
    const newFilters = Object.assign({}, filterState)
  
    if (name === 'includePluto') {
      newFilters[name] = e.target.checked
    } else {
      const checkboxes = document.getElementsByName(name)
      newFilters[name] = []
      checkboxes.forEach(cb => {
        if (cb.checked) newFilters[name].push(cb.value)
      })
    }
        
    setFilterState(newFilters)
  }, [filterState])

  return (
    <ShopLayout
      categories={categories}> 
      <Hero 
        heading="Buy Planets!" 
        image=""
      />

      <StickyContainer>
        <Breadcrumbs 
          links={[
            {href: '/', text: 'Home'}
          ]}
          currentPageName="Planets"  
        />
        
        <Sort 
          options={currentCat.sorts}
          onChange={handleSortChange}  
        />
      </StickyContainer>

      <div className="container container--main">
        <div className="grid">
          <aside className="grid__aside">
            <Filters 
              fieldsets={currentCat.filters}
              onChange={handleFilterChange}
            />
          </aside>

          <div className="grid__main">
            <Products 
              products={products}
            />
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}
