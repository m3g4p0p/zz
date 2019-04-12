export class FormHandler {
  constructor () {
    this.form = document.querySelector('.js-contact-form')
    this.fileInputs = this.form.querySelectorAll('[type="file"]')
  }

  init () {
    this.form.addEventListener('change', this)
  }

  handleEvent (event) {
    if (event.target.type === 'file') {
      this.handleFileChange(event.target)
    }
  }

  handleFileChange (target) {
    const { maxFileSize, maxFileMessage } = target.dataset
    const isInvalid = maxFileSize && [...target.files].some(({ size }) => size > maxFileSize)

    target.setCustomValidity(isInvalid ? maxFileMessage : '')
  }
}

new FormHandler().init()
