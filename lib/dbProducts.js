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
      { 
        type: 'toggle',
        name: 'includePluto',
        label: 'Include Pluto',
        value: false 
      },
      { 
        type: 'checkbox',
        name: 'filters.type', 
        label: 'Planet Type',
        options: [
          {
            label: 'Rocky',
            value: 'Rocky'
          },
          {
            label: 'Gas Giant',
            value: 'Gas Giant'
          },
          {
            label: 'Ice Giant',
            value: 'Ice Giant'
          },
          {
            label: 'Dwarf',
            value: 'Dwarf'
          }
        ]
      }
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
      sortQuery = {[sort]: -1}      
  }
  return sortQuery
}

function buildFiltersQuery(filters) {
  let queryArray = []

  for (const key in filters) {
    if (key === 'includePluto' && filters[key] === false) {
      queryArray.push({ name: { $not: { $eq: 'Pluto' } } })
    } 
    
    if (Array.isArray(filters[key]) && filters[key].length) {
      queryArray.push({ [key]: { $in: filters[key] } })
    }
  }  
  
  if (queryArray.length) {
    return { $and: queryArray }
  } else {
    return {}
  }
}


export async function getProducts(sort='filters.distanceFromSun', filters={includePluto: false}) {
  try {
    const client = await clientPromise;
    const db = client.db("eCommerce")
    const data = await db
        .collection("products")
        .find(buildFiltersQuery(filters))
        .sort(buildSortQuery(sort))
        .toArray()
    
    return JSON.parse(JSON.stringify(data))
  } catch (e) {
      console.error(e)
  }
}

export function getCategories() {
  return categoryData
}

export function getCategory(slug) {
  return categoryData.filter(cat => cat.slug === slug)
}