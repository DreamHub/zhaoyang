(function($){
		$.alerts = {
			alert : function(o,options){
				var defaults = {
					title : '标题',
					content : '内容',
					GetType : 'string',		//controls,ajax,string,iframe
					IsDrag : true,
					Url : '',
					Data : null,
					width:400,
					height:300,
					callback : function(){}
				}
				
				var options = $.extend(defaults,options);
				if(!$("#window")[0])
				{
					$.alerts._createObject();
				}
				var position = $.alerts._getPosition(o);				
				var winPosition = $.alerts._getWindowPosition(options);
				$("#windowContent").hide();
				$("#window").css(
					{
						width:position.w,
						height:position.h,
						top:position.t,
						left:position.l,
						zIndex:1001
					}
				);
				$("#windowBottom,#windowBottomContent").css(
					{
						height:options.height-30
					}
				);
				$("#windowContent").css(
					{
						height:options.height - 45,
						width:options.width - 25
					}
				);
				$("#windowTopContent").html(options.title);
				switch(options.GetType){
					case "string":
						$("#windowContent").html(options.content);
					break;
					case "ajax":
						if(options.Url == ''){
							alert("AjaxUrl不能为空");
							return;
						}else{
							$.ajax(
								{
									type: "POST",
									url: options.Url,
									data: options.Data,
									success: function(msg){
										$("#windowContent").html(msg);
									}

								}
							);
						}
					break;
					case "controls":
						$("#windowContent").html(options.content.innerHTML);
					break;
					case "iframe":
						$("#windowContent").empty();
						$("<iframe>").attr(
							{
								src : options.Url,
								width:options.width,
								height:options.height
							}
						).appendTo("#windowContent");
					break;
				}
				
				$("#window").animate(
					{
						left:winPosition.l,
						top:winPosition.t,
						height:winPosition.h,
						width:winPosition.w
					},500,function(){						
						$("#windowContent").fadeIn('slow');
						$("#windowContent").slideDown(600);

						if($("#middleElement_bgDiv").get().length == 0){
							
							$("<div>").attr("id","middleElement_bgDiv").css(
								{
									position:"absolute",
									left:"0px",
									top:"0px",
									width:$(window).width()+"px",
									height:Math.max($("body").height(),$(window).height())+"px",
									filter:"Alpha(Opacity=40)",
									opacity:"0.4",
									backgroundColor:"#AAAAAA",
									zIndex:"1000",
									margin:"0px",
									padding:"0px"
								}
							).appendTo("body");				
						}else{
							$("#middleElement_bgDiv").show();
						}
					}
				);

				$("#windowClose").one("click",function(){

					$("#windowContent").slideUp(600,function(){
						
						$("#window").animate(
							{
								left:position.l,
								top:position.t,
								height:position.h,
								width:position.w
							},500,function(){
								$(this).hide();
								if($("#middleElement_bgDiv").get().length > 0){
									$("#middleElement_bgDiv").hide();
								}
								$("#window").css(
									{
										left:winPosition.l,
										top:winPosition.t,
										height:winPosition.h,
										width:winPosition.w
									}
								);
							}
						);
					})
					
				});

				$("#windowTop").mousedown(function(event){
					$.alerts.Drag(
						document.getElementById("window"),
						{					
							e : event,							
							Drag : options.IsDrag
						}
					);
				});
				
			},
			
			_createObject : function(){
				$("<div id=\"window\">"+
					"<div id=\"windowTop\">"+
						"<div id=\"windowTopContent\">Window example</div>"+
						"<img src=\"../image/class/window_min.jpg\" id=\"windowMin\" />"+
						"<img src=\"../image/class/window_max.jpg\" id=\"windowMax\" />"+
						"<img src=\"../image/class/window_close.jpg\" id=\"windowClose\" />"+
					"</div>"+
					"<div id=\"windowBottom\"><div id=\"windowBottomContent\">&nbsp;</div></div>"+
					"<div id=\"windowContent\"></div>"+					
					"<img src=\"../image/class/window_resize.gif\" id=\"windowResize\" />"+
				"</div>").appendTo("body");		
					
			},			
			_getWindowPosition : function(options){
				var wPosition = $.alerts._getPosition("#window");
				var windowPosition = {};				
				windowPosition.t = parseInt($(window).height()/6)+parseInt($(window).scrollTop());
				windowPosition.l = ($(window).width()+$(window).scrollLeft())/2 - options.width/2;				
				windowPosition.w = options.width;
				windowPosition.h = options.height;
				return windowPosition;
			},
			_getPosition : function(o){
				var top = $(o).offset().top;
				var left = $(o).offset().left;
				var height = $(o).height();
				var width = $(o).width();
				return {t:top,l:left,h:height,w:width};
			},
			Drag : function(obj,options){
			
				var e = options.e || window.event;
				var Drag = options.Drag;
				
				if(Drag == false)return;
							
				var x=parseInt(obj.style.left); 
				var y=parseInt(obj.style.top);         
				 
				var x_=e.clientX-x; 
				var y_=e.clientY-y;  
				
				if(document.addEventListener){ 
					document.addEventListener('mousemove', inFmove, true); 
					document.addEventListener('mouseup', inFup, true); 
				} else if(document.attachEvent){ 
					document.attachEvent('onmousemove', inFmove); 
					document.attachEvent('onmouseup', inFup); 
				} 
				 
				inFstop(e);     
				inFabort(e); 
				 
				function inFmove(e){ 
					var evt; 
					if(!e)e=window.event; 					
					 
					obj.style.left=e.clientX-x_+'px'; 
					obj.style.top=e.clientY-y_+'px'; 					
					
					inFstop(e); 
				} 
				function inFup(e){ 
					var evt; 
					if(!e)e=window.event; 
					 
					if(document.removeEventListener){ 
						document.removeEventListener('mousemove', inFmove, true); 
						document.removeEventListener('mouseup', inFup, true); 
					} else if(document.detachEvent){ 
						document.detachEvent('onmousemove', inFmove); 
						document.detachEvent('onmouseup', inFup); 
					} 
					 
					inFstop(e); 
				} 

				function inFstop(e){ 
					if(e.stopPropagation) return e.stopPropagation(); 
					else return e.cancelBubble=true;             
				} 
				function inFabort(e){ 
					if(e.preventDefault) return e.preventDefault(); 
					else return e.returnValue=false; 
				} 


			}
		}
		JAlert = function(o,json){
			$.alerts.alert(o,json);
		};
	})(jQuery);

