import { getRelatedProducts } from '@/lib/dbProducts'

export default async function handler(req, res) {
  const requestData = JSON.parse(req.body)
  const responseData = await getRelatedProducts(requestData.product, requestData.limit)
  res.status(200).json(responseData)
}


