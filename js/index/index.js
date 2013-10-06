function go(id, d1, px1, val1, d2, px2, val2) {
	$(id).delay(d1);
	$(id).animate({
		bottom : px1
	}, val1, function() {
		$(id).delay(d2);
		$(id).animate({
			bottom : px2
		}, val2);
	});
}

$(function() {
	//init(".inside", 100, "180px", 1200, 1000, "0px", 2000);
	$("#img1").fsrPMD({
		Event : 'mouseover', //事件
		Id : 'img1', //容器ID
		Bq : 'td', //复制html标签
		Fx : "left", //方向
		Time : 10 //时间
	});
	/*
	var map = new BMap.Map("allmap");
	map.centerAndZoom(new BMap.Point(118.51825419139862, 31.70282984950707), 18);
	var marker1 = new BMap.Marker(new BMap.Point(118.51825419139862, 31.70282984950707));  // 创建标注
    map.addOverlay(marker1);
    var infoWindow1 = new BMap.InfoWindow("朝之阳辅导学校");
	marker1.addEventListener("click", function(){this.openInfoWindow(infoWindow1);});

	map.addControl(new BMap.NavigationControl());
	//添加默认缩放平移控件
	map.addControl(new BMap.NavigationControl({
		anchor : BMAP_ANCHOR_TOP_RIGHT,
		type : BMAP_NAVIGATION_CONTROL_SMALL
	}));
	//右上角，仅包含平移和缩放按钮
	map.addControl(new BMap.NavigationControl({
		anchor : BMAP_ANCHOR_BOTTOM_LEFT,
		type : BMAP_NAVIGATION_CONTROL_PAN
	}));
	//左下角，仅包含平移按钮
	map.addControl(new BMap.NavigationControl({
		anchor : BMAP_ANCHOR_BOTTOM_RIGHT,
		type : BMAP_NAVIGATION_CONTROL_ZOOM
	}));
	//右下角，仅包含缩放按钮
	*/
});
function init(id, d1, px1, val1, d2, px2, val2) {
	$(id).mouseenter(function() {
		$(this).delay(d1);
		$(this).animate({
			bottom : px1
		}, val1, function() {
			$(this).delay(d2);
			$(this).animate({
				bottom : px2
			}, val2);
		});
	});
}
