import View from '../framework/View.js'

/**
 * 图片缓存，优化内存
 */
const imageCache = new Map();

export function addImageToCache(src,image){
  imageCache.set(src,image)
}

/**
 * 图片组件
 */
export default class Image extends View{

  constructor(src,x,y,width,height){
    super(x,y,width,height)
    if (imageCache.has(src)){
      this.image = imageCache.get(src)
    }else{
      let image = wx.createImage();
      image.src = src;
      this.image = image;
      imageCache.set(src,image);
    }
  }

  draw(cxt){
    cxt.drawImage(this.image,this.x,this.y,this.width,this.height);
  }
}