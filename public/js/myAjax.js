
$(function(){
	// ajax方法
	function myAjax (url, data, method, func1, func2) {
		
		var handle_error = function (jqXHR, textStatus) {
			// ajax 调用出错处理
			if(jqXHR.state() == "resolved"){
				console.log ('error');
				func2();
				return ;
		    }
		    func2();
		};
		$.ajax ({
			url: url,
			data: data,
			method: method,
			success: func1,
			error: handle_error,
			dataType: 'json',
		});
	}


	// 返回顶部
    $().UItoTop({
        easingType: 'easeOutQuart'
    });

    $('.works a.gal').touchTouch();

    $(".scroll").click(function(event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top
        }, 1200);
    });

    $('.popup-with-zoom-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

    // 标签转义
    function htmlEncode ( str ) {  
        return $('<span/>').text( str ).html();  
    }  
    // 标签解析
    function htmlDecode ( str ) {  
        return $('<span/>').html( str ).text();  
    }  

    // 留言提交
    $('#submit').click(function(event) {
    	// 获取表单数据
    	var name = $('#name').val();
    	var email = $('#email').val();
    	var content= $('#text_content').val();
    	var dateline = new Date().getTime();// 获取时间戳

    	// 数值判断 邮箱
    	email = $.trim(email).match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
    	if(!email && $.trim(email)===''){
    		alert('邮箱格式不正/邮箱不能为空！');
    		return false;
    	}

    	if($.trim(name) === ''){
    		alert('用户名不能为空！');
    		return false;
    	}

    	name = htmlEncode(name);
    	content = htmlEncode(content);
    	var data = {};
    	data['name']=name;
    	data['email']=email;
    	data['content']=content;
    	data['dateline']=dateline;

    	function drwp(res){
    		alert('提交成功');
    	}

    	function fail(){
    		alert('提交失败');
    	}

    	myAjax('/contactApi',data,'POST',drwp,fail);

    	// 清空数据
    	$('#name').val('');
    	$('#email').val('');
    	$('#text_content').val('');
    	// alert(name +' '+ email +' '+ content+' '+dateline);
    });
    

});
