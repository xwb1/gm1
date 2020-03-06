$(function(){
	$.ajax({
		type:"get",

		url:"http://jx.xuzhixiang.top/ap/api/allproductlist.php",
		data:{
			"pagenum":1,
			"pagesize":20,
		},
		success:function(rel){
			console.log(rel.data);
			for(let i=1;i<rel.data.length;i++){
				
				var $figure = $("<figure class='shangpin'></figure>");
				var $img = `<img src=${rel.data[i].pimg}>`;
				var $a = `<a href="#">${rel.data[i].pname}</a>`;
				var $span = `<span>￥${rel.data[i].pprice}</span>`;
				var $submit =`<input type="button" id=${rel.data[i].pid} class="submit" value="加入购物车">`;
				$figure.append($img);
				$figure.append($a);
				$figure.append($span);
				$figure.append($submit);
				$(".lista .neirong").append($figure);
			}
			for(let j=0;j<$(".submit").length;j++){
				$(".submit").eq(j).on("click",function(){
					var aid=$(".submit").eq(j).attr("id");
					window.location.href = "details.html?aid="+aid;
				});
			}
		}
	});
	
});