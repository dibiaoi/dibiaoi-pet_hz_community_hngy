# 基于Vue的宠物爱心平台PC端

这是一个和前同学合作的项目。

宠物爱心公益平台希望能可以能一定程度帮助到想要帮助流浪动物的人士，想要收养宠物人士，动物需要帮助的人士等一个集**领养，救助，资讯**一体的公益平台。

如果用户想领养一个宠物，在实名认证后可以直接在平台筛选查看，联系用户进行领养。当医院用户需要救助动物时，可以发布救助，及时更新在平台以节省救助时间。当普通用户申请志愿者后，可以发布宠物相关资讯分享知识。

## 技术栈

- Vue
- Vuex
- Vue-Router
- Axios
- Element UI

## 功能实现

**用户**

- [x] 个人信息
- [x] 评论
- [x] 设置支付密码
- [x] 实名认证
- [x] 申请志愿者
- [x] 粉丝和关注
- [x] 收藏
- [x] 领养发布管理
- [x] 宠物管理
- [x] 众筹捐款
- [x] 实时聊天
- [x] 密码管理
- [x] 查看订单

**志愿者（在用户功能基础上扩展了发布资讯功能）**

- [x] 资讯查看发布

- [x] 资讯编辑删除

**医院**

- [x] 众筹查看发布
- [x] 众筹编辑删除
- [x] 医院服务
- [x] 医院信息
- [x] 许可证认证
- [x] 密码管理

**管理员**

- [x] 查看所有用户
- [x] 志愿者审核打回
- [x] 众筹审核
- [x] 众筹平台确认
- [x] 查看领养信息
- [x] 领养信息审核打回
- [x] 领养订单确认
- [x] 查看所有医院用户
- [x] 医院资格审核
- [x] 发布资讯
- [x] 资讯审核
- [x] 资讯标签
- [x] 密码管理

### 用户角色

普通用户和志愿者

- 登录及验证
- 个人宠物管理
- 粉丝和关注管理
- 领养宠物管理
- 领养订单管理
- 发布资讯管理

医院用户

- 登录及验证

- 医院服务管理

- 发布众筹管理

管理员

- 用户管理

- 领养管理

- 医院管理

- 众筹管理

- 资讯管理

## 安装

``` bash
# 安装依赖
npm install

# 开启本地服务运行项目
npm run server

```

## 项目布局

```
.src
+-- assets //资源
+-- components // 小组件
|   +-- Admin  //  管理员模块基础组件
|   +-- Comment // 评论组件 
|   +-- Hospital // 医院模块组件
|   +-- News // 资讯模块组件
|   +-- PetHelp //宠物众筹模块组件
|   +-- User //用户模块组件
|   +-- UserCenter 
|   +-- ....js //其他基础组件
+-- plugins // 一些工具
|   +-- element.js // 局部引入Element UI
|   +-- Loading.js // 加载动画插件
|   +-- TimeHandler.js //时间信息处理
+-- request
|   +-- api.js // 存api
|   +-- baseRequest.js // 请求方法封装
|   +-- webSocket.js //通知推送功能
|   +-- webSocketChat.js //私聊功能
+-- router // 路由配置
|   +-- modules //路由子模块
|   	+-- admin.js //管理员router
|   	+-- hospitalCenter.js //医院router
|   	+-- notificationCenter.js //通知消息router
|   	+-- petAdopt.js //领养
|   	+-- user.js 
|   	+-- userCenter.js 
|   +-- index
+-- store // vuex 配置使用
|   +-- user // 用户模块
|   +-- admin // 管理员模块
|   +-- hospital // 医院模块
|   +-- news // 资讯模块
|   +-- notification // 消息模块
|   +-- pet // 宠物信息模块
|   +-- petAdopt // 宠物领养模块
|   +-- petHelp // 宠物众筹模块
|   +-- petPublicServer 
|   +-- index.js 
|   +-- permission.js // 权限控制的一些方法
+-- views // 视图  
|   +-- admin // 管理员模块
|   +-- hospital // 医院模块
|   +-- news // 资讯模块
|   +-- notification // 消息模块
|   +-- pet // 宠物信息模块
|   +-- pet-adopt // 宠物领养模块
|   +-- pet-help // 宠物众筹模块
|   +-- user // 用户模块
|   +-- 404.vue
|   +-- home.vue // 首页
|   +-- welcome.vue // 欢迎页
+-- App.vue
+-- main.js
+-- permission.js //路由权限
```



