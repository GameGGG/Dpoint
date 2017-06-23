# Dpoint

一个简单的打点插件

***
## 使用方法

	// html
	<script src='./dpoint.js'></script>

	<div regid="00000,0,0,0,0,0"></div>

	// js
	Dpoint({
		url:"API",
		isPageValue:true
		})

***
## 参数
	
	url			==>	接口地址，必填项
	attrName			==>	打点属性名,默认值为regid
	eventType		==>	打点事件,默认值为click事件
	isPageValue		==>	是否实例化就发送页面信息，默认值为false
	pageValue		==>	isPageValue为true生效，实例化发送页面信息时的值，默认值为window.location.href


	传递参数		==> id,type,remarks0,remarks1,remarks2,url (type判断是用户事件行为，还是页面打开行为)


***
## 方法

	evon			==>	该方法传入一个回调函数，每次页面切换，会调用该回调函数，并且像回调中传入跳转页的页数


***
## Attention

  HTTP协议的传输类型只支持GET传输
