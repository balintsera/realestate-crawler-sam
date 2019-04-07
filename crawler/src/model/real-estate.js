const uniqueString = require('unique-string')
const md5 = require('md5')
const url = require('url')

class RealEstate {
  static getTypes () {
    return {
      'forrent': 'forrent',
      'forsale': 'forsale'
    }
  }

  constructor (address, price, shortDesc, size, roomCount, foreignID, baseURL, imageURL) {
    this.id = uniqueString()
    this.address = address
    this.price = price
    this.shortDesc = shortDesc
    this.size = size
    this.roomCount = roomCount
    this.foreignID = foreignID
    this.baseURL = baseURL
    this.imageURL = imageURL
  }

  parseNumbers () {
    this.price = parseFloat(this.price)
    this.size = parseInt(this.size, 10)
    this.priceNum = this.price
    this.sizeNum = this.size
    this.roomCountNum = this.roomCount ? parseInt(this.roomCount, 10) : 0
    if (typeof this.foreignID !== 'undefined') {
      this.id = md5(this.foreignID)
    }
  }

  get absoluteURL() {
    let domain = ''
    if (!this._hasDomain()) {
      const baseURL = url.parse(this.baseURL)
      domain = `${baseURL.protocol}//${baseURL.hostname}`
    }
    return domain + this.foreignID
  }

  _hasDomain() {
    return this.foreignID.match(/^http.+/)
  }
}

module.exports = RealEstate
