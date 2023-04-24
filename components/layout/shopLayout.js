import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import PrimaryNav from '@/components/layout/primaryNav'

const inter = Inter({ subsets: ['latin'] })

export default function ShopLayout({ children, categories }) {
  const [toggleNav, setToggleNav] = useState(false)


  return (
    <div className={`app ${inter.className}`}>
      <header className="header">
        <div className="container">
          <div className="flex">
            <div className="flex__col--3 flex__col--align-center">
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

            <div className="flex__col--6">
              <div className="logo">
                <Link href="/">
                  <Image src="/images/astro_logo2.png" alt="Logo" width={140} height={34}/>
                </Link>
              </div>
            </div>
            
            <div className="flex__col--3 flex__col--align-center text--align-right ">
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
          />
        </div>        
      </header>

      <div className={`drawer ${toggleNav ? 'drawer--open' : ''}`}>
        <PrimaryNav 
          categories={categories} 
        />
      </div>

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
          </ul>
        </div>
      </footer>
    </div>
  )
}