import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import ShopLayout from '@/components/layout/shopLayout'
import { getCategories } from '@/lib/dbCategories'
import { getProducts } from '@/lib/dbProducts'

export default function CartPage({ categories, products }) {
  return (
    <ShopLayout
      categories={categories}
    > 
      <div className="container container--padded">
        <h1>Cart</h1>
        <div className="flex">
          <div className="flex__col--left-aside">
            <section>
              <p>Subtotal: </p>
              <p>Tax: </p>
              <p>Total: </p>
              <button className="button">Checkout</button>
            </section>
            <div className="spacer--small"></div>
          </div>
          <div className="flex__col--fluid">
            <section>
              <h2>Items (3)</h2>
              <ul className="cart-items">
                {products.map(product => (
                  <li key={product.id + "_cart-item"} className="flex flex--padded">
                    <div className="flex__col flex__col--2">
                      <Image src={product.images[0]} height={150} width={150} alt={product.name} />
                    </div>
                    <div className="flex__col flex__col--8">
                      <h3>{product.name}</h3>
                      ${product.price.toLocaleString("en-US")}.00
                    </div>
                    <div className="flex__col flex__col--2 text--align-right">
                      <button><Image src="/images/delete.svg" height={25} width={25} alt="Remove item from cart"/></button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

    </ShopLayout>
  )
}

export async function getServerSideProps({ params }) {
  // Products
  const defaultFilters = {}
  const defaultSort = 'filters.distanceFromSun'
  const products = await getProducts(defaultSort, { category: 'planets', includePluto: false }, 3)

  // Categories
  const categoriesRes = await getCategories()
  const categories = {
    current: { slug: '' },
    nav: categoriesRes
  }

  return {
    props: { 
      categories, 
      products,
      key: 'cart_page'
    },
  }
}