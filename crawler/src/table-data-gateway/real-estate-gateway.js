const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION || 'eu-central-1',
  endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = this.process.TABLE_NAME

class RealEstateGateway {
  static insert(realEstate) {
    const putParams = {
      Table: TABLE_NAME,
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

modules.export = RealEstateGateway