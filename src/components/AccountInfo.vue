<template>
    <!-- 我是记账页面 -->
    <div class="Tally">
        <header class="tallnav">
            <div class="nav">
                <div @click="goBack" class="imgage"></div>
                <p><img @click="redece(year,month)" src="../../static/images/zuoshanjiao.png" alt=""> <span>{{year}}年{{month>=10?month:'0'+month}}月</span><img @click="addym(year,month)" src="../../static/images/yousanjiao.png" alt=""></p>
            </div>
        </header>
        <div class="main">
            <div class="letbottom">
                <div class="letbottomp"><i>￥</i>{{Number(setmoney).toFixed(1)}}<img src="../../static/images/draw@2x.png" alt="" @click="setMoney(1)"></div>
                <p>账户余额</p>
            </div>
            <div class="consumption">
                <div class="income">
                    <p class="down">￥{{income||0}}</p>
                    <p class="up"><i></i>总流入</p>
                </div>
                <div class="expend">
                    <p class="down">￥{{expend||0}}</p>
                    <p class="up"><i></i>总流出</p>
                </div>
            </div>
        </div>
        <p class="division"></p>
        <div class="content">
            <div v-show="!showContent" class="add"><img src="../../static/images/jizhang.png" alt="">
                <p>您当天还没有记账记录哦</p>
            </div>
            <div v-show="showContent" class="contentlist" v-for="(item,i) in AllBillList" :key="i">
                <div class="times">
                    <div class="left">
                        <i></i>
                        <span>{{item[0][0].split('-')[1]}}月{{item[0][0].split('-')[2]}}日</span>
                        <span>{{item[0][1]}}</span>
                    </div>
                    <div class="right">
                        <span>支出：{{item[0][2]}}</span>
                        <span class="two">收入：{{item[0][3]}}</span>
                    </div>
                </div>
                <div class="contentmain">
                    <div @click="bianji(subItem.bookkeepingId)" class="list" v-for="(subItem,i) in item[1]" :key="i">
                        <img :src="subItem.photo" alt="">
                        <span>{{subItem.typeName}}（{{subItem.consumeType}}）</span>
                        <p :class="{listtwwo:(subItem.typeCode==1)}" v-text="subItem.typeCode==1? '-'+subItem.spending:'+'+subItem.spending"></p>
                    </div>
                </div>
                <!-- </div> -->
            </div>
        </div>
        <div @click="jiyb" class="jyb">
            记一笔
        </div>
        <div class="jyb1">
        </div>
        <!-- 设置金额 -->
        <div v-if="isShow2==2" class="set">
            <div class="setmoney">
                <p class="one"><i @click="setMoney(2)"><img src="../../static/images/X@2x.png" alt=""></i></p>
                <p class="two">修改账户余额</p>
                <input type="number" placeholder="请输入金额" v-model="setmoney1">
                <button @click="baocun(1)">保存</button>
            </div>
        </div>
    </div>
</template>

