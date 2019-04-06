import wp from './wp'
import { toObject, tap, removeElement, getValue } from './util'

const ELEMENT_IDS = ['template', 'sentinel', 'container']
const isIntersecting = ({ isIntersecting }) => isIntersecting

export class InfiniteScrolling {
  constructor ({ template, sentinel, container }) {
    new IntersectionObserver(entries => {
      if (entries.some(isIntersecting)) {
        this.loadPosts()
      }
    }).observe(sentinel)

    this.template = template
    this.container = container
    this.pageSize = container.children.length
    this.currentPage = 1
    this.totalPages = Infinity
    this.isLoading = false
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

  loadPosts () {
    if (this.isLoading || this.currentPage >= this.totalPages) {
      return
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

export const initInfiniteScrolling = prefix => {
  const elements = ELEMENT_IDS.reduce((result, current) => Object.assign(result, {
    ...toObject(current, document.getElementById(`${prefix}-${current}`))
  }), {})

  return (
    Object.keys(elements).length === ELEMENT_IDS.length
  ) && new InfiniteScrolling(elements)
}
