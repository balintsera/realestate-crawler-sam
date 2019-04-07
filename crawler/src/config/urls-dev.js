const RealEstate = require('../model/real-estate')

const urls = [
  {
    uri: 'https://www.ingatlannet.hu/kiadó/ház/Szeged',
    parentSelector: '.row.mb-md-3',
    selectors: [
      {
        field: 'address',
        selector: '.item-desc p b',
        methods: {'text': [], 'trim': []} // property name: method name, value array: paramters for that method
      },
      {
        field: 'price',
        selector: '.item-price h5',
        methods: {'text': [], 'trim': [] }
      },
      {
        field: 'size',
        selector: '.list-inline li:nth-child(1)',
        methods: {'text': [], 'trim': []}
      },
      {
        field: 'roomCount',
        selector: '.list-inline li:nth-child(3)',
        methods: {'text': [], 'trim': []}
      },
      {
        field: 'foreignID',
        selector: '.pl-md-0 a:nth-child(1)',
        methods: {'attr': ['href']}
      },
      // w-100
      {
        field: 'imageURL',
        selector: 'img.w-100',
        methods: {'attr': ['src'], }
      },
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
