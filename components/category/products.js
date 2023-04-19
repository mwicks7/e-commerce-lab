import Image from 'next/image'
import Link from 'next/link'

export default function Products({ products }) {
  return (
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
  )
}