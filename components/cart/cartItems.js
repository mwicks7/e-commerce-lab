import Image from 'next/image'
import { useRouter } from 'next/router'

export default function CartItems({ cart, variant='' }) {
  const router = useRouter()

  const removeProduct = async (cartId, productId) => {
    await fetch('/api/carts', {
      method: 'PATCH',
      body: JSON.stringify({
        cartId: cartId,
        productId: productId
      })
    })
    
    router.reload(window.location.pathname)
  }

  return (
    <section>
      <h2>Items ({cart.products.length})</h2>
      <ul className="cart-items">
        {cart.products.map(product => (
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
                <button>
                  <Image src="/images/delete.svg" height={25} width={25} alt="Remove item from cart" onClick={() => removeProduct(cart.cartId, product._id)}/>
                  </button>
              </div>
            }
          </li>
        ))}
      </ul>
    </section>
  )
}