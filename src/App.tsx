import { GallerySection } from './components/sections/GallerySection'
import { HeatSelector } from './components/sections/HeatSelector'
import { Hero } from './components/sections/Hero'
import { ReviewsSection } from './components/sections/ReviewsSection'
import { SignatureDishes } from './components/sections/SignatureDishes'
import { StorySection } from './components/sections/StorySection'

function App() {
  return (
    <main>
      <Hero />
      <SignatureDishes />
      <HeatSelector />
      <StorySection />
      <GallerySection />
      <ReviewsSection />
    </main>
  )
}

export default App
