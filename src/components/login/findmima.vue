<template>
    <div class="findmima">
        <header class="addhead">
            <div @click="goBack" class="imgage"></div>
            <span>修改密码</span>
        </header>
        <div class="input">
            <div class="one"><img src="../../../static/images/phone@2x.png" alt="">|<input type="text" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="phone" maxlength="11" placeholder="请输入手机号"></div>
            <div class="two"><img src="../../../static/images/key@2x.png" alt="">|<input type="password" v-model="password" placeholder="请输入新密码"></div>
            <div class="two"><img src="../../../static/images/key@2x.png" alt="">|<input type="password" v-model="password1" placeholder="请确认新密码"></div>
            <div class="two"><img src="../../../static/images/dun@2x.png" alt="">|<input type="text" v-model="verification" placeholder="验证码">
                <p :class="{gray: gettingCode}" @click="gian">{{intervalText}}</p>
            </div>
        </div>
        <div class="zhuce" @click="submit">
            提交
        </div>
    </div>
</template>

<script>
import { MessageBox,Toast } from "mint-ui";
import remote from "../../assets/js/remote.js";

export default {
    name: "findmima",
    data() {
        return {
            intervalText: "获取验证码",
            gettingCode: false,
            setTime: 60,
            phone: "",
            password: "",
            password1: "",
            verification: "",
            verification1: ""
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        gian() {
            if (this.gettingCode) {
                return;
            }
            if (!this.phone) {
                MessageBox("温馨提示", "请输入手机号");
                return;
            } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
                MessageBox("非法手机号", "请输入正确手机号");
                return;
            }
            remote
               .gainvft({
                    telephone: this.phone,
                    code: 2,
                    typetwo: 2,
                    status:2
                })
                .then(res => {
                    // console.log(res);

                    if (res.status === 200 && res.data.status === 0) {
                        Toast({
                            message: "验证码已发送到您的手机",
                            position: "top",
                            duration: 3000
                        });
                        this.verification1=res.data.data
                        this.gettingCode = true;
                        this.getIntervalText();
                    } else if (res.data.status === 503) {
                        Toast({
                            message: "获取验证码过于频繁，请稍候再试！",
                            position: "top",
                            duration: 3000
                        });
                        this.gettingCode = false;
                    } else {
                        Toast({
                            message: "获取验证码失败",
                            position: "top",
                            duration: 3000
                        });
                        this.gettingCode = false;
                    }
                })
                .catch(err => {
                    this.gettingCode = false;
                });
        },
        getIntervalText() {
            
            var timer = setInterval(() => {
                if (this.setTime > 0) {
                    this.intervalText = this.setTime + "s 重新获取";
                    this.setTime -= 1;
                } else {
                    this.gettingCode = false;
                    this.intervalText = "获取验证码";
                    clearInterval(timer);
                    this.setTime = 60;
                }
            }, 1000);
        },
        submit() {
            // console.log(this.verification);
            // console.log(this.verification1);
            
            if (!this.phone) {
                MessageBox("温馨提示", "请输入手机号");
                return;
            } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
                MessageBox("非法手机号", "请输入正确手机号");
                return;
            } else if (!this.password) {
                MessageBox("温馨提示", "请输入新密码");
                return;
            } else if (!this.password1) {
                MessageBox("温馨提示", "请确认新密码");
                return;
            } else if (this.password1 !== this.password) {
                MessageBox("温馨提示", "两次密码输入不同");
                return;
            } else if (!this.verification) {
                MessageBox("温馨提示", "请输入手机验证码");
                return;
            } 
            else if (this.verification != this.verification1) {
                MessageBox("温馨提示", "验证码输入不正确");
                return;
            }
            else if (this.password.length<8) {
                 MessageBox("温馨提示", "密码长度不能小于8位");
                return;
            }
            remote
                .retrievePassword({
                    telephone: this.phone,
                    newPassword:this.$urlEncrypt(this.password),
                    code: this.verification
                })
                .then(res => {
                    // console.log(res);
                    if (res.data.code == "200") {
                        console.log(222);
                        MessageBox("密码修改成功", "请重新登录");
                        this.$router.push({
                            path:"/login"
                        })
                    } else if (res.data.code == "210") {
                        MessageBox("找回密码失败", "数据异常");
                    }
                });
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
    border-bottom: 1px solid #f6f6f6;
    .imgage {
        width: 10%;
        height: 100%;
        background: url(../../../static/images/back@2x.png) no-repeat center
            center;
        background-size: 0.54rem;
        z-index: 1;
    }
    span {
        width: 100%;
        text-align: center;
        margin-left: -10%;
    }
}
.input {
    width: 100%;
    div {
        width: 100%;
        height: 1.6rem;
        display: flex;
        margin: 0 auto;
        align-items: center;
        border-bottom: 1px solid #f6f6f6;
        color: #b8becc;
        img {
            margin-left: 0.5rem;
            margin-right: 0.3rem;
            width: 0.6rem;
            height: 0.6rem;
        }
        input {
            width: 60%;
            padding-left: 0.5rem;
            border: 0;
            outline: none;
            font-size: 0.42rem;
        }
        input::-webkit-input-placeholder {
            font-size: 0.42rem;
            color: #b8becc;
        }
        p {
          width: 30%;
            font-size: 0.36rem;
            color: #ffc72e;
            padding-right: 0.5rem;
            box-sizing: border-box;
        }
        p.gray {
            color: #d5d5d5;
        }
    }
}
.zhuce {
    width: 70%;
    height: 1.5rem;
    border-radius: 1.5rem;
    background-color: #ffc72e;
    font-size: 0.48rem;
    line-height: 1.5rem;
    text-align: center;
    margin: 4rem auto;
}
</style>
