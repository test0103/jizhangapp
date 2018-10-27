<template>
    <!-- 我是记账页面 -->
    <div class="Tally">
        <header class="tallnav">
            <div class="nav">
                <img @click="zhezhao(1)" class="left" src="../../static/images/zb.png" alt="">
                <img @click="toBookDetail" class="right" src="../../static/images/rl.png" alt="">
            </div>
        </header>
        <div class="main">
            <div class="letTop">
                <p>{{bookType}}</p>
            </div>
            <div class="rightTop" @click="chooseMonth">
                <p>{{currentYear}}年</p>
                <p class="rightTopbotm">{{currentMonth}}月<img src="../../static/images/sanjiao.png" alt=""></p>
            </div>
            <div class="letbottom">
                <p>本月预算剩余</p>
                <div class="letbottomp"><i>￥</i>{{Number(budget).toFixed(1)}}<img src="../../static/images/draw@2x.png" alt="" @click="setMoney(1)"></div>
            </div>
        </div>
        <div class="consumption">
            <div class="income">
                <p class="up"><i></i>本月收入</p>
                <p class="down">￥{{monthIncome || 0}}</p>
            </div>
            <div class="expend">
                <p class="up"><i></i>本月支出</p>
                <p class="down">￥{{monthOutlay || 0}}</p>
            </div>
        </div>
        <p class="division"></p>
        <p class="add" v-show="!showContent">~马上添加第一笔账单吧</p>
        <div class="content" v-show="showContent">
            <div class="contentlist" v-for="(item,i) in AllBillList" :key="i">
                <div class="times">
                    <div class="left">
                        <i></i>
                        <span>{{item[0][0].split('-')[1]}}月{{item[0][0].split('-')[2]}}日</span>
                        <span>{{item[0][1]}}</span>
                    </div>
                    <div class="right">
                        <span>支出：{{(item[0][2])}}</span>
                        <span class="two">收入：{{item[0][3]}}</span>
                    </div>
                </div>
                <div class="contentmain">
                    <div @click="bianji(subItem.bookkeepingId)" class="list" v-for="(subItem,i) in item[1]" :key="i">
                        <img :src="subItem.photo" alt="">
                        <span>{{subItem.typeName}}（{{subItem.consumeType}}）</span>
                        <p :class="{listtwwo:(subItem.typeCode==1)}" v-text="(subItem.typeCode==1? '-'+Number(subItem.spending).toFixed(2):'+'+Number(subItem.spending).toFixed(2))"></p>
                    </div>
                    <!-- <div class="list">
                        <img src="../../static/images/cy.png" alt="">
                        <span>餐饮（储蓄卡）</span>
                        <p class="listtwwo">-28.00</p>
                    </div> -->
                </div>
            </div>
        </div>
        <div @click="jyb" class="jyb" id="moveDiv" @mousedown="down" @touchstart="down" @mousemove="move" @touchmove="move" @mouseup="end" @touchend="end">
            <img src="../../static/images/pen@2x.png" alt="">
            <p>记一笔</p>
        </div>
        <!-- 左边遮罩层 -->
        <div v-show="isShow==1" class="zhezhao">
            <div :class="{zhezhaoup:isShow==1}">
                <div class="zzheade">
                    <p class="zb">账本类型</p>
                    <p v-if="isShow1==1" @click="guanli(1)" class="gl">管理</p>
                    <p v-if="isShow1==2" @click="guanli(2)" class="gl">完成</p>
                </div>
                <div class="zzcontent">
                    <div class="zzimg" v-for="(item,i) in userAllBillTypeList" :key="i" @click="selectBill(item.bookType,item.bookId)">
                        <img :src="item.photo" alt="">
                        <p class="zzcon">{{item.bookType}}</p>
                        <div v-if="isShow1==2" @click.stop class="zhouz" @click="del(item.bookId)"><img class="zhouzimg" src="../../static/images/del@2x.png" alt=""></div>
                    </div>
                    <div v-if="userId==null" class="zzimg" @click="selectBill('日常账本','1')">
                        <img src="../../static/images/richang.png" alt="">
                        <p class="zzcon">'日常账本'</p>
                        <div v-if="isShow1==2" @click.stop class="zhouz" @click="del(1)"><img class="zhouzimg" src="../../static/images/del@2x.png" alt=""></div>
                    </div>
                    <div class="zzimg">
                        <img src="../../static/images/richang.png" alt="">
                        <p class="zzcon">添加账本</p>
                        <div class="zhouz1" @click="addbook"><img class="zhouzimg" src="../../static/images/+@2x.png" alt=""></div>
                    </div>
                </div>
            </div>
            <div @click="zhezhao(2)" :class="{yingying:isShow==1}"></div>
        </div>
        <!-- 设置金额 -->
        <div v-if="isShow2==2" class="set">
            <div class="setmoney">
                <p class="one"><i @click="setMoney(2)"><img src="../../static/images/X@2x.png" alt=""></i></p>
                <p class="two">添加预算</p>
                <input type="number" placeholder="请输入预算金额" ref="input1">
                <button @click="setBudget()">保存</button>
            </div>
        </div>
        <!-- 删除长账本弹框 -->
        <div v-if="isShow3==2" class="set">
            <div class="setmoney">
                <p class="one"><i @click="setMoney(3)"><img src="../../static/images/X@2x.png" alt=""></i></p>
                <p class="three1">确认删除该账本</p>
                <p class="three">同时删除该账本的所有记录</p>
                <button @click="baocun()">确认删除</button>
            </div>
        </div>
        <mt-datetime-picker ref="picker" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" @confirm='handleConfirm'>
        </mt-datetime-picker>
    </div>
