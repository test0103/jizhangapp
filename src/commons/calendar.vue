<template>
    <div>
        <!-- 日历组件 -->
        <div class="tallnav">
            <div class="nav">
                <div @click="goBack" class="imgage" v-show="showGoBack == true"></div>
                <p>
                    <img @click="pickPre(currentYear,currentMonth)" src="../../static/images/zuoshanjiao.png" alt="">
                    <span>{{currentYear}}年{{currentMonth>=10?currentMonth:'0'+currentMonth}}月</span>
                    <img v-show="currentYear<nowYear||currentYear==nowYear&&currentMonth<nowMonth" @click="pickNext(currentYear,currentMonth)" src="../../static/images/yousanjiao.png" alt="">
                </p>
            </div>
        </div>
        <div class="calendar">
            <ul class="weekdays">
                <!-- 星期 -->
                <li>一</li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li style="color:red">六</li>
                <li style="color:red">日</li>
            </ul>
            <ul class="days">
                <!-- 日期 -->
                <li v-for="(item,i) in days" :key="i">
                    <div>
                        <!--如果不是本月且是同一年  改变类名加灰色-->
                        <span v-if="item.day.getFullYear() == currentYear && item.day.getMonth()+1 != currentMonth"></span>
                        <!-- 如果不是本月 -->
                        <span v-else-if="item.day.getFullYear() != currentYear && item.day.getMonth()+1 > currentMonth"></span>
                        <!--如果是本月  需判断是否当天-->
                        <span v-else @click="selectDate(item.day.getTime())">
                            <!--在当天之后-->
                            <span v-if="item.day.getFullYear() == new Date().getFullYear() && item.day.getMonth() == new Date().getMonth() && item.day.getDate() > new Date().getDate()" class="other">{{ item.day.getDate() }}</span>
                            <!-- 非当天 -->
                            <span :class="{active:seletedDay == item.day.getTime()}" v-else>{{ item.day.getDate()}}</span>
                        </span>
                        <i v-show="showRedpoint&&item.haveBill==true&&seletedDay != item.day.getTime()"></i>
                    </div>

                </li>
            </ul>

        </div>
    </div>
