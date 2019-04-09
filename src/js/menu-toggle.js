import { MobileIndicator } from './mobile-indicator'

export class MenuToggle {
  constructor () {
    this.toggle = document.getElementById('menu-toggle')
    this.navigation = document.getElementById('navigation')
    this.menu = document.getElementById('menu')
    this.mobileIndicator = new MobileIndicator()
  }

  init () {
    this.toggle.addEventListener('click', this)
  }

  handleEvent (event) {
    if (this.mobileIndicator.isVisible) {
      event.preventDefault()
      this.menu.classList.toggle('menu--collapsed')
    }
  }
}
