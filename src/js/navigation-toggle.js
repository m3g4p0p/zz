import { MobileIndicator } from './mobile-indicator'
import { chainFrame } from './dom-util'

const CLASS_COLLAPSED = 'navigation--collapsed'
const CLASS_ANIMATING = 'navigation--animating'

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
    switch (event.type) {
      case 'click':
        this.handleClick(event)
        break

      case 'transitionend':
        this.handleTransitionend(event)
        break

      default:
        // Do nothing
    }
  }

  handleClick (event) {
    if (this.mobileIndicator.isVisible) {
      event.preventDefault()
    }

    if (!this.isAnimating) {
      this.toggleMenu()
    }
  }

  handleTransitionend () {
    if (event.target === this.navigation) {
      return this.endAnimation()
    }
  }

  toggleMenu () {
    this.startAnimation().then(() => this.isCollapsed
      ? this.collapse().then(() => this.expand())
      : this.expand().then(() => this.collapse())
    )
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

  startAnimation () {
    return chainFrame(() => {
      this.isAnimating = true
      this.navigation.classList.add(CLASS_ANIMATING)
      this.navigation.addEventListener('transitionend', this)
    })
  }

  endAnimation () {
    return chainFrame(() => {
      this.isAnimating = false
      this.navigation.style.height = ''
      this.navigation.classList.remove(CLASS_ANIMATING)
      this.navigation.removeEventListener('transitionend', this)
    })
  }
}
