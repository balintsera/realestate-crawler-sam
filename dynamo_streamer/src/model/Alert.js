const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});

class Alert {
  constructor(addresses, realEstates) {
    this.addresses = addresses
    this.realEstates = realEstates
  }

  get body() {
    return "Új házak linkjei: " + this.realEstates.reduce((reduced, current) => {
      if (reduced.length > 0) {
        reduced += ', '
      }
      return reduced + current.foreignID
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
          Html: {
            Charset: "UTF-8",
            Data: body
          },
          Text: {
            Charset: "UTF-8",
            Data: body
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Új ház'
        }
      },
      Source: 'balint.sera@redsteedstudios.com'
    };
    console.log("send params", params)
    return new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
  }
}

module.exports = Alert