// food页面的json渲染数据

const FOOD_API = '/api/food/food_index';

const FOOD_FIND_LIST_API = '/api/food/find_list';

const FOOD_RESTAUTANT_API = '/api/food/restautant_list';

const FOOD_SELLER_API = '/api/food/seller';
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

//--------------------------

export default {
	FOOD_API,
	FOOD_FIND_LIST_API,
	FOOD_RESTAUTANT_API,
	FOOD_SELLER_API,
	USER_LOGIN_API,
	USER_REGIESTER_API,
	USER_CHECK_API,
	USER_LOGOUT_API,
}