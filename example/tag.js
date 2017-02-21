var config = require('../test/config')
var Client = require('../lib/client')

var client = new Client(config.apiKey, config.secretKey)

// var testTag = 'tagName'

// client.deleteTag(testTag, config.print);

client.queryTags(config.print)
//
// client.createTag(testTag, config.print);
//
// client.deleteTag(testTag, config.print);
//
// client.addDevicesToTag(testTag, config.channel_ids, config.print);
//
// client.deleteDevicesFromTag(testTag, config.channel_ids, config.print);
//
// client.queryDeviceNumInTag(testTag, config.print);
