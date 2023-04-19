import Link from 'next/link'

export default function PrimaryNav() {
  return (
    <nav className="primary-nav">
      <ul>
        <li><Link href="/">Planets</Link></li>
        <li><Link href="/">Galaxies</Link></li>
        <li><Link href="/">Constellations</Link></li>
      </ul>
    </nav>
  )
}