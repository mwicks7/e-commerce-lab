import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import PrimaryNav from '@/components/layout/primaryNav'
import CartItems from '@/components/cart/cartItems'
import CartSubtotal from '@/components/cart/cartSubtotal'
import Drawer from '@/components/global/drawer'

const inter = Inter({ subsets: ['latin'] })

export default function ShopLayout({ children, categories, pageName }) {
  const [toggleNav, setToggleNav] = useState(false)
  const [toggleCart, setToggleCart] = useState(false)
  const [cartProducts, setCartProducts] = useState([])


  useEffect(() => {
      fetchCartProducts()
  }, [])

  const fetchCartProducts = () => {
    fetch('/api/products', { 
      method: 'POST',
      body: JSON.stringify({
        sort: '',
        filters: {},
        limit: 3
      })
    })
      .then( (response) => response.json() )
      .then( (data) => setCartProducts(data))
  }


  return (
    <div className={`app ${inter.className}`}>
      <header className="header">
        <div className="container">
          <div className="flex">
            <div className="flex__col--3 flex__col--align-center">
              <button 
                className="app__menu-btn app__menu-btn--nav"
                onClick={() => setToggleNav((prev) => !prev)}
                id="navDrawerTrigger"
              >
                <Image 
                  src={'/images/menu.svg'} 
                  height={30} 
                  width={30} 
                  alt="Open navigation"
                />
              </button>
            </div>

            <div className="flex__col--6">
              <div className="logo">
                <Link href="/">
                  <Image src="/images/astro_logo2.png" alt="Logo" width={140} height={34}/>
                </Link>
              </div>
            </div>
            
            {pageName !== 'Cart' && 
              <div className="flex__col--3 flex__col--align-center text--align-right ">
                <button 
                  className="app__menu-btn app__menu-btn--cart"
                  onClick={() => setToggleCart((prev) => !prev)}
                  id="cartDrawerTrigger"
                >
                  <Image 
                    src={'/images/local_atm.svg'} 
                    height={30} 
                    width={30} 
                    alt="Open cart"
                  />
                </button>
              </div>
            }
          </div>
        
          <PrimaryNav 
            categories={categories} 
          />
        </div>        
      </header>

      <Drawer 
        location="left"
        toggleState={toggleNav}
        setToggleState={setToggleNav}
        id="navDrawer"
        triggerId="navDrawerTrigger"
      >
        <PrimaryNav 
          categories={categories} 
        />
      </Drawer>
      
      {pageName !== 'Cart' && 
        <Drawer 
          location="right"
          toggleState={toggleCart}
          setToggleState={setToggleCart}
          id="cartDrawer"
          triggerId="cartDrawerTrigger"
        >
          <h2 className="h1">Cart</h2>
          <CartSubtotal products={cartProducts} variant="mini"/>
          <div className="spacer--small"></div>
          <CartItems products={cartProducts} variant="mini"/>
        </Drawer>
      }

        <main className="main">
          {children}
          <div className="spacer spacer--lrg"></div>
        </main>
        

        <footer className="footer">
          <div className="container container--padded">
            <h4>Space Links</h4>
            <ul>
              <li>nasa.gov</li>
              <li>wikipedia</li>
              <li>space.com</li>
              <li>https://esahubble.org/</li>
            </ul>
          </div>
        </footer>
      </div>
  )
}