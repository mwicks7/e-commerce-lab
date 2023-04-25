const filterMap = {
  "filters.distanceFromSun": {
    label: "Distance",
    units: "million mi"
  },
  "filters.surfaceArea": {
    label: "Surface Area",
    units: "million mi"
  },
  "filters.distanceFromEarth": {
    label: "Distance",
    units: "million light years"
  },
  "filters.moons": {
    label: "Moons",
    units: ""
  },
  "filters.orbitalPeriod": {
    label: "Orbital Period",
    units: "Earth days"
  },
  "filters.stars": {
    label: "Stars",
    units: "billion"
  },  
  "filters.magnitude": {
    label: "Magnitude",
    units: ""
  },  
  "filters.type": {
    label: 'Type',
    units: ''
  },
}


export function mapFilters(product, display) {
  let details = []

  for (const key in product.filters) {
    const filter = 'filters.' + key
    details.push({
      name: key,
      label: filterMap[filter].label,
      value: product.filters[key],
      units: filterMap[filter].units,
    })
  }

  return details
}