import Container from './container'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-28 flex flex-col">
          <h3>
            Statically Generated with Next.js.
          </h3>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
