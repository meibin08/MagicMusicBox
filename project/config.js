/*
* @authors :Bin Mei
* @date    :2017-06-20
* @description：小程序项目配置文件
*/


var ENV = "mock";
var baseUrl ={
    "mock":"https://easy-mock.com/mock/594635398ac26d795f320f9c/miniPrograms",//模拟数据
    "dev":"https://easy-mock.com/mock/594635398ac26d795f320f9c/miniPrograms",//dev
    "prod":"https://easy-mock.com/mock/594635398ac26d795f320f9c/miniPrograms"//线上
};
var config = {
    ENV,
    // 接口的baseUrl,具体接口名称，在调用requset时传入
    baseUrl:baseUrl[ENV||"prod"],

    //日志上报，所需的项目key、id
    logsId:"qbP2l4mQhvv8e5BITvXu7jlW-gzGzoHsz",
    logsKey:"rFfGUqa7NYUVkhAaEOc1MqaW",

    //建议每次发布更改版本号、可考虑用于缓存清理
    version:"0.0.1",

    //可以在这里统一设置token过期时间,默认120分钟
    token_expires:120

};

module.exports = config
