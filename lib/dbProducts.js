import clientPromise from "./mongodb";

export async function getProducts(sort, filters, limit=50) {
  try {
    const client = await clientPromise;
    const db = client.db("eCommerce")
    console.log(buildSortQuery(sort))

    const data = await db
        .collection("products")
        .find(buildFiltersQuery(filters))
        .limit(limit)
        .sort(buildSortQuery(sort))
        .toArray()


        return JSON.parse(JSON.stringify(data))
  } catch (e) {
      console.error(e)
  }
}


function buildSortQuery(sort) {
  let sortQuery
  switch(sort) {
    case '':
      sortQuery = {}
      break
    case 'priceHigh':
      sortQuery = {price: -1}
      break
    case 'priceLow':
      sortQuery = {price: 1}
      break
    default:
      sortQuery = {[sort]: -1}
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
    } else if (Array.isArray(filters[key]) && !/\$/.test(key)) {
      if (filters[key].length) {
        queryArray.push({ [key]: { $in: filters[key] } })
      }
    } else {
      queryArray.push({ [key]: filters[key] })
    }
  }  
  
  console.log(queryArray)
  if (queryArray.length) {
    return { $and: queryArray }
  } else {
    return {}
  }
}
