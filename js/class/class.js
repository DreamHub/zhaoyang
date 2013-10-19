
$(function() {
	$.getJSON("js/class/srclass.js", function(data) {
		deal_data(data);
	});
	
    //获取选课中心课程内容
    productContent('one','小学');
    //获取排行
    //changeRankList('one','小学');

	// $("#teachers_show_id").fsrPMD({
		// Event : 'mouseover', //事件
		// Id : 'teachers_show_id', //容器ID
		// Bq : 'td', //复制html标签
		// Fx : "left", //方向
		// Time : 10 //时间
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
				thisSubjectJ.append('<a href="' + classK.classHref + '" target="_blank">' +  classK.class + '</a>  ');
			});	
		});
		
	});
}

//搜索条件设置
function goSearch(name, stage, grade, subject)
{
    /*
    if(typeof name == 'undefined' || name === null) name = '全部课程';
    if(typeof stage == 'undefined' || stage === null) stage = '全部阶段';
    if(typeof grade == 'undefined' || grade === null) grade = '全部年级';
    if(typeof subject == 'undefined' || subject === null) subject = '全部学科';
    var course_term=0;
    switch(grade){
        case '高中①':grade = '高中1必修';course_term = 1;break;
        case '高中②':grade = '高中2必修';course_term = 2;break;
        case '高中③':grade = '高中3必修';course_term = 3;break;
        case '高中④':grade = '高中4必修';course_term = 4;break;
        case '高中⑤':grade = '高中5必修';course_term = 5;break;
        case '中考复习专区':name = '中考好帮手';grade = '全部年级';break;
        case '高考复习专区':name = '高考好帮手';grade = '全部年级';break;
    }
    */
    window.location.href = 'http://127.0.0.1:8020/zhaoyangSVN/class/' + escape(grade) + '_' + escape(subject) + '_result.html';
    //else window.location.href = 'http://127.0.0.1:8020/gzhaoyang/class/result.html?product_name=' + escape(name);

    return false;
}

function removeSelected(index) {
	if (index == 'one') {
		
		$('#a_one').removeClass("bgImg");
		$('#a_two').addClass("bgImg");
		$('#a_three').addClass("bgImg");
		
	} else if (index == 'two') {
		$('#a_two').removeClass("bgImg");
		$('#a_one').addClass("bgImg");
		$('#a_three').addClass("bgImg");
	} else if (index == 'three') {
		$('#a_three').removeClass("bgImg");
		$('#a_two').addClass("bgImg");
		$('#a_one').addClass("bgImg");/*
		$('#a_three').removeClass("noSelected");
		$('#a_two').addClass("noSelected");
		$('#a_one').addClass("noSelected");
		*/
	}  
}

function productContent(index, stage){
    $.getJSON("http://api.gopep.cn/products/ajaxProductResponse.php?callback=?", {type:'productContent', stage:stage}, function(data){
        removeSelected(index);
        if(!data)
        {
/*
            if (stage == '灏忓') {
            	$("#container_one").empty();	
            } else if (stage == '鍒濅腑') {
            	$("#container_two").empty();	
            } else if (stage == '楂樹腑') {
            	$("#container_three").empty();	
            } */
           
			$(".container").empty();	
        }
        else
        {
            $(".container").empty();	
            data = eval(data);
            for(var i=0; i<data.length; i++)
            {
            var html = "<div class='item pict-lr'>\n";
            html += "<div class='pic'><a href='http://api.gopep.cn/products/detail/"+ data[i].product_id +".html' target='_blank'><img height='130' width='90' src='image/class/shuxue_1a_n.png'/></a></div>";
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

            html += "<p>使用期限：一年</p>";
            html += "<p>学　　费：￥"+ data[i].current_price +"</p>";
            html += "</div>";

			/*
			if (stage == '灏忓') {
							$("#container_one").append(html);
						} else if (stage == '鍒濅腑') {
							$("#container_two").append(html);	
						} else if (stage == '楂樹腑') {
							$("#container_three").append(html);	
						} */
			
			$("#container_" + index).append(html);	
        }
        }
    });
}

function changeRankList(index, stage)
{
    $(".normal-list").text("数据载入中 ...");
    $.getJSON("http://api.gopep.cn/products/ajaxProductResponse.php?callback=?", {type:'salerank', stage:stage}, function(data){
        if(!data)
        {
            $(".normal-list").empty();
        }
        else
        {
            $(".normal-list").empty();
            data = eval(data);
            for(var i=0; i<data.length; i++)
            {
                $('.normal-list').append("<li><a href='http://api.gopep.cn/products/detail/"+ data[i].product_id +".html' title='"+ data[i].product_fullname +"'>"+ (i+1) +"."+ data[i].product_shortname +"</a></li>");
            }
        }
    });
}

