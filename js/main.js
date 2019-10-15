import DeviceInfo from './Utils.js'
import Image from './components/Image.js'
import Background from './components/Background.js'
import ScrollBarText from './components/ScrollBarText.js'
import Bubble from './components/Bubble.js'
import AD from './components/AD.js'
import State from './State.js'
import {
  bubbleAudio,
  restartAudio
} from './Audio.js'


const image_width = 40;

/**
 * 初始化泡泡
 */
function configBubble() {

  /**
   * 横向默认以8为基准，间距动态计算
   * 竖向根据得到的间距动态计算个数
   */
  let row_count = 8,
    column_count = 0;

  /**
   * 公式：屏幕宽度减掉8个图片的宽度总和除以图片个数+1得到均匀的间距
   */
  let space = Math.floor((DeviceInfo.windowWidth - image_width * row_count) / (row_count + 1));

  /**
   * 开始计算竖向的可绘制的个数
   */
  column_count = Math.floor(DeviceInfo.windowHeight / (image_width + space))

  /**
   * x的默认起始位置
   */
  let offsetx = 0;

  /**
   * y的起始位置需要重新计算以保证上下距离屏幕间距均匀
   */
  let offsety = Math.floor((DeviceInfo.windowHeight - column_count * (image_width + space)) / 2);

  let bubbles = [];
  /**
   * 双层for循环开始绘制气泡
   */
  for (let i = 0; i < column_count; i++) {
    let start_y = i * image_width + (i + 1) * space + offsety;
    for (let j = 0; j < row_count; j++) {
      let start_x = j * image_width + (j + 1) * space + offsetx;
      let bubble = new Bubble(false, start_x, start_y)
      //设置点击事件
      bubble.setOnclickListener(function(view) {
        if (view.broken) return;
        view.broken = true;
        //播放音效以及震动
        bubbleAudio.bubble();
        //随机
        randomADS();
      })
      bubbles.push(bubble)
    }
  }
  return bubbles;
}

/**
 * 随机弹出广告
 */
function randomADS() {
  // State.addView(new AD())
}

/**
 * 配置重玩按钮
 */
function configRestart() {
  let width = 200 / 1.5;
  let height = 100 / 1.6;
  let x = DeviceInfo.windowWidth / 2 - width / 2;
  let y = DeviceInfo.windowHeight - height - 20;
  let restart = new Image("images/restart.png", x, y, width, height)
  restart.setOnclickListener(function(view) {
    restartAudio.play();
    let views = State.views;
    for(let i = 0; i < views.length; i ++){
      let item = views[i]
      if (item instanceof Bubble && item.broken){
        item.broken = false;
      }
    }
  })
  return restart;
}

/**
 * 配置背景
 */
function configBackground() {
  return new Background("#90d7ec", 0, 0, DeviceInfo.windowWidth, DeviceInfo.windowHeight)
}

function configScrollBarText(){
  return new ScrollBarText("red")
}

/**
 * 游戏主函数
 */
export default function Main() {
  //背景
  let bg = configBackground();
  //气泡
  let bubbles = configBubble();
  //重玩按钮
  let restart = configRestart();
  //scrollbartext
  let scrollBarText = configScrollBarText();

  State.addView(bg)
  State.concatViews(bubbles)
  State.addView(restart)
  State.addView(scrollBarText)

  //注册手势监听器
  initEventListener();

  //looper循环
  this.loop = looper.bind(this)
  this.animationId = requestAnimationFrame(this.loop)
}

function looper() {
  startDraw()
  this.animationId = requestAnimationFrame(this.loop)
}

/**
 * 上层画布
 */
const canvas = wx.createCanvas()
const context = canvas.getContext('2d')
console.log('netlog-', context)

/**
 * 开始绘制
 */
function startDraw() {
  for (let i = 0; i < State.views.length; i++) {
    let item = State.views[i];
    item.draw(context);
  }
}


/**
 * 注册手势监听
 */
function initEventListener() {
  wx.onTouchStart(e => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    //逆向迭代，手势事件优先最后绘制的内容
    let views = State.views;
    for (let i = views.length - 1; i >= 0; i--) {
      let view = views[i];
      if (view.interceptorTouchEvent(e)) {
        break;
      }
    }
  })
}