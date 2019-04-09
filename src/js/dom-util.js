export const chainFrame = callback =>
  new Promise(resolve =>
    window.requestAnimationFrame(now =>
      resolve(callback ? callback(now) : now)
    )
  )
