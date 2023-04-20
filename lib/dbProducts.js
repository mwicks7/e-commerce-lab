import clientPromise from "./mongodb";

const categoryData = [
  {
    "name": "Planets",
    "slug": "planets",
    "url": "/categories/planets",
    "sorts": [
      {value: "filters.distanceFromSun", name: "Distance From Sun"},
      {value: "filters.surfaceArea", name: "Surface Area"},
      {value: "priceHigh" , name: "Price - high to low"},
      {value: "priceLow", name: "Price - low to high" },
    ],
    "filters": [
      { includePluto: false },
      { type: [] }
    ]
  },
  {
    "name": "Galaxies",
    "slug": "galaxies",
    "url": "/categories/planets",
  },
  {
    "name": "Constellations",
    "slug": "constellations",
    "url": "/categories/planets",
  }
]


export async function getProducts(sort='filters.distanceFromSun', filters) {
  function sanatizeSort(sort) {
    let sortObject
    switch(sort) {
      case 'priceHigh':
        sortObject = {price: -1}
        break
      case 'priceLow':
        sortObject = {price: 1}
        break
      case 'filters.surfaceArea':
        sortObject = {[sort]: -1}
        break
      default:
        sortObject = {[sort]: -1}      
    }
    return sortObject
  }
  

  try {
    const client = await clientPromise;
    const db = client.db("eCommerce")
    const data = await db
        .collection("products")
        .find({})
        .sort(sanatizeSort(sort))
        .toArray()
    
    return JSON.parse(JSON.stringify(data))
  } catch (e) {
      console.error(e)
  }
}

// export function getProducts(sort='filters.distanceFromSun', filters) {
//   let products = productData

//   products.sort((a, b) => {
//     return a.filters[sort] > b.filters[sort] ? 1 : -1
//   })

//   return productData
// }

export function getCategories() {
  return categoryData
}

export function getCategory(slug) {
  return categoryData.filter(cat => cat.slug === slug)
}