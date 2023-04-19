import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { getProducts, getCategories } from '@/lib/dbProducts'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(context) {
  const products = await getProducts()
  const categories = await getCategories()
  
  return {
    props: { categories, products }, // will be passed to the page component as props
  }
}

export default function Home({ categories, products }) {
  const filterBtns = [...Array(5)]

  return (
    <div className={inter.className}>
      <header className="header">
        <div className="logo">
          <Image src="/next.svg" alt="Logo" width={200} height={100}/>
        </div>

        <nav className="primary-nav">
          <ul>
            <li><Link href="/">Planets</Link></li>
            <li><Link href="/">Galaxies</Link></li>
            <li><Link href="/">Constellations</Link></li>
          </ul>
        </nav>
      </header>
       
      <main>
        <section className="hero">
          <h1>Buy Planets!</h1>
          <div></div>
        </section>

        <section className="secondary-nav container">
          <div className="breadcrumbs">
            <Link href="#">Home</Link> 
            &nbsp;&gt; Planets
          </div>
          <div className="sort align-right">
            <b>SORT</b> &nbsp;
            <select className="sort__input">
              <option value="option1">Price - high to low</option>
              <option value="option1">Price - low to high</option>
              <option value="option1">Mass</option>
              <option value="option1">Distance</option>
            </select>
          </div>
        </section>

        <div className="container container--main">
          <div className="grid">
            <aside className="grid__aside">

              <section className="filters">
                <b>FILTERS</b>
                <fieldset className="filter">
                  <legend>Elements</legend>
                  <ul className="filter__btn-list">
                    <li className="filter__btn-item">
                      <button className="filter__btn filter__btn--active">C</button>
                    </li>
                    {filterBtns.map((filter, i) => (
                      <li key={i} className="filter__btn-item">
                        <button className="filter__btn">CH4</button>
                      </li>
                    ))}
                  </ul>
                </fieldset>
                <fieldset className="filter">
                  <legend>Mass</legend>
                  <input className="filter__input" type="range" id="mass" name="mass" min="0" max="11" />
                </fieldset>
                <fieldset className="filter">
                  <legend>Distance</legend>
                  <input className="filter__input" type="range" id="mass" name="mass" min="0" max="11" />
                </fieldset>
              </section>

            </aside>

            <div className="grid__main">
              <section className="products">
                {products.map((product, i) => (
                  <div className="product" key={i}>
                    <Link href="#">
                      <Image 
                        className="product__image" 
                        src={product.images[0]} 
                        alt="" 
                        width={200} 
                        height={300}   
                      />
                    </Link>
                    <ul className="product__swatches">
                      <li className="product__swatch">
                        <button className="product__swatch-btn product__swatch-btn--active"></button>
                      </li>
                      <li className="product__swatch">
                        <button className="product__swatch-btn"></button>
                      </li>
                    </ul>
                    <div className="product__name">
                      <Link href="#">{product.name}</Link>
                    </div>
                    <div className="product__price">${product.price}</div>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </main>

      <footer>

      </footer>
    </div>
  )
}
