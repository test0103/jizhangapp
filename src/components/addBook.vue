<template>
    <div class="addBook">
        <header class="addhead">
            <div @click="goBack" class="imgage"></div>
            <span>添加账本类型</span>
        </header>
        <div @click="addbook(item.bookType,item.photo,item.note)" class="addcontent" v-for="(item,i) in billTypeList" :key="i">
            <img :src="item.photo2" alt="">
            <div class="content">
                <p class="one">{{item.bookType}}</p>
                <p class="two">{{item.note}}</p>
            </div>
        </div>
        <!-- <div class="addcontent">
            <img src="../../static/images/richangzb.png" alt="">
            <div class="content">
                <p class="one">日常账本</p>
                <p class="two">记录生活点滴，和家人一起分享</p>
            </div>
        </div> -->
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import remote from "../assets/js/remote.js";
export default {
    name: "addBook",
    data() {
        return {
            pageIndex:1,
            pageSize:10,
            userId:'test01',
            billTypeList:[]
        };
    },
    mounted(){
        this.userId = localStorage.getItem('userId')
        this.getBillType()
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        addbook(bookType,photo,note){
            console.log(bookType);
            console.log(photo);
            
            remote.addBill({
                bookType:bookType,
                photo:photo,
                userId:this.userId,
                note:''
            }).then(res=>{
                console.log(res);
                if(res.data.code == '200'){
                    // 添加账本请求成功跳转
                    this.$router.push({
                        path:'/Tally'
                    })   
                }else if(res.data.code == '-1'){
                    Toast({
                    message: '您未登录无法使用该功能',
                    position: 'middle',
                    duration: 800
                    }
                )
                }
            })
            
        },
        getBillType(){
            remote.allBillType({
                pageIndex:this.pageIndex,
                pageSize:this.pageSize
            }).then(res=>{
                console.log(res);
                if(res.data.code == '200'){
                    this.billTypeList = res.data.ZbKPageInfo.list
                    console.log(this.billTypeList);
                    
                }
            })
        }
    }
};
</script>
<style lang="less" scoped>
.addhead {
    display: flex;
    align-items: center;
    line-height: 1.4rem;
    height: 1.6rem;
    padding-top: 0.2rem;
    box-sizing: border-box;
    text-align: center;
    font-size: 0.54rem;
    border-bottom: 1px solid #f7f7f7;
    .imgage {
        width: 10%;
        height: 100%;
        background: url(../../static/images/back@2x.png) no-repeat center center;
        background-size: 0.54rem;
        z-index: 1;
    }
    span {
        width: 100%;
        text-align: center;
        margin-left: -10%;
    }
}
.addcontent {
    width: 100%;
    height: 2.2rem;
    padding: 0 0.5rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f6f6f6;
    img {
        width: 1rem;
        z-index: 2;
    }
    .content {
        padding-left: 0.6rem;
        box-sizing: border-box;
        width: 100%;
        font-size: 0.38rem;
        color: #B8BECC;
        .one {
            font-size: 0.5rem;
            font-weight: 700;
            color: #333;
        }
    }

}
</style>
