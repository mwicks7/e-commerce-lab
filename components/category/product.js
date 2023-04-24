import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Gallery from '@/components/global/gallery'

export default function Product({ product }) {
  const productUrl = `/products/${product.slug}`
  
  return (
    <article className="product">
      <Gallery 
        images={product.images}
        url={productUrl}
        height={300}
        width={300}
      />

      <h3 className="product__name"><Link href={productUrl}>{product.name}</Link></h3>
      <div className="product__price">${product.price.toLocaleString("en-US")}.00</div>
      <div className="product__price">Distance from sun: {product.filters.distanceFromSun}</div>
      <div className="product__price">Surface area: {product.filters.surfaceArea}</div>
      <div className="product__price">Type: {product.filters.type}</div>
    </article>
  )
}