"use strict";$(function(){var e=getCookie("username"),o=0;$.ajax({type:"get",url:"http://jx.xuzhixiang.top/ap/api/cart-list.php",data:{id:e},success:function(e){console.log(e);for(var a=0;a<e.data.length;a++)o+=e.data[a].pnum;var n='<span class="gnumber">'.concat(o,"<span>");$(".gouwu").append(n)}}),$(".gouwu").on("click",function(){window.location.href="../html/shoop.html"});var a=getCookie("username");if(console.log(a),null!=a){$("header .neirong ._left li").css({display:"none"});var n=getCookie("username"),i='<li class="names">Hi,'.concat(n,"</li>");$("header .neirong ._left").append(i),$("header .neirong ._left").append('<li><a  class="lli">注销</a></li>'),$(".lli").on("click",function(){removeCookie("username"),removeCookie("id")})}});