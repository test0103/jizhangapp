<template>
    <div class="Login">
        <nav-info :flag="flag" v-on:setflag="changeflag"></nav-info>
        <div v-show="flag==false" class="login">
            <p @click="goBack"><img src="../../../static/images/X@2x.png" alt=""></p>
            <div class="lgoin"> <img src="../../../static/images/login.png" alt=""></div>
            <div class="input">
                <div class="one"><img src="../../../static/images/phone@2x.png" alt=""><input v-model="phone" onkeyup="value=value.replace(/[^\d]/g,'')" type="text" maxlength="11" placeholder="请输入手机号"></div>
                <div class="two"><img src="../../../static/images/key@2x.png" alt=""><input type="password" v-model="password" placeholder="请输入密码"></div>
            </div>
            <div class="denglu" @click="login">登录</div>
            <div class="mima">
                <p @click="mima(1)" class="one">忘记密码？</p>|<p @click="mima(2)" class="two">现在注册</p>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import remote from "../../assets/js/remote.js";
import NavInfo from "../../commons/navInfo.vue";

export default {
    name: "login",
    components: {
        NavInfo
    },
    data() {
        return {
            phone: "",
            password: "",
            flag: true
        };
    },
    beforeCreate() {

    },
    beforeMount() {
        // alert('日了狗，更新成功了吗？')
        if (localStorage.getItem("ticket")) {
            this.$router.push({
                path: "/Tally",
                query: { id: 1 }
            });
        }
        let isOnceMoreEnter = window.localStorage.getItem("isOnceMoreEnter");
        if (isOnceMoreEnter) {
            this.flag = false;
        } else {
            this.flag = true;
            window.localStorage.setItem("isOnceMoreEnter", true);
        }
    },
    Mount() {},

    methods: {
        goBack() {
            this.$router.push({
                path: "/Tally",
                query: { id: 1 }
            });
        },
        login() {
            // console.log(111);
            // console.log(this.password);

            // console.log(urljm(this.password));
            this.$toStatistic("login");
            if (!this.phone) {
                MessageBox("温馨提示", "请输入手机号");
                return;
            } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
                MessageBox("非法手机号", "请输入正确手机号");
                return;
            } else if (!this.password) {
                MessageBox("温馨提示", "请输入密码");
                return;
            }
            // 登录接口
            remote
                .login({
                    username: this.phone,
                    password: this.$urlEncrypt(this.password)
                })
                .then(res => {
                    // console.log(res);
                    if (res.data.code == "200") {
                        localStorage.setItem("ticket", res.data.result);
                        localStorage.setItem("phone", this.phone);
                        this.getUserInfo(res.data.result);
                        this.goBack();
                        // 检测用户是否重复登录
                        // let timeId = setInterval(() => {
                        //     remote
                        //         .isLogined({
                        //             ticket: res.data.result
                        //         })
                        //         .then(res1 => {
                        //             console.log(123456789);
                        //             console.log(res1);

                        //             if (res1.data.code == "-7") {
                        //                 clearInterval(timeId);
                        //                 MessageBox(
                        //                     res1.data.result
                        //                 );
                        //                 this.$router.push({
                        //                     path: "/login"
                        //                 });
                        //             }
                        //         });
                        // }, 1000);
                    } else if (res.data.code == "505") {
                        MessageBox("登录失败", "用户名或密码无效");
                    } else {
                        MessageBox("登录失败", res.data.result);
                    }
                });
        },
        mima(res) {
            if (res == 1) {
                this.$toStatistic("forgetPwd");
                this.$router.push({
                    path: "/findmima"
                });
            } else if (res == 2) {
                this.$toStatistic("regist");
                this.$router.push({
                    path: "/register"
                });
            }
        },
        getUserInfo(e) {
            // 根据ticket获取用户信息
            remote.userInfo(e).then(res => {
                // console.log(res);
                if (res.data.code == "200") {
                    localStorage.setItem("userId", res.data.result.userId);
                }
            });
        },
        changeflag(e) {
            // 接收子组件传来的数据
            this.flag = e;
        }
    }
};
</script>
<style lang="less" scoped>
.login {
    width: 100%;
    height: 100vh;
    overflow: auto;
    background-color: #f3f3f3;
    padding-top: 1rem;
    box-sizing: border-box;
    p {
        width: 100%;
        padding-left: 1rem;
        box-sizing: border-box;
        img {
            width: 0.8rem;
        }
    }
    .lgoin {
        margin-top: 1rem;
        width: 100%;
        display: flex;
        justify-content: center;
        img {
            width: 2rem;
            height: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 11px 50px -15px #ffc72e;
        }
    }
    .input {
        width: 100%;
        margin-top: 2rem;
        div {
            width: 80%;
            height: 1.4rem;
            border-radius: 1.4rem;
            background-color: #eaeaea;
            display: flex;
            margin: 0 auto;
            align-items: center;
            img {
                margin-left: 1rem;
                width: 0.8rem;
                height: 0.8rem;
            }
            input {
                padding-left: 0.5rem;
                border: 0;
                outline: none;
                font-size: 0.42rem;
                background-color: #eaeaea;
            }
            input::-webkit-input-placeholder {
                font-size: 0.42rem;
                color: #b8becc;
            }
        }
        .two {
            margin-top: 0.8rem;
        }
    }
    .denglu {
        margin: 0 auto;
        width: 80%;
        height: 1.4rem;
        text-align: center;
        line-height: 1.4rem;
        border-radius: 1.4rem;
        background-color: #ffc72e;
        box-shadow: 0 11px 50px -15px #ffc72e;
        font-size: 0.48rem;
        color: #333;
        margin-top: 1.5rem;
    }
    .mima {
        margin-top: 1.5rem;
        width: 100%;
        display: flex;
        color: #b8becc;
        font-size: 0.42rem;
        .one {
            padding-left: 0;
            text-align: right;
            padding-right: 0.5rem;
            color: #ffc72e;
        }
        .two {
            text-align: left;
            padding-left: 0.5rem;
            color: #333;
        }
    }
}
</style>
