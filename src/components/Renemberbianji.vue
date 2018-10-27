<template>
    <div class="Remember">
        <header class="addhead">
            <div @click="goBack" class="imgage"></div>
            <p><span @click="qiehuan(1)" :class="{one:isShow==1}">支出</span><span :class="{one:isShow==2}" @click="qiehuan(2)">收入</span></p>
            <div @click="jyb" class="imgage1"></div>
        </header>
        <div v-if="isShow==1" class="remcontent">
            <div class="remnav">
                <span>{{selected}}</span>
                <input class="amountInput" type="text" placeholder="0.00" v-model.trim="amount">
            </div>
            <div class="remcont">
                <ul>
                    <li v-for="(item,i) in billPurposeList1" :key="i" @click="xuanze(item.typeName,item.lifeTypeId)">
                        <img :src="item.photo" alt="">
                        <p :class="{active:selected==item.typeName}">{{item.typeName}}</p>
                    </li>
                    <!-- <li><img src="../../static/images/qt.png" alt="">
                        <p>其他</p>
                    </li> -->
                </ul>
            </div>
        </div>
        <div v-if="isShow==2" class="remcontent">
            <div class="remnav">
                <span>{{selected}}</span>
                <input class="amountInput" type="text" placeholder="0.00" v-model.trim="amount">
            </div>
            <div class="remcont">
                <ul>
                    <li v-for="(item,i) in billPurposeList2" :key="i" @click="xuanze(item.typeName,item.lifeTypeId)">
                        <img :src="item.photo" alt="">
                        <p :class="{active:selected==item.typeName}">{{item.typeName}}</p>
                    </li>
                    <!-- <li><img src="../../static/images/qt.png" alt="">
                        <p>其他</p>
                    </li> -->
                </ul>
            </div>
        </div>
        <p class="division"></p>
        <div class="remnav1">
            <span>消费账户</span>
            <p @click="cancel(2)"><span>{{consumeType}}</span><img src="../../static/images/sanjiao.png" alt=""></p>
        </div>
        <div class="remnav1">
            <span>账本类型</span>
            <p @click="cancel(3)"><span>{{billType}}</span><img src="../../static/images/sanjiao.png" alt=""></p>
        </div>
        <div class="remnav1" @click="chooseDate">
            <span>选择日期</span>
            <p><span>{{currentMonth}}月{{currentDay}}日</span><img src="../../static/images/sanjiao.png" alt=""></p>
        </div>
        <div class="remnav1">
            <input type="text" maxlength="20" placeholder="写点啥备注一下（20字以内）" v-model="inputText">
        </div>
        <div class="remfooter">
            <div v-if="bookkeepingId==''" @click="zjyb" class="left">再记一笔</div>
            <div @click="jyb" class="right">保存</div>
        </div>
        <!-- 消费方式弹框 -->
        <div v-if="isShow1==2" class="set">
            <div class="setmoney">
                <p class="one">选择消费账户</p>
                <div class="content" v-for="(item,i) in consumeTypeList" :key="i" @click="chooseConsumeType(i,item.name,item.consumeTypeId)">
                    <div class="contentmain">
                        <img :src="item.photo" alt="">
                        <span>{{item.name}}</span>
                        <p v-show="consumeTypeIndex!=i" class="money"></p>
                        <p v-show="consumeTypeIndex==i" class="money"><img src="../../static/images/duihao2.png" alt=""></p>
                    </div>
                </div>
                <div @click="cancel(1)" class="content1">
                    取消
                </div>
            </div>
        </div>
        <!-- 账本类型 -->
        <div v-if="isShow1==3" class="set">
            <div class="setmoney">
                <p class="one">选择账本类型</p>
                <div class="content" v-for="(item,i) in billTypeList" :key="i" @click="chooseBillType(i,item.bookType,item.bookId)">
                    <div class="contentmain">
                        <img :src="item.photo" alt="">
                        <span>{{item.bookType}}</span>
                        <p v-show="billTypeIndex!=i" class="money"></p>
                        <p v-show="billTypeIndex==i" class="money"><img src="../../static/images/duihao2.png" alt=""></p>
                    </div>
                </div>
                <div @click="cancel(1)" class="content1">
                    取消
                </div>
            </div>
        </div>
        <div class="calendarBox" v-show="showCalendar">
            <calendar v-on:seletedDay="getDate" :userId='userId' :bookType='bookType' :showGoBack='false' :showRedpoint='false'></calendar>
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import calendar from "../commons/calendar";
import remote from "../assets/js/remote.js";
export default {
    name: "Renemberbianji",
    components: {
        calendar
    },
    data() {
        return {
            isShow: 1,
            isShow1: 2,
            selected: "餐饮",
            showCalendar: false,
            currentYear: 2018,
            currentMonth: 10,
            currentDay: 12,
            createTimeStr: "2018-10-15",
            bookId: 1,
            typeCode: 1,
            pageIndex: 1,
            pageSize: 14,
            bookkeepingId: "",
            consumeTypeId: 1,
            note: 1,
            userId: "test01",
            lifeTypeId: 1,
            bookType: 1,
            billPurposeList1: [],
            billPurposeList2: [],
            consumeTypeList: [],
            consumeTypeIndex: 0,
            consumeType: "现金",
            billTypeList: [],
            billTypeIndex: 0,
            billType: "日常账本",
            bookId: 1,
            inputText: "",
            amount: "", // 金额
            createTime: ""
        };
    },
    mounted() {
        this.userId = localStorage.getItem("userId");
        this.bookkeepingId = this.$route.query.bookkeepingId;
        this.typeCode = this.$route.query.typeCode; //消费类型（支出收入）
        this.createTime = this.$route.query.createTime; //消费日期
        // this.bookkeepingId = this.$route.query.bookkeepingId; //一笔账的id
        this.amount = this.$route.query.spending; //消费金额
        this.consumeTypeId = this.$route.query.consumeTypeId; //消费支付类型（支付宝）
        this.consumeType = this.$route.query.consumeType; //消费支付类型（支付宝）
        this.bookId = this.$route.query.bookId; //账本类型id
        this.billType = this.$route.query.bookType; //账本类型
        // this.userId = this.$route.query.userId; //个人id
        this.inputText = this.$route.query.note; //备注
        this.selected = this.$route.query.typeName; //餐饮等
        this.lifeTypeId = this.$route.query.lifeTypeId; //餐饮等
        this.getDate(this.createTime);
        if (this.typeCode == 1) {
            this.isShow = 1;
        } else {
            this.isShow = 2;
        }
        this.xuanze(this.selected, this.lifeTypeId);
        this.isShow1 = 1;
        this.getAllBillPurpose1();
        this.getAllBillPurpose2();
        this.getAllConsumeType();
        this.getBillType();
    },
    methods: {
        goBack() {
            this.$router.go(-1);
            // this.$store.commit('setBookType', this.billType)
        },
        qiehuan(res) {
            this.isShow = res;
            if (this.isShow == 1) {
                this.selected = "餐饮";
                this.typeCode = 1;
            }
            if (this.isShow == 2) {
                this.lifeTypeId = 14;
                this.selected = "工资";
                this.typeCode = 2;
            }
        },
        xuanze(name, lifeTypeId) {
            this.selected = name;
            this.lifeTypeId = lifeTypeId;
        },
        jyb() {
            if (this.amount <= 0) {
                Toast({
                    message: "请设置金额",
                    position: "middle",
                    duration: 800
                });
                return;
            }
            // 保存后 跳转到首页
            let ticket = localStorage.getItem("ticket");
            let option;

            option = {
                typeCode: this.typeCode,
                createTimeStr: this.createTimeStr,
                bookkeepingId: this.bookkeepingId,
                spending: this.amount,
                consumeTypeId: this.consumeTypeId,
                note: this.inputText,
                userId: this.userId,
                lifeTypeId: this.lifeTypeId,
                bookType: this.billType,
                bookId: this.bookId,
                ticket: ticket,
                name: this.consumeType
            };

            remote.editBill(option).then(res => {
                console.log(res);
                if (res.data.code == "200") {
                    // 成功后返回首页
                    this.$store.commit("setBookType", this.billType);
                    this.$router.history.go(-1);
                }
            });
        },
        cancel(res) {
            this.isShow1 = res;
        },
        chooseDate() {
            this.showCalendar = true;
        },
        getDate(e) {

            let selectDate = new Date(e);
            this.currentYear = selectDate.getFullYear();
            this.currentMonth = selectDate.getMonth() + 1;
            this.currentDay = selectDate.getDate();

            this.createTimeStr = this.formatDate(
                this.currentYear,
                this.currentMonth,
                this.currentDay
            );
            this.showCalendar = false;
        },
       
        getAllBillPurpose1() {
            // 获取所有记账用途
            remote
                .allBillPurpose({
                    typeCode: 1,
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                })
                .then(res => {
                    console.log(res);
                    if (res.data.code == "200") {
                        this.billPurposeList1 = res.data.result.list;
                    }
                });
        },
        getAllBillPurpose2() {
            // 获取所有记账用途
            remote
                .allBillPurpose({
                    typeCode: 2,
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                })
                .then(res => {
                    console.log(res);
                    if (res.data.code == "200") {
                        this.billPurposeList2 = res.data.result.list;
                    }
                });
        },
        getAllConsumeType() {
            // 获取所有消费账户类型
            remote.allConsumeType().then(res => {
                console.log(res);
                if (res.data.code == "200") {
                    this.consumeTypeList = res.data.consumeTypeList;
                }
            });
        },
        chooseConsumeType(i, name, consumeTypeId) {
            // 选择消费类型
            this.consumeTypeIndex = i;
            this.consumeType = name;
            this.consumeTypeId = consumeTypeId;
            this.isShow1 = 1;
        },
        chooseBillType(i, name, bookId) {
            // 选择账本类型
            this.billTypeIndex = i;
            this.billType = name;
            this.bookId = bookId;
            this.isShow1 = 1;
        },
        getBillType() {
            // 获取账本类型
            remote
                .ownAllBillType({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    userId: this.userId
                })
                .then(res => {
                    // console.log(res);
                    if (res.data.code == "200") {
                        this.billTypeList = res.data.ZbKPageInfo.list;
                        console.log(this.billTypeList);
                    }
                });
        },
        formatDate(year, month, day) {
            let y = year;
            let m = month;
            if (m < 10) m = "0" + m;
            let d = day;
            if (d < 10) d = "0" + d;
            return y + "-" + m + "-" + d;
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
    .imgage1 {
        width: 15%;
        height: 100%;
        background: url(../../static/images/duihao.png) no-repeat center center;
        background-size: 0.54rem;
        z-index: 1;
    }
    p {
        display: flex;
        justify-content: center;
        width: 100%;
        text-align: center;
        margin-left: -10%;
        margin-right: -15%;
        color: #b8becc;
        span {
            margin: 0 0.4rem;
        }
        .one {
            color: #333;
            border-bottom: 2px solid #333;
            // font-weight: 700;
        }
    }
}
.remcontent {
    width: 100%;
    .remnav {
        padding: 0 0.8rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 1.6rem;
        background-color: #ffc72e;
        color: #333;
        font-size: 0.48rem;
        // font-weight: 700;
        .amountInput {
            border: none;
            background-color: #ffc72e;
            width: 2.6rem;
            // font-weight: bold;
            text-align: right;
        }
        input::-webkit-input-placeholder {
            color: #333;
        }
        input:focus::-webkit-input-placeholder {
            color: transparent;
        }
    }
    ul {
        height: 6.1rem;
        overflow: auto;
        li {
            float: left;
            width: 20%;
            img {
                display: block;
                width: 0.857rem;
                margin: 0.4rem auto 0.1rem;
            }
            p {
                width: 100%;
                text-align: center;
                color: #b8becc;
            }
            .active {
                color: #333;
            }
        }
    }
}
.division {
    margin-top: 0.3rem;
    width: 100%;
    height: 0.2rem;
    background-color: #f6f6f6;
}
.remnav1 {
    padding: 0 0.5rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.2rem;
    color: #b8bece;
    font-size: 0.44rem;
    border-bottom: 1px solid #f6f6f6;
    p {
        font-size: 0.44rem;
        // font-weight: bold;
        color: #333;
        display: flex;
        align-items: center;
        img {
            margin-left: 0.3rem;
            width: 0.2rem;
        }
    }
    input {
        width: 100%;
        outline: none;
        border: 0;
        height: 100%;
        color: #b8bece;
    }
    input::-webkit-input-placeholder {
        color: #b8bece;
        font-size: 0.42rem;
    }
}
.remfooter {
    color: #333;
    margin-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    line-height: 1.4rem;
    height: 1.4rem;
    div {
        width: 40%;
        height: 100%;
        line-height: 1.4rem;
        border-radius: 1.4rem;
        text-align: center;
        background-color: #ffc72e;
        font-size: 0.42rem;
    }
    .left {
        background-color: #7ed321;
    }
}
.set {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    .setmoney {
        position: absolute;
        bottom: 0;
        width: 100%;
        // height: 50%;
        background-color: #fff;
        text-align: center;
        .one {
            line-height: 0.8rem;
            text-align: left;
            padding-left: 0.5rem;
            box-sizing: border-box;
            color: #B8BECE;
            font-size: 0.38rem;
        }
        .content {
            border-top: 1px solid #f6f6f6;
            .contentmain {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 1.4rem;
                padding: 0 0.5rem;
                box-sizing: border-box;
                font-size: 0.48rem;
                color: #333;
                img {
                    width: 0.8rem;
                }
                .money {
                    width: 40%;
                    padding-top: 0.3rem;
                    text-align: right;
                    img{
                        width: 0.6rem;
                    }
                }
                span {
                    width: 20%;
                    text-align: left;
                    margin-left: -2rem;
                }
            }
        }
        .content1{
            width: 100%;
            text-align: center;
            line-height: 1.4rem;
            font-size: 0.5rem;
            background-color: #ECECEC;
            // font-weight: 600;
        }
    }
}
.calendarBox {
    position: absolute;
    bottom: 0;
    z-index: 888;
    background-color: #fff;
    animation: show 0.5s ease-in;
    width: 100%;
}

@keyframes show {
    0% {
        height: 0;
    }

    100% {
        height: 7.6rem;
    }
}
</style>
