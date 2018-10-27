<template>
    <div class="calendarInfo">
        <header class="addhead">
            <div @click="goBack" class="imgage"></div>
            <span>详情</span>
        </header>
        <div class="list">
            <img :src="photo" alt="">
            <span>{{typeName}}（{{consumeType}}）</span>
            <p :class="{listtwwo:typeCode==1}">{{typeCode==1?'-'+spending:spending}}</p>
        </div>
        <div class="content">
            <p class="one">类型</p>
            <p class="two" v-text="typeCode==1?'支出':'收入'"></p>
        </div>
        <div class="content">
            <p class="one">日期</p>
            <p class="two">{{createTime}}</p>
        </div>
        <div class="content">
            <p class="one">备注</p>
            <p class="two">{{note}}</p>
        </div>
        <div class="remfooter">
            <div @click="bjsc(1)" class="left">编辑</div>
            <div @click="bjsc(2)" class="right">删除</div>
        </div>
    </div>
</template>

<script>
import remote from "../assets/js/remote.js";
export default {
    name: "calendarInfo",
    data() {
        return {
            bookId: 1,
            bookkeepingId: 45,
            consumeType: "现金",
            consumeTypeId: 1,
            createTime: '',
            createTime1: '',
            income: null,
            lifeTypeId: 1,
            modifiedTime: null,
            name: null,
            note: "支出03",
            outlay: null,
            photo: null,
            revenue: null,
            spending: 100,
            typeCode: 1,
            typeName: "",
            userId: 1,
            createTimeStr:'2018-10-16',
            bookType:"",
            // name:""
        };
    },
    created(){
        this.userId = localStorage.getItem('userId')
        
    },
    mounted(){
        this.getData()
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        bjsc(res){
            this.$toStatistic('compile');
            if(res == 1){
                this.editBill()
            }else if(res == 2){
                this.deleteBill()
            }
        },
        getData(){
            // 获取账本信息
            let ticket = localStorage.getItem('ticket')
            this.bookkeepingId = this.$route.query.bookkeepingId
            remote.querySoloBill({
                bookkeepingId:this.bookkeepingId,
                ticket:ticket
            }).then(res=>{
                // console.log(res);
                if(res.data.code == '200'){

                    this.bookId= res.data.result.bookId
                    this.typeName= res.data.result.typeName
                    this.consumeType= res.data.result.consumeType
                    this.consumeTypeId= res.data.result.consumeTypeId
                    this.createTime= this.formatDate(res.data.result.createTime)
                    this.createTime1= res.data.result.createTime
                    this.lifeTypeId= res.data.result.lifeTypeId
                    this.note= res.data.result.note
                    this.photo= res.data.result.photo
                    this.spending= res.data.result.spending
                    this.typeCode= res.data.result.typeCode
                    this.userId= res.data.result.userId
                    this.bookType= res.data.result.bookType
                }
                
            })
        },
        deleteBill(){
            // 删除
            let ticket = localStorage.getItem('ticket')
            let userId12 = localStorage.getItem('userId')
            // let ticket = localStorage.getItem('ticket')
            remote.deleteSoloBill({
                typeCode:this.typeCode,
                createTimeStr:this.createTimeStr,
                bookkeepingId:this.bookkeepingId,
                spending:this.spending,
                consumeTypeId:this.consumeTypeId,
                bookId:this.bookId,
                userId:userId12,
                ticket:ticket,
                bookType:this.bookType,
                name:this.consumeType,
            }).then(res=>{
                // console.log(res);
                if(res.data.code == '200'){
                    this.$router.history.go(-1)
                }
            })
        },
        editBill(){
            // 编辑账本
            this.$router.push({
                path:'/Renemberbianji',
                query:{
                    typeCode:this.typeCode,//消费类型（收入支出）
                    createTime:this.createTime1, //消费日期
                    bookkeepingId:this.bookkeepingId,//一笔账的id
                    spending:this.spending,//消费金额
                    consumeTypeId:this.consumeTypeId,//消费支付类型（支付宝）
                    consumeType:this.consumeType,//消费支付类型（支付宝）
                    bookId:this.bookId,//账本类型id
                    userId:this.userId,//个人id
                    note:this.note,//备注
                    typeName:this.typeName,//消费类型（餐饮）
                    lifeTypeId:this.lifeTypeId,//
                    bookType:this.bookType,//
                    // ticket:ticket,//
                }
            })
            
        },
        formatDate(createTime){
            let date = new Date(createTime)
            let y = date.getFullYear()
            let m = date.getMonth()+1
            let d = date.getDate()
            let week = date.getDay()
            if(m<10) m = "0" + m;
            if(d<10) d = "0" + d;
            switch (week){
                case 1:
                    week = '星期一'
                    break;
                case 2:
                    week = '星期二'
                    break;
                case 3:
                    week = '星期三'
                    break;
                case 4:
                    week = '星期四'
                    break;
                case 5:
                    week = '星期五'
                    break;
                case 6:
                    week = '星期六'
                    break;
                case 0:
                    week = '星期日'
                    break;
            }
            
            this.createTimeStr = y+"-"+m+"-"+d
            return y+"年"+m+"月"+d+'日'+'  '+week
        },
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
        background: url(../../static/images/back@2x.png) no-repeat center center;
        background-size: 0.54rem;
        z-index: 1;
    }
    span {
        width: 100%;
        text-align: center;
        margin-left: -10%;
    }
}
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
    border-bottom: 1px solid #f6f6f6;
    img {
        width: 0.857rem;
    }
    span {
        margin-left: -0.5rem;
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
.content{
    padding-left: 0.5rem;
    box-sizing: border-box;
    width: 100%;
    height: 1.6rem;
    border-bottom: 1px solid #f6f6f6;
    display: flex;
    align-items: center;
    font-size: 0.36rem;
    color: #B8BECE;
    .one{
        width: 0.857rem;
    }
    .two {
        margin-left: 1rem;
        color: #333;
        font-size: 0.44rem;
    }
}
.remfooter {
    position: fixed;
    bottom: 1rem;
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
</style>
