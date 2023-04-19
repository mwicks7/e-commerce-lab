const productData = [
  {
    "name": "Mercury",
    "price": 9000000000000,
    "images": [
      "/images/products/mercury1.jpg",
      "/images/products/mercury2.jpg"
    ],
    "category": "Planets",
    "filters": {
      "distanceFromSun": 36.04, // million miles
      "mass": 0.055, // M⊕
      "surfaceArea": 28.88, // million mi²
      "orbitalPeriod": 88 // days
    }
  },
  {
    "name": "Venus",
    "price": 9000000000000,
    "images": [
      "/images/products/venus1.jpg",
      "/images/products/venus2.jpg"
    ],
    "category": "Planets",
    "filters": {
      "distanceFromSun": 67.24, 
      "surfaceArea": 177.7, 
      "orbitalPeriod": 225
    }
  },
  {
    "name": "Earth",
    "price": 9000000000000,
    "images": [
      "/images/products/earth1.jpg",
      "/images/products/earth2.jpg"
    ],
    "category": "Planets",
    "filters": {
      "distanceFromSun": 92.96,
      "surfaceArea": 196.9, 
      "orbitalPeriod": 365 
    }
  },
  {
    "name": "Mars",
    "price": 9000000000000,
    "images": [
      "/images/products/mars1.jpg",
      "/images/products/mars2.jpg"
    ],
    "category": "Planets",
    "filters": {
      "distanceFromSun": 141.6, 
      "surfaceArea": 55.91,
      "orbitalPeriod": 687 
    }
  },

  {
    "name": "Jupiter",
    "price": 9000000000000,
    "images": [
      "/images/products/jupiter1.jpg",
      "/images/products/jupiter2.jpg"
    ],
    "category": "Planets",
    "filters": {
      "distanceFromSun": 890.8, 
      "surfaceArea": 16490,
      "orbitalPeriod": 10585 
    }
  },
  {
    "name": "Uranus",
    "price": 9000000000000,
    "images": [
      "/images/products/uranus1.jpg",
      "/images/products/uranus2.jpg",
    ],
    "category": "Planets",
    "filters": {
      "distanceFromSun": 1784, 
      "surfaceArea": 3121,
      "orbitalPeriod": 30660 
    }
  },
  {
    "name": "Neptune",
    "price": 9000000000000,
    "images": [
      "/images/products/neptune1.jpg",
      "/images/products/neptune2.jpg",
    ],
    "category": "Planets",
    "filters": {
      "distanceFromSun": 2793, 
      "surfaceArea": 2941,
      "orbitalPeriod": 60225 
    }
  }
]

const categoryData = [
  {
    "name": "Planets",
    "slug": "planets",
  },
  {
    "name": "Galaxies",
    "slug": "galaxies",
  },
  {
    "name": "Constellations",
    "slug": "constellations",
  }
]

export async function getProducts() {
  return productData
}

export async function getCategories() {
  return categoryData
}