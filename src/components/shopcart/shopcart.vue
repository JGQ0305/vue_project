<template>
    <div class="tmpl">
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li v-for="(goods,index) in goodsList" :key="goods.id"  class="p-list">
                    <mt-switch v-model="goods.isPicked"></mt-switch>
                    <img :src="goods.thumb_path">
                    <div class="pay-calc">
                        <p v-text="goods.title"></p>
                        <div class="calc">
                            <span>￥{{goods.sell_price}}</span>
                            <span @click="sub(index)">-</span>
                            <span >{{goods.num}}</span>
                            <span @click="add(index)">+</span>
                            <a href="javascript:;" @click="del(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.num}}件，总价￥{{payment.sum}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
//引入商品操作工具对象
import prodTools from '../common/prodTools.js';
//通知底部变更数据
import connect from '../common/connect.js';
export default {
    data(){
        return {
            //也会将对象的子属性继续做defineProperty
            //作为一个对象的属性，被Object.defineProperty(obj,'goodsList',{
            //          set:function(){  当obj.goodsList=xxx的时候触发  }
            //
            //})
            goodsList:[],//商品数组数据
        }
    },
    created(){
        //获取local的数据
        let prods = prodTools.getProds(); 

        //判断如果没有商品，return
        if(Object.keys(prods).length === 0)return;

        //prods{"87":4,"89":10,"93":11,"95":16}
        let url = 'goods/getshopcarlist/';
        url += Object.keys(prods).join(',');

        //发起请求，将数据挂上
        this.$ajax.get(url)
        .then(res=>{
            this.goodsList = res.data.message;
             //prods{"87":4,"89":10,"93":11,"95":16}   ele.id-> 87
            this.goodsList.forEach((ele,index)=>{
                if(prods[ele.id]){ //数量
                    //在vue中添加属性，是没有办法做到响应，setter
                    // ele.num = prods[ele.id];
                    // ele.isPicked = true;
                    
                    //添加属性一定要this.$set
                    this.$set(ele,'num',prods[ele.id]);
                    this.$set(ele,'isPicked',true);

                }
            })


        })
        .catch(err=>{
            console.log(err);
        })

    },
    methods:{
        add(i){
            this.goodsList[i].num++;
            connect.$emit('addShopcart',1);
            prodTools.addOrUpdate({
                id:this.goodsList[i].id,
                num:1, //如果存在，追加1，否则新增1
            })


        },
        sub(i){
            if(this.goodsList[i].num<= 1) return;
            this.goodsList[i].num--;
             connect.$emit('addShopcart',-1);//加上-1就是减一
             prodTools.addOrUpdate({
                id:this.goodsList[i].id,
                num:-1, //如果存在，追加1，否则新增1
            })
        },
        del(i){
            //删除内存，删除storage,通知下方number小球
            let goods = this.goodsList[i];
            //删除storage
            prodTools.delete(goods.id)
            //通知下方number小球
            connect.$emit('addShopcart',-goods.num);
            //删除内存
            this.goodsList.splice(i,1);
        }
    },
    computed:{
        payment(){
            // 1:如果商品没有被选中，遍历数组中，哪些商品有被选中，如果是
            // 2:计算总金额= 单价 * 件数
            // 3:将以上总金额累计
            // 4:如果是 +元素的num 件数 
            let num = 0;
            let sum = 0;
            this.goodsList.forEach((ele)=>{
                if(ele.isPicked){
                    //选中
                    sum += ele.num * ele.sell_price;//总价
                    num += ele.num;//金额
                }
            })
            return {
                num,sum
            };
        }
    }
}



</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
