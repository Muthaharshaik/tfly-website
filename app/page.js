import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import Services from '@/components/Services'
import Process from '@/components/Process'
import WhyTFly from '@/components/WhyTFly'
import Industries from '@/components/Industries'
import Team from '@/components/Team'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Process />
        <WhyTFly />
        <Industries />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
