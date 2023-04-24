import { getProducts } from '@/lib/dbProducts'

export default async function handler(req, res) {
  const requestData = JSON.parse(req.body)
  // console.log(requestData)
  const responseData = await getProducts(requestData.sort, requestData.filters, requestData.limit)
  res.status(200).json(responseData)
}


