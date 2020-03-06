$(function(){
	var id = getCookie("username");
	console.log(id);
	function asx(id){
		$.ajax({
			type:"get",
			url:"http://jx.xuzhixiang.top/ap/api/cart-list.php",
			data:{"id":id},
			success:function(data){
				console.log(data);
				for(let i=0;i<data.data.length;i++){
					var img = data.data[i].pimg;//图片
					var $img = `<img class="oimg" src = ${img}>`;
					var sname = data.data[i].pname;//名字
					var $sname =`<span class="sname">${sname}</span>`;
					var price = data.data[i].pprice;//价格
					var $price = `<p class="price">${price}</p>`;
					var number = data.data[i].pnum;//数量
					var heji =price*number;
					var $heji = `<p class="hej">${heji}元</p>`;
					var $delect = `<input type="button" class="delect" value="删除">`;
					var $number1 =`<input class="number1" type="button" value="-" >`;
					var $cunshu =`<span class="cunshu">${number}</span>`; 
					var $number2 =`<input class="number2" type="button" value="+" >`;
					var $number = `<div class="number">${$number1}${$cunshu}${$number2}</div>`;
					var $tr = `<tr>
									<td>${$img}</td>
									<td>${$sname}</td>
									<td>${$price}</td>
									<td>${$number}</td>
									<td class="heji">${$heji}</td>
									<td>${$delect}</td>
								</tr>`; 
					$("#shang").append($tr);
					
				}
				del=document.querySelectorAll(".delect");
				console.log(del);
				for(let j=0;j<data.data.length;j++){
					//删除
					var uid = getCookie("username");
					console.log(uid);
					/* $(".delect").on("click",function(){ */
					del[j].onclick =function(){
						/* var gwid =data.data[j].id;//购物车中商品编号 */
						var pid = data.data[j].pid;//商品编号
						console.log(pid);
						$.ajax({
								type:"get",
								url:"http://jx.xuzhixiang.top/ap/api/cart-delete.php",
								data:{
									"uid":uid,
									"pid":pid,
								},
								success:function(data){
									var jied = document.getElementsByClassName("delect")[j];
									var fujied= jied.parentNode.parentNode;
									var ffjied = fujied.parentNode;
									ffjied.removeChild(fujied);
								}
							});
							
					}/* ) */;
					
					//增加减少
					var pnum =data.data[j].pnum;
					console.log(pnum);
					$(".number2").eq(j).on("click",function(){
						var pid = data.data[j].pid;//商品编号
						var gwid =data.data[j].id;//购物车中商品编号
						pnum++;
						console.log(uid);
						console.log(id);
						$.ajax({
								type:"get",
								url:"http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
								data:{
									"uid":id,
									"pid":pid,
									"pnum":pnum,
								}
							});
						$.ajax({
							type:"get",
							url:"http://jx.xuzhixiang.top/ap/api/cart-list.php",
							data:{"id":id},
							success:function(data){
								var id =data.data[j].pid;//商品编号
								var gid = data.data[j].id;//购物车中商品编号
								var numbe = data.data[j].pnum;//数量
								var heji = numbe*data.data[j].pprice+"元";//合计
								$(".cunshu").eq(j).html(numbe);
								$(".heji").eq(j).html(heji);
							},
							});
							
					});
					$(".number1").eq(j).on("click",function(){
						var pid = data.data[j].pid;//商品编号
						var gwid =data.data[j].id;//购物车中商品编号
						pnum--;
						console.log(uid);
						console.log(id);
						$.ajax({
								type:"get",
								url:"http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
								data:{
									"uid":id,
									"pid":pid,
									"pnum":pnum,
								}
							});
						$.ajax({
							type:"get",
							url:"http://jx.xuzhixiang.top/ap/api/cart-list.php",
							data:{"id":id},
							success:function(data){
								var id =data.data[j].pid;//商品编号
								var gid = data.data[j].id;//购物车中商品编号
								var numbe = data.data[j].pnum;//数量
								var heji = numbe*data.data[j].pprice+"元";//合计
								$(".cunshu").eq(j).html(numbe);
								$(".heji").eq(j).html(heji);
							},
							});
							
					});
				}
			}
		});
	}
	asx(id);
});