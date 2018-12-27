const RealEstate = require('../model/real-estate')

class RealEstateExtractor {
  constructor (parent, selectors) {
    this.parent = parent
    this.realEstate = new RealEstate()

    // The selector name must match the appropriate property of RealEstate class, eg. realEstate.address =~ this.selectors.address etc. See extractAll
    this.selectors = selectors
    this.extract()
  }

  extract () {
    this.extractAll()
    this.realEstate.parseNumbers()
    return this.realEstate
  }

  // convert this.selectors to a jQuery command like this.parent.find(this.selectors[selectorPropName].selector).attr("href") and run it with eval to get information from the DOM
  extractAll () {
    this.selectors.forEach(selector => {
      if (!this.realEstate.hasOwnProperty(selector.field)) {
        throw new Error('No such property in RealEstate: ' + selector.field)
      }

      let extractorCommand = `this.parent.find(selector.selector)`
      const methods = Object.keys(selector.methods).reduce((reduced, current) => {
        const args =
          selector.methods[current].reduce((reducedArgs, currentArg) => {
            if (reducedArgs.length > 1) {
              reducedArgs += ','
            }
            return reducedArgs + '"' + currentArg + '"'
          }, '')
        return reduced + `.${current}(${args})`
      }, '')
      extractorCommand += methods

      this.realEstate[selector.field] = eval(extractorCommand)
    })
  }
}

module.exports = RealEstateExtractor
