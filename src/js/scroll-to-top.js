import { isIntersecting } from './util'

export class ScrollToTop {
  constructor () {
    this.link = document.getElementById('scroll-to-top')
  }

  init () {
    new IntersectionObserver(entries => {
      this.toggleActive(
        entries.some(isIntersecting)
      )
    }).observe(this.link)

    this.link.addEventListener('click', this)
  }

  toggleActive (isActive) {
    this.link.classList.toggle('footer__scroll-to-top--active', isActive)
  }

  handleEvent (event) {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

new ScrollToTop().init()
