import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function Product({ product }) {
  const [activeImage, setActiveImage] = useState(product.images[0])
  const productUrl = `/products/${product.slug}`

  const handleSwatchClick = (e) => {
    const url = e.target.style.backgroundImage.match(/"(.*)"/)[1]
    setActiveImage(url)
  }

  return (
    <div className="product">
      <Link href={productUrl}>
        <Image 
          className="product__image" 
          src={activeImage} 
          alt="" 
          width={300} 
          height={300}   
        />
      </Link>
      <ul className="product__swatches">
        {product.images.map((image, i) => (
          <li key={`${product.name}_swatch_${i}`} className="product__swatch">
            <button 
              className={`product__swatch-btn ${activeImage === image && "product__swatch-btn--active"}`} 
              style={{backgroundImage: `url(${image})`}}
              onClick={handleSwatchClick}>
            </button>
          </li>
        ))}
      </ul>
      <h3 className="product__name"><Link href={productUrl}>{product.name}</Link></h3>
      <div className="product__price">${product.price.toLocaleString("en-US")}.00</div>
      <div className="product__price">Distance from sun: {product.filters.distanceFromSun}</div>
      <div className="product__price">Surface area: {product.filters.surfaceArea}</div>
      <div className="product__price">Type: {product.filters.type}</div>
    </div>
  )
}