</template>
<style lang="less" scoped>
.tallnav {
    width: 100%;
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
        border-bottom: 1px solid #ccc;
        .imgage {
            width: 0.26rem;
            height: 0.49rem;
            background: url(../../static/images/back@2x.png) no-repeat center
                center;
            background-size: 0.5rem;
            z-index: 1;
            position: absolute;
            left: 0.46rem;
            top: 50%;
            transform: translateY(-50%);
        }
        p {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            // margin-left: -10%;
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
.calendar {
    width: 100%;
    height: 6rem;
    // border-bottom: 1px solid #ccc;
    .weekdays {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 0.56rem;
        font-size: 0.4rem;
        color: #033333;
        padding-top: 0.5rem;
        padding-bottom: 0.3rem;
        li {
            flex-basis: calc(100% / 7);
            display: flex;
            justify-content: center;
        }
    }
    .days {
        display: flex;
        align-items: center;
        width: 100%;
        height: 0.56rem;
        color: #033333;
        flex-wrap: wrap;
        li {
            flex-basis: calc(100% / 7);
            height: 0.8rem;
            div {
                margin: 0 auto;
                width: 0.56rem;
                height: 0.56rem;
                position: relative;
                span {
                    display: block;
                    width: 0.56rem;
                    height: 0.56rem;
                    text-align: center;
                    line-height: 0.56rem;
                    font-size: 0.4rem;
                    span {
                        display: block;
                        width: 0.56rem;
                        height: 0.56rem;
                        text-align: center;
                        line-height: 0.56rem;
                    }
                }
                span.active {
                    color: #fff;
                    background: rgba(255, 199, 46, 1);
                    border-radius: 50%;
                    font-size: 0.4rem;
                    font-weight: 500;
                    text-align: center;
                    line-height: 0.56rem;
                }
                span.other {
                    color: #b8becc;
                }
                i {
                    position: absolute;
                    bottom: 0rem;
                    left: 50%;
                    transform: translateX(-50%);
                    display: block;
                    width: 0;
                    height: 0;
                    margin: 0 auto;
                    border-radius: 50%;
                    border: 0.04rem solid #ff5b3e;
                }
            }
        }
    }
}
</style>
<script>
import remote from "../assets/js/remote.js";
export default {
    name: "bookdetails",
    props: ["showGoBack", "showRedpoint", "bookType", "userId"],
    data() {
        return {
            currentDay: 1,
            currentMonth: 1,
            currentYear: 1970, // 选择的年
            currentWeek: 1, // 选择的月
            days: [],
            nowYear: 2018, // 当前年
            nowMonth: 10, // 当前月
            nowDay: 12, // 当前日
            seletedDay: "",
            nowDate: "",
            havebillDayList: [],
            createTime: ""
        };
    },
    created() {
        let now = new Date();
        // console.log(this.nowYear);
        this.nowYear = now.getFullYear();
        this.nowMonth = now.getMonth() + 1;
        this.nowDay = now.getDate();
        let str = this.formatDate(this.nowYear, this.nowMonth, this.nowDay);
        this.seletedDay = new Date(str).getTime();
        this.nowDate = new Date(str).getTime();
    },
    mounted() {
        this.createTime = this.formatDate(this.nowYear, this.nowMonth, 1);
        if (localStorage.getItem("userId")) {
            this.queryAllBill(this.createTime);
            this.selectDate(this.seletedDay);
        } else {
            this.initData(this.createTime);
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        initData(cur) {
            var date;
            if (cur) {
                date = new Date(cur);
            } else {
                var now = new Date();
                var d = new Date(
                    this.formatDate(now.getFullYear(), now.getMonth(), 1)
                );
                d.setDate(36);
                date = new Date(
                    this.formatDate(d.getFullYear(), d.getMonth() + 1, 1)
                );
            }
            this.currentDay = date.getDate(); // 几号
            this.currentYear = date.getFullYear(); // 哪年
            this.currentMonth = date.getMonth() + 1; // 哪月
            this.currentWeek = date.getDay(); // 1...6,0
            let num = 36;
            if (this.currentWeek == 0) {
                this.currentWeek = 7;
                num = 42;
            }
            let str = this.formatDate(
                this.currentYear,
                this.currentMonth,
                this.currentDay
            ); // 转化为yyyy-mm-dd
            this.days = [];
            //初始化本周
            for (var i = this.currentWeek - 1; i >= 0; i--) {
                var d = new Date(str);
                d.setDate(d.getDate() - i);
                var dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                dayobject.day = d;
                this.havebillDayList.forEach((item, index) => {
                    let a = new Date(item).getTime();
                    if (a == d.getTime()) {
                        dayobject.haveBill = true;
                    }
                });
                this.days.push(dayobject); //将日期放入data 中的days数组 供页面渲染使用
            }
            //其他周
            for (var i = 1; i <= num - this.currentWeek; i++) {
                var d = new Date(str);
                d.setDate(d.getDate() + i);
                var dayobject = {};
                dayobject.day = d;
                this.havebillDayList.forEach((item, index) => {
                    let a = new Date(item).getTime();
                    if (a == d.getTime()) {
                        dayobject.haveBill = true;
                    }
                });
                if (i == num - this.currentWeek) {
                    if (d.getDate() != 31) {
                        return;
                    }
                }
                this.days.push(dayobject);
            }
        },
        pickPre(year, month) {

            var d = new Date(this.formatDate(year, month, 1));
            d.setDate(0);
            console.log(d.setDate(0));
            if (!localStorage.getItem("userId")) {
                this.initData(this.formatDate(d.getFullYear(), d.getMonth()+2 , 1));
            } else {
                // this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
                this.queryAllBill(
                    this.formatDate(d.getFullYear(), d.getMonth() + 2, 1)
                );
            }
        },
        pickNext(year, month) {
            var d = new Date(this.formatDate(year, month, 1));
            d.setDate(35);
            if (
                this.nowYear == d.getFullYear() &&
                d.getMonth() + 1 > this.nowMonth
            ) {
                return;
            }
             if (!localStorage.getItem("userId")) {
                this.initData(this.formatDate(d.getFullYear(), d.getMonth()+1 , 1));
            } else {
            this.queryAllBill(
                this.formatDate(d.getFullYear(), d.getMonth() + 1, 1)
            );
            }
            // this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        formatDate(year, month, day) {
            let y = year;
            let m = month;
            if (m < 10) m = "0" + m;
            let d = day;
            if (d < 10) d = "0" + d;
            return y + "-" + m + "-" + d;
        },
        selectDate(e) {
            if (this.nowDate < e) {
                // 当天之后的日期无法点击
                return;
            }
            this.seletedDay = e;
            // console.log(e);
            this.$emit("seletedDay", this.seletedDay);
        },
        queryAllBill(cur) {
            // 查询哪天有账
            remote
                .queryAllBill({
                    userId: this.userId,
                    createTime: cur,
                    bookType: this.bookType
                })
                .then(res => {
                    if (res.data.code == "200") {
                        this.havebillDayList = [];
                        let list = res.data.result;
                        for (let key in list) {
                            if (list[key].length > 0) {
                                this.havebillDayList.push(key.split(":")[0]);
                            }
                        }
                        this.initData(cur);
                    }
                });
        }
    }
};
</script>