<script>
import remote from "../assets/js/remote.js";
import { MessageBox } from "mint-ui";
export default {
    name: "AccountInfo",
    data() {
        return {
            isShow2: 1,
            setmoney: 0,
            income: "0.00",
            expend: "0.00",
            birthday: "点击",
            year: "",
            month: "",
            userId: "",
            createTime: "",
            consumeTypeId: "",
            ticket: "",
            name: "",
            AllBillList: [],
            showContent: true,
            accountId: "",
            setmoney1:""
        };
    },
    created() {
        this.rili();
        this.getDate();
        // this.userId = localStorage.getItem('userId')
    },
    methods: {
        bianji(res) {
            this.$toStatistic("lookInfo");
            this.$router.push({
                path: "/calendarInfo",
                query: { bookkeepingId: res }
            });
        },
        goBack() {
            this.$router.push({
                path: "/index",
                query: { id: 2 }
            });
        },
        setMoney(res) {
            if (res == 1) {
                this.isShow2 = 2;
            } else if (res == 2) {
                this.isShow2 = 1;
            }
        },
        baocun(res) {
            if (res == 1) {
                this.isShow2 = 1;

                let data = {};
                if (this.accountId == "") {
                    data = {
                        createTimeStr: this.createTime,
                        account: this.setmoney,
                        userId: this.userId,
                        consumeTypeId: this.consumeTypeId,
                        ticket: this.ticket,
                        name: this.name
                    };
                } else {
                    data = {
                        createTimeStr: this.createTime,
                        account: this.setmoney,
                        accountId: this.accountId, //没有就不传，有就船值
                        userId: this.userId,
                        consumeTypeId: this.consumeTypeId,
                        ticket: this.ticket,
                        name: this.name
                    };
                }
                remote.addzhanghuyue(data).then(res => {
                    // console.log(res);
                    // console.log(this.setmoney1);
                    
                    if (res.data.code != '200') {
                        MessageBox("提示", "修改不成功");
                    }
                    if (res.data.code == '200') {
                        this.setmoney = this.setmoney1;
                    }
                });
            }
        },
        jiyb() {
            this.$router.push({
                path: "/Remember",
                query: { name: this.name,consumeTypeId :this.$route.query.consumeTypeId
                }
            });
        },
        rili() {
            let data = new Date();
            this.year = data.getFullYear();
            this.month = data.getMonth() + 1;
        },
        addym() {
            if (this.month == 12) {
                this.month = 0;
                this.year++;
            }
            this.month++;
            this.getDate();
        },
        redece() {
            if (this.month == 1) {
                this.month = 13;
                this.year--;
            }
            this.month--;
            this.getDate();
        },
        // baocun(){

        // },
        getDate() {
            this.ticket = localStorage.getItem("ticket");
            this.userId = localStorage.getItem("userId");
            this.createTime =
                this.year +
                "-" +
                (this.month >= 10 ? this.month : "0" + this.month) +
                "-" +
                "01";
            this.consumeTypeId = this.$route.query.consumeTypeId;
            this.name = this.$route.query.name;
            // console.log(name);
            //查询当月余额
            remote
                .Consumeraccount({
                    userId: this.userId,
                    createTime: this.createTime,
                    name: this.name
                })
                .then(res => {
                    console.log(2323);

                    // console.log(res);
                    if (res.data.result == null) {
                        //没有设置金额，金额为0
                    } else {
                        this.setmoney = res.data.result.account;
                        this.accountId = res.data.result.accountId;
                    }
                });
            //查询当月总流出
            remote
                .selectBySpendingName({
                    typeCode: 1,
                    createTime: this.createTime,
                    userId: this.userId,
                    name: this.name
                })
                .then(res => {
                    // console.log(res);
                    this.expend = res.data.result;
                });
            //查询当月总收入
            remote
                .selectBySpendingName({
                    typeCode: 2,
                    createTime: this.createTime,
                    userId: this.userId,
                    name: this.name
                })
                .then(res => {
                    // console.log(res);
                    this.income = res.data.result;
                });
            // 查询单月的所有记账记录，统计当天的记账记录和收入，支出
            remote
                .selectByTimeAndId({
                    userId: this.userId,
                    createTime: this.createTime,
                    name: this.name
                })
                .then(res => {
                    console.log("*******记账记录********");

                    console.log(res);
                    if (res.data.code == "200") {
                        this.AllBillList = [];
                        let list = res.data.result;
                        for (let key in list) {
                            if (list[key].length > 0) {
                                let keyList = key.split(":");
                                this.AllBillList.unshift([keyList, list[key]]);
                            }
                        }
                        this.showContent = true;
                        console.log(this.AllBillList);

                        if (this.AllBillList.length == 0) {
                            this.showContent = false;
                        }
                    }
                });
        }
    }
};
</script>
<style lang="less" scoped>
.Tally {
    width: 100%;
    position: relative;
    background-color: #f6f6f6;
    height: 100vh;
    overflow: auto;
}
.tallnav {
    width: 100%;
    height: 5rem;
    background-color: #ffc72e;
    position: relative;
    padding-top: 0.8rem;
    box-sizing: border-box;
    .nav {
        display: flex;
        align-items: center;
        line-height: 1.4rem;
        height: 1.4rem;
        box-sizing: border-box;
        text-align: center;
        font-size: 0.4rem;
        .imgage {
            width: 12%;
            height: 100%;
            background: url(../../static/images/back@2x.png) no-repeat center
                center;
            background-size: 0.5rem;
            z-index: 1;
        }
        p {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin-left: -10%;
            font-weight: 700;
            span {
                margin: 0 0.4rem;
            }
            img {
                width: 0.2rem;
            }
        }
    }
}
.main {
    position: relative;
    width: 91%;
    height: 5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 34px -16px #eeb006;
    background-color: #fff;
    margin: 0 auto;
    margin-top: -2.6rem;
    z-index: 2;
    .letbottom {
        width: 100%;
        position: absolute;
        top: 0.6rem;
        font-size: 0.32rem;
        color: #b8becc;
        text-align: center;
        .letbottomp {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            color: #ffc72e;
            font-weight: bolder;
            box-sizing: border-box;
            >i {
                display: block;
                max-width: 80%;
                font-size: 0.5rem;
                padding-top: 0.4rem;
                overflow: hidden;
            }
            img {
                width: 0.6rem;
                margin-left: 0.4rem;
            }
        }
    }
    .consumption {
        position: absolute;
        bottom: 0.6rem;
        width: 100%;
        display: flex;
        div {
            padding-top: 0.8rem;
            width: 50%;
            height: 2rem;
            box-sizing: border-box;
            p {
                width: 100%;
                height: 0.6rem;
                font-size: 0.32rem;
                color: #b8becc;
                display: flex;
                align-items: center;
                justify-content: center;
                >i {
                    width: 1px;
                    height: 1px;
                    border: 2px solid #ffc72e;
                    border-radius: 50%;
                    display: inline-block;
                    margin-right: 0.2rem;
                }
            }
            .down {
                font-weight: bold;
                font-size: 0.5rem;
                color: #333;
            }
        }
        div.expend {
            p.up {
                font-size: 0.32rem;
                i {
                    border: 2px solid #7ed321;
                }
            }
        }
    }
}
.division {
    margin-top: 0.5rem;
    width: 100%;
    height: 0.2rem;
    background-color: #f6f6f6;
}
.content {
    width: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
    overflow: hidden;
    background-color: #fff;
    min-height: 9.8rem;
    .contentlist {
        .times {
            box-sizing: border-box;
            padding: 0 0.5rem;
            display: flex;
            width: 100%;
            height: 1.24rem;
            line-height: 1.24rem;
            color: #b8bece;
            font-size: 0.32rem;
            .left {
                display: flex;
                align-items: center;
                width: 40%;
                i {
                    display: inline-block;
                    width: 0px;
                    height: 0.2rem;
                    border: 1px solid #ff5b3e;
                    margin-right: 0.2rem;
                }
            }
            .right {
                width: 60%;
                text-align: right;
                span.two {
                    margin-left: 0.3rem;
                }
            }
        }
    }
    .contentmain {
        width: 100%;
        border-top: 1px solid #f7f7f7;
        border-bottom: 1px solid #f7f7f7;
        .list {
            padding: 0 0.5rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 1.5rem;
            color: #333;
            font-size: 0.42rem;
            img {
                width: 0.8rem;
            }
            span {
                margin-left: -1rem;
            }
            p {
                width: 40%;
                text-align: right;
                font-size: 0.48rem;
                font-weight: bold;
                color: #ffc72e;
            }
            .listtwwo {
                color: #7ed321;
            }
        }
    }
}
.jyb {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #ffc72e;
    height: 1.4rem;
    text-align: center;
    line-height: 1.4rem;
    font-size: 0.48rem;
    color: #333;
    z-index: 200;
}
.jyb1 {
    position: static;
    height: 1.4rem;
    width: 100%;
    bottom: 0;
}
.add {
    margin-top: 2rem;
    width: 100%;
    height: 0.2rem;
    text-align: center;
    font-size: 0.4rem;
    color: #b8becc;
    img {
        width: 1rem;
        margin-bottom: 0.4rem;
    }
}
.set {
    position: fixed;
    top: 0;
    width: 100%;
    height: 18rem;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    .setmoney {
        width: 80%;
        height: 6rem;
        background-color: #fff;
        border-radius: 0.6rem;
        text-align: center;
        margin-top: -2rem;
        .one {
            line-height: 0.8rem;
            text-align: right;
            padding-right: 0.5rem;
            box-sizing: border-box;
        }
        i {
            max-width: 80%;
            img {
                margin-top: 0.57rem;
                width: 0.57rem;
            }
        }
        .two {
            line-height: 1.2rem;
            font-size: 0.5rem;
            font-weight: 700;
        }
        input,
        button {
            height: 1.2rem;
            width: 70%;
            border-radius: 1.2rem;
            background-color: #f2f2f2;
            outline: none;
            border: 0px;
            margin: 0.2rem auto;
            text-align: center;
        }
        button {
            display: block;
            background-color: #eeb006;
        }
    }
}
</style>
