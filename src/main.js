'use strict';


//引入第三方包 开始
import Vue from 'vue';

//VueRouter:引入路由对象
import VueRouter from 'vue-router';
//VueRouter:安装插件
Vue.use(VueRouter);

//Mint:引入mint-ui
// import Mint from 'mint-ui';
//Mint:安装插件
// Vue.use(Mint);
//Mint:引入css
import 'mint-ui/lib/style.css';


// mint-ui 按需引入 开始
import Header from 'mint-ui/lib/header';
import Switch from 'mint-ui/lib/switch';
import Swipe from 'mint-ui/lib/swipe';
import SwipeItem from 'mint-ui/lib/swipe-item';
import Lazyload from 'mint-ui/lib/lazyload';
import Loadmore from 'mint-ui/lib/loadmore';
import Indicator from 'mint-ui/lib/indicator';
import Button from 'mint-ui/lib/button';
Vue.component(Header.name, Header);
Vue.component(Switch.name, Switch);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
// mint-ui 按需引入 结束



//MUI:引入mui的样式
import './static/vendor/mui/dist/css/mui.css';
//全局样式
import './static/css/global.css';


//Axios:引入axios
import Axios from 'axios';
//Axios:挂载原型
Vue.prototype.$ajax = Axios;
//Axios:默认配置
Axios.defaults.baseURL = 'http://182.254.146.100:8899/api/';
//Axios:拦截器操作loadding
Axios.interceptors.request.use(function(config){
    //显示图标
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    return config;
});
Axios.interceptors.response.use(function(config){
    //隐藏图标
    Indicator.close();
    //获取到config中的data，进行加工
    return config;
});




//Moment:引入moment
import Moment from 'moment';

//VuePreview:引入vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

//引入第三方包 结束

//引入全局组件需要的组件对象 开始
import NavBar from './components/common/navBar.vue';
import Comment from './components/common/comment.vue';
import MySwipe from './components/common/mySwipe.vue';
//引入全局组件需要的组件对象 结束

//定义成全局组件或过滤器，大家都能使用 开始
Vue.filter('convertDate',function(value){
    return Moment(value).format('YYYY-MM-DD');
});
Vue.component('navBar',NavBar); //使用最好以nav-bar
Vue.component('comment',Comment);  //使用要以comment
Vue.component('mySwipe',MySwipe);  //使用要以my-Swipe
//定义全局组件或过滤器 结束

//引入自己的vue文件 开始  
import App from './app.vue';
//按需加载
// const Foo = resolve => require(['./Foo.vue'], resolve)
const Home = r => require(['./components/home/home.vue'],r);
const Member = r => require(['./components/member/member.vue'],r);
const Shopcart = r => require(['./components/shopcart/shopcart.vue'],r);
const Search = r => require(['./components/search/search.vue'],r);
const NewsList = r => require(['./components/news/newsList.vue'],r);
const NewsDetail = r => require(['./components/news/newsDetail.vue'],r);
const PhotoShare = r => require(['./components/photo/photoShare.vue'],r);
const PhotoDetail = r => require(['./components/photo/photoDetail.vue'],r);
const GoodsList = r => require(['./components/goods/goodsList.vue'],r);
const GoodsDetail = r => require(['./components/goods/goodsDetail.vue'],r);
const GoodsComment = r => require(['./components/goods/goodsComment.vue'],r);


// import Home from './components/home/home.vue';
// import Member from './components/member/member.vue';
// import Shopcart from './components/shopcart/shopcart.vue';
// import Search from './components/search/search.vue';
// import NewsList from './components/news/newsList.vue';
// import NewsDetail from './components/news/newsDetail.vue';
// import PhotoShare from './components/photo/photoShare.vue';
// import PhotoDetail from './components/photo/photoDetail.vue';
// import GoodsList from './components/goods/goodsList.vue';
// import GoodsDetail from './components/goods/goodsDetail.vue';
// import GoodsComment from './components/goods/goodsComment.vue';

//引入自己的vue文件 结尾


//VueRouter:创建对象并配置路由规则！！！导航
let router = new VueRouter({
    linkActiveClass:'mui-active',
    routes: [
        //VueRouter：配置路由规则
        { path: '/', redirect: { name: 'home' } }, //重定向
        { name: 'home', path: '/home', component: Home },//首页
        { name:'member',path:'/member',component: Member}, //会员
        { name: 'shopcart',path:'/shopcart',component:Shopcart}, //购物车
        { name: 'search',path:'/search',component:Search}, //查找
        { name:'news.list',path:'/news/list',component:NewsList}, //新闻列表
        { name:'news.detail',path:'/news/detail',component:NewsDetail}, //新闻详情
        { name:'photo.share',path:'/photo/share',component:PhotoShare}, //图文分享
        { name:'photo.detail',path:'/photo/detail/:id',component:PhotoDetail},//图片详情
        { name:'goods.list',path:'/goods/list', component:GoodsList}, //商品列表
        { name:'goods.detail',path:'/goods/detail',component:GoodsDetail}, //商品详情
        { name:'goods.comment',path:'/goods/comment',component:GoodsComment},//商品评论
        { name:'goods.pictureInfo',path:'/goods/pictureinfo',component:NewsDetail},//图文介绍
    ]
});

console.log('抽取css+hash以后');
console.log('提取第三方包以后');
console.log('提取加入名称使用以后');

//创建vue实例
new Vue({
    el: '#app',
    router,
    render: c => c(App)
})