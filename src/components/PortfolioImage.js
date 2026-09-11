import Image from 'next/image'
export default function PortfolioImage({ src, alt, title, className }) {
  return <div className={className}><Image src={src} alt={alt} title={title} fill sizes="(min-width: 1024px) 30vw, 100vw" style={{objectFit:'cover'}} /></div>
}
