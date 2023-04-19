import Link from 'next/link'

export default function Breadcrumbs({links=[], currentPageName}) {
  return (
    <div className="breadcrumbs">
      {links.map(link => (
        <>
          <Link 
            key={link.href} 
            href={link.href}
            className="breadcrumb-link"
          >
            {link.text}
          </Link> 
          &nbsp;&gt;&nbsp;
        </>
      ))}
      {currentPageName}
    </div>
  )
}