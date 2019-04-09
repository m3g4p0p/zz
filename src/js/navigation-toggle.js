import { MobileIndicator } from './mobile-indicator'
import { chainFrame } from './dom-util'

const CLASS_COLLAPSED = 'navigation--collapsed'

export class NavigationToggle {
  get isCollapsed () {
    return this.navigation.classList.contains('navigation--collapsed')
  }

  constructor () {
    this.toggle = document.getElementById('menu-toggle')
    this.navigation = document.getElementById('navigation')
    this.menu = document.getElementById('menu')
    this.mobileIndicator = new MobileIndicator()
    this.isAnimating = false
  }

  init () {
    this.toggle.addEventListener('click', this)
  }

  handleEvent (event) {
    if (
      event.type === 'transitionend' &&
      event.target === event.currentTarget &&
      event.target === this.navigation
    ) {
      return this.release()
    }

    if (!this.isAnimating && this.mobileIndicator.isVisible) {
      event.preventDefault()
      this.toggleMenu()
    }
  }

  toggleMenu () {
    this.isAnimating = true
    this.navigation.addEventListener('transitionend', this)

    if (this.isCollapsed) {
      this.collapse().then(() => this.expand())
    } else {
      this.expand().then(() => this.collapse())
    }
  }

  expand () {
    return chainFrame(() => {
      this.navigation.style.height = this.menu.offsetHeight + 'px'
      this.navigation.classList.remove(CLASS_COLLAPSED)
    })
  }

  collapse () {
    return chainFrame(() => {
      this.navigation.style.height = 0
      this.navigation.classList.add(CLASS_COLLAPSED)
    })
  }

  release () {
    this.isAnimating = false
    this.navigation.style.height = ''
    this.navigation.removeEventListener('transitionend', this)
  }
}
