
function createAudio(src){
  const audio = wx.createInnerAudioContext()
  audio.src = src;
  return audio;
}

/**
 * 泡泡音频
 */
const bubbleAudio = createAudio("audio/destroy.wav")

bubbleAudio.bubble = function(){
  bubbleAudio.stop();
  bubbleAudio.play();
  wx.vibrateShort()
}

/**
 * 开始音频
 */
const restartAudio = createAudio("audio/restart.wav")

export {
  bubbleAudio,
  restartAudio
}

