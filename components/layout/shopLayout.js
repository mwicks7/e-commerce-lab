import { Inter } from 'next/font/google'
import Image from 'next/image'
import PrimaryNav from '@/components/layout/primaryNav'

const inter = Inter({ subsets: ['latin'] })

export default function ShopLayout({ children, categories, pageSlug }) {
  return (
    <div className={`${inter.className} app`}>
      <div className="container">
        <header className="app__header">
          <div className="logo">
            <Image src="/images/astro_logo2.png" alt="Logo" width={140} height={100}/>
          </div>

          <PrimaryNav categories={categories} pageSlug={pageSlug}/>
        </header>
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