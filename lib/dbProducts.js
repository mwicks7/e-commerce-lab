import clientPromise from "./mongodb";

export async function getProducts(sort, filters, limit=50) {
  const client = await clientPromise;
  const db = client.db("eCommerce")

  try {
    const data = await db
        .collection("products")
        .find(buildFiltersQuery(filters))
        .sort(buildSortQuery(sort))
        .limit(limit)
        .toArray()
    console.log(data)
    return JSON.parse(JSON.stringify(data))
  } catch (e) {
      console.error(e)
  }
}


function buildSortQuery(sort) {
  let sortQuery
  switch(sort) {
    case 'priceHigh':
      sortQuery = {price: -1}
      break
    case 'priceLow':
      sortQuery = {price: 1}
      break
    case 'filters.surfaceArea':
      sortQuery = {[sort]: -1}
      break
    default:
      sortQuery = {}      
  }
  return sortQuery
}

function buildFiltersQuery(filters) {
  let queryArray = []

  for (const key in filters) {
    if (key === 'includePluto') {
      if (filters[key] === false) {
        queryArray.push({ name: { $not: { $eq: 'Pluto' } } })
      }
    } else if (Array.isArray(filters[key])) {
      if (filters[key].length) {
        queryArray.push({ [key]: { $in: filters[key] } })
      }
    } else {
      queryArray.push({ [key]: { $eq: filters[key] } })
    }

    console.log({ [key]: { $eq: filters[key] } })
  }  
  
  if (queryArray.length) {
    return { $and: queryArray }
  } else {
    return {}
  }
}
