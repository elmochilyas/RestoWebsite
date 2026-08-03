import { Button } from './components/ui/Button'
import { Container } from './components/ui/Container'
import { Eyebrow } from './components/ui/Eyebrow'

function App() {
  return (
    <main>
      <section className="bg-coal-950 text-cream">
        <Container className="flex flex-col py-24 sm:py-32 lg:py-40">
          <header className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-display text-2xl uppercase tracking-tight sm:text-3xl">
              Peri Peri Grill
            </p>
            <p className="text-eyebrow text-smoke">Design foundation · specimen</p>
          </header>

          <div className="mt-16 flex flex-col gap-10 sm:mt-24 lg:mt-32">
            <Eyebrow>Ember Noir · Agadir Bay</Eyebrow>

            <h1 className="max-w-6xl font-display text-display uppercase text-cream">
              Fresh.
              <span className="block text-peri-red">Flame-grilled.</span>
              <span className="block">Full of fire.</span>
            </h1>

            <span
              aria-hidden="true"
              className="h-1 w-24 bg-linear-to-r from-peri-red via-ember to-mustard"
            />

            <p className="max-w-md text-body text-smoke">
              Charcoal darkness, warm cream paper and fire-red punctuation — the
              visual language of a late-night grill, set like a poster.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="#menu" variant="primary" withArrow>
                Voir le menu
              </Button>
              <Button href="#story" variant="secondary">
                Notre histoire
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream text-ink">
        <Container className="flex flex-col gap-10 border-t border-line-light py-24 sm:py-32 lg:py-40">
          <Eyebrow tone="light">Charbon · Crème · Feu</Eyebrow>

          <h2 className="max-w-4xl font-display text-h2 uppercase text-ink">
            Warm paper.
            <span className="block text-peri-red">Charred edges.</span>
          </h2>

          <p className="max-w-md text-body text-ink/80">
            One flame accent against warm neutrals — the surfaces the real
            sections will live on.
          </p>

          <div>
            <Button href="#gallery" variant="inverse" withArrow>
              Découvrir
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}

export default App
