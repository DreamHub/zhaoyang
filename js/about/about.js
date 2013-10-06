$(function() {
	$("#text").fsrPMD({
		Event : 'mouseover', //事件
		Id : 'text', //容器ID
		Bq : 'div', //复制html标签
		Fx : "down", //方向
		Time : 40 //时间
	});
	$("#about_Nav ul li").not(".now").mouseenter(function(){
		$(this).toggleClass("now");
	}).mouseleave(function(){
		$(this).toggleClass("now");
	});
});
