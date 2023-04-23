import Link from 'next/link'

export default function PrimaryNav({ categories, pageSlug }) {
  const fauxCategories = [...Array(10).keys()]

  return (
    <nav className="primary-nav h3">
      <ul>
        {categories.map((category, i) => (
          <li key={`${category.slug}_cat_${i}`}>
            <Link 
              className={`primary-nav__link ${category.slug === pageSlug ? 'primary-nav__link--active' : ''}`}
              href={category.url}
            >
              {category.name}
            </Link>
          </li>
        ))}
          <li>
            <Link className="primary-nav__link" href="/categories/planets">
              Category3
            </Link>
          </li>
          <li>
            <Link className="primary-nav__link" href="/categories/planets">
              Category4
            </Link>
          </li>
      </ul>
    </nav>
  )
}