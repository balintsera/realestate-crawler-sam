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
      },
      {
        field: 'imageURL',
        selector: 'img.listing__image',
        methods: {'attr': ['src'], }
      },
    ]
  },
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
    uri: 'https://otthonterkep.hu/szures/kiado+haz+alberlet+szeged?sort=rd&ex=1',
    parentSelector: '.prop-card',
    selectors: [
      {
        field: 'address',
        selector: 'h2.prop-type .prop-address',
        methods: {'text': [], 'trim': []} // property name: method name, value array: paramters for that method
      },
      {
        field: 'price',
        selector: '.prop-fullprice',
        methods: {'attr': ['content'], }
      },
      {
        field: 'size',
        selector: '.prop-fullsize span:nth-child(1)',
        methods: {'text': [], 'trim': []}
      },
      {
        field: 'roomCount',
        selector: 'span.prop-rooms',
        methods: {'text': [], 'trim': []}
      },
      {
        field: 'foreignID',
        selector: 'a',
        methods: {'attr': ['href']}
      },
      {
        field: 'imageURL',
        selector: 'img[itemprop="contentUrl"]',
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
  {
    uri: 'https://ving.hu/kereses?q=cT10cnVlJnJlZ2lvbj05NDgmcmVnaW9uLW5hbWU9U3plZ2VkJnNhbGUtcmVudD1yZW50JnR5cGUtY3NhbGFkaS1oYXo9Y3NhbGFkaS1oYXomdHlwZS1zb3JoYXo9c29yaGF6JnByaWNlLWZyb209JnByaWNlLXRvPSZiZWRyb29tcy1mcm9tPSZyZWZfbnVtYmVyPSZvd25lci1yZW50YWw9b3duZXJzaGlwJmJ1aWx0aW4tZnJvbT0wJmxpdmluZ3Jvb21zLWZyb209JmJhdGhyb29tcy1mcm9tPSZmbG9vci1mcm9tPSZmbG9vci10bz0mc2l6ZS1mcm9tPSZzaXplLXRvPSZwbG90c2l6ZS1mcm9tPSZwbG90c2l6ZS10bz0=',
    parentSelector: '.thumbnail-style.easy-block-v1',
    selectors: [
      {
        field: 'address',
        selector: 'ul.list-unstyled li:nth-child(3)',
        methods: {'text': [], 'trim': [] }
      },
      {
        field: 'price',
        selector: 'ul.list-unstyled li:nth-child(1)',
        methods: {'text': [], 'trim': [] }
      },
      {
        field: 'size',
        selector: 'ul.list-unstyled li:nth-child(2) em',
        methods: {'text': [], 'trim': [] }
      },
      {
        field: 'imageURL',
        selector: '.thumbnail-style a img',
        methods: {'attr': ['src'], }
      },
      {
        field: 'foreignID',
        selector: '.carousel-inner a.item',
        methods: {'attr': ['href']}
      }
    ]
  },
  {
    uri: 'https://www.ingatlanbazar.hu/alberlet-Szeged-Kiado-Haz?property_type=on&property__2=2&property_location%5B0%5D=1099&price_min=&price_max=&property_build_date=&searchtext=&page=1',
    parentSelector: '.box',
    selectors: [
      {
        field: 'address',
        selector: 'h2.property-description__title',
        methods: {'text': [], 'trim': [], 'substring': [180]}
      },
      {
        field: 'price',
        selector: 'h2.property-description__title',
        methods: {'text': [], 'trim': [], 'substring': [0,8]}
      },
      {
        field: 'size',
        selector: 'ul.property-list li:nth-child(2)',
        methods: {'text': [], 'trim': []}
      },
      {
        field: 'roomCount',
        selector: 'ul.property-list li:nth-child(1)',
        methods: {'text': [], 'trim': [], 'substring': [0,2]}
      },
      {
        field: 'imageURL',
        selector: 'a picture img',
        methods: {'attr': ['src'], }
      },
      {
        field: 'foreignID',
        selector: '.property-description a',
        methods: {'attr': ['href']}
      }
    ]
  },
]

module.exports = urls
