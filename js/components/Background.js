import View from '../framework/View.js'

/**
 * 背景组件
 */
export default class Background extends View {

  constructor(color,x,y,width,height) {
    super(x, y, width, height)
    this.color = color;
  }

  draw(cxt){
    cxt.fillStyle = this.color;
    cxt.fillRect(this.x,this.y,this.width,this.height);
  }
}