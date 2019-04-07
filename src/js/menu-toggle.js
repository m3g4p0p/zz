export class MenuToggle {
  get isStacked () {
    return window.getComputedStyle(this.menu).getPropertyValue('flex-direction') === 'column'
  }

  constructor () {
    this.toggle = document.getElementById('menu-toggle')
    this.menu = document.getElementById('menu')
  }

  init () {
    this.toggle.addEventListener('click', this)
  }

  handleEvent (event) {
    if (this.isStacked) {
      event.preventDefault()
      this.menu.classList.toggle('menu--collapsed')
    }
  }
}
