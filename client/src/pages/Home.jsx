import About from '../components/About'
import Gallery from '../components/Gallery'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div className="space-y-10">
      <Hero />
      <Gallery />
      <About />
    </div>
  )
}

export default Home
