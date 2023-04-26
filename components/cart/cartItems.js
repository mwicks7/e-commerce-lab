import Image from 'next/image'

export default function CartItems({ products, variant='' }) {
  return (
    <section>
      <h2>Items ({products.length})</h2>
      <ul className="cart-items">
        {products.map(product => (
          <li key={product._id + "_cart-item"} className="flex flex--padded">
            <div className="flex__col flex__col--2">
              <Image src={product.images[0]} height={150} width={150} alt={product.name} />
            </div>
            <div className="flex__col flex__col--8">
              <h3>{product.name}</h3>
              ${product.price.toLocaleString("en-US")}
            </div>

            {variant !== 'mini' &&
              <div className="flex__col flex__col--2 text--align-right">
                <button><Image src="/images/delete.svg" height={25} width={25} alt="Remove item from cart"/></button>
              </div>
            }
          </li>
        ))}
      </ul>
    </section>
  )
}