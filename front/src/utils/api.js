// food页面的json渲染数据
const HOST = 'DNAIO:7889';

const FAST_MOVIE_API = '/api/movie/fast_movie';

const LOCAL_FILE_API = '/api/movie/local_file';

const MOVIE_LIST_API = '/api/movie/movie_list';

const MOVIE_LIST_NAV_API = '/api/movie/movie_list_nav';
// -------------------------------

// user api

// 登录  methods: post,
//  params: {username:String, password:String}
const USER_LOGIN_API = '/api/user/login';

// 注册  methods: post,
//  params: {username:String, password:String}
const USER_REGIESTER_API = '/api/user/regiester';

// 检查登录
// 无
const USER_CHECK_API = '/api/user/check_login';

// 登出
// 无
const USER_LOGOUT_API = '/api/user/logout';

// 获取用户其他数据
// 无
const USER_GETINFO_API = '/api/userinfo/get_info';

// 更改用户数据  methods: post
//  params: { options: {nickName: String, balance: Number, point: Number} }
const USER_CHANGEINFO_API = '/api/userinfo/change_info';

//--------------------------

// order api
// 订单列表
const ORDER_LIST_API = '/api/order/orderlist';

// 创建订单 methods: post,
// params: {orderID: String, orderName: String, orderType: String, price: Number}
const ORDER_ADD_API = '/api/order/newOrder';

// 修改订单状态 methods: post
//
const ORDER_CHANGE_API = '/api/order/change_status';

export default {

	USER_LOGIN_API,
	USER_REGIESTER_API,
	USER_CHECK_API,
	USER_LOGOUT_API,
	USER_GETINFO_API,
	USER_CHANGEINFO_API,
	ORDER_LIST_API,
	ORDER_ADD_API,
	ORDER_CHANGE_API,
	FAST_MOVIE_API,
	LOCAL_FILE_API,
	MOVIE_LIST_API,
	MOVIE_LIST_NAV_API,
};
