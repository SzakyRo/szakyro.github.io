import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Focus } from './components/Focus'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Now } from './components/Now'
import { Rabbit } from './components/Rabbit'
import { ScrollProgress } from './components/ScrollProgress'
import { Section } from './components/Section'
import { Skills } from './components/Skills'
import { Writing } from './components/Writing'

const currentYear = new Date().getFullYear()

function App() {
  return (
    <div className="min-h-screen flex flex-col grid-drift">
      <ScrollProgress />
      <Nav />
      <main
        id="main"
        className="mx-auto w-full max-w-3xl px-5 md:px-8 pt-2 pb-16 flex-1"
      >
        <Hero />

        <Section id="now" index="§ 01" prompt="cat ./now.md" title="Now">
          <Now />
        </Section>

        <Section id="focus" index="§ 02" prompt="ls ./work/" title="What I work on">
          <p className="text-fg/90 leading-relaxed max-w-prose mb-8">
            Current areas of responsibility at Bitdefender, kept at the level of
            what I own rather than the specifics of any internal system.
          </p>
          <Focus />
        </Section>

        <Section id="experience" index="§ 03" prompt="who -a" title="Experience">
          <Experience />
        </Section>

        <Section id="skills" index="§ 04" prompt="compgen -c | sort -u" title="Skills & tools">
          <Skills />
        </Section>

        <Section id="writing" index="§ 05" prompt="ls ./writing/" title="Writing">
          <Writing />
        </Section>

        <Section id="education" index="§ 06" prompt="id -Gn" title="Education & certifications">
          <Education />
        </Section>

        <Section id="contact" index="§ 07" prompt="echo $CONTACT" title="Contact">
          <Contact />
        </Section>

        <Rabbit />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto w-full max-w-3xl px-5 md:px-8 py-6 text-mono text-muted text-xs flex flex-wrap items-center justify-between gap-3">
          <span>© {currentYear} Liviu Gelca</span>
          <span>built with vite + react + tailwind · deployed via github pages</span>
        </div>
      </footer>
    </div>
  )
}

export default App
