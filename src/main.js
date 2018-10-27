// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import axios from 'axios'
import remote from '../src/assets/js/remote'
import router from './router'
import Mint from 'mint-ui';
import {MessageBox} from 'mint-ui';
import store from './store'
import {plusReady} from './lib/js/plusReady.js'
import Mui from 'vue-awesome-mui';
// import './assets/js/flexible.js';

Vue.use(Mint);
Vue.use(Vuex);
Vue.use(Mui);

// Vue.prototype.$axios = axios
Vue.prototype.$remote = remote
Vue.config.productionTip = false
import '../static/css/base.css';
// import '../static/css/Arca-Heavy.ttf';
// import '../static/css/FZLTHJW.TTF';
import '../static/fonts/font.css';
import 'mint-ui/lib/style.css';
//友盟统计
import statistics from './commons/js/statistic.js'
Vue.prototype.$toStatistic = (statistic, describe) => {
    plusReady(() => {
        window.plus.statistic.eventTrig(statistic, {
            'type': 'tap',
            'describe': describe || statistics[statistic]
        });
    })
};
Vue.prototype.$getAppMeta = (data_Name) => {
    let PackageManager = plus.android.importClass("android.content.pm.PackageManager");
    let context = plus.android.runtimeMainActivity();
    let appInfo = plus.android.invoke(plus.android.invoke(context, 'getPackageManager'), "getApplicationInfo", plus.android.invoke(context, 'getPackageName'), PackageManager.GET_META_DATA);
    return plus.android.invoke(appInfo.plusGetAttribute('metaData'),'getString',data_Name.toString());
}
// 引入加密文件
import urlEncrypt from '../static/js/urlEncrypt'
Vue.prototype.$urlEncrypt = urlEncrypt
Vue.prototype.$plusReady = plusReady

axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
router.beforeEach((to, from, next) => {
    //因为 axios 请求是异步的，所以 next 函数必须在请求成功和失败之后都调用，
    //如果只写在请求外面会导致获取到用户信息但是路由还是提前跳转的 bug
    remote
    .isLogined({
        ticket: localStorage.getItem('ticket')
    })
    .then(res => {
        console.log(123456789);
        console.log(res);
        next();
        if (res.data.code == "-7") {
            console.log('搞事情');
            
            MessageBox(
                '用户在异动登录','如非本人操作，请及时更改密码'
            );
            localStorage.removeItem("ticket");
            localStorage.removeItem("userId");
            localStorage.removeItem("phone");
            // this.$router.push({
            //     path: "/login"
            // });
            next();
        }
    }).catch(error => {
            console.log('launch error', error);
            next();
        });
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted()  {
      this.$plusReady(() => {
            let channel = this.$getAppMeta("UMENG_CHANNEL");
            remote
                .Select({
                    table: "kpl_jizhang_global",
                    channel: channel, //渠道号
                    wallertAppVersion: plus.runtime.version, //版本号
                    wallertAppName: top.document.title //app名称
                })
                .then(res => {
                    // alert('日了狗')
                    if (res.data.list.includes("0")) {
                        //全显示
                        this.$store.commit("setisShow1", 0);
                        this.$store.commit("setisShow2", 0);
                        this.$store.commit("setisShow3", 0);
                        this.$store.commit("setisShow4", 0);
                    } else {
                        if (res.data.list.includes("1")) {
                            this.$store.commit("setisShow1", 0);
                            // this.isShow1 = 0;
                        } else {
                            this.$store.commit("setisShow1", 1);

                            // this.isShow1 = 1;
                        }
                        if (res.data.list.includes("2")) {
                            this.$store.commit("setisShow2", 0);

                            // this.isShow2 = 0;
                        } else {
                            this.$store.commit("setisShow2", 1);

                            // this.isShow2 = 1;
                        }
                        if (res.data.list.includes("3")) {
                            this.$store.commit("setisShow3", 0);

                            // this.isShow3 = 0;
                        } else {
                            this.$store.commit("setisShow3", 1);

                            // this.isShow3 = 1;
                        }
                        if (res.data.list.includes("4")) {
                            this.$store.commit("setisShow4", 0);

                            // this.isShow4 = 0;
                        } else {
                            this.$store.commit("setisShow4", 1);

                            // this.isShow4 = 1;
                        }
                    }
                });
        });
  },
})
