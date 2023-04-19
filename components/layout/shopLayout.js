import { Inter } from 'next/font/google'
import Image from 'next/image'
import PrimaryNav from '@/components/layout/primaryNav'

const inter = Inter({ subsets: ['latin'] })

export default function ShopLayout({ children, categories }) {
  return (
    <div className={inter.className}>
      <header className="header">
        <div className="logo">
          <Image src="/next.svg" alt="Logo" width={200} height={100}/>
        </div>

        <PrimaryNav categories={categories}/>
      </header>

      <main>
        {children}
      </main>

      <footer>

      </footer>
    </div>
  )
}