$(function() {
	//init(".inside", 100, "180px", 1200, 1000, "0px", 2000);
	
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
	
});