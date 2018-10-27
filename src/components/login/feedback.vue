<template>
    <div class="feedback">
        <header class="tallnav">
            <div class="nav">
                <div @click="goBack" class="imgage" ></div>
                <p>意见反馈</p>
                <span @click="send">发送</span>
            </div>
        </header>
        <div contenteditable="true" @focus="down" class="text" ref="mybox"></div>
        <p v-if="isShow==2" class="fankui">您可以输入您的问题或者建议，我们收到后会及时反馈</p>
       
    </div>
</template>

<script>
import remote from '../../assets/js/remote.js';
import { MessageBox,Toast } from "mint-ui";

export default {
    name: "feedback",
    data() {
        return {
            isShow:2
        };
    },
    created(){
        this.isShow=2
    },
    methods: {
        goBack(){
            this.$router.push({
                path:"/index",
                query:{'id':4}
            })
        },
        down(){
            this.isShow=1
        },
        send(){ 
            if (!localStorage.getItem('ticket')) {
                MessageBox('您还未登录','请前往登录')
                this.$router.push({
                    path:'/login'
                })
                return
            }
            let feedbackLog=this.$refs.mybox.innerHTML
            let ticket = localStorage.getItem('ticket')
            let userId = localStorage.getItem('userId')
            remote.addsuggest({
                userId:userId,
                feedbackLog:feedbackLog,
                ticket:ticket
            }).then(res=>{
                if (res.data.code=='200') {
                    Toast({
                            message: "发送成功",
                            position: "top",
                            duration: 3000
                        });
                }
                
            })
        }
    }
};
</script>
<style lang="less" scoped>
.tallnav {
    position: relative;
    padding-top: 0.2rem;
    box-sizing: border-box;
    .nav {
        display: flex;
        align-items: center;
        line-height: 1.4rem;
        height: 1.4rem;
        box-sizing: border-box;
        text-align: center;
        font-size: 0.4rem;
        border-bottom: 1px solid #f6f6f6;
        .imgage {
            width: 12%;
            height: 100%;
            background: url(../../../static/images/back@2x.png) no-repeat center
                center;
            background-size: 0.5rem;
            z-index: 1;
        }
        p {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin-left: -12%;
            margin-right: -1.5rem;
            font-size: 0.52rem;
        }
        span {
            font-size: 0.38rem;
            width: 1.5rem;
            padding-right: 0.5rem;
            box-sizing: border-box;
        }
    }
}
.text {
    padding: 0.2rem 0.5rem;
    box-sizing: border-box;
    margin-top: 0.5rem;
    width: 100%;
    min-height: 6rem;
    background-color: #F7F7F7;
    font-size: 0.40rem;
    line-height: 0.6rem;
}
p.fankui{  
    position: absolute;
    top: 2.2rem;
    font-size: 0.40rem;
    color: #B8BECC;
    padding-left: 0.5rem;
}
.text:focus{
    outline:none;
}
</style>
