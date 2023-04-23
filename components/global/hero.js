import Image from "next/image"

export default function Hero({ heading, image}) {
  return (
    <section className="hero">
      <h1 className="hero__heading h1">{heading}</h1>
      <Image 
        className="hero__image" 
        src={image.url} 
        alt={image.alt}
        width={1000}
        height={1000}
      />
      
    </section>
  )
}