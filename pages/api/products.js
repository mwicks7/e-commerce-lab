import { getProducts } from '@/lib/dbProducts'

export default async function handler(req, res) {
  const requestData = JSON.parse(req.body)
  const responseData = await getProducts(requestData.sort)
  console.log(responseData)
  res.status(200).json(responseData)
}


