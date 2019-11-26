```txt
洪泽佳: 
完成后台数据库(账号, 用户信息[地址, 金额, 积分, 地址], 订单),                            以及增改查的api接口(未实现删), 
完成订单页面, 与外卖, 电影页面提交订单数据,跳转到订单页的实现
完成注册登录, 以及用户的余额的使用与修改(充值), 积分的使用, 用户地址的增加与选择.
合并代码, 解决文件冲突(引入文件路径, 主路由跳转, 公共文件[App.vue...]等)

~ 数据库耦合程度高, 地址合并于UserInfo数据库中, 以对象形式存入(其中地址值为数组).
~ 订单, 通过Type判别类型, 同时前端存入的外卖与电影订单的OrderInfo数组中的对象的key值不一样, 通过Type判断同时获取不一样的key值以做页面渲染. 应拆分数据库, 分作外卖与电影, 或是提供2种接口加以区分, 严格规定传入数据的格式.
~ vue路由守卫的使用, 从Mine无法跳转到订单与积分商店, 这里使用的是组件内部守卫. 应改成全局守卫使用.

~ 项目构建很糟糕, 出现了重复组件的重复编写, 比如头部与底部导航. 应该对页面进行分析, 划分公共组件确定分工再开始.
~ 合并代码, git因为公共文件的重复修改, 出现了多次冲突; 页面布局因为未规定z-index值导致部分页面层级不够而无法显示的问题; style标签未添加scoped属性导致部分样式不符预期.
```

```txt
恭文俊:
完成外卖首页
完成商店详情页购物车
完成提交订单页
完成头部导航分类页
```

```txt
张云海:
负责美团项目中的猫眼电影分支
根据主框架：配置猫眼电影路由
获取数据渲染页面：渲染的页面可进入详情页
根据主页面电影列表：实现本地数据库站内搜索电影
详情页跳转：到买票的影院 
选择影院：根据电影和影院选择座位排，列
订单提交：将所购买影院名称，电影，座位，信息提交到后台
```

