
$(function(){
	$.ajax({
		type:"get",
		url:"http://jx.xuzhixiang.top/ap/api/allproductlist.php",
		data:{
			"pagesize":20,
			"pagenum":1,
		},
		success:function(rel){
			console.log(rel);
			var $ul = $('.lists');
			for(let i=0;i<rel.length;i++){
				var menu = rel[i].pname;
				var sid = rel[i].pid;
				var $li = $('<li class="list" ></li>');
				console.log($li);
				$li.css("id",sid);
				$ul.append($li);
				var $a = $('<a href="#"></a>');
				$a.html(menu);
				$li.append($a);
				//创建二级列表
				var $secondMenuDiv = $('<div class="box"></div>')
				$li.append($secondMenuDiv)	
			}
		}
		
	});
	$.ajax({
		type:"get",

		url:"http://jx.xuzhixiang.top/ap/api/allproductlist.php",
		data:{
			"pagesize":20,
			"pagenum":2,
		},
		success:function(data){
				console.log(data);
				for(let i=0;i<data.length;i++){
					var $a = $("<a href='#' class='as'></a>")
					$a.html(data[i].name);
					$(".box").eq(i).append($a);
				}
			}
		})
	$.ajax({
		url:"http://jx.xuzhixiang.top/ap/api/allproductlist.php",
		type:"get",
		data:{
			"pagenum":3,
			"pagesize":20,

		},
		success:function(data){
			console.log(data);
		}
	})
	// banner轮播
	$("#lunbo img").fadeOut();
	$("#lunbo img").eq(0).fadeIn();
	$("#banner .neirong .gun li").eq(0).css("background","rgba(125,125,125,0.3)");
	function lunbo(index){
		if(index>$("#lunbo img").length-1){
			index=0;
		}
		
		$("#banner .neirong .gun li").css("background","rgba(0,0,0,0.3)");
		$("#banner .neirong .gun li").eq(index).css("background","rgba(125,125,125,0.3)");
		$("#lunbo img").fadeOut(500);	
		$("#lunbo img").eq(index).fadeIn(500);
			if(index==0){
				$("#banner").css("background","#6ec4d3");
			}
			if(index==1){
				$("#banner").css("background","#b57971");
			}
			if(index==2){
				$("#banner").css("background","#d92f3a");
			}
			if(index==3){
				$("#banner").css("background","#a70115");
			}
			if(index==4){
				$("#banner").css("background","#ff98c2");
			}
			if(index==5){
				$("#banner").css("background","#faee1e");
			}
			if(index==6){
				$("#banner").css("background","#4da87c");
			}
			if(index==7){
				$("#banner").css("background","#91010b");
			}
			
		}
	
	var index = 0;
	console.log(index);
	var item =setInterval(function(){
		index++;
		lunbo(index);
		
	},3000);
 	$("#lunbo").on("mouseover",function(){
		clearInterval(item);
		
	});
	$("#lunbo").on("mouseout",function(){
		item=setInterval(function(){
			index++;
			lunbo(index);
		
		},3000);
	
	});
	$("#banner .neirong .gun li").on("mouseover",function(){
		clearInterval(item);
		index = $(this).index();
		lunbo(index);
		$("#banner .neirong .gun li").css("background","rgba(0,0,0,0.3)");
		$(this).css("background","rgba(125,125,125,0.3)");
		return false;
	});
	$("#banner .neirong .gun li").on("mouseout",function(){
		var index = $(this).index();
		console.log(index);	
		item=setInterval(function(){
		index++;
		lunbo(index);
		
	},3000);
		return false;
	});
	//下一张轮播图
	$("#xia").on("click",function(){
		clearInterval(item);
		if(index>$("#lunbo img").length-1){
			index = 0;
		}
		item=setInterval(function(){
			index++;
			console.log(index);
			lunbo(index);
		},3000);
	});
	
	
	

	//搜索框
	var oTex = document.getElementById("tex");
	oTex.oninput=function(){
		//https://apis.gome.com.cn/p/suggest?from=headSearch&module=searchSuggest&query=12a&jp=true&callback=?
		//https://apis.gome.com.cn/search?question=hua&searchType=goods&search_mode=normal&reWrite=true&instock=1
		//https://search.gome.com.cn/search?question=tian&searchType=goods&search_mode=normal&reWrite=true&instock=1
		//https://search.gome.com.cn/search?question=%E5%86%B0%E7%AE%B1%E5%AE%B9%E5%A3%B0&searchType=goods&pos=1&sq=bing&search_mode=suggest&reWrite=true&instock=1
		//https://search.gome.com.cn/search?question=%E5%86%B0&searchType=goods&search_mode=normal&reWrite=true&instock=1
		let texValue = oTex.value;
		let oSosuol = document.getElementById("sousuol");
		oSosuol.innerHTML=null;
		oSosuol.style.display="block";
		var surl ="https://apis.gome.com.cn/p/suggest?from=headSearch&module=searchSuggest&query="+texValue+"&jp=true&callback=?";
		// var surl ="https://search.gome.com.cn/search?question="+texValue+"&searchType=goods&search_mode=normal&reWrite=true&instock=1";
	$.ajax({
			url:surl,
			dataType:"jsonp",
 			scriptCharset:"gb2312"
 		}).then(function (res){
			console.log(res.length);
			for(let i=0;i<res.length;i++){
				console.log(str);
			var str = `<li class="sousuoli"><a href="#">${res[i][0]}</a></li>`;
				oSosuol.innerHTML+=str;
			}
		})
	}
});