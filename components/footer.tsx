import Container from './container'

const Footer = () => {
  return (
    <footer data-testid="footer" id="footer" className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Contact me.
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="mailto:carter.capocaccia@gmail.com"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              carter.capocaccia@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=capocaccia"
              target="_blank"
              rel="noreferrer"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
