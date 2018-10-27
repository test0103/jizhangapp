<template>
	<div class="product">
		<h1 class="product-title"><img src="../../../static/images/back@2x.png"  @click="goback"><span>{{productInfo.loansTitle}}</span></h1>
		<div class="product-info">
			<p>最高可借额度(元)</p>
			<h1>{{productInfo.loansMoneyMax}}</h1>
			<p>最低月利率{{productInfo.loansConsume}}</p>
		</div>
		<div class="product-line">
			<h3 class="product-item__title"><b></b>申请流程</h3>
			<div class="product-line__box">
				<div><img class="icon-card1" src="../../assets/images/card-1.png"><p>身份证上传</p></div>
				<div><img class="icon-right" src="../../assets/images/right.png"></div>
				<div><img class="icon-card2" src="../../assets/images/card-2.png"><p>银行卡上传</p></div>
				<div><img class="icon-right" src="../../assets/images/right.png"></div>
				<div><img class="icon-card3" src="../../assets/images/shenhe.png"><p>审核放款</p></div>
			</div>
		</div>
		<div class="product-condition">
			<h3 class="product-item__title"><b></b>申请条件</h3>
			<p v-html="deleteStr(productInfo.loansApplyCondition)"></p>
		</div>
		<div class="product-data">
			<h3 class="product-item__title"><b></b>所需材料</h3>
			<p v-html="deleteStr(productInfo.loansAccredit)"></p>
		</div>
		<div class="apply" @click="applyNow(productInfo.kplAppDownurl,productInfo.applicationYoumengid)">立即申请</div>
	</div>
</template>
<script>
	import { stringify } from 'qs';
	export default{
		data(){
			return{
				productInfo:{}
			}
		},
		methods:{
			goback(){
				 this.$router.push({
                path:"/Tally",
                query:{'id':3}
            })
			},
			deleteStr(str){
				return str.replace(/\./g,'').replace(/\n/g,'<br>');
			},
			applyNow(url,name){
				console.log(5555555555555555555);
				
				console.log(url);
				
				console.log(5555555555555555555);
				let _this = this;
				// window._czc.push(['_trackEvent', _this.type, '申请统计', name]);
				if(url!=undefined){
					window.location.href = url;
				}else{
					alert('暂时无法申请');
				}
			},
			fetchProduct(){
				let _this = this;
				_this.$http.post('http://120.79.0.99/KplLoans_Iteration/kplLoansApp/showLoansAppDetailsm.action',stringify({
					type:_this.$route.params.type,
					loansId:_this.$route.params.id
				})).then(res=>{
					console.log(res);
					
					const result = res.data;
					if(result.lsitLoansDetail.length==0){
						window.history.go(-1);
					}else{
						_this.productInfo = result.lsitLoansDetail[0];
						// document.title = _this.productInfo.loansTitle;
					}
				}).catch(err=>console.log(err));
			}
		},
		mounted(){
			const _this = this;
			_this.fetchProduct();
		}
	}
</script>
<style scoped>
	.apply{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1.333333rem;
		line-height: 1.333333rem;
		text-align: center;
		font-size: 0.453333rem;
		color: #FFFFFF;
		background-color: #FFC72E;
	}
	.product{
		padding-top: 0.8rem;
		padding-bottom: 1.333333rem;
		min-height: 100%;
		background-color: #F6F6F6;
		color: #666666;
	}
	.product-title{
		position: fixed;
		display: flex;
		left: 0;
		top: 0rem;
		width: 100%;
		height: 0.8rem;
		padding-top: 0.3rem;
		text-align: center;
	}
	.product-title img {
		height: 0.6rem;
		width: 0.6rem;
		z-index: 33;
	}
	.product-title span {
		width: 100%;
		text-align: center;
		margin-left: -1rem;
	}
	.btn-back{
		margin-top: 0.066667rem;
		margin-right: 0.266667rem;
		width: 0.266667rem;
		height: 0.493333rem;
		background: url("../../assets/images/back.png") no-repeat left top;
		background-size: 0.266667rem 0.493333rem;
		vertical-align: top;
	}
	.product-item__title{
		margin-bottom: 0.666667rem;
		height: 0.426667rem;
		line-height: 0.426667rem;
		font-size: 0.426667rem;
		font-weight: bold;
		color: #FFC72E;
	}
	.product-item__title b{
		margin-right: 0.32rem;
		margin-top: 0.093333rem;
		width: 0.053333rem;
		height: 0.213333rem;
		background-color: #FFC72E;
		vertical-align: top;
	}
	.product-title{
		padding-left: 0.4rem;
		font-size: 0.453333rem;
		background-color: #FFFFFF;
	}
	.product-info{
		padding: 0.933333rem 0;
		margin-bottom: 0.266667rem;
		text-align: center;
		background-color: #FFFFFF;
	}
	.product-info h1{
		margin: 0.386667rem 0;
		font-size: 0.8rem;
		font-weight: bold;
		color: #FFC72E;
	}
	.product-info p{
		font-size: 0.266667rem;
	}
	.product-line{
		padding: 0.533333rem 0.373333rem 0.666667rem;
		margin-bottom: 0.266667rem;
		background-color: #FFFFFF;
	}
	.product-line p{
		vertical-align: top;
	}
	.product-line__box{
		display: flex;
		display: -webkit-flex;
		justify-content: space-around;
		text-align: center;
	}
	.icon-right{
		margin-top: 0.16rem;
		width: 0.533333rem;
		vertical-align: top;
	}
	.icon-card1{
		display: block;
		margin: 0 auto 0.266667rem;
		width: 0.8rem;
	}
	.icon-card2{
		display: block;
		margin: 0 auto 0.266667rem;
		width: 0.773333rem;
	}
	.icon-card3{
		display: block;
		margin: 0 auto 0.266667rem;
		width: 0.546667rem;
	}
	.product-line__box p{
		font-size: 0.32rem;
	}
	.product-condition{
		padding: 0.533333rem 0.373333rem 0.666667rem;
		margin-bottom: 0.266667rem;
		background-color: #FFFFFF;
	}
	.product-condition p{
		line-height: 0.48rem;
		font-size: 0.32rem;
	}
	.product-data{
		padding: 0.533333rem 0.373333rem 0.666667rem;
		background-color: #FFFFFF;
	}
	.product-data p{
		line-height: 0.48rem;
		font-size: 0.32rem;
	}
	.btn-apply{
		width: 65.333333%;
		height: 100%;
		background-color: #FFC72E;
	}
	.btn-goback{
		width: 34.666666%;
		height: 100%;
		background-color: #BA9FEA;
	}
</style>