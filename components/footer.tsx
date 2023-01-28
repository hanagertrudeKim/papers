import Container from './container'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t">
      <Container>
        <div className="py-5 flex flex-col">
          <h3>
            Statically Generated with Next.js.
          </h3>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