## 部分截图

欢迎页

<img src="https://github.com/dibiaoi/dibiaoi-pet_hz_community_hngy/raw/main/screenPic/%E6%AC%A2%E8%BF%8E%E9%A1%B5.jpg" style="zoom: 67%;" />

首页

<img src="https://github.com/dibiaoi/dibiaoi-pet_hz_community_hngy/raw/main/screenPic/%E9%A6%96%E9%A1%B5.jpg" alt="首页" style="zoom: 67%;" />

首页登录

<img src="https://github.com/dibiaoi/dibiaoi-pet_hz_community_hngy/raw/main/screenPic/%E9%A6%96%E9%A1%B5%E7%99%BB%E5%BD%95.jpg" alt="首页登录" style="zoom: 67%;" />

领养页

<img src="https://github.com/dibiaoi/dibiaoi-pet_hz_community_hngy/raw/main/screenPic/%E9%A6%96%E9%A1%B5-%E9%A2%86%E5%85%BB%E9%A1%B5.jpg" style="zoom: 67%;" />

用户修改个人资料

<img src="https://github.com/dibiaoi/dibiaoi-pet_hz_community_hngy/raw/main/screenPic/%E7%94%A8%E6%88%B7-%E4%BF%AE%E6%94%B9%E4%B8%AA%E4%BA%BA%E8%B5%84%E6%96%99.jpg" style="zoom: 67%;" />

宠物详情

<img src="https://github.com/dibiaoi/dibiaoi-pet_hz_community_hngy/raw/main/screenPic/%E5%AE%A0%E7%89%A9%E8%AF%A6%E6%83%85.jpg" style="zoom:67%;" />

发布领养

<img src="https://github.com/dibiaoi/dibiaoi-pet_hz_community_hngy/raw/main/screenPic/%E5%8F%91%E5%B8%83%E9%A2%86%E5%85%BB.jpg" style="zoom:67%;" />

领养页

<img src="https://github.com/dibiaoi/dibiaoi-pet_hz_community_hngy/raw/main/screenPic/%E9%A6%96%E9%A1%B5-%E9%A2%86%E5%85%BB%E9%A1%B5.jpg" style="zoom:67%;" />

领养详情

<img src="https://github.com/dibiaoi/dibiaoi-pet_hz_community_hngy/raw/main/screenPic/%E9%A2%86%E5%85%BB%E8%AF%A6%E6%83%85.jpg" style="zoom:67%;" />

众筹

<img src="https://github.com/dibiaoi/dibiaoi-pet_hz_community_hngy/raw/main/screenPic/%E4%BC%97%E7%AD%B9%E9%A1%B52.jpg" style="zoom:67%;" />

众筹详情页

<img src="https://github.com/dibiaoi/dibiaoi-pet_hz_community_hngy/raw/main/screenPic/%E4%BC%97%E7%AD%B9%E8%AF%A6%E6%83%85%E9%A1%B5.jpg" style="zoom:67%;" />

资讯页

<img src="https://github.com/dibiaoi/dibiaoi-pet_hz_community_hngy/raw/main/screenPic/%E8%B5%84%E8%AE%AF%E9%A1%B5.jpg" style="zoom:67%;" />

管理员

<img src="https://github.com/dibiaoi/dibiaoi-pet_hz_community_hngy/raw/main/screenPic/%E9%A2%86%E5%85%BB%E7%AE%A1%E7%90%86.jpg" style="zoom:67%;" />

志愿者审核

<img src="https://github.com/dibiaoi/dibiaoi-pet_hz_community_hngy/raw/main/screenPic/%E5%BF%97%E6%84%BF%E8%80%85%E5%AE%A1%E6%A0%B8%E7%A1%AE%E8%AE%A4%E6%A1%86.jpg" style="zoom:67%;" />

