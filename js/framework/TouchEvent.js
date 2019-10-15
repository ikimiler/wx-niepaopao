

/**
 * 手势事件接口
 */
export default class TouchEvent{

  constructor(){

  }

  /**
   * 是否拦截手势事件
   */
  interceptorTouchEvent(e){
    return false;
  }
}