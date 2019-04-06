import { isIntersecting, isValueEqual } from './util'

export class ScrollToTop {
  constructor () {
    this.link = document.getElementById('scroll-to-top')
    this.header = document.getElementById('header')
  }

  filterEntries (entries, target) {
    return entries.filter(isValueEqual('target', target))
  }

  init () {
    const observer = new IntersectionObserver(entries => {
      this.toggleActive(
        this.filterEntries(entries, this.link).every(isIntersecting)
      )
    })

    observer.observe(this.header)
    observer.observe(this.link)
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
