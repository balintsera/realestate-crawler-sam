const Crawler = require('crawler')
const RealEstateExtractor = require('./real-estate-extractor')

class DOMCrawler {
  constructor (urls) {
    if (typeof urls === 'undefined') {
      throw new Error('No urls added')
    }
    this.results = []
    this.urls = urls
    const _self = this
    this.crawler = new Crawler({
      maxConnections: 10,
      // This will be called for each crawled page
      callback: function (error, res, done) {
        console.log('uri', res.options.uri)
        if (error) {
          console.error(`Request to ${res.options.uri} failed, error: ${error.message}`)
          done()
          return
        }
        // status code is not enough, jofogas sends 404 with the results. good job.
        if (res.statusCode !== 200 && res.body.length < 500) {
          console.error(`Request to ${res.options.uri} failed, code: ${res.statusCode}`)
          return
        }

        // this is where actual crawling happens
        const flatsExtracted = _self._extractFlats(res.$, res.options.parentSelector, res.options.selectors, res.options.uri)
        _self.results = _self.results.concat(flatsExtracted)
        done()
      }
    })
  }

  start () {
    return new Promise((resolve, reject) => {
      this.crawler.queue(this.urls)
      this.crawler.on('drain', () => {
        resolve(this.results)
      })
      this.crawler.on('error', err => {
        reject(err)
      })
    })



  }

  _extractFlats ($, parentSelector, selectors, baseURL) {
    const $flats = $(parentSelector)
    const flatsExtracted = []
    $flats.each(function ($flat) {
      const extractor = new RealEstateExtractor($(this), selectors, baseURL)
      flatsExtracted.push(extractor.extract())
    })
    return flatsExtracted
  }
}

module.exports = DOMCrawler
