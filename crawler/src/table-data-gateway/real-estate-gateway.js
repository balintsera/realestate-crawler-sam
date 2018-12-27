const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION || 'eu-central-1',
});

if (!!process.env.AWS_DYNAMO_ENDPOINT) {
  AWS.config.update({
    endpoint: process.env.AWS_DYNAMO_ENDPOINT
  })
}

const docClient = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = process.env.TABLE_NAME

class RealEstateGateway {
  static insert(realEstate) {
    const putParams = {
      TableName: TABLE_NAME,
      Item: {
        "ID":  realEstate.id,
        "Address": realEstate.address,
        "ForeignId":  realEstate.foreignID,
        "Price": realEstate.price,
        "RoomNum": realEstate.roomCountNum,
        "Size": realEstate.sizeNum
      }
    }
    return docClient.put(putParams).promise()
  }
}

module.exports = RealEstateGateway