</template>

<script>
import remote from "../assets/js/remote.js";
import { DatetimePicker, MessageBox, Toast } from "mint-ui";
export default {
    name: "Tally",
    data() {
        return {
            //记一笔悬浮移动
            flags: false,
            position: { x: 0, y: 0 },
            nx: "",
            ny: "",
            dx: "",
            dy: "",
            xPum: "",
            yPum: "",
            //
            isShow: 2,
            isShow1: 1,
            isShow2: 1,
            isShow3: 1,
            setmoney: 20,
            income: "0.00",
            expend: "0.00",
            birthday: "点击",
            pickerVisible: false,
            currentYear: "2018", // 所选年份
            currentMonth: "10", // 所选月份
            createTime: "",
            pageIndex: 1,
            pageSize: 10,
            userId: "test01",
            userAllBillTypeList: [],
            bookType: "日常账本",
            AllBillList: [], // 所有记账记录列表
            budget: "", // 预算
            monthIncome: "", // 月总收入
            monthOutlay: "", // 月总支出
            showContent: true,
            budgetId: " ",
            bookId: "106",
            datae: ""
        };
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            if (from.path == "/addBook") {
                vm.isShow = 1;
            }
        });
    },
    created() {
        if (localStorage.getItem("bookType")) {
            this.bookType = localStorage.getItem("bookType");
        }
        if (this.$store.state.bookType) {
            this.bookType = this.$store.state.bookType;

            console.log(this.$store.state.bookType);
            // console.log(111111111111);
        }
        this.userId = localStorage.getItem("userId");
        console.log(this.userId);

        // this.isShow = 2;
    },
    mounted() {
        // if (this.$store.state.bookType) {
        //     this.bookType=this.$store.state.bookType

        // }
        this.getData();
        this.getUserAllBillType();
    },
    methods: {
        bianji(res) {
            this.$toStatistic("lookInfo");
            this.$router.push({
                path: "/calendarInfo",
                query: { bookkeepingId: res }
            });
        },
        jyb() {
            console.log(this.$store.state.bookId);

            this.$toStatistic("jyb");
            this.$router.push({
                path: "/Remember",
                query: {
                    bookType: this.bookType,
                    currentYear: this.currentYear,
                    currentMonth: this.currentMonth,
                    bookId: this.$store.state.bookId
                }
            });
        },
        toBookDetail() {
            this.$router.push({
                path: "/bookdetails",
                query: {
                    bookType: this.bookType
                }
            });
        },
        getData() {
            console.log(this.bookType);
            console.log(111111111111);

            this.$toStatistic("accounttype");
            this.showContent = true;

            // 获取首页所有数据
            this.createTime = this.formatDate(
                this.currentYear,
                this.currentMonth,
                1
            );
            // 查询预算
            remote
                .queryBudget({
                    userId: this.userId,
                    createTime: this.createTime,
                    bookType: this.bookType
                })
                .then(res => {
                    console.log("*******预算********");

                    console.log(res);
                    if (res.data.code == "200") {
                        if (res.data.result != null) {
                            this.budget = res.data.result.budget;
                            this.budgetId = res.data.result.budgetId;
                            this.bookId = res.data.result.bookId;
                            this.$store.commit(
                                "setBookId",
                                res.data.result.bookId
                            );
                        } else {
                            this.budgetId = "";
                            this.budget = "0.0";
                        }
                    }
                });
            // 查询总支出、总收入
            remote
                .queryAllConsume({
                    userId: this.userId,
                    createTime: this.createTime,
                    bookType: this.bookType,
                    typeCode: 1
                })
                .then(res => {
                    console.log("*******支出********");

                    console.log(res);
                    if (res.data.code == "200") {
                        this.monthOutlay = res.data.result;
                    }
                });
            remote
                .queryAllConsume({
                    userId: this.userId,
                    createTime: this.createTime,
                    bookType: this.bookType,
                    typeCode: 2
                })
                .then(res => {
                    console.log("*******收入********");

                    console.log(res);
                    if (res.data.code == "200") {
                        this.monthIncome = res.data.result;
                    }
                });
            // 查询单月的所有记账记录，统计当天的记账记录和收入，支出
            remote
                .queryAllBill({
                    userId: this.userId,
                    createTime: this.createTime,
                    bookType: this.bookType
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
                                console.log(keyList);

                                this.AllBillList.unshift([keyList, list[key]]);
                            }
                        }
                        console.log(this.AllBillList);

                        if (this.AllBillList.length == 0) {
                            this.showContent = false;
                        }
                    }
                });
        },
        getUserAllBillType() {
            // 获取用户所有账本类型
            remote
                .ownAllBillType({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    userId: this.userId
                })
                .then(res => {
                    // console.log(res);
                    if (res.data.code == "200") {
                        this.userAllBillTypeList = res.data.ZbKPageInfo.list;
                        console.log("*****添加账本*******");
                        console.log(this.userAllBillTypeList);
                    }
                });
        },
        handleConfirm(e) {
            let date = new Date(e);
            this.currentYear = date.getFullYear();
            this.currentMonth = date.getMonth() + 1;
            this.getData();
            // this.getUserAllBillType()
        },
        openPicker() {
            this.$refs.picker.open();
        },
        chooseMonth() {
            this.openPicker();
        },
        zhezhao(res) {
            if (res == 1) {
                this.isShow = 1;
            } else if (res == 2) {
                this.isShow = 2;
                this.isShow1 = 1;
                this.getData();
                this.getUserAllBillType();
            }
        },
        guanli(res) {
            if (res == 1) {
                this.isShow1 = 2;
            } else if ((res = 2)) {
                this.isShow1 = 1;
            }
        },
        addbook() {
            this.$toStatistic("addaccount");
            this.$router.push({
                path: "/addBook"
            });
        },
        setMoney(res) {
            if (res == 1) {
                this.isShow2 = 2;
            } else if (res == 2) {
                this.isShow2 = 1;
            } else if (res == 3) {
                this.isShow3 = 1;
            }
        },
        baocun() {
            // this.isShow3 = 1;
            remote
                .deleteBill({
                    bookId: this.datae
                })
                .then(res => {
                    console.log(res);
                    if (res.data.code == "200") {
                        this.isShow3 = 1;
                        this.bookType = "日常账本";
                        this.getData();
                        this.getUserAllBillType();
                    } else if (res.data.result == "500") {
                        MessageBox("提示", res.data.code);
                    }
                });

            // this.getUserAllBillType();
        },
        del(e) {
            this.$toStatistic("dellaccount");

            this.isShow3 = 2;
            this.datae = e;
            // 删除账本
            // this.baocun(e);
        },
        // 记一笔悬浮移动
        down() {
            this.flags = true;
            var touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }
            this.position.x = touch.clientX;
            this.position.y = touch.clientY;
            this.dx = moveDiv.offsetLeft;
            this.dy = moveDiv.offsetTop;
        },
        move() {
            if (this.flags) {
                var touch;
                if (event.touches) {
                    touch = event.touches[0];
                } else {
                    touch = event;
                }
                this.nx = touch.clientX - this.position.x;
                this.ny = touch.clientY - this.position.y;
                this.xPum = this.dx + this.nx;
                this.yPum = this.dy + this.ny;
                moveDiv.style.left = this.xPum + "px";
                moveDiv.style.top = this.yPum + "px";
                //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
                // document.addEventListener(
                //     "touchmove",
                //     function() {
                //         event.preventDefault();
                //     },
                //     false
                // );
            }
        },
        //鼠标释放时候的函数
        end() {
            this.flags = false;
        },
        selectBill(bookType, bookId) {
            console.log("!!!!!!!!");

            // 点击选择账本
            console.log(bookType);
            console.log(bookId);
            this.bookType = bookType;
            this.bookId = bookId;
            localStorage.setItem("bookType", bookType);
            this.isShow = 2;
            this.getData();
            this.getUserAllBillType();
        },
        formatDate(year, month, day) {
            // 时间格式转换
            let y = year;
            let m = month;
            if (m < 10) m = "0" + m;
            let d = day;
            if (d < 10) d = "0" + d;
            return y + "-" + m + "-" + d;
        },
        setBudget() {
            this.$toStatistic("addbudget");
            let ticket = localStorage.getItem("ticket");
            console.log(this.bookType);
            console.log(this.userId);
            console.log(this.budget);
            console.log(this.budgetId);
            // let jzmonth =
            // this.currentMonth >= 10
            //     ? this.currentMonth
            //     : "0" + this.currentMonth;
            // 修改预算金额 传给后台
            remote
                .changeBudget({
                    createTimeStr:
                        this.currentYear +
                        "-" +
                        (this.currentMonth >= 10
                            ? this.currentMonth
                            : "0" + this.currentMonth) +
                        "-01",
                    budgetId: this.budgetId,
                    budget: this.$refs.input1.value,
                    userId: localStorage.getItem("userId"),
                    bookType: this.bookType,
                    ticket: ticket
                })
                .then(res => {
                    console.log(res);
                    if (res.data.code == "200") {
                        this.isShow2 = 1;
                        if (this.$refs.input1.value != "") {
                            this.budget = this.$refs.input1.value;
                        }
                    } else if (res.data.code == "-1") {
                        Toast({
                            message: "您未登录无法使用该功能",
                            position: "middle",
                            duration: 800
                        });
                    }
                });
        }
    }
};
</script>
<style lang="less" scoped>
// @import '../../static/fonts/font.css';
.Tally {
    width: 100%;
    position: relative;
    .zhezhao {
        height: 18rem;
        div {
            width: 0;
            .zzheade {
                width: 100%;
                height: 2.8rem;
                text-align: center;
                font-size: 0.4rem;
                .zb {
                    line-height: 2.8rem;
                    font-size: 0.6rem;
                    // font-weight: bold;
                }
                .gl {
                    width: 100%;
                    text-align: right;
                    padding-right: 0.8rem;
                    box-sizing: border-box;
                    margin-top: -1.6rem;
                }
            }
            .zzcontent {
                height: 78vh;
                overflow: auto;
                width: 100%;
                padding: 0 1.1rem;
                box-sizing: border-box;
                .zzimg {
                    position: relative;
                    border-radius: 0.6rem;
                    width: 2.71rem;
                    display: inline-block;
                    img {
                        width: 2.71rem;
                        margin-bottom: 0.2rem;
                    }
                    p {
                        width: 100%;
                        text-align: center;
                        font-size: 0.36rem;
                        margin-bottom: 0.4rem;
                    }
                    .zhouz,
                    .zhouz1 {
                        border-radius: 0.5rem;
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 75%;
                        z-index: 200;
                        background-color: rgba(0, 0, 0, 0.6);
                        .zhouzimg {
                            width: 0.6rem;
                        }
                    }
                    .zhouz1 {
                        border: 1px solid #ccc;
                        background-color: rgba(225, 225, 225);
                    }
                }
                div:nth-child(2n) {
                    margin-left: 0.8rem;
                }
            }
        }
        .zhezhaoup,
        .yingying {
            position: fixed;
            top: 0;
            left: 0;
            width: 80%;
            z-index: 999;
            height: 20rem;
            background-color: #fff;
        }
        .yingying {
            left: 80%;
            width: 20%;
            background-color: rgba(0, 0, 0, 0.6);
        }
    }
}
.tallnav {
    width: 100%;
    height: 5rem;
    background-color: #ffc72e;
    position: relative;
    // border-radius: 0 0rem 1rem 1rem;
    .nav {
        width: 100%;
        height: 1.6rem;
        position: absolute;
        top: 1rem;
        padding: 0 0.5rem;
        box-sizing: border-box;
        .left {
            width: 0.574rem;
            float: left;
        }
        .right {
            width: 0.574rem;
            float: right;
        }
    }
}
.main {
    position: relative;
    width: 91%;
    height: 5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 34px -16px #ffc72e;
    background-color: #fff;
    margin: 0 auto;
    margin-top: -2.6rem;
    z-index: 2;
    .letTop {
        width: 30%;
        position: absolute;
        left: 0.6rem;
        top: 0.6rem;
        font-size: 0.4rem;
        color: #b8becc;
    }
    .rightTop {
        width: 20%;
        position: absolute;
        right: 0.6rem;
        top: 0.65rem;
        font-size: 0.44rem;
        color: #b8becc;
        p.rightTopbotm {
            display: flex;
            align-items: center;
            font-size: 0.457rem;
            font-weight: 600;
            color: #333;
            img {
                width: 0.25rem;
                margin-left: 0.1rem;
            }
        }
    }
    .letbottom {
        position: absolute;
        left: 0.6rem;
        bottom: 0.6rem;
        font-size: 0.342rem;
        color: #b8becc;
        .letbottomp {
            font-family: "FZLTHJW";
            display: flex;
            align-items: center;
            font-size: 1rem;
            color: #ffc72e;
            font-weight: bolder;
            box-sizing: border-box;
            i {
                font-size: 0.457rem;
                padding-top: 0.4rem;
            }
            img {
                width: 0.574rem;
                margin-left: 0.4rem;
            }
        }
    }
}
.consumption {
    width: 100%;
    height: 2rem;
    display: flex;
    div {
        padding-top: 0.8rem;
        width: 50%;
        height: 2rem;
        box-sizing: border-box;
        p {
            width: 100%;
            height: 0.6rem;
            font-size: 0.342rem;
            color: #b8becc;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
                width: 1px;
                height: 1px;
                border: 2px solid #ffc72e;
                border-radius: 50%;
                display: inline-block;
                margin-right: 0.2rem;
            }
        }
        .down {
            // font-weight: 600;
            font-size: 0.48rem;
            color: #333;
        }
    }
    div.expend {
        p.up {
            i {
                border: 2px solid #7ed321;
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
.add {
    margin-top: 2rem;
    width: 100%;
    height: 0.2rem;
    text-align: center;
    font-size: 0.4rem;
    color: #b8becc;
}
.jyb {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 0.6rem;
    top: 70%;
    width: 1.65rem;
    height: 1.65rem;
    border-radius: 50%;
    background-color: #ffc72e;
    z-index: 99;
    justify-content: center;
    align-items: center;
    img {
        width: 0.574rem;
        height: 0.574rem;
    }
    p {
        font-size: 0.28rem;
        color: #333333;
    }
}
.content {
    width: 100%;
    .contentlist {
        .times {
            box-sizing: border-box;
            padding: 0 0.5rem;
            display: flex;
            width: 100%;
            height: 1.24rem;
            line-height: 1.24rem;
            color: #b8bece;
            font-size: 0.342rem;
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
                width: 70%;
                text-align: right;
                overflow-x: hidden;
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
            font-size: 0.4rem;
            img {
                width: 0.857rem;
            }
            span {
                width: 40%;
                // margin-left: -1rem;
            }
            p {
                width: 40%;
                text-align: right;
                font-size: 0.48rem;
                color: #ffc72e;
            }
            .listtwwo {
                color: #7ed321;
            }
        }
    }
}
.set {
    color: #333;
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
        .three1 {
            margin-top: 0.7rem;
        }
        .three {
            margin-bottom: 0.7rem;
        }
        input,
        button {
            color: #333;
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
