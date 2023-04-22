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
  const defaultFilters = { category: params.slug, includePluto: false }
  const defaultSort = 'filters.distanceFromSun'
  const productData = await getProducts(defaultSort, defaultFilters )

  return {
    props: { 
      categories, 
      currentCat, 
      productData,
      key: params.slug
    },
  }
}

export default function Category({ categories, currentCat, productData }) {
  const [products, setProducts] = useState(productData)
  const [sortState, setSortState] = useState(currentCat.sorts[0].value)
  const [filterState, setFilterState] = useState(buildFilterState(currentCat.filters))
  const didMountRef = useRef(false)
  
  function buildFilterState(filters) {
    let newObject = { category: currentCat.slug }
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
      pageSlug={currentCat.slug}
      categories={categories}> 
      <Hero 
        heading={currentCat.name} 
        image={{
          url: "/images/products/venus1.jpg",
          alt: "Venus glowing red"
        }}
      />

      <StickyContainer>
        <Breadcrumbs 
          currentPageName={currentCat.name}  
          links={[
            {href: '/', text: 'Home'}
          ]}
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
            <h2 className="uppercase">Shop {currentCat.name} ({products.length})</h2>
            <Products 
              products={products}
            />
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}
