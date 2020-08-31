import api from './api.js'
//data:携带参数  类型：object
//call:回调函数  类型：any
//type:GET/POST  类型：'GET' / 'POST'
//cmd:地址  类型：string
function getDataList(data,call,type,cmd){
	uni.request({
		url: api.url+cmd,
		header: {  
			'Content-Type': 'application/x-www-form-urlencoded'  
		},  
		data: data,
		method: type,
		success: res => {
			call(res)
			uni.showToast({
				icon: "none",
				title: '操作成功',
				duration: 3000,
				position: 'top'
			})
		},
		fail: () => {
			uni.showToast({
				icon: "none",
				title: '操作失败',
				duration: 3000,
				position: 'top'
			})
		},
		complete: () => {}
	});
}

module.exports.getDataList = getDataList