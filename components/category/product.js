import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Gallery from '@/components/global/gallery'
import { mapFilters } from '@/lib/filterMap'

export default function Product({ product }) {
  const productUrl = `/products/${product.slug}`
  const details = mapFilters(product, 'preview')

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
      {details.map(d => (
        <div key={d.name + d.value + '_detail'} className="product__detail">
          {d.label}: {d.value} {d.units}
        </div>
      ))}
    </article>
  )
}