$(function() {
	
	var flag = location.href.indexOf("?jsId");
	var jsId = location.href.substr(flag+6);
	
	$.getJSON("../js/class/srclass_" + jsId + ".js", function(data) {
		deal_data(data);
	});
	productContent("小学");
	
	// alert($("#forClick_0").text());
// 	
	// $(".sonShow").each(function(){
                                // $(this).bind("click",function(){
                                    // JAlert(this,{					
                                        // title : '提示窗体',
                                        // content : $("#msg")[0].outerHTML,
                                        // GetType : 'string',		//controls,ajax,string,iframe					
                                        // IsDrag : true,
                                        // Url : "windows.html",
                                        // Data : null,
                                        // width:300,
                                        // height:200
                                                                // });
                                // });
                            // });
	
});

function deal_data(myData) {
	$('#allsortId').empty();
	$.each(myData, function(i) {
		$('#allsortId').append('<div style="background:none repeat scroll 0 0 #E8F7D4;color: #4A8221;font-weight: 700;height: 30px;line-height: 30px;margin-bottom: 5px;padding-left: 60px;">' + myData[i].schoolGrade  + '</div><div class="mc"></div>');
		var thisMc = $('#allsortId .mc').eq(i);
		var myDataI = myData[i];
		$.each(myDataI.schoolContent, function(j) {
			thisMc.append('<div class="left-name" style="color:#4a8221">' + myDataI.schoolContent[j].grade + '</div><div class="right-subject"></div>');
			var thisSubjectJ = thisMc.find('.right-subject:last');
			var schoolContent = myDataI.schoolContent[j];
			var myClassList = schoolContent.classList;
			$.each(myClassList, function(k) {
				var classK = myClassList[k]; 
				thisSubjectJ.append('<a href="' + classK.classHref + '" target="_self">' +  'aaa' + '</a>  ');
			});	
		});
		
	});
}

