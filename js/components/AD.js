import View from '../framework/View.js'
import DeviceInfo from '../Utils.js'

const width = DeviceInfo.windowWidth - 100;
const height = width;

const x = 50;
const y = (DeviceInfo.windowHeight - height) / 2;

/**
 * 随机弹出广告
 */
export default class AD extends View{

  constructor(){
    super("images/lqd.jpg", x, y, width, height)
  }

  draw(cxt){
    cxt.drawImage(this.image,x,y,width,height)
  }
}