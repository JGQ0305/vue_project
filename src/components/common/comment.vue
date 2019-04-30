<template>
    <div>
                <!-- 评论内容开始 -->
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a @click="goback">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="msg"></textarea>
                </li>
                <li>
                   <mt-button @click="sendComment" size="large" type="primary">发表评论按钮</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>66条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in comments" :key="index">
                    {{comment.user_name}}：{{comment.content}} {{comment.add_time|convertDate}}
                </li>
               
            </ul>
            <mt-button type="danger" size="large" plain @click="loadByPage">加载更多按钮</mt-button>
        </div>

        <!-- 评论内容结束 -->

    
<!--改变颜色<mt-button type="default">default</mt-button>
<mt-button type="primary">primary</mt-button>
<mt-button type="danger">danger</mt-button> -->

<!-- 改变大小
<mt-button size="small">small</mt-button>
<mt-button size="large">large</mt-button>
<mt-button size="normal">normal</mt-button>
幽灵按钮
<mt-button type="danger" plain>plain</mt-button> -->


    </div>
</template>
<script>
    export default {
        data(){
            return {
                 comments:[],//存放评论数据
                 pageIndex:1,//页码
                 msg:'',//发表的评论
            }
        },created(){
            //评论操作 开始
            this.loadFirst();
            //评论操作 结束
        },props:['cid']
        ,methods:{
        //先调用这个函数
        loadFirst(){
            this.$ajax.get('getcomments/' + this.cid +'?pageindex=1')
            .then(res=>{
                this.comments = res.data.message;
            })
            .catch(err=>{
                console.log(err);
            })
        },
        //再点击按钮
        loadByPage(){
             this.$ajax.get('getcomments/' + this.cid +'?pageindex=' + (++this.pageIndex))
            .then(res=>{
                //追加
                this.comments = this.comments.concat(res.data.message);
            })
            .catch(err=>{
                console.log(err);
            })
        },
        //发表评论
        sendComment(){
            //发表评论请求后台
            this.$ajax.post('postcomment/'+ this.cid,'content='+this.msg)
            .then(res=>{
                console.log(res);
                //获取最新的第一页数据
                this.loadFirst();
                //清空数据
                this.msg = '';
            })
            .catch(err=>{
                console.log(err);
            })
           
        },
        goback(){
            this.$router.go(-1);
        }
    }
    }
</script>
<style scoped>
 /*评论样式 开始*/
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

/*评论样式 结束*/   
</style>