import { useState } from 'react'
import Product from '@/components/category/product'

export default function Products({ products }) {  
  return (
    <section className="products">
      <div className="products__grid">
        {products.map((product, i) => (
          <Product key={`${product.name}_product_${i}`} product={product} />
        ))}
      </div>
    </section>
  )
}