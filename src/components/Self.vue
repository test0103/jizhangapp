<template>
    <div class="Self">
        <header class="selfhead"></header>
        <div class="selcontent">
            <img src="../../static/images/toux.png" alt="">
            <p @click="login" class="zhanghu">{{user}}</p>
        </div>
        <div class="kongbai"></div>
        <div @click="fankui" class="conlist">
            <img src="../../static/images/fankui.png" alt="">
            <span>意见反馈</span>
            <p class="pimg"><img src="../../static/images/rightjt.png" alt=""></p>
        </div>
        <div @click="updating" class="conlist">
            <img src="../../static/images/banben.png" alt="">
            <span>版本更新</span>
            <p class="pimg"><img src="../../static/images/rightjt.png" alt=""></p>
        </div>
        <!-- <div @click="kaivip" class="conlist">
            <img src="../../static/images/vip@2x.png" alt="">
            <span>开通VIP</span>
            <p class="pimg"><img src="../../static/images/rightjt.png" alt=""></p>
        </div> -->
        <div class="confooter" @click="selftu">
            安全退出
        </div>
    </div>
</template>

<script>
import remote from "../assets/js/remote.js";
import { MessageBox } from "mint-ui";

export default {
    name: "Self",
    data() {
        return {
            user: "点击登录"
        };
    },
    created() {
        this.userInfo();
    },
    methods: {
        login() {
            if (localStorage.getItem("ticket")) {
                return
            }
            this.$router.push({
                path: "/login"
            });
        },
        fankui() {
            this.$toStatistic("fankuisugg");
            this.$router.push({
                path: "/feedback"
            });
        },
        userInfo() {
            if (localStorage.getItem("ticket")) {
                let tickerone = localStorage.getItem("ticket");

                remote.userInfo(tickerone).then(res => {
                    // console.log(res);
                    this.user = res.data.result.telephone;
                });
            } else {
                this.user = "点击登录";
            }
        },
        updating() {
            this.$toStatistic("updating");
            this.$router.push({
                path: "/updating"
            });
        },
        selftu() {
            let phone = localStorage.getItem("phone");
            let ticket = localStorage.getItem("ticket");
            remote
                .quit({
                    telephone: phone,
                    ticket: ticket
                })
                .then(res => {
                    // console.log(res);
                    if ((res.data.code = "203")) {
                        MessageBox("提示", "退出成功");
                        localStorage.removeItem("ticket");
                        localStorage.removeItem("userId");
                        localStorage.removeItem("bookType");
                        this.user = "点击登录"
                    }
                });
        },
        // kaivip(){
        //     MessageBox('功能开发中.....')
        // }
    }
};
</script>
<style lang="less" scoped>
.confooter {
    // margin: 4rem auto 0;
    position: absolute;
    top: 80%;
    width: 70%;
    height: 1.4rem;
    border-radius: 1.4rem;
    background-color: #f6f6f6;
    font-size: 0.58rem;
    color: #333;
    text-align: center;
    line-height: 1.4rem;
    transform:translateX(25%) 
}
.selfhead {
    width: 100%;
    height: 3.5rem;
    background-color: #ffc72e;
}
.kongbai {
    width: 100%;
    height: 1rem;
}
.selcontent {
    display: flex;
    padding-left: 1rem;
    box-sizing: border-box;
    align-items: center;
    width: 100%;
    height: 3.5rem;
    box-shadow: 0 10px 34px -16px #eeb006;
    background-color: #fff;
    border-radius: 0.4rem;
    width: 91%;
    margin: 0 auto;
    margin-top: -1.8rem;
    z-index: 2;
    img {
        width: 1.5rem;
        // height: 1.5rem;
        border-radius: 50%;
    }
    .zhanghu {
        width: 70%;
        padding-left: 1rem;
        text-align: left;
        font-size: 0.48rem;
        // font-weight: 700;
    }
}
.conlist {
    height: 2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
    box-sizing: border-box;
    img {
        width: 0.6rem;
    }
    .pimg {
        width: 40%;
        img {
            float: right;
            width: 0.3rem;
        }
    }
    span {
        font-size: 0.48rem;
        color: #333;
        margin-left: -2.5rem;
    }
}
</style>
