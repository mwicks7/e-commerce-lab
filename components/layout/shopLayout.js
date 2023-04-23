import { Inter } from 'next/font/google'
import Image from 'next/image'
import { useState } from 'react'
import PrimaryNav from '@/components/layout/primaryNav'

const inter = Inter({ subsets: ['latin'] })

export default function ShopLayout({ children, categories, pageSlug }) {
  const [toggleNav, setToggleNav] = useState(false)


  return (
    <div className={`app ${inter.className}`}>
      <header className="app__header">
        <div className="container grid">
          <div className="grid__col-4">
            <button 
              className="app__menu-btn app__menu-btn--nav"
              onClick={() => setToggleNav((prev) => !prev)}
            >
              <Image 
                src={'/images/menu.svg'} 
                height={30} 
                width={30} 
                alt="Open navigation"
              />
            </button>
          </div>

          <div className="grid__col-4">
            <div className="logo">
              <Image src="/images/astro_logo2.png" alt="Logo" width={140} height={100}/>
            </div>
          </div>
          
          <div className="grid__col-4 align-right">
            <button 
              className="app__menu-btn app__menu-btn--cart"
              onClick={() => alert('Open cart')}
            >
              <Image 
                src={'/images/local_atm.svg'} 
                height={30} 
                width={30} 
                alt="Open cart"
              />
            </button>
          </div>
        
        </div>
        <PrimaryNav 
          categories={categories} 
          pageSlug={pageSlug}  
        />
      </header>

      <div className={`drawer ${toggleNav ? 'drawer--open' : ''}`}>
        <PrimaryNav 
          categories={categories} 
          pageSlug={pageSlug}  
        />
      </div>

      <main className="app__main">
        {children}
      </main>

      <footer className="app__footer">
        <div className="container">
          <h4>Space Links</h4>
          <ul>
            <li>nasa.gov</li>
            <li>wikipedia</li>
          </ul>
        </div>
      </footer>
    </div>
  )
}