import { Header } from './components/layout/Header'
import { Footer } from './components/sections/Footer'
import { GallerySection } from './components/sections/GallerySection'
import { HeatSelector } from './components/sections/HeatSelector'
import { Hero } from './components/sections/Hero'
import { ReviewsSection } from './components/sections/ReviewsSection'
import { SignatureDishes } from './components/sections/SignatureDishes'
import { StorySection } from './components/sections/StorySection'
import { VisitSection } from './components/sections/VisitSection'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SignatureDishes />
        <HeatSelector />
        <StorySection />
        <GallerySection />
        <ReviewsSection />
        <VisitSection />
      </main>
      <Footer />
    </>
  )
}

export default App
