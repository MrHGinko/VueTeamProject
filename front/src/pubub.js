class PubSub{
  constructor(){
    this._map = {};
  }
  // 发布
  publish(eventName, ...rest){
    if(!eventName){
      throw new Error('eventName is undefined');
    }

    // 按照事件名字取得callback数组
    const callbackArr = this._map[eventName] || [];

    // 遍历回调，调用
    callbackArr.forEach(callback=>{
      callback(...rest);
    });

  }

  // 订阅
  subscribe(eventName, callback){
    if(!eventName || !callback){
      throw new Error('eventName or callback undefined');
    }

    // 在这个订阅函数中，需要将所有的eventName和callback都保存起来
    // 在发布函数中才能调用
    if(!this._map[eventName]){
      // 这个事件还没有订阅
      this._map[eventName] = [];
    }

    // 保存callback
    this._map[eventName].push(callback);

  }

  // 移除订阅
  unsubscribe(eventName, callback){
    if(!eventName){
      // 移出所有事件的所有监听
      this._map = {};
    }
    else if(eventName && !callback){
      // 移出指定事件的所有监听
      delete this._map[eventName];
    }
    else{
      // 移出指定事件的指定的监听
      // 按照事件名字取得callback数组
      const callbackArr = this._map[eventName] || [];
      // 过滤回调数组，重新设置回调数组
      this._map[eventName] = callbackArr.filter(cb=>(cb !== callback));
    }
  }
}

export default new PubSub();

