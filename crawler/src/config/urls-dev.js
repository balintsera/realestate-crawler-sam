const RealEstate = require('../model/real-estate')

const urls = [
  {
    uri: 'https://www.jofogas.hu/szeged?q=kiado%20haz',
    parentSelector: '.box.listing.list-item.reListElement',
    selectors: [
      {
        field: 'address',
        selector: '.cityname',
        methods: {'text': [], 'trim': []} // property name: method name, value array: paramters for that method
      },
      {
        field: 'price',
        selector: '.price',
        methods: {'text': [], 'trim': []}
      },
      {
        field: 'size',
        selector: '.size',
        methods: {'text': [], 'trim': []}
      },
      {
        field: 'roomCount',
        selector: '.rooms',
        methods: {'text': [], 'trim': []}
      },
      {
        field: 'imageURL',
        selector: 'img.img_small',
        methods: {'attr': ['src'], }
      },
      {
        field: 'foreignID',
        selector: '.reLiSection a.img_small',
        methods: {'attr': ['href']}
      }
    ]
  },
]

module.exports = urls
