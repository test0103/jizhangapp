<template>
	<div class="index">
		
		<mt-swipe :show-indicators="false" class="banner" v-show="bannerFlag">
			<mt-swipe-item :key="index" v-for="(item,index) in banner"><img :src="imgBaseUrl+item.topBannerImg" @click="jumpToProduct(item.loansId,item.topBannerTitle)"></mt-swipe-item>
		</mt-swipe>
		<div class="main-loan">
			<div class="main-loan__item" v-for="(item,index) in loan" :key="index" @click="jumpToProduct(item.loansId,item.loansTitle)">
				<img class="main-loan__item-icon" :src="iconBaseUrl+item.loansPic">
				<h2 class="main-loan__item-title">{{item.loansTitle.length>5?item.loansTitle.slice(0,5)+'..':item.loansTitle}}</h2>
				<p class="main-loan__item-text">最高可借（元）<br><span>{{item.loansMoneyMax}}</span></p>
			</div>
		</div>
		<ul class="loan-list">
			<li class="loan-list__item clearfix" v-for="(item,index) in loanList" :key="index" @click="jumpToProduct(item.loansId,item.loansTitle)"><img :src="iconBaseUrl+item.loansPic" class="icon fl"><div class="text fl"><h3>{{item.loansTitle}}<b>（最高可借{{item.loansMoneyMax}}）</b></h3><p>{{item.loansLabel}}</p></div><span class="jump fr"></span></li>
		</ul>
	</div>
</template>
<script>
	import { stringify } from 'qs';
	export default {
		data(){
			return {
				bannerFlag:false,
				banner:[],
				loan:[],
				loanList:[],
				type:'',
				//type:'huawei',
				imgBaseUrl:'http://120.79.0.99/top/',
				iconBaseUrl:'http://120.79.0.99/upload/'
			}
		},
		methods:{
			getType(){
				let _this = this;
				let typeStr;
				let urlStr = window.location.href;
				let queryStr = urlStr.split('?')[1].replace(/#/g,'').replace(/\//g,'');
				if(queryStr.indexOf('&')>0){
					typeStrtypeStr = queryStr.split('&')[0].split('=')[1];
				}else{
					typeStr = queryStr.split('=')[1];
				}
				_this.type = typeStr;
				console.log(_this.type);
				
			},
			jumpToProduct(num,name){
				console.log(num);
				console.log(name);
				console.log(333333);
				
				
				let _this = this;
				// window._czc.push(['_trackEvent', _this.type, 'app统计', name]);
				// _this.$router.push({
				// 	name:'product',
				// 	params:{id:num},
				// 	query:{type:_this.type}
				// });
				_this.$router.push({path:'/product/'+num+'/type/'+_this.type});
				console.log('/product/'+num+'/type/'+_this.type);
				console.log(5555555555555);
				
			},
			fetchBannerControl(){
				let _this = this;
				_this.$http.get('http://120.79.0.99/KplLoans_Iteration/telphone/loans_h5.action/converTOP/'+_this.type).then(res=>{
					
					const result = res.data;
					// document.title = result.converTop.type_title;
					if(result.converTop.type_top==1){
						_this.bannerFlag = true;
					}else{
						_this.bannerFlag = false;
					}
				}).catch(err=>console.log(err));
			},
			fetchProducts(){
				let _this = this;
				_this.$http.post('http://120.79.0.99/KplLoans_Iteration/telphone/loans_h5.action/'+_this.type).then(res=>{
					console.log(22222222222222222);
					
					console.log(res);
					console.log(3333333333333);
					
					
					const result = res.data;
					if(result.code == 200){
						_this.banner = result.all.topbanner;
						// _this.banner = result.all.apps;
						_this.loan = result.all.minbanner;
						_this.loanList = result.all.apps.slice(3);
					}
				}).catch(err=>console.log(err));
			}
		},
		mounted(){
			// const _this = this;
			this.getType();
			this.fetchBannerControl();
			this.fetchProducts();
		}
	}
</script>
<style scoped>
	.index{
		height: 100vh;
		overflow: auto;
		padding-bottom: 0.533333rem;
		/* min-height: 100%; */
		background-color: #F8F8F8;
	}
	.banner{
		height: 5.333333rem;
		display: block !important;
	}
	.banner img{
		width: 100%;
		/* height: 5.333333rem; */
	}
	.main-loan{
		display: flex;
		display: -webkit-flex;
		justify-content: space-around;
		padding-top: 1.2rem;
		height: 4.533333rem;
	}
	.main-loan__item{
		position: relative;
		padding-top: 1.4rem;
		width: 2.8rem;
		height: 2rem;
		border-radius: 0.266667rem;
		box-shadow: 0px 6px 6px rgba(130,192,255,0.3);
		background: rgba(255,255,255,1);
	}
	.main-loan__item-icon{
		position: absolute;
		left: 50%;
		top: -0.4rem;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		width: 1.333333rem;
		height: 1.333333rem;
		border-radius: 0.266667rem;
	}
	.main-loan__item-title{
		margin-bottom: 0.133333rem;
		text-align: center;
		font-size: 0.426667rem;
		font-weight: bold;
	}
	.main-loan__item-text{
		line-height: 0.453333rem;
		text-align: center;
		font-size: 0.32rem;
		color: #616161;
	}
	.loan-list{
		padding: 0 0.4rem;
	}
	.loan-list__item{
		padding: 0.4rem;
		margin-bottom: 0.4rem;
		height: 1.4rem;
		background:rgba(255,255,255,1);
		border-radius: 0.266667rem;
	}
	.loan-list .icon{
		display: block;
		margin-right: 0.4rem;
		width: 1.333333rem;
		height: 1.333333rem;
		border-radius: 0.266667rem;
	}
	.loan-list .text h3{
		margin-bottom: 0.213333rem;
		line-height: 0.613333rem;
		font-size: 0.426667rem;
		font-weight: bold;
	}
	.loan-list .text b{
		font-size: 0.293333rem;
		color: #666666;
	}
	.loan-list .text p{
		font-size: 0.32rem;
		color: #666666;
	}
	.jump{
		margin-top: 0.4rem;
		width: 0.253333rem;
		height: 0.48rem;
		background: url("../../assets/images/go.png") no-repeat left top;
		background-size: 0.253333rem 0.48rem;
		vertical-align: top;
	}
</style>