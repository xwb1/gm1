$(function(){

	$("#submit").on("click",function(){
		var username = $("#username").val();
		var password = $("#password").val();
		$.ajax({
			type:"get",
			url:"http://jx.xuzhixiang.top/ap/api/login.php",
			data:{'username':username,
				'password':password},
			success:function(data){
				console.log(data);
				if(data.msg=="请检查用户名或者密码"){
					alert("登录失败");
				}else{
					setCookie("username",username,700000);
					setCookie("token",data.data.token,700000);
					alert("登录成功");
					window.location.href="./index.html";
				}
			}	
		});
	});
});