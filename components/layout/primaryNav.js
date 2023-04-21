import Link from 'next/link'

export default function PrimaryNav({ categories, pageSlug }) {
  return (
    <nav className="primary-nav">
      <ul>
        {categories.map((category, i) => (
          <li key={`${category.slug}_cat_${i}`}>
            <Link 
              className={category.slug === pageSlug ? 'extra-bold' : ''}
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