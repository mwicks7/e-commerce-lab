import clientPromise from "./mongodb";

export async function getProducts(sort, filters, limit=50) {
  try {
    const client = await clientPromise;
    const db = client.db("eCommerce")

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

export async function getRelatedProducts(product, limit=4) {
  try {
    const client = await clientPromise;
    const db = client.db("eCommerce")
    const data = await db
        .collection("products")
        .find({
          '$and': [
            { slug: { $not: { $eq: product.slug} }},
            { 'filters.type': product.type }
          ]
        })
        .limit(limit)
        .toArray()

    const productCount = data.length

    if (productCount === limit) {
      return JSON.parse(JSON.stringify(data))
    }
    
    const data2 = await db
      .collection("products")
      .find({
        '$and': [
          { slug: { $not: { $eq: product.slug} }},
          { 'filters.type': { $not: { $eq: product.type} }},
          { category: product.category }
        ]
      })
      .limit(limit - productCount)
      .toArray()

    return JSON.parse(JSON.stringify([...data, ...data2]))
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
  
  if (queryArray.length) {
    return { $and: queryArray }
  } else {
    return {}
  }
}
