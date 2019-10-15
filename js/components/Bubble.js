import Image, {
  addImageToCache
} from './Image.js'


const broken_image = wx.createImage();
broken_image.src = "images/destroy.png";

const perfect_image = wx.createImage();
perfect_image.src = "images/perfect.png";

/**
 * 图片缓存起来
 */
addImageToCache(broken_image.src, broken_image)
addImageToCache(perfect_image.src, perfect_image)

const image_width = 40;

/**
 * 气泡
 */
export default class Bubble extends Image {

  constructor(broken = false, x, y) {
    super(broken ? broken_image.src : perfect_image.src, x, y, image_width, image_width)
    this.broken = broken;
  }

  draw(cxt) {
    this.image = this.broken ? broken_image : perfect_image;
    super.draw(cxt);
  }
}