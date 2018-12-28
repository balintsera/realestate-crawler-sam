const DOMCrawler = require('./src/service/dom-crawler')
const urls = require('./src/config/urls.js')
const RealEstateGateway = require('./src/table-data-gateway/real-estate-gateway')

exports.handler = async (event, context) => {
  const crawler = new DOMCrawler(urls)
  const results = await crawler.start()
  console.log("crawler results num: " + results.length)
  try {
    await RealEstateGateway.batchInsert(results)
  } catch(error) {
    console.error("Error batch inserting real estates", error)
  }

  console.log("all saved");
}



