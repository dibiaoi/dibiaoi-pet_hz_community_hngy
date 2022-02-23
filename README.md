# 基于Vue的宠物爱心平台PC端

这是一个和前同学合作的项目，功能完善。

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

## 部分截图



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



