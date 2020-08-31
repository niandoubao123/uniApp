<template>
	<view class="container">
		<button @click="btn" class="testDialog">测试弹框</button>
		
		<button @click="testGetData" class="testDialog">测试请求数据</button>
		
		
		<button class="cu-btn cuIcon-add bg-green shadow"></button>
		
		<u-button type="primary">主要按钮</u-button>
		<u-button type="success">成功按钮</u-button>
		<u-button type="info">信息按钮</u-button>
		<u-button type="warning">警告按钮</u-button>
		<u-button type="error">危险按钮</u-button>
		
		
		
		<ol class="oli">
			<li v-for="item in dataList.rows" :key="item.id" @tap="goDetail(item.id)">
				<p>名称{{item.name}}</p>
				<p>年龄{{item.age}}</p>
				<p>第{{item.id}}个</p>
			</li>
		</ol>
		<!-- 弹窗模板 -->
		<uni-pop ref="uniPop"></uni-pop>
		
		<u-picker mode="time" v-model="show" :params="params"></u-picker>
	</view>
</template>

<script>
	import http from '../../http/http.js'
	import uniPop from '../../components/uniPop/uniPop.vue'
	// import model from './model.js'
	
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				dataList:{
					total:0,
					rows:[]
				},
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				show: true
			}
		},
		components:{
			uniPop
		},
		methods: {
			btn(){
				let uniPop = this.$refs.uniPop
				uniPop.show({
					skin: 'ios',
					title: '确认开启二次识别？',
					content: '为了保证新邮件能及时收到提醒，请前往系统 [设置] - [电池] 中关闭应用锁屏清理。咩咩咩？',
					shadeClose: false,
					shade:true,
					words:true,
					imgs:false,
					plateNumberImg:'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
					carImg:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
					btns: [
						{
							text: '取消',
							style: 'color:#fff',
							onTap() {
								uniPop.close();
							}
						},
						{
							text: '确定',
							style: 'color: #fff',
							onTap() {
								console.log('点击了确定！');
							}
						}
					]
				})
			},
			testGetData(){
				let _this = this
				http.getDataList({id:2},function(res){
					_this.dataList = res.data
				},'GET','/goods')
			},
			goDetail(id){
				uni.navigateTo({
					url: '../detail/detail?id='+id,
				});
			}
		},
		created(){
			let _this = this
			http.getDataList({id:0},function(res){
				_this.dataList = res.data
			},'GET','/goods')
		}
	}
</script>

<style>
	.container {
		/* padding: 20px;
		font-size: 14px;
		line-height: 24px; */
		overflow: hidden;
	}
	.testDialog{
		margin-top: 20px;
		width: calc(100% - 120px);
	}
	.oli li{
		width:calc(100% - 20px);
		height: 150px;
		background: #fff;
		box-shadow:5px 5px 5px rgba(0,0,0,0.6);
		margin-bottom: 20px;
	}
</style>
