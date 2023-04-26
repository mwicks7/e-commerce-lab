import Link from 'next/link'

export default function CartSubtotal({ products, variant }) {
  const subtotal = products.reduce((mem, product) => {
    return mem + product.price
  }, 0)
  const tax = Math.round(subtotal * .07)
  const total = subtotal + tax

  return (
    <section className="table">
      <table>
        <tr>
          <th>Subtotal:</th>
          <td>${subtotal.toLocaleString("en-US")}</td>
        </tr>
        <tr>
          <th>Tax:</th>
          <td>${tax.toLocaleString("en-US")}</td>
        </tr>
        <tr>
          <th>Total:</th>
          <td>${total.toLocaleString("en-US")}</td>
        </tr>
      </table>

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