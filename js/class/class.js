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
    window.location.href = 'http://127.0.0.1:8020/gzhaoyang/class/' + escape(grade) + '_' + escape(subject) + '_result.html';
    //else window.location.href = 'http://127.0.0.1:8020/gzhaoyang/class/result.html?product_name=' + escape(name);

    return false;
}

