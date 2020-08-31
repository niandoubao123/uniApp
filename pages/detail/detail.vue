<template>
	<view>
		<h1>这是详情页</h1>
		<ol>
			<li v-for="item in detailData.rows" :key="item.id">
				{{item.name}}今年{{item.age}}
			</li>
		</ol>
	</view>
</template>

<script>
	import http from '../../http/http.js'
	export default {
		data() {
			return {
				detailData:{
					total:0,
					rows:[]
				}
			}
		},
		methods: {
			
		},
		onLoad(){
			let _this = this
			http.getDataList({id:this.$route.query.id},function(res){
				_this.detailData = res.data
			},'GET','/goods')
		}
	}
</script>

<style>

</style>
