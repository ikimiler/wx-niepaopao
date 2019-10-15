import View from '../framework/View.js'
import DeviceInfo from '../Utils.js'

const text = "健康游戏,愉快生活。";
const height = 75;

export default class ScrollBarText extends View{

  constructor(color){
    super(0, height, DeviceInfo.windowWidth, height / 2)
    this.color = color;
    this.offsetx = 0;
  }

  draw(cxt){
    if(Math.abs(this.offsetx) >= this.width * 2){
      this.offsetx = 0;
    }else{
      this.offsetx ++;
    }
    cxt.fillStyle = this.color;
    cxt.fillRect(this.x, this.y, this.width, this.height);
    cxt.font = 'bold 15px cursive'
    cxt.fillStyle = "white";
    cxt.fillText(text, this.width - this.offsetx, this.y + this.y / 3,this.width)
  }
}