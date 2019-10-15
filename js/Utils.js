/**
 * 屏幕宽高
 */
var DeviceInfo = {
  windowWidth: 375,
  windowHeight: 667,
};

try {
  let info = wx.getSystemInfoSync()
  DeviceInfo = info;
} catch (e) {
  console.log('netlog-getSystemInfoSync-error', e)
}

export default DeviceInfo;