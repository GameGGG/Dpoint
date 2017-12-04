// auther: GANLEI
// url:type(string) 默认值为：// ;**必填**项设置发送数据的地址
// isPageValue:type(boolean) 默认值为：false ;是否实例化就发送页面信息
// pageValue:type(string) 默认值为：null;isPageValue为true时必传
// attrName:type(string) 默认值为：regid ;打点属性名设置
// eventType:type(string) 默认值为：click ;设置什么事件发送统计数据
// select_step:type(number) 默认值为：3 ;设置事件源向上查询层级

// 方法 getMaxPointNumber()


// 使用： Dpoint(options)


;(function (win,doc) {
    // 获取来源地址
    var def = {
        attr: 'regid'
    }
	var referrer = doc.referrer;
	function Dpoint (options) {
		// 设置默认值
		var defaul = {
			url:'//',
			isPageValue:false,
			attrName:'regid',
			eventType:'click',
			select_step:3
		};
		var i = null;
		for (i in defaul) {
			this[i] = defaul[i];
		}
		this.init(options);
	}
	Dpoint.prototype.init = function (opts) {
		var i = null,
			str = '';
		this.setScreen();
		for (i in opts) {
			this[i] = opts[i];
        }
        def.attr = this.attrName;
		this.addEvent();
		if (this.isPageValue && this.pageValue) {
			str = this.pageValue;
			this.sendMsg(str);
		}
	};
	Dpoint.prototype.setScreen = function () {
		var screen = window.screen;
		this.screenWidth = screen.width;
		this.screenHeight = screen.height;
	}
	Dpoint.prototype.addEvent = function () {
		var B = doc.getElementsByTagName('body')[0],
			that = this;
		if (B.attachEvent) {
			B.attachEvent("on" + this.eventType, function (e) {
				e = e || window.event;
				that.dealEvent(e);
			});
		} else {
			B.addEventListener(this.eventType, function (e) {
				e = e || window.event;
				that.dealEvent(e);
			}, false);
		}
	};
	Dpoint.prototype.dealEvent = function (e) {
		var node =  e.target || e.srcElement,
			val = this.recurSelect(node);
		if (val) {
			this.sendMsg(val);
		}
	};
	Dpoint.prototype.recurSelect = function (dom) {
		var flag = '',
			tagName = dom.tagName.toLowerCase(),
			nDom = dom,
			num = this.select_step;
		while (tagName !== 'body' && num > 0) {
			flag = this.hasAttribute(nDom,this.attrName);
			if (flag) {
				return nDom.getAttribute(this.attrName);
			}
			nDom = nDom.parentNode;
			tagName = nDom.tagName.toLowerCase();
			num --;
		}
		return flag;
	};
	Dpoint.prototype.hasAttribute = function (ele, attribute) {
		return ele.getAttribute(attribute) != null;
	};
	Dpoint.prototype.sendMsg = function (data) {
		var arr = data.split(','),
			cpImg = new Image(),
			screen = this.screenHeight + "x" + this.screenWidth;
		if (arr.length < 5) {
			console.error('打点参数不足');
			return false;
		}
		this.addImageEvent(cpImg);
		cpImg.src = this.url 
					+ "?id=" + encodeURIComponent(arr[0])
					+ '&type=' + encodeURIComponent(arr[1]) 
					+ '&remarks0=' + encodeURIComponent(arr[2])
					+ '&remarks1=' + encodeURIComponent(arr[3])
					+ '&remarks2=' + encodeURIComponent(arr[4])
					+ '&userScreen=' + encodeURIComponent(screen)
					+ '&url=' + encodeURIComponent(referrer)
					+ '&rendom=' + Math.random();
	};
	Dpoint.prototype.addImageEvent = function (imgObject) {
		imgObject.onerror = function (err) {
			imgObject = null;
		}
		imgObject.onload = function (err) {
			imgObject = null;
		}		
	}
	// 获取当前页面点位数据
	function getMaxPointNumber(attr) {
        if (!attr) {
            attr = def.attr
        }
		var pointArr = [],maxPointNumber = 0;
		var points = document.querySelectorAll('['+attr+']');
		points.forEach(function(item, index) {
			var str = item.getAttribute(attr).split(',')[0]
			var pointNumber = parseInt(str.split('').reverse().slice(0, 5).reverse().join(''))
			pointArr.push(str)
			maxPointNumber = maxPointNumber > pointNumber ? maxPointNumber : pointNumber
		})
		var result = {
			maxPointNumber: maxPointNumber,
			points: points,
			pointNumbers: pointArr
		}
		return result
	}


	if(win && !win.Dpoint){
		win.Dpoint = function (options) {
			new Dpoint(options);
		};
		win.Dpoint.getMaxPointNumber = getMaxPointNumber
	}
}(window,document));
