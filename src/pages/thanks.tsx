import Link from 'next/link'
import SEO from '../components/SEO'
export default function Thanks() { return <main style={{position:'relative',zIndex:3,background:'#000',color:'#fff',minHeight:'100vh',display:'grid',placeContent:'center',padding:24,textAlign:'center'}}><SEO title="Message sent" /><h1>Thanks for reaching out!</h1><p>Your message has been sent.</p><Link style={{color:'#50e3c2'}} href="/">Back to portfolio</Link></main> }
