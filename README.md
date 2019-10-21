### 博客网站
本博客采用`React+antd+umi+dva`技术栈实现。用于学习和交流。线上地址[https://www.immisso.com](https://www.immisso.com)

### 怎么运行？
怎么运行该博客网站呢？很简单

1. 安装依赖

```javascript
  npm install
```
或者
```javascript
  yarn
```

2. 启动程序

```javascript
  npm run start
```
或者

```javascript
  yarn start
```
然后在浏览器中打开`http://localhost:8000`即可
### 运行效果图
1.文章首页
![](https://immisso.oss-cn-hangzhou.aliyuncs.com/view/blog1.png)
2.内容详情页
![](https://immisso.oss-cn-hangzhou.aliyuncs.com/view/blog2.png)
![](https://immisso.oss-cn-hangzhou.aliyuncs.com/view/blog6.png)
3.评论
![](https://immisso.oss-cn-hangzhou.aliyuncs.com/view/blog3.png)
4.登录
![](https://immisso.oss-cn-hangzhou.aliyuncs.com/view/blog4.png)
5.注册
![](https://immisso.oss-cn-hangzhou.aliyuncs.com/view/blog5.png)

### 功能描述

#### 已实现的功能
+ 登录
+ 注册
+ 分类
+ 文章列表
+ 作者个人信息
+ 点赞评论
+ 留言
+ 文章详情
+ 代码高亮
+ 文章详情目录

#### 待实现功能
+ 文章管理
+ 发文
+ 文档类文章编写功能
+ ...


#### 后期重构
+ hooks

### 技术栈
该项目采用前后端分离技术。目前[github](https://github.com/immisso/Blog)上暂时只开源了前端部分。服务端采用Python开发，将会在后期陆续开源出来。为了保存网站的完整显示。使用了mock数据。数据来源都是自己[博客网站](https://github.com/immisso/Blog)上的数据。主要功能实现模块包括
+ `react 16.8.6`
+ `antd 3.19.5`
+ `umi 2.7.7`
+ `dva ^2.6.0-beta.6`
+ `marked 0.7.0`
+ `highlight.js 9.15.10`

### 最后
许多功能会后续逐渐完善，这不仅仅是一个小小的博客网站。也是学习的一个历程。逐渐提高自己的过程。也希望感兴趣的朋友一起来完善它，向一个'大网站'进发。