document.querySelectorAll('.tease').forEach(tease => {
  const link = tease.querySelector('a')

  tease.addEventListener('click', ({ target }) => {
    if (target.tagName !== 'A') {
      link.click()
    }
  })
})
