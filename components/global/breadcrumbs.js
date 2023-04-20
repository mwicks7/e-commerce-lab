import Link from 'next/link'

export default function Breadcrumbs({links=[], currentPageName}) {
  return (
    <div className="breadcrumbs">
      {links.map((link, i) => (
        <span key={'crumb_' + i}>
          <Link 
            href={link.href}
            className="breadcrumb-link"
          >
            {link.text}
          </Link> 
          &nbsp;&gt;&nbsp;
        </span>
      ))}
      {currentPageName}
    </div>
  )
}