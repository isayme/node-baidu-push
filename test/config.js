module.exports = {
  apiKey: '6hSzEIL8xMe2cGGwYC3V0qXe',
  secretKey: 'ruKTqnwTdWv3YRSNEdwl2kWHZSkSgcYg',
  packageName: 'org.isayme.demo',
  channel_ids: [
    '4285607900210990068',
    '4504997744813949923'
  ],
  print: function (err, data) {
    console.log(JSON.stringify(arguments, null, 2))
  }
}
