const RealEstate = require('../model/real-estate')

const urls = [
  {
    uri: 'https://ingatlan.com/listasz/elado+haz+csaladi-haz+nem-berleti-jog+szeged+20-37-mFt',
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
    uri: 'https://ingatlan.jofogas.hu/csongrad/szeged/haz/tegla?garden=1&max_price=37000000&min_price=20000000&st=s',
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
  // https://www.ingatlannet.hu/kiadó/ház/Szeged
  {
    uri: 'https://www.ingatlannet.hu/elad%C3%B3/csal%C3%A1di%20h%C3%A1z/szeged?minPrice=20&maxPrice=37',
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
      }
    ]
  },
  // https://www.ingatlannet.hu/kiadó/ház/Szeged
  {
    uri: 'https://otthonterkep.hu/szures/elado+haz+csaladi+szeged+20-37-mFt-ig+3-szoba-felett?sort=rd&ex=1',
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
      }
    ]
  },

  {
    uri: 'https://www.ingatlanbazar.hu/ingatlan-Szeged-Elado-Haz-20-37-millio-Ft?property__2=2&property_location%5B0%5D=1099&price_min=20&price_max=37&property__2sub%5B0%5D=3__9&property_build_date=&searchtext=&page=1',
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
        field: 'foreignID',
        selector: '.property-description a',
        methods: {'attr': ['href']}
      }
    ]
  },

  {
    uri: 'https://ving.hu/kereses?q=cT10cnVlJnJlZ2lvbj05NDgmcmVnaW9uLW5hbWU9U3plZ2VkJnNhbGUtcmVudD1zYWxlJnR5cGUtY3NhbGFkaS1oYXo9Y3NhbGFkaS1oYXomcHJpY2UtZnJvbT0yMCZwcmljZS10bz00MCZiZWRyb29tcy1mcm9tPSZyZWZfbnVtYmVyPSZvd25lci1yZW50YWw9b3duZXJzaGlwJmJ1aWx0aW4tZnJvbT0wJmxpdmluZ3Jvb21zLWZyb209JmJhdGhyb29tcy1mcm9tPSZmbG9vci1mcm9tPSZmbG9vci10bz0mc2l6ZS1mcm9tPSZzaXplLXRvPSZwbG90c2l6ZS1mcm9tPSZwbG90c2l6ZS10bz0mY29uZGl0aW9uLWF0bGFnb3M9YXRsYWdvcyZjb25kaXRpb24tZXN6dGV0aWthaS1mZWx1aml0YXN0LWlnZW55ZWw9ZXN6dGV0aWthaS1mZWx1aml0YXN0LWlnZW55ZWwmY29uZGl0aW9uLWZpYXRhbC0tdWpzemVydT1maWF0YWwtLXVqc3plcnUmY29uZGl0aW9uLWtpdmFsbz1raXZhbG8mY29uZGl0aW9uLXJlc3piZW4tZmVsdWppdG90dD1yZXN6YmVuLWZlbHVqaXRvdHQmY29uZGl0aW9uLXRlbGplc2VuLWZlbHVqaXRvdHQ9dGVsamVzZW4tZmVsdWppdG90dCZjb25kaXRpb24tdWotZXBpdGVzdS1rdWxjc3Jha2Vzej11ai1lcGl0ZXN1LWt1bGNzcmFrZXN6',
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
        field: 'foreignID',
        selector: '.carousel-inner a.item',
        methods: {'attr': ['href']}
      }
    ]
  },
]

module.exports = urls
