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
      callback (error, res, done) {
        console.log("uri", res.options.uri)
        if (error) {
          done()
        } else {
          const $ = res.$
          console.log("res", res)

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
      this.crawler.on('error', () => {
        reject()
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
