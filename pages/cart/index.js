import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import ShopLayout from '@/components/layout/shopLayout'
import CartItems from '@/components/cart/cartItems'
import CartSubtotal from '@/components/cart/cartSubtotal'
import { getCategories } from '@/lib/dbCategories'
import { getProducts } from '@/lib/dbProducts'

export default function CartPage({ categories, cartProducts }) {
  return (
    <ShopLayout
      categories={categories}
      pageName="Cart"
    > 
      <div className="container container--padded">
        <section>
          <h1>Cart</h1>
          <div className="flex">
            <div className="flex__col--left-aside">
              <CartSubtotal products={cartProducts}/>
            </div>
            
            <div className="flex__col--fluid">
              <CartItems products={cartProducts} />
            </div>
          </div>
        </section>
      </div>

    </ShopLayout>
  )
}

export async function getServerSideProps({ params }) {
  // Products
  const cartProducts = await getProducts('', {}, 3)

  // Categories
  const categoriesRes = await getCategories()
  const categories = {
    current: { slug: '' },
    nav: categoriesRes
  }

  return {
    props: { 
      categories, 
      cartProducts,
      key: 'cart_page'
    },
  }
}