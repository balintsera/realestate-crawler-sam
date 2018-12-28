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
        } else {
          const $ = res.$
          console.log('res code', res.statusCode)
          if (res.statusCode !== 200 ) {
            console.error(`Request to ${res.options.uri} failed, code: ${res.statusCode}`)
            // jofogoas sends 404 with good results
            if (res.body.length < 500) {
              console.error(`Request to ${res.options.uri} failed, code: ${res.statusCode}, body is almost empty`)
              done()
            }

          }

          // this is where actual crawling happens
          const flatsExtracted = _self._extractFlats($, res.options.parentSelector, res.options.selectors)
          _self.results = _self.results.concat(flatsExtracted)
          done()
        }

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

  _extractFlats ($, parentSelector, selectors) {
    const $flats = $(parentSelector)
    const flatsExtracted = []
    $flats.each(function ($flat) {
      const extractor = new RealEstateExtractor($(this), selectors)
      flatsExtracted.push(extractor.extract())
    })
    return flatsExtracted
  }
}

module.exports = DOMCrawler
