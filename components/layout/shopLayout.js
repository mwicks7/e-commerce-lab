import { Inter } from 'next/font/google'
import Image from 'next/image'
import PrimaryNav from '@/components/layout/primaryNav'

const inter = Inter({ subsets: ['latin'] })

export default function ShopLayout({ children, categories, pageSlug }) {
  return (
    <div className={`${inter.className} app`}>
      <header className="app__header">
        <div className="logo">
          <Image src="/space_land_logo.png" alt="Logo" width={300} height={100}/>
        </div>

        <PrimaryNav categories={categories} pageSlug={pageSlug}/>
      </header>

      <main>
        {children}
      </main>

      <footer className="app__footer">
        <div className="container">
          <h2>Big ol footer</h2>
        </div>
      </footer>
    </div>
  )
}