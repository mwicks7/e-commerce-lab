import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import ShopLayout from '@/components/layout/shopLayout'
import CartItems from '@/components/cart/cartItems'
import CartSubtotal from '@/components/cart/cartSubtotal'
import { getCategories } from '@/lib/dbCategories'
import { getCart } from '@/lib/dbCarts'

export default function CartPage({ categories, cart }) {
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
              <CartSubtotal cart={cart}/>
            </div>
            
            <div className="flex__col--fluid">
              <CartItems cart={cart} />
            </div>
          </div>
        </section>
      </div>

    </ShopLayout>
  )
}

export async function getServerSideProps({ params }) {
  // Products
  const cart = await getCart('a1')

  // Categories
  const categoriesRes = await getCategories()
  const categories = {
    current: { slug: '' },
    nav: categoriesRes
  }

  return {
    props: { 
      categories, 
      cart: cart[0],
      key: 'cart_page'
    },
  }
}