function productContent(stage){
    $.getJSON("http://api.gopep.cn/products/ajaxProductResponse.php?callback=?", {type:'productContent', stage:stage}, function(data){
        if(!data)
        {
			$(".container").empty();	
        }
        else
        {
            $(".container").empty();	
            data = eval(data);
            for(var i=0; i<data.length; i++)
            {
            var html = "<div class='item pict-lr'>\n";
            html += "<div class='pic'><a href='http://api.gopep.cn/products/detail/"+ data[i].product_id +".html' target='_blank'><img height='130' width='90' src='../image/class/shuxue_1a_n.png'/></a></div>";
            html += "<p><a href='http://api.gopep.cn/products/detail/"+ data[i].product_id +".html' target='_blank'><strong>"+ data[i].product_shortname +"</strong></a></p>";

            var lecturer = data[i].lecturers;
            if(lecturer === null || lecturer === undefined || typeof lecturer == 'undefined') lecturer = '--';
            html += "<p>主讲教师："+ lecturer +"</p>";

            var subject = data[i].course_subject;
            if(subject === null || subject === undefined || typeof subject == 'undefined') subject = '--';
            html += "<p>科　　目：<a href=\"http://api.gopep.cn/products/result.html?course_subject="+ escape(subject) +"\" target='_blank'>"+ subject +"</a></p>";

            var grade = (data[i].course_grade === undefined || typeof data[i].course_grade == 'undefined') ? undefined : data[i].course_grade;
            if(data[i].course_term !=null && data[i].course_term !== undefined && typeof data[i].course_term != 'undefined') grade += data[i].course_term;
            if(data[i].course_type !=null && data[i].course_type !== undefined && typeof data[i].course_type != 'undefined') grade = data[i].course_term + data[i].course_type ;
            if(grade === null || grade === undefined || typeof grade == 'undefined') grade = '--';
            html += "<p>年级学期："+ grade +"</p>";

            html += "<p>学　　费：￥"+ data[i].current_price +"</p>";
        
        	html += '<a id="forClick_' + i + '" class="sonShow">查看详细信息</a>';
        
            // html += "<a id='forClick_" + i + " class=\'sonShow\' href='javascript:void(0);'" + 
            // " onclick='JAlert(this, {title:, content:, GetType:, IsDrag:true, Url:, Data:null, width:300, height:200})'" + 
            // ">查看详细信息</a>";  
            
        
            /*
            $(".sonShow").each(function(){
                                $(this).bind("click",function(){
                                    JAlert(this,{					
                                        title : '鎻愮ず绐椾綋',
                                        content : $("#msg")[0].outerHTML,
                                        GetType : 'string',		//controls,ajax,string,iframe					
                                        IsDrag : true,
                                        Url : "windows.html",
                                        Data : null,
                                        width:300,
                                        height:200
                                                                });
                                });
                            });
                        */
            
            
            html += "</div>";

			$("#searchResult").append(html);
				
        }
        $(".sonShow").each(function(){
                                $(this).bind("click",function(){
                                	$('#window').css('display', 'block');
                                    JAlert(this,{					
                                        title : '详细信息',
                                        content : '<p>内容：初中语文八年级上册</p><p>审看老师：熊江平</p><p>主讲老师：阮翠莲</p>' + 
                                        '<p>审看意见：教学思路符合新课标精神，整个教学过程重点突出，层次分明，能帮助学习者掌握有效的学习策略和方法，提高学习效率。 课文朗读有音乐、动画配合，使听觉和视觉相结合，很好。</p>' +
              							'<p>内容：语文八年级上册同步检测</p><p>审看老师：熊江平</p><p>主讲老师：阮翠莲</p><p>审看意见：与人教社教材同步，作为同步辅导的延续和补充，分基础知识、阅读理解，作文三项内容，结合课文学习规律，对重点难点考点进行有计划的安排处理，重点突出层次分明简明扼要，题量适中。</p>',
                                        GetType : 'string',		//controls,ajax,string,iframe					
                                        IsDrag : true,
                                        Url : "windows.html",
                                        Data : null,
                                        width:400,
                                        height:300
                                                                });
                                });
                            });
        
        }
    });
}
