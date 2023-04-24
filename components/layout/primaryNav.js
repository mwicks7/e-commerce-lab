import Link from 'next/link'

export default function PrimaryNav({ categories }) {
  const fauxCategories = [...Array(10).keys()]

  return (
    <nav className="primary-nav">
      <ul>
        {categories.nav.map((nav, i) => (
          <li key={`${nav.slug}_cat_${i}`}>
            <Link 
              className={`primary-nav__link ${nav.slug === categories.current.slug ? 'primary-nav__link--active' : ''}`}
              href={nav.url}
            >
              {nav.name}
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