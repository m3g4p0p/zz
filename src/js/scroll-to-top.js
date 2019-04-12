import { isIntersecting } from './util'

export class ScrollToTop {
  constructor () {
    this.link = document.querySelector('.js-scroll-to-top')
  }

  init () {
    new IntersectionObserver(entries => {
      this.toggleActive(
        entries.some(isIntersecting) &&
        window.innerHeight < document.body.clientHeight
      )
    }, {
      threshold: 1
    }).observe(this.link)

    this.link.addEventListener('click', this)
  }

  toggleActive (isActive) {
    this.link.classList.toggle('footer__scroll-to-top--active', isActive)
  }

  handleEvent (event) {
    event.preventDefault()
    window.location.hash = event.target.hash
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
