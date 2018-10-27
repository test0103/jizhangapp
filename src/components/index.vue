<template>
    <div class="index">
        <router-view></router-view>
        <div class="footertc"></div>
        <footer class="pubfooter">
            <div v-if="isShow==0" class="aboutfooter">
                <div v-if="isShow1==0" @click="diajji(1)" class="one">
                    <div :class="{dianji:isjiaji==1}"></div>
                    <p :class="{dianji1:isjiaji==1}">记账</p>
                </div>
                <div v-if="isShow2==0" @click="diajji(2)" class="two">
                    <div :class="{dianji:isjiaji==2}"></div>
                    <p :class="{dianji1:isjiaji==2}">账户</p>
                </div>
                <div v-if="isShow3==0" @click="diajji(3)" class="three">
                    <div :class="{dianji:isjiaji==3}"></div>
                    <p :class="{dianji1:isjiaji==3}">发现</p>
                </div>
                <div v-if="isShow4==0" @click="diajji(4)" class="four">
                    <div :class="{dianji:isjiaji==4}"></div>
                    <p :class="{dianji1:isjiaji==4}">我的</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import remote from "../assets/js/remote.js";
export default {
    name: "index",
    data() {
        return {
            isjiaji: 1,
            isShow:0,
            isShow1: 0,
            isShow2: 0,
            isShow3: 0,
            isShow4: 0
        };
    },
    created() {
        this.isShow1=localStorage.getItem('isShow1')
        this.isShow2=localStorage.getItem('isShow2')
        this.isShow3=localStorage.getItem('isShow3')
        this.isShow4=localStorage.getItem('isShow4')
        console.log('????????');
        
        console.log(localStorage.getItem('isShow4'));
        console.log('??????????');
        
        
    },
    mounted() {
        if (!this.$route.query.id) {
            this.isjiaji = 1;
        } else {
            this.isjiaji = this.$route.query.id;
        }
        this.diajji(this.isjiaji);

        // this.$plusReady(() => {
        //     let channel = this.$getAppMeta("UMENG_CHANNEL");
        //     remote
        //         .Select({
        //             table: "kpl_jizhang_global",
        //             channel: channel, //渠道号
        //             wallertAppVersion: plus.runtime.version, //版本号
        //             wallertAppName: top.document.title //app名称
        //         })
        //         .then(res => {
        //             this.isShow=1
        //             if (res.data.list.includes("0")) {
        //                 //全显示
        //             } else {
        //                 if (res.data.list.includes("1")) {
        //                     this.isShow1 = 0;
        //                 } else {
        //                     this.isShow1 = 1;
        //                 }
        //                 if (res.data.list.includes("2")) {
        //                     this.isShow2 = 0;
        //                 } else {
        //                     this.isShow2 = 1;
        //                 }
        //                 if (res.data.list.includes("3")) {
        //                     this.isShow3 = 0;
        //                 } else {
        //                     this.isShow3 = 1;
        //                 }
        //                 if (res.data.list.includes("4")) {
        //                     this.isShow4 = 0;
        //                 } else {
        //                     this.isShow4 = 1;
        //                 }
        //             }
        //         });
        // });
    },
    methods: {
        diajji(res) {
            if (res == 1) {
                this.$toStatistic("accounttype");
                this.isjiaji = 1;
                this.$router.push({
                    path: "/Tally"
                });
            } else if (res == 2) {
                this.$toStatistic("Account");

                this.isjiaji = 2;
                this.$router.push({
                    path: "/Account"
                });
            } else if (res == 3) {
                this.$toStatistic("find");

                this.isjiaji = 3;
                this.$router.push({
                    path: "/Index?type=qianduoduojizhang"
                });
            } else if (res == 4) {
                this.$toStatistic("self");

                this.isjiaji = 4;
                this.$router.push({
                    path: "/Self"
                });
            }
        }
    }
};
</script>
<style lang="less" scoped>
.index {
    height: 100vh;
    overflow: auto;
}
.footertc {
    height: 1.4rem;
    position: static;
    bottom: 0;
}
.aboutfooter {
    width: 100%;
    display: flex;
    position: fixed;
    justify-content: space-around;
    height: 1.4rem;
    border: 1px solid #f6f6f6;
    bottom: 0;
    z-index: 333;
    background-color: #fff;
    .one,
    .two,
    .three,
    .four {
        min-width: 10%;
        height: 100%;
        font-size: 0.32rem;
        text-align: center;
        position: relative;
        div {
            margin: 0.18rem auto 0.08rem;
            width: 0.574rem;
            height: 0.574rem;
        }
        p {
            color: #b8becc;
            z-index: 99;
        }
        p.dianji1 {
            color: #333;
        }
    }
    .three div {
        background-image: url(../../static/images/f1.png);
        background-size: 0.574rem 0.574rem;
    }
    .one div {
        background-image: url(../../static/images/j1.png);
        background-size: 0.574rem 0.574rem;
    }
    .four div {
        background-image: url(../../static/images/w1.png);
        background-size: 0.574rem 0.574rem;
    }
    .two div {
        background-image: url(../../static/images/z1.png);
        background-size: 0.574rem 0.574rem;
    }
    .three div.dianji {
        background-image: url(../../static/images/f2.png);
        background-size: 0.574rem 0.574rem;
    }
    .one div.dianji {
        background-image: url(../../static/images/j2.png);
        background-size: 0.574rem 0.574rem;
    }
    .four div.dianji {
        background-image: url(../../static/images/w2.png);
        background-size: 0.574rem 0.574rem;
    }
    .two div.dianji {
        background-image: url(../../static/images/z2.png);
        background-size: 0.574rem 0.574rem;
    }
}
</style>
