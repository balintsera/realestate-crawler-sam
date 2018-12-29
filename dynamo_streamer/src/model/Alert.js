const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});
const url = require('url')

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
      let link
      if (!this._hasBaseURL(current.foreignID)) {
        const baseURL = url.parse(current.baseURL)
        link = `${baseURL.protocol}//${baseURL.hostname}`
      }
      link += current.foreignID
      return reduced + link
    }, "")
  }

  _hasBaseURL(foreignID) {
    return foreignID.match(/^http.+/)
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
          Data: 'Új ház'
        }
      },
      Source: 'balint.sera@redsteedstudios.com'
    };
    console.log("send params %j", params)
    return new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
  }
}

module.exports = Alert