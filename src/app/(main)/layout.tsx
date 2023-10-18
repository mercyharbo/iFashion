import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import '../globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
      <Footer />
    </section>
  )
}
