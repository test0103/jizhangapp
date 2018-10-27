<template>
    <div class="Account">
        <header class="accounthead">
            消费账户
        </header>
        <div v-if="list.length!=0" class="content" v-for="(item,i) in list" :key="i">
            <div @click="accountinfo(item.consumeTypeId,item.name)" class="contentmain">
                <img :src="item.photo" alt="">
                <span>{{item.name}}</span>
                <p class="money">{{item.account}}</p>
            </div>
            <p class="fgx"></p>
        </div>
        <div v-if="flas" @click="noresige">
            <div class="content">
                <div class="contentmain">
                    <img src="../../static/images/xianjin.png" alt="">
                    <span>现金</span>
                    <p class="money">0</p>
                </div>
                <p class="fgx"></p>
            </div>
            <div class="content">
                <div class="contentmain">
                    <img src="../../static/images/weixin.png" alt="">
                    <span>微信</span>
                    <p class="money">0</p>
                </div>
                <p class="fgx"></p>
            </div>
            <div class="content">
                <div class="contentmain">
                    <img src="../../static/images/zfb.png" alt="">
                    <span>支付宝</span>
                    <p class="money">0</p>
                </div>
                <p class="fgx"></p>
            </div>
            <div class="content">
                <div class="contentmain">
                    <img src="../../static/images/xyk.png" alt="">
                    <span>信用卡</span>
                    <p class="money">0</p>
                </div>
                <p class="fgx"></p>
            </div>
            <div class="content">
                <div class="contentmain">
                    <img src="../../static/images/cuk.png" alt="">
                    <span>储蓄卡</span>
                    <p class="money">0</p>
                </div>
                <p class="fgx"></p>
            </div>
        </div>
    </div>
</template>

<script>
import remote from "../assets/js/remote.js";
import { MessageBox ,Toast } from "mint-ui";

export default {
    name: "Account",
    data() {
        return {
            list: [],
            flas:false
        };
    },
    mounted() {
        this.getData();
    },
    created(){
    },
    methods: {
        accountinfo(res, data) {
            this.$toStatistic('comsumer');
            this.$router.push({
                path: "/AccountInfo",
                query: { consumeTypeId: res, name: data }
            });
        },
        getData() {
            if (!localStorage.getItem("ticket")) {
                this.flas=true
                // MessageBox.confirm("您还未登录,是否前往登录").then(res => {
                //     //跳转会员连接口
                //     this.$router.push({
                //         path: "/login"
                //     });
                // });
                // return;
            }else{
                this.flas=false
            }
            //获取所有消费账户余额
            let ticket = localStorage.getItem("ticket");
            let userId = localStorage.getItem("userId");
            remote
                .countAllBalance({
                    ticket: ticket,
                    userId: userId
                })
                .then(res => {
                    console.log(res);
                    if (res.data.code == "200") {
                        this.list = res.data.consumeTypeVOList;
                    }
                });
        },
        noresige(){
             Toast({
                    message: '您未登录无法使用该功能',
                    position: 'middle',
                    duration: 800
                    })
        }
    }
};
</script>
<style lang="less" scoped>
.accounthead {
    padding-top: 0.2rem;
    width: 100%;
    height: 1.6rem;
    line-height: 1.4rem;
    text-align: center;
    font-size: 0.52rem;
    box-sizing: border-box;
    border-bottom: 0.5px solid #f7f7f7;
}
.content {
    .contentmain {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        box-sizing: border-box;
        font-size: 0.4rem;
        color: #333;
        img {
            width: 0.857rem;
        }
        .money {
            width: 40%;
            text-align: right;
        }
        span {
            width: 20%;
            margin-left: -2rem;
        }
    }
    .fgx {
        width: 100%;
        height: 0.2rem;
        background-color: #f6f6f6;
    }
}
</style>
