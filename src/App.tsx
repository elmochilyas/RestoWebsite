import { GallerySection } from './components/sections/GallerySection'
import { HeatSelector } from './components/sections/HeatSelector'
import { Hero } from './components/sections/Hero'
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
    </main>
  )
}

export default App
