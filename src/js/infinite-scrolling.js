import wp from './wp'
import { tap, removeElement, getValue, isIntersecting, sanitize } from './util'

/**
 * Handles infinite scrolling
 *
 * @todo Abstract away tease specific logic
 */
export class InfiniteScrolling {
  constructor () {
    this.template = document.querySelector('.js-tease-template')
    this.container = document.querySelector('.js-tease-container')
    this.loadicator = document.querySelector('.js-tease-loadicator')
    this.pageSize = this.container.children.length
    this.currentPage = 1
    this.totalPages = Infinity
    this.isLoading = false
  }

  init () {
    const { parentNode, nextSibling } = this.container

    const sentinel = parentNode.insertBefore(
      document.createElement('div'),
      nextSibling
    )

    new IntersectionObserver((entries, observer) => {
      if (entries.some(isIntersecting)) {
        this.loadPosts(observer)
      }
    }).observe(sentinel)
  }

  toggleLoading (isLoading) {
    this.isLoading = isLoading
    this.loadicator.classList.toggle('loadicator--active', isLoading)
  }

  populateCategories (tease, post) {
    const categories = tease.querySelector('.js-tease-categories')

    if (!categories) {
      return
    }

    const term = getValue(
      '_embedded',
      'wp:term',
      0
    )(post)

    if (!term) {
      return removeElement(categories)
    }

    term.map(({ name, link }) => Object.assign(
      document.createElement('a'),
      { textContent: name, href: link }
    )).forEach(link => categories.appendChild(link))
  }

  setThumbnail (tease, post) {
    const thumbnail = tease.querySelector('.js-tease-thumbnail')

    const thumbnailSrc = getValue(
      '_embedded',
      'wp:featuredmedia',
      0,
      'media_details',
      'sizes',
      'thumbnail',
      'source_url'
    )(post)

    if (!thumbnailSrc) {
      return removeElement(thumbnail)
    }

    thumbnail.querySelector('img').src = thumbnailSrc
  }

  appendPost (post) {
    const tease = document.importNode(this.template, true).content
    const item = document.createElement('li')
    const title = tease.querySelector('.js-tease-title')
    const excerpt = tease.querySelector('.js-tease-excerpt')

    this.populateCategories(tease, post)
    this.setThumbnail(tease, post)

    title.href = post.link
    title.textContent = sanitize(post.title.rendered)
    excerpt.innerHTML = sanitize(post.excerpt.rendered)

    item.appendChild(tease)
    this.container.insertBefore(item, this.loadicator)
  }

  loadPosts (observer) {
    if (this.isLoading) {
      return
    }

    if (this.currentPage >= this.totalPages) {
      return observer.disconnect()
    }

    this.toggleLoading(true)
    this.currentPage++

    wp
      .posts()
      .perPage(this.pageSize)
      .page(this.currentPage)
      .embed()
      .then(tap(({ _paging }) => {
        this.totalPages = _paging.totalPages
      }))
      .then(posts => posts.forEach(post => this.appendPost(post)))
      .finally(() => this.toggleLoading(false))
  }
}

new InfiniteScrolling().init()
