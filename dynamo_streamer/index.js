const NAME_INSERT = 'INSERT'
const Alert = require('./src/model/Alert')
const recipients = ['balint.sera@gmail.com', 'anna.ferencz@gmail.com']


exports.handler = async (event, context) => {
  const realEstates = []
  event.Records.forEach((record) => {
    if (!record.eventName || record.eventName !== NAME_INSERT) {
      return
    }

    const realEstate = record.dynamodb
    realEstates.push({ foreignID: realEstate.NewImage.ForeignID.S })
  });

  const alert = new Alert(recipients, realEstates)
  await alert.send()
  return { status: 0 }
}




