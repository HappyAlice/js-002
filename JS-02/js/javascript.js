
// 1、输入一个数n，实现从0到n进行累加
function Sum(numId){
	var number = parseInt(document.getElementById(numId).value.trim());
	var sum = number;
	for (var i = number - 1; i >= 0; i--) {
		sum = sum + i;
	};
	alert("对 " + number + " 进行累加后结果为：" + sum);
}

// 方法2，有问题。没解决，先做好其他题目   TODO
// function Sum(n){
//     if(n <= 0) {
//         return 0;
//     }else {
//         return n + arguments.callee(n-1);
//     }    
// }
// document.getElementById("sum-btn").onClick = function(){
//         var n = parseInt(document.getElementById("number").value.trim());
//         var sub = Sum(n);
//         alert(sub);
// }

//  S  实现cookie操作
var CookieUtil = {

	get:function(name){
		var cookieName = encodeURIComponent(name) + "=",
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null;

		if (cookieStart > -1) {
			var cookieEnd = document.cookie.indexOf(";", cookieStart);
			if (cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			cookieValue = encodeURIComponent(document.cookie.sunstring(cookieStart + cookieName.length, cookieEnd));
		}
		return cookieValue;
	},

	set:function(name, value, expires, path, domain, secure){
		var cookieText = encodeURIComponent(name) + "=" +encodeURIComponent(value);

		if (expires instanceof Date) {
			cookieText += "; expires=" + expires.toGMTString();
		}

		if (path) {
			cookieText += "; path=" +path;
		}

		if (domain) {
			cookieText += "; domain" + domain;
		}

		if (secure) {
			cookieText += "; secure";
		}
		document.cookie = cookieText;
	},

	unset:function(name, path, domain, secure){
		this.set(name, "", new Date(0), path, domain, secure);
	}
}
CookieUtil.set('name', 'your name');

//  E  实现cookie操作




// 事件绑定
var EventUtil = {
	addHandler : function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
		} else {
			element["on" + type] = handler;
		}
	},
	// 移除事件绑定
	removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
}
// 实现拖放条功能
var rule = document.getElementById("rule"); //拖放条——尺子
var block = document.getElementById("block"); //拖放条——拖放块 
var text = document.getElementById("text");  //拖放条——文字
var sizeTip = document.getElementById("size"); //拖放条——像素显示

var prevMouse, //鼠标点击时的位置
	prevBlock,  //鼠标点击时小块的位置
	prevText ;  //鼠标点击时文字的大小

//移动，获取鼠标和小块的新位置
function move(){
	var forwardMouse = event.clientX - 20; //鼠标移动后的位置
	var temp = forwardMouse - prevMouse; // 鼠标（小块）的位移
	var left = prevBlock + temp; //小块的位置，相对于父容器的位置
    var font = prevText + temp/5; // 字体的大小

	if (left < 0) {
		left = 0;
		font = 10;
	}
	if (left > 490) {
		left = 490;
		font = 112;
	}
	block.style.left = left + "px";
	text.style.fontSize = font + "px";
	sizeTip.style.left = left + "px";
	sizeTip.innerHTML = font + "px";
}

function Mousevent(){
	prevBlock = block.offsetLeft;
	prevMouse = event.clientX;
	prevText = prevBlock/5 + 10;
	move();
}
	
    var Bind = EventUtil.addHandler;
    Bind(block, "mousedown", Mousevent); //绑定鼠标点击小块事件
    Bind(rule, "mousemove", move); //绑定鼠标在尺子上移动事件
    Bind(block, "mouseup", function(){ //解除事件绑定
	   EventUtil.removeHandler(block, "mousedown", Mousevent);
});




