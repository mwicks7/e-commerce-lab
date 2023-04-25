const categoryData = [
  {
    "name": "Planets",
    "slug": "planets",
    "url": "/categories/planets",
    "hero": {
      url: "/images/products/venus1.jpg",
      alt: "Venus glowing red"
    },
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
    "url": "/categories/galaxies",
    "sorts": [
      {value: "filters.distanceFromEarth", name: "Distance From Earth"},
      {value: "filters.stars", name: "Star Count"},
      {value: "priceHigh" , name: "Price - high to low"},
      {value: "priceLow", name: "Price - low to high" },
    ],
    "hero": {
      url: "/images/products/galaxy_hero.jpg",
      alt: "Andromeda"
    },
    "filters": [
      { 
        type: 'checkbox',
        name: 'filters.type', 
        label: 'Galaxy Type',
        options: [
          {
            label: 'Spiral',
            value: 'Spiral'
          },
          {
            label: 'Elliptical',
            value: 'Elliptical'
          },
          {
            label: 'Ring',
            value: 'Ring'
          }
        ]
      }
    ]
  }
]

export async function getCategories() {
  return categoryData
}

export function getCategory(slug) {
  return categoryData.filter(cat => cat.slug === slug)
}