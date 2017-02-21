module.exports = {
  pushMsgToSingleDevice: '/rest/3.0/push/single_device',
  pushMsgToAll: '/rest/3.0/push/all',
  pushMsgToTag: '/rest/3.0/push/tags',
  pushBatchUniMsg: '/rest/3.0/push/batch_device',
  queryMsgStatus: '/rest/3.0/report/query_msg_status',
  queryTimerRecords: '/rest/3.0/report/query_timer_records',
  queryTopicRecords: '/rest/3.0/report/query_topic_records',
  queryTags: '/rest/3.0/app/query_tags',
  createTag: '/rest/3.0/app/create_tag',
  deleteTag: '/rest/3.0/app/del_tag',
  addDevicesToTag: '/rest/3.0/tag/add_devices',
  deleteDevicesFromTag: '/rest/3.0/tag/del_devices',
  queryDeviceNumInTag: '/rest/3.0/tag/device_num',
  queryTimerList: '/rest/3.0/timer/query_list',
  queryTopicList: '/rest/3.0/topic/query_list',
  queryStatisticDevice: '/rest/3.0/report/statistic_device',
  queryStatisticTopic: '/rest/3.0/report/statistic_topic'
}
