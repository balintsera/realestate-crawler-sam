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
      rotateUA: true,
      userAgent: [
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.1 Safari/605.1.15',
        'Mozilla/5.0 (Linux; U; Android 2.2) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
        'Mozilla/5.0 (Windows NT 5.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
      ],
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
          done()
          return
        }

        // this is where actual crawling happens
        _self._extractFlats(res.$, res.options.parentSelector, res.options.selectors, res.options.uri, done)
        console.log(`Request to ${res.options.uri} extraction success, current results length: ${_self.results.length}`)
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

  _extractFlats ($, parentSelector, selectors, baseURL, done) {
    const $flats = $(parentSelector)
    const _self = this
    $flats.each(function ($flat) {
      const extractor = new RealEstateExtractor($(this), selectors, baseURL)
      _self.results.push(extractor.extract())
    })
    done()
  }
}

module.exports = DOMCrawler
