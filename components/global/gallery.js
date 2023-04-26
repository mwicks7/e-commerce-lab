import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Gallery({ images, height, width, url, alt }) {
  const [activeImage, setActiveImage] = useState(images[0])

  const handleThumbClick = (e) => {
    const url = e.target.style.backgroundImage.match(/"(.*)"/)[1]
    setActiveImage(url)
  }

  return (
    <div className="gallery">
      
      {url &&
        <Link href={url}>
          <Image 
            className="gallery__image" 
            src={activeImage} 
            alt={alt} 
            width={height}
            height={width}   
          />
        </Link>
      }

      {!url &&
        <Image 
          className="gallery__image" 
          src={activeImage} 
          alt={alt}
          width={height}
          height={width}   
        />
      }

      <ul className="gallery__thumbs">
        {images.map((image, i) => (
          <li 
            key={`${image}_thumb_${i}`} 
            className="gallery__thumb"
          >
            <button 
              disabled={activeImage === image ? true : false}
              className={`gallery__thumb-btn ${activeImage === image && "gallery__thumb-btn--active"}`} 
              style={{backgroundImage: `url(${image})`}}
              onClick={handleThumbClick}
              aria-label="View alternate image"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}