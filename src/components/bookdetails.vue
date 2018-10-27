<template>
    <div class="bookdetails">
        <calendar v-on:seletedDay="getDate" :showGoBack='true' :showRedpoint='true' :userId='userId' :bookType='bookType'></calendar>    
        <div class="content" v-show="showContent == false">
             <div class="add"><img src="../../static/images/jizhang.png" alt=""><p>您当天还没有记账记录哦</p></div>
        </div>
        <p class="division"></p>
        <div class="contents" v-show="showContent == true">
            <div class="contentlist">
                <div class="times">
                    <div class="left">
                        <i></i>
                        <span>{{currentMonth}}月{{currentDay}}日账单</span>
                    </div>
                    <div class="right">
                        <span>收入：{{revenue}}</span>
                        <span class="two">支出：{{outlay}}</span>
                    </div>
                </div>
                <div class="contentmain">
                    <div @click="toCalendarInfo(item.bookkeepingId)" class="list" v-for="(item,i) in list" :key="i">
                        <img :src="item.photo" alt="">
                        <span>{{item.typeName}}（{{item.consumeType}}）</span>
                        <p class="listtwwo">{{item.typeCode==1?'-'+Number(item.spending).toFixed(2) : '+'+Number(item.spending).toFixed(2)}}</p>
                    </div>
                    <!-- <div class="list">
                        <img src="../../static/images/cy.png" alt="">
                        <span>餐饮（储蓄卡）</span>
                        <p class="listtwwo">-28.00</p>
                    </div> -->
                </div>
            </div>
        </div>
        <div @click="jiyb" class="jyb">
            记一笔
        </div>
    </div>
</template>

<script>
import calendar from '../commons/calendar'
import remote from "../assets/js/remote.js";
import axios from 'axios'
export default {
    name: "bookdetails",
    components:{
        calendar
    },
    data() {
        return {
            pageIndex:1,
            pageSize:10,
            userId:'test01',
            Date:'',
            list:[],
            currentMonth:'10',
            currentDay:'16',
            outlay:'0',
            revenue:'0',
            bookType:'日常账本',
            createTime:'',
            showContent:true
        };
    },
    created(){
        this.bookType = this.$route.query.bookType
        this.userId = localStorage.getItem('userId')
    },
    mounted(){
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        jiyb(){
            this.$router.push({
                path:'/Remember'
            })
        },
        toCalendarInfo(e){
            this.$router.push({
                path:"/calendarInfo",
                query:{
                    bookkeepingId:e
                }
            })
        },
        formatDate(year,month,day){
            let y = year;
            let m = month;
            if(m<10) m = "0" + m;
            let d = day;
            if(d<10) d = "0" + d;
            return y+"-"+m+"-"+d
        },
        getDate(e){
            this.showContent = true
            let date = new Date(e)
            let year = date.getFullYear()
            this.currentMonth = date.getMonth()+1
            this.currentDay = date.getDate()
            this.Date = this.formatDate(year,this.currentMonth,this.currentDay)
            remote.currentBill({
                pageIndex:this.pageIndex,
                pageSize:this.pageSize,
                userId:this.userId,
                createTime:this.Date
            }).then(res=>{
                // console.log(res.data);
                if(res.data.code == '200'){
                    this.list = res.data.ZbKPageInfo.list;
                    console.log(this.list);
                    
                    if(this.list.length == 0){
                        this.showContent = false
                    }else{
                        this.outlay = this.list[0].outlay || 0
                        this.revenue = this.list[0].revenue || 0
                    }
                }
                
            })
        }
    }
};
</script>
<style lang="less" scoped>

.content{
    width: 100%;
    height: 10.8rem;
    padding-top: 2rem;
    background-color: #f6f6f6;
    .add {
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
.division {
    // margin-top: 0.5rem;
    width: 100%;
    height: 0.2rem;
    background-color: #f6f6f6;
}
.contents {
    width: 100%;
    height: 46vh;
    overflow: auto;
    .contentlist {
        .times {
            box-sizing: border-box;
            padding: 0 0.5rem;
            display: flex;
            width: 100%;
            height: 1.24rem;
            line-height: 1.24rem;
            color: #b8bece;
            font-size: 0.4rem;
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
                width: 40%;
                // margin-left: -2rem;
            }
            .listtwwo {
                width: 40%;
                text-align: right;
                font-size: 0.48rem;
                // font-weight: bold;
                color: #ffc72e;
            }
        }
    }
}
</style>
