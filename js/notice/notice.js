function pagable_show(content_div, page_div, data_format, datasrc_url) {
	var a = content_div.ajaxPage({
		url : datasrc_url, //后端 url, {page} 为当前页, 可以为伪静态如:  xl_{page}.html
		run : false, //是否开始加载
		pageId : page_div, //分页容器
		content : function() {
			return data_format;
		}
	});
	a.run();
	a.get("first");
}
$(function() {
	pagable_show($('#xl'), $('#page'), '<ul>[data]<li>[{datatime}]<a href="{url}">{title}</a></li>[/data]</ul>', 'js/notice/datasrc_notices.js');
	$("#text").fsrPMD({
		Event : 'mouseover', //事件
		Id : 'text', //容器ID
		Bq : 'div', //复制html标签
		Fx : "down", //方向
		Time : 40 //时间
	});
});
