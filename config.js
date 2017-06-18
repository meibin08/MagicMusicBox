/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

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
    logsId:"NIOz3IxShfIh0flASQ94C4EJ-gzGzoHsz",
    logsKey:"KFEiJEXzBaDNYOQhYWsUHEA1",


};

module.exports = config
