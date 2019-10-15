import TouchEvent from './TouchEvent.js'

/**
 * 物体描述接口
 */
export default class View extends TouchEvent {

  /**
   * 每个物体所具备的基本属性
   */
  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.rect = {
      left:x,
      top:y,
      right:x + width,
      bottom:y + height,
    }
  }

  /**
   * 开始绘制
   */
  draw(cxt) {

  }

  interceptorTouchEvent(e) {
    let targetX = e.touches[0].clientX
    let targetY = e.touches[0].clientY
    let touchable = targetX >= this.rect.left && targetX <= this.rect.right && targetY >= this.rect.top && targetY <= this.rect.bottom;
    if (touchable) {
      //回调点击事件
      this.listener && this.listener(this)
      return true;
    }
    return false;
  }

  /**
   * 设置点击事件回调
   */
  setOnclickListener(listener) {
    this.listener = listener;
  }

  /**
   * view的唯一标识
   */
  toStringID(){
    return JSON.stringify(this.rect)
  }
}