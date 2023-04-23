import { useState } from 'react'
import Product from '@/components/category/product'

export default function ProductsGrid({ heading, products }) {  
  return (    
    <section className="products">
      <h2>{heading}</h2>
      <div className="products__grid">
        {products.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}