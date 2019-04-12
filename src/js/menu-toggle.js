import { MobileIndicator } from './mobile-indicator'
import { chainFrame } from './dom-util'

const CLASS_COLLAPSED = 'menu--collapsed'
const CLASS_ANIMATING = 'menu--animating'

export class MenuToggle {
  get isCollapsed () {
    return this.menuWrapper.classList.contains('menu--collapsed')
  }

  constructor () {
    this.toggle = document.querySelector('.js-menu-toggle')
    this.menuWrapper = document.querySelector('.js-menu-wrapper')
    this.menu = document.querySelector('.js-menu')
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
    if (event.target === this.menuWrapper) {
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
      this.menuWrapper.style.height = this.menu.offsetHeight + 'px'
      this.menuWrapper.classList.remove(CLASS_COLLAPSED)
    })
  }

  collapse () {
    return chainFrame(() => {
      this.menuWrapper.style.height = 0
      this.menuWrapper.classList.add(CLASS_COLLAPSED)
    })
  }

  startAnimation () {
    return chainFrame(() => {
      this.isAnimating = true
      this.menuWrapper.classList.add(CLASS_ANIMATING)
      this.menuWrapper.addEventListener('transitionend', this)
    })
  }

  endAnimation () {
    return chainFrame(() => {
      this.isAnimating = false
      this.menuWrapper.style.height = ''
      this.menuWrapper.classList.remove(CLASS_ANIMATING)
      this.menuWrapper.removeEventListener('transitionend', this)
    })
  }
}
