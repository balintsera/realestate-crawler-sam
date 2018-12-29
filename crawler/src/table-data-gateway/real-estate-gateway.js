const AWS = require("aws-sdk");

const awsConfigUpdate = {
  region: process.env.AWS_REGION || 'eu-west-1',
}

console.log(process.env.AWS_DYNAMO_ENDPOINT)
if (process.env.AWS_DYNAMO_ENDPOINT) {
  awsConfigUpdate.endpoint = process.env.AWS_DYNAMO_ENDPOINT
}

AWS.config.update(awsConfigUpdate);
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const TABLE_NAME = process.env.TABLE

class RealEstateGateway {
  // batchInsert enables insertion of max 25 items
  static batchInsert(realEstates) {
    const missing = 'MISSING_STRING'
    const missingNum = '0'

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
                "Price": { N: realEstate.price.toString() || missingNum },
                "RoomNum": { N: realEstate.roomCountNum.toString() || missingNum },
                "Size": { N: realEstate.sizeNum.toString() || missingNum },
                "BaseURL": { S: realEstate.baseURL || missing }
              }
            }
          }
      })

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

}

module.exports = RealEstateGateway