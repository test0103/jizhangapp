<template>
    <div class="feedback">
        <header class="tallnav">
            <div class="nav">
                <div @click="goBack" class="imgage"></div>
                <p>版本更新</p>
                <span></span>
            </div>
        </header>
        <div class="content">
            <img src="../../../static/images/login.png" alt="">
            <p>版本号：{{version}}</p>
        </div>
        <div class="comtent">
            <span class="one">检查更新</span>
            <span class="two">已是最新版本</span>
        </div>
    </div>
</template>

<script>
import remote from "../../assets/js/remote.js";
import { MessageBox, Toast } from "mint-ui";

export default {
    name: "feedback",
    data() {
        return {
            version:""
        };
    },
    created() {
       this.$plusReady(() => {
            window.plus.runtime.getProperty(window.plus.runtime.appid, inf => {
                this.version = inf.version;
                localStorage.setItem('version',this.version)
            });
        });
    },
    methods: {
        goBack() {
            this.$router.push({
                path: "/index",
                query: { id: 4 }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.tallnav {
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
        border-bottom: 1px solid #f6f6f6;
        .imgage {
            width: 12%;
            height: 100%;
            background: url(../../../static/images/back@2x.png) no-repeat center
                center;
            background-size: 0.5rem;
            z-index: 1;
        }
        p {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin-left: -12%;
            margin-right: -1.5rem;
            font-size: 0.52rem;
        }
        span {
            font-size: 0.38rem;
            width: 1.5rem;
            padding-right: 0.5rem;
            box-sizing: border-box;
        }
    }
}
.content {
    margin-top: 2rem;
    width: 100%;
    img {
        display: block;
        margin: 0 auto;
        width: 2rem;
        height: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 11px 50px -15px #ffc72e;
    }
    p {
        margin-top: 0.6rem;
        width: 100%;
        text-align: center;
        font-size: 0.42rem;
    }
}
.comtent {
    margin-top: 2rem;
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    padding: 0 0.5rem;
    box-sizing: border-box;
    font-size: 0.42rem;
    .two {
        color: #ffc72e;
    }
}
</style>
