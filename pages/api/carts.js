import { getCart, addCartItem, removeCartItem } from '@/lib/dbCarts'

export default async function handler(req, res) {
  const requestData = JSON.parse(req.body)
  let responseData
  if (req.method === 'PATCH') {
    responseData = await removeCartItem(requestData.cartId, requestData.productId)
  } else if (requestData.product) {
    responseData = await addCartItem(requestData.cartId, requestData.product)
  } else {
    responseData = await getCart(requestData.cartId)
  }

  console.log(responseData)
  res.status(200).json(responseData)
}


