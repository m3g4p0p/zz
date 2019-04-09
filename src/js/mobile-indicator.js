export class MobileIndicator {
  get isVisible () {
    return window
      .getComputedStyle(this.inicator)
      .getPropertyValue('display') !== 'none'
  }

  constructor () {
    this.inicator = document.getElementById('mobile-indicator')
  }
}
