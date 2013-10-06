$(function() {
	$("#text").fsrPMD({
		Event : 'mouseover', //事件
		Id : 'text', //容器ID
		Bq : 'div', //复制html标签
		Fx : "down", //方向
		Time : 40 //时间
	});
	$("#about_Nav ul li a").mouseenter(function() {
		$(this).css("border-left-width", 1);
		$(this).parent().css("border-left-width", 1);
		$(this).animate({
			"margin-left" : 5
		}, 300);
	}).mouseleave(function() {
		$(this).parent().css("border-left-width", 0);
		$(this).animate({
			"margin-left" : 0
		}, 500);
	});
});
