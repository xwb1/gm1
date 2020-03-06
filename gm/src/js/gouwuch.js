$(function(){
	let id =getCookie("username");
	let number = 0;
	$.ajax({
		type:"get",
		url:"http://jx.xuzhixiang.top/ap/api/cart-list.php",
		data:{"id":id},
		success:function(data){
			console.log(data);
			for(let i=0;i<data.data.length;i++){
				number += data.data[i].pnum;
			}
			var aspan=`<span class="gnumber">${number}<span>`;
			$(".gouwu").append(aspan);
		}
		
		
	});
	 
	$(".gouwu").on("click",function(){
		window.location.href="../html/shoop.html";
	});
	var a = getCookie("username");
	console.log(a);
	if(a!=undefined){
		$("header .neirong ._left li").css({"display":"none"});
		var aname = getCookie("username");
		var lai = `<li class="names">Hi,${aname}</li>`;
		var lli = `<li><a  class="lli">注销</a></li>`;
		$("header .neirong ._left").append(lai);
		$("header .neirong ._left").append(lli);
		$(".lli").on("click",function(){
			removeCookie("username");
			removeCookie("id");
		});
	}
});