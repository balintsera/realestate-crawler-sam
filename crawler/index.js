const DOMCrawler = require('./src/service/dom-crawler')
const urls = require('./src/config/urls.js')
const RealEstateGateway = require('./src/table-data-gateway/real-estate-gateway')

exports.handler = async (event, context) => {
  const crawler = new DOMCrawler(urls)
  const results = await crawler.start()
  console.log("crawler results", results)
  results.forEach(async realEstate => {
    await RealEstateGateway.insert(realEstate)
  })

  console.log("all saved");
}



