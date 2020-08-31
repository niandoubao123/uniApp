 /**
  * @tpl        uni-app自定义弹窗组件 - uniPop.vue
  * @author     andy by 2019-09-20
  * @about      Q：282310962  wx：xy190310
  */

<template>
    <view v-if="opts.isVisible" class="uniPop" :class="opts.isCloseCls">
        <view class="unipop__ui_panel">
            <view v-if="opts.shade" class="unipop__ui_mask" @tap="shadeTaped"></view>
            <view class="unipop__ui_main">
                <view class="unipop__ui_child" :style="opts.style">
                    <!-- 标题 -->
                    <view v-if="opts.title" class="unipop__ui_tit">{{opts.title}}</view>
                    <!-- 内容 -->
                    <view v-if="opts.content&&opts.words" class="unipop__ui_cnt" :style="opts.contentStyle">
                        {{opts.content}}
                    </view>
					<!-- 图片 -->
					<view class="img-box" v-if="opts.imgs&&opts.imgs" >
						<!-- 车牌图 -->
						<img :src="opts.plateNumberImg" class="plateNumberImg" alt="">
						<!-- 抓拍图 -->
						<img :src="opts.carImg" class='carImg' alt="">
					</view>
                    <view v-if="opts.btns" class="unipop__ui_btns">
                        <text v-for="(item,index) in opts.btns" :key="index" class="btn" :style="item.style" @tap="btnTaped(item)">{{item.text}}</text>
                    </view>
                </view>
                <!-- xclose -->
                <view v-if="opts.xclose" class="unipop__xclose" @tap="close">X</view>
            </view>
        </view>
    </view>
</template>

<script>
	export default {
		data() {
		    return {
		        defaultOptions: {
		            isVisible: true,       //是否显示弹窗
		            
		            title: '',              //标题
		            content: '',            //内容
		            contentStyle: '',       //内容样式
		            style: null,            //自定义弹窗样式
		            skin: '',               //弹窗风格
		            icon: '',               //弹窗图标
		            xclose: true,          //自定义关闭按钮
		            
		            shade: false,            //遮罩层
		            shadeClose: true,       //点击遮罩关闭
		            opacity: '',            //遮罩透明度
		            time: 0,                //自动关闭秒数
		            end: null,              //销毁弹窗回调函数
		            
		            anim: 'scaleIn',        //弹窗动画  scaleIn(默认) | fadeIn | shake | top | right | bottom | left
		            position: '',           //弹窗位置  top | right | bottom | left
		            
		            btns: null,             //弹窗按钮
					words:true,
					imgs:false,
					plateNumberImg:undefined,
					carImg:undefined
		        },
		        opts: {},
		        timer: null
		    }
		},
		methods: {
		    // 显示弹窗事件（处理传参）
		    show(args) {
		        this.opts = Object.assign({}, this.defaultOptions, args, {isVisible: true})
		        // console.log(this.opts)
		        
		        // 自动关闭
		        if(this.opts.time) {
		            this.timer = setTimeout(() => {
		                this.close()
		            }, this.opts.time * 1000)
		        }
		    },
			btnTaped(args){
				if(args.text==='取消'){
					this.opts = Object.assign({}, this.defaultOptions, args, {isVisible: false})
				}else{
					console.log('点了确定')
				}
			},
			close(){
				this.opts = Object.assign({}, this.defaultOptions, {}, {isVisible: false})
			},
			shadeTaped(){
				this.opts = Object.assign({}, this.defaultOptions, {}, {isVisible: false})
			}
		},
		created(){
			// this.opts = this.defaultOptions
		}
	}
</script>

<style>
	.uniPop{
		width: 100%;
		height:100vh;
		position: fixed;
		top: 0;
		left: 0;
	}
	.unipop__ui_mask{
		width:100%;
		height:100%;
		position: absolute;
		top: 0;
		left: 0;
		background:rgba(0,0,0,0.6);
		z-index: -1;
	}
	.unipop__ui_main{
		width:calc(100% - 80rpx);
		height: 100%;
		margin:200px auto;
		padding-bottom:20px;
		z-index: 99;
		background-color: #fff;
		box-shadow:5px 5px 5px rgba(0,0,0,0.2);
		border-radius: 44px;
		position: relative;
	}
	.unipop__ui_tit{
		text-align: center;
		height: 50px;
		line-height: 50px;
		border-bottom:1px solid #e5e5e5;
	}
	.unipop__ui_cnt,.img-box{
		padding:20px;
		height: auto;
		min-height: 150px;
	}
	.unipop__ui_btns{
		display: flex;
		justify-content: space-evenly;
	}
	.btn{
		padding:5px 40px;
		background: #007AFF;
		border-radius: 10px;
	}
	.unipop__xclose{
		width: 30px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		position: absolute;
		top: 10px;
		right:10px;
		color: #007AFF;
	}
	.carImg{
		width:100%;
		height:auto;
	}
	.plateNumberImg{
		width: 200px;
		height:80px;
		/* transform: translateX(50%); */
	}
</style>
