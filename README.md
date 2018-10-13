## 小程序项目基础框架+共用组件

### 使用说明 ：
	- 请稳步wiki文档页查看,
	
#### -[wiki使用说明](https://github.com/meibin08/gulp-wechat-weapp/wiki "使用说明 @IT·平头哥联盟")
#### -[@IT·平头哥联盟](https://honeybadger8.github.io/blog/ "@IT·平头哥联盟-首席填坑官∙苏南")

### 已完成功能列表：

#### sass预编译wxss文件 -- gulpfile.js
	- 使用scss的方式编译wxss文件，再编译成.wxss文件动态插入到各模块内，让我们像写css，找回你熟悉的感觉~~，

#### 配置文件 -- config.js
	- 在该文件内完成项目中所需的配置项，如日志上报key\id，不同环境接口地址等，


#### 日志上报功能 -- utils/logs.js
	- 该功能主要用于前端日志监控，处理用户使用过程中接口异常的统计，
	- 实现快速定位，分析用户的行为，出错的页面，及用户的设备信息等，
	- 这里要给大家推荐一个前端饥渴已久的平台，跟后端人员一样，前端也有自己的日志系统，让我们能更精确快速的定位问题，提高开发效率，让妈妈再也不用担你，你找不到bug在哪里了……
	- 请查看该文件，一探究竟吧！

#### 接口请求封装 -- utils/request.js
	- 实现全部小程序统一的登录体系，便于后期维护，
	- 对接口异常字段的统一处理，
	- 有待持续完善；

#### 缓存设置时效性 -- utils/storage.js
	- 曾经localStorage、sessionStorage你是否一度感慨，让前端的数据缓存看到希望，再也不正眼揪一下昔日你倍感爱惜的cookie了呢？
	- 但localStorage那不永过期的热情，是不是也让你望而止步呢，
	- storage简单的包装后的localStorage，帮你解决了一切烦恼，想存就存，想换就换，想什么时候甩了它都行，哈哈；
	- 可能你也在骂我废话太多，看不下去……

#### 常用字段正则校验 -- utils/validate.js
	- 收集整理一些常用用户输入校验，如：email、电话、姓名、密码、身份证、通行证等常用正则验证，
	- 持续完善中，后期根据实际项目可慢慢积累；

#### 常用过滤器 -- utils/format.js
	- 收集整理一些常用用户输入校验，如：email、电话、姓名、密码、身份证、通行证等常用正则验证，
	- 持续完善中，后期根据实际项目可慢慢积累；

****

## 技术交流
- 群：912594095、[386485473](https://shang.qq.com/wpa/qunwpa?idkey=d44baf17512787eb0e4f268849a3239d6b9675145a606e21b9a055176bd1c0e2 "React\redux技术交流群")
- 博客：[@IT·平头哥联盟](https://honeybadger8.github.io/blog/ "@IT·平头哥联盟-首席填坑官∙苏南")

## 安装依赖包
- npm install

## 开发环境 -scss监听
- npm run gulps
