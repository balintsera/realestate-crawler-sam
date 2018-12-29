const uniqueString = require('unique-string')
const md5 = require('md5')


class RealEstate {
  static getTypes () {
    return {
      'forrent': 'forrent',
      'forsale': 'forsale'
    }
  }

  constructor (address, price, shortDesc, size, roomCount, foreignID, baseURL) {
    this.id = uniqueString()
    this.address = address
    this.price = price
    this.shortDesc = shortDesc
    this.size = size
    this.roomCount = roomCount
    this.foreignID = foreignID
    this.baseURL = baseURL
  }

  parseNumbers () {
    this.price = parseFloat(this.price, 10)
    this.size = parseInt(this.size, 10)
    this.priceNum = this.price
    this.sizeNum = this.size
    this.roomCountNum = parseInt(this.roomCount, 10)
    if (typeof this.foreignID !== 'undefined') {
      this.id = md5(this.foreignID)
    }
  }
}

module.exports = RealEstate
