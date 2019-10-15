/**
 * 全局数据存储
 */
class State {
  
  views = [];

  /**
   * 单个添加
   */
  addView(view){
    this.views.push(view)
  }

  /**
   * 批量添加
   */
  concatViews(views){
    this.views.push(...views)
  }

}

/**
 * 全局单利
 */
const instance = new State();

export default instance;