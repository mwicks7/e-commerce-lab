import Link from 'next/link'

export default function CartSubtotal({ products, variant }) {
  const subtotal = products.reduce((mem, product) => {
    return mem + product.price
  }, 0)
  const tax = Math.round(subtotal * .07)
  const total = subtotal + tax

  return (
    <section>
      <p><b>Subtotal:</b> ${subtotal.toLocaleString("en-US")}</p>
      <p><b>Tax:</b> ${tax.toLocaleString("en-US")}</p>
      <p><b>Total:</b> ${total.toLocaleString("en-US")}</p>

      {variant === 'mini' &&
        <p>
          <Link className="button" href="/cart">View Cart</Link>
        </p>
      }

      <p>
        <button className="button" onClick={() => alert('Go to checkout')}>Checkout</button>
      </p>
    </section>
  )
}