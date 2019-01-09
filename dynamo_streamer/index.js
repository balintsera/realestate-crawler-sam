const NAME_INSERT = 'INSERT'
const Alert = require('./src/model/Alert')
let recipients = ['balint.sera@gmail.com', 'anna.ferencz@gmail.com']
if (process.env.RECIPIENTS) {
  const splitted = process.env.RECIPIENTS.split(" ")
  if (!Array.isArray(splitted)) {
    console.error('RECIPIENTS is not an array after splitting')
  } else {
    recipients = splitted
  }
}


exports.handler = async (event, context) => {
  const realEstates = []
  console.log("event %j", event.Records)

  event.Records
    .filter(record => record.eventName && record.eventName === NAME_INSERT)
    .forEach((record) => {
      const realEstate = record.dynamodb
      console.log("RealEstate %j", realEstate)
      realEstates.push({ absoluteURL: realEstate.NewImage.AbsoluteURL.S })
    });

  if (realEstates.length < 1) {
    return { status: 0 }
  }

  const alert = new Alert(recipients, realEstates)
  await alert.send()
  return { status: 0 }
}




