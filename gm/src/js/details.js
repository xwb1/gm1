
$(function(){
	//获取商品ID
	var aa= window.location.search;
	console.log(aa);
	var c =aa.indexOf("=");
	var d =aa.substring(c+1);
	console.log(d);
	//获取商品信息
	$.ajax({

		url:"http://jx.xuzhixiang.top/ap/api/detail.php",
		type:"get",
		data:{"id":d},
		success:function(data){
			console.log(data);
			//放大镜
			var $img = `<img src=${data.data.pimg}>`;//商品图片
			$(".probox").append($img);
			$(".showbox").append($img);
			function Zoom(imgbox,hoverbox,l,t,x,y,h_w,h_h,showbox){
					var moveX =x-l-(h_w/2);
					//鼠标区域距离
					var moveY =y-t-(h_h/2);
					//鼠标区域距离
					if(moveX<0){moveX=0}
					if(moveY<0){moveY=0}
					if(moveX>imgbox.width()-h_w){moveX=imgbox.width()-h_w}
					if(moveY>imgbox.height()-h_h){moveY=imgbox.height()-h_h}
					//判断鼠标使其不跑出图片框
					var zoomX =showbox.width()/imgbox.width()
					//求图片比例
					var zoomY =showbox.height()/imgbox.height()
					
					showbox.css({left:-(moveX*zoomX),top:-(moveY*zoomY)})
					hoverbox.css({left:moveX,top:moveY})
					//确定位置
				
				}
			function Zoomhover(imgbox,hoverbox,showbox){
					var l = imgbox.offset().left;
					var t = imgbox.offset().top;
					var w =hoverbox.width();
					var h = hoverbox.height();
					var time;
					$(".probox img,.hoverbox").mouseover(function(e){
						var x=e.pageX;
						var y=e.pageY;
						$(".hoverbox,.showbox").show();
						hoverbox.css("opacity","0.3")
						time =setTimeout(function(){Zoom(imgbox,hoverbox,l,t,x,y,w,h,showbox)},1)			
					}).mousemove(function(e){
						var x=e.pageX;
						var y=e.pageY;	
						time =setTimeout(function(){Zoom(imgbox,hoverbox,l,t,x,y,w,h,showbox)},1)
					}).mouseout(function(){
						showbox.parent().hide()
						hoverbox.hide();
					})
				}	
			Zoomhover($(".probox img"),$(".hoverbox"),$(".showbox img"));
			
			console.log(data);
			console.log(data.data.pprice);
			//详情页右侧
			var name =data.data.pname;
			var jianjie = data.data.pdesc;
			var jiage = data.data.pprice;
			var pingfen = 10;
			console.log(name);
			var $pName =`<p class="name">${name}</p>`;
			var $pJianjie = `<p class="jianjie">${jianjie}</p>`;
			var $pJiage =  `<p class="jiage">￥${jiage}</p>`;
			var $pPingfen = `<p class="pingfen">评分:${pingfen}</p>`;
			var $submit = `<input class="submit" type="button" value="加入购物车"/>`;

			
			$(".details .neirong ._right").append($pName);
			$(".details .neirong ._right").append($pJianjie);
			$(".details .neirong ._right").append($pJiage);
			$(".details .neirong ._right").append($pPingfen);

			$(".details .neirong ._right").append($submit);
			
			/* var token = getCookie("token");
			console.log(token); */
			console.log(data.data.pid);
			var uid=getCookie("username");
			console.log(uid);
			document.cookie = "id="+data.data.pid;
			var num=0;
			$(".submit").on("click",function(){
				num++;
				console.log(uid);
				console.log(data.data.pid);
				$.ajax({
					type:"get",

					url:"http://jx.xuzhixiang.top/ap/api/add-product.php",
					data:{
						"uid":uid,
						"pid":data.data.pid,
						"pnum":num,

					},
					 
					success:function(data){
						console.log(data);
						console.log(num);
						if(data.msg=="修改成功"){
							alert("添加成功");
							//window.location.href="http://localhost/guomei/html/shoop.html";
							window.location.href="./shoop.html";
						}
					}
					
				});
			});

		}
	});
	
	
	
	
	
	
	
		
});