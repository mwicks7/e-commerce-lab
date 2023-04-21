import Link from 'next/link'

export default function PrimaryNav({ categories, pageSlug }) {
  return (
    <nav className="primary-nav">
      <ul>
        {categories.map((category, i) => (
          <li key={`${category.slug}_cat_${i}`}>
            <Link 
              className={`primary-nav__link ${category.slug === pageSlug ? 'primary-nav__link--active' : ''}`}
              href={category.slug}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}