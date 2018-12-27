const RealEstate = require('../model/real-estate')

const urls = [
  {
    uri: 'https://ingatlan.com/lista/kiado+haz+szeged+2-szoba-felett',
    parentSelector: '.listing__card',
    selectors: [
      {
        field: 'address',
        selector: '.listing__address',
        methods: {'text': [], 'trim': []} // property name: method name, value array: paramters for that method
      },
      {
        field: 'price',
        selector: '.price',
        methods: {'text': [], 'trim': []}
      },
      {
        field: 'size',
        selector: '.listing__data--area-size',
        methods: {'text': [], 'trim': []}
      },
      {
        field: 'roomCount',
        selector: '.listing__data--room-count',
        methods: {'text': [], 'trim': []}
      },
      {
        field: 'foreignID',
        selector: 'a.listing__thumbnail',
        methods: {'attr': ['href']}
      }
    ]
  },
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
        field: 'foreignID',
        selector: '.reLiSection a.img_small',
        methods: {'attr': ['href']}
      }
    ]
  },

]

module.exports = urls
