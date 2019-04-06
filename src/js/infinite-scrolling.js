import wp from './wp'
import { tap, removeElement, getValue } from './util'

const isIntersecting = ({ isIntersecting }) => isIntersecting

export class InfiniteScrolling {
  constructor () {
    this.template = document.getElementById('tease-template')
    this.container = document.getElementById('tease-container')
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

    const featured = getValue(
      '_embedded',
      'wp:featuredmedia',
      0,
      'media_details',
      'sizes',
      'thumbnail',
      'source_url'
    )(post)

    if (!featured) {
      return removeElement(thumbnail)
    }

    thumbnail.querySelector('img').src = featured
  }

  appendPost (post) {
    const tease = document.importNode(this.template, true).content
    const item = document.createElement('li')

    this.populateCategories(tease, post)
    this.setThumbnail(tease, post)

    tease.querySelector('.js-tease-title').textContent = post.title.rendered
    tease.querySelector('.js-tease-excerpt').innerHTML = post.excerpt.rendered

    item.appendChild(tease)
    this.container.appendChild(item)
  }

  loadPosts (observer) {
    if (this.isLoading) {
      return
    }

    if (this.currentPage >= this.totalPages) {
      return observer.disconnect()
    }

    this.isLoading = true
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
      .finally(() => {
        this.isLoading = false
      })
  }
}

new InfiniteScrolling().init()
