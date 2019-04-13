const AWS = require("aws-sdk");
const { AWS_REGION, AWS_DYNAMO_ENDPOINT, TABLE } = require('../../config')

const awsConfigUpdate = {
  region: AWS_REGION,
}

if (AWS_DYNAMO_ENDPOINT) {
  awsConfigUpdate.endpoint = AWS_DYNAMO_ENDPOINT
}

AWS.config.update(awsConfigUpdate);
//console.log("dynamo config", awsConfigUpdate)

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const TABLE_NAME = TABLE
const MISSING_NUM = '0'
class RealEstateGateway {
  // batchInsert enables insertion of max 25 items
  static batchInsert(realEstates) {
    const missing = 'MISSING_STRING'
    const missingNum = MISSING_NUM

    // remove unusable ones
    realEstates = realEstates
      .filter(realEstate => {
        if (!realEstate.foreignID) {
          return false
        }

        return true
      })

    // slice by 25 items
    const batches = []
    const batchSize = 25
    for (let i=0; i<realEstates.length; i+=batchSize) {
      batches.push(realEstates.slice(i, i+batchSize))
    }

    const batchWritePromises = []
    batches.forEach(batch => {
      const putRequests = batch
        .map(realEstate => {
          return {
            PutRequest: {
              Item: {
                "ID": { S: realEstate.id },
                "Address": { S: realEstate.address || missing },
                "ForeignId":  { S: realEstate.foreignID || missing },
                "Price": { N: RealEstateGateway.numberForDynamo(realEstate.price) },
                "RoomNum": { N: RealEstateGateway.numberForDynamo(realEstate.roomCountNum) },
                "Size": { N: RealEstateGateway.numberForDynamo(realEstate.sizeNum) },
                "BaseURL": { S: realEstate.baseURL || missing },
                "AbsoluteURL": { S: realEstate.absoluteURL || missing },
                "ImageURL": { S: realEstate.imageURL || missing }
              }
            }
          }
      })
      //console.log("putRequests %j", putRequests)
      const params = { RequestItems: {} }
      params.RequestItems[TABLE_NAME] = putRequests
      const prom = new Promise((resolve, reject) => {
        dynamodb.batchWriteItem(params, (err, data) => {
          if (err) {
            console.log("dynamodb.batchWriteItem %j %j", err, params)
            reject(err)
          }
          resolve(data)
        })
      })

      batchWritePromises.push(prom)
    })


    return Promise.all(batchWritePromises)
  }

  static numberForDynamo(anyType, log = false) {
    if (log) {
      console.log("anytype", anyType)
    }
    if (anyType === null) {
      return MISSING_NUM
    }
    if (typeof anyType  === 'undefined') {
      return MISSING_NUM
    }

    if (isNaN(anyType)) {
      return MISSING_NUM
    }

    if (typeof anyType === 'number') {
      return anyType.toString()
    }

    if (typeof anyType === 'string') {
      // this will handle the case when the result is an empty string
      return this.numberForDynamo(anyType.replace(/[^0-9.,], ''/).replace(/,/, '.'))
    }

    console.log("Strange number format: %j", anyType)

    return MISSING_NUM
  }

}

module.exports = RealEstateGateway