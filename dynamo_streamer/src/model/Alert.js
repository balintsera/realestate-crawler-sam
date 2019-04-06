const AWS = require('aws-sdk');
const { AWS_REGION, SUBJECT } = require('../../config')

AWS.config.update({region: AWS_REGION})

class Alert {
  constructor(addresses, realEstates) {
    this.addresses = addresses
    this.realEstates = realEstates
  }

  get body() {
    return "Új házak linkjei: \n" + this.realEstates.reduce((reduced, current) => {
      if (reduced.length > 0) {
        reduced += " \n"
      }

      return reduced + current.absoluteURL
    }, "")
  }


  send() {
    const body = this.body
    // Create sendEmail params
    const params = {
      Destination: {
        ToAddresses: this.addresses
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: body
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: SUBJECT
        }
      },
      Source: 'balint.sera@redsteedstudios.com'
    };
    console.log("send params %j", params)
    return new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
  }
}

module.exports = Alert