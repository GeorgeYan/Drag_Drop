<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<title>历史问题页面</title>
<author content="CuiPeng"/>
    <!--简单的画板样式-->
    <link rel="stylesheet" href="assets/css/dragdrop.css">
<link rel="stylesheet" type="text/css" href="<%=path %>/themes/default/css/histor.css" content="CuiPeng"/>
<link rel="stylesheet" type="text/css" href="<%=path %>/themes/default/css/bootstrap.css" />
<link rel="stylesheet" type="text/css" href="<%=path %>/themes/default/css/btn.css" />
<link rel="stylesheet" type="text/css" href="<%=path %>/themes/default/css/jquery-ui-1.10.0.custom.css" />
<script type="text/javascript" src="<%=path %>/themes/default/js/jquery-1.7.2.js"></script>
<script type="text/javascript" src="<%=path %>/themes/default/jQuery/jquery-1.8.3.min.js"></script>
<!-- 导航及弹出层所用JS -->
<script type="text/javascript" src="<%=path %>/themes/default/js/bootstrap.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=path %>/themes/default/jQuery/jquery-ui-1.10.0.custom.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=path %>/themes/default/js/window.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=path %>/themes/default/js/time.js" charset="UTF-8"></script>

<!-- 弹出层设置 -->
<script language="JavaScript">

         javascript:window.history.forward(1);

</script>
<script type="text/javascript">
		var testId="";
		var stcode,centerx,centery,fixnum;
		var type="all";
		var time="";
		var timeType="";
		var caseTypeNum="";
</script>
<script type="text/javascript">
var str={
       urlPath:"<%=request.getContextPath()%>/webmodule/historyIssues",
       imgPath:'<%=request.getContextPath()%>/webmodule/historyIssues/History/getImg.do?fid=',
       caseType:"",
       gridNumber:"",
       data:""
       };
 $(function(){
	    $.ajax({
				type:"post",
				url:str.urlPath+"/History/getCaseNum.do",
				dataType:"json",
				success:function(data){
				    cateInf(data)
					hisCaseInf(data);
					daiCaseInf(data);
				}
			});
		});
		function cateInf(data){
	      var cateLen=data['cate'].length;
          for(var i=0;i<cateLen;i++){
            $('#upNum'+i).text(data['cate'][i].count);
            $('#upAvgNum'+i).text(data['cate'][i].avgCount);
          }
	    }
        function hisCaseInf(data){
            var hisStr="";
	        var hisLen=data['his'].length;
           for(var i=0;i<hisLen;i++){
             hisStr+="<li id='num'>"+"<span id="+'\"'+"hisCase"+i+'\"'+" value='' onclick='getName(this)'>"+data['his'][i].caseName+"</span><font class='color_blue'><span id="+'\"'+"hisNum"+i+'\"'+">"+data['his'][i].count+"</span>件</font>"+"</li>";
             $('#hisImg').html(hisStr);
            }
          for(var i=0;i<hisLen;i++){
             $('#hisCase'+i).attr("value",data['his'][i].dicCode);
          }
		}

	 	function daiCaseInf(data){
	        var diaStr="";
	        var daiLen=data['his'].length;
          for(var i=0;i<daiLen;i++){
           diaStr+="<li id='num'>"+"<span id="+'\"'+"diaCase"+i+'\"'+" value='' onclick='getName(this)'>"+data['dai'][i].caseName+"</span><font class='color_blue'><span id="+'\"'+"diaNum"+i+'\"'+">"+data['dai'][i].count+"</span>件</font>"+"</li>";
           $('#daiImg').html(diaStr);
          }
          for(var i=0;i<daiLen;i++){
             $('#diaCase'+i).attr("value",data['dai'][i].dicCode);
            if(data['dai'][i].status=="key"){
		     $('#diaCase'+i).css('color','#CD0A0A');
		    }
          }
		}
	 function Refresh(){
	     $.ajax({
				type:"post",
				url:str.urlPath+"/History/getCaseNum.do",
				dataType:"json",
				success:function(data){
					daiCaseInf(data);
				}
			});
	 }

		 var val = '<%=request.getParameter("val")%>';
       //  alert(val);


	function openKeyIssue(){
			var web=new Web();
			web.OpenWin({id:'win',title:'添加重点问题',width:700,height:500,url:'key.jsp',
				buttons:{
					"确定":function(){
						web.getWinFrame().addKey();
					},
					"关闭":function(){
						$(this).dialog("close");}
					}
			});
		}

		function Others(){
			var web=new Web();
			web.OpenWin({id:'win',title:'全部日常问题',width:700,height:500,url:'moreIssue.jsp',
				buttons:{
					"关闭":function(){
						$(this).dialog("close");}
					}
			});
		}
	  function showDaily(){
	    str.caseType = "Daily";
	    $("#historyTop").hide();
	    $("#dailyTop,#currentTime").show();
	  }
	   function showHisory(){
	      str.caseType = "Hisory";
	      $("#dailyTop,#currentTime").hide();
	      $("#historyTop").show();
	  }
       function showAll(){
          str.caseType = "All";
	      $("#dailyTop,#historyTop,#currentTime").show();
	  }


   function getName(evt){
	  alert(document.getElementById(evt.id).value);
	  }
	   function tjfx(){
	    window.location.href="tj.jsp";
	  }
</script>
<script type="text/javascript">
	/*==============================zhangyangbin===================================*/
	//跳转
		$(function(){
			$.ajax({
				type:"post",
				url:str.urlPath+"/History/getAreaInfo.do?type="+type+"&time="+time+"&timeType="+timeType+"&caseTypeNum="+caseTypeNum,
				dataType:"json",
				success:function(data){
					render(data);
					window.firstFrame.location.href="<%=path%>/gisPackage/gisPages/roadLayer.jsp";
				}
			});
		});
		function render(data){
			var city="city";
			var country="country";

			for(var i=0;i<data[city].length;i++){
			var tr="<tr class='cty'><td>"+(i+1)+"</td><td class='"+('tr'+i)+"'><a href='javascript:void(0)' id='"+data[city][i].gridNumber+"' onclick='transfer(id)'>"+data[city][i].name+"</a></td><td class='color_blue'>"+data[city][i].caseCount+"</td><td class='color_blue'>"+data[city][i].avgNum+"</td><td class='color_blue'>"+data[city][i].avgRate+"</td></tr>";
			$("#cityTable").append(tr);
			}

			for(var i=0;i<data[country].length;i++){
			var tr="<tr class='cty'><td>"+(i+1)+"</td><td class='"+('tr'+i)+"'><a href='javascript:void(0)' id='"+data[country][i].gridNumber+"' onclick='transfer(id)'>"+data[country][i].name+"</a></td><td class='color_blue'>"+data[country][i].caseCount+"</td><td class='color_blue'>"+data[country][i].avgNum+"</td><td class='color_blue'>"+data[country][i].avgRate+"</td></tr>";
			$("#countryTable").append(tr);
			}
			$(".tr0 a").attr("style","color:#FF0000");
			$(".tr1 a,.tr2 a,.tr3 a,.tr4 a").attr("style","color:#FF9900");

		}

		function transfer(id){
			$(".data").remove();
			$.ajax({
				type:"post",
				url:str.urlPath+"/History/getCommunityInfo.do?gridNumber="+id+"&type="+type+"&time="+time+"&timeType="+timeType+"&caseTypeNum="+caseTypeNum,
				dataType:"json",
				success:function(data){
					var community="community";
					var gis="gis";
					if(data[gis].length!=0){
					window.firstFrame.location.href="<%=path%>/gisPackage/gisPages/communityLayer.jsp?stcode="+data[gis][0].stcode+"&CENTERX="+data[gis][0].centerx+"&CENTERY="+data[gis][0].centery+"&zoom="+data[gis][0].fixnum;
					}else{
						alert("请重新加载页面");
					}
					$(".tr0 a").attr("style","color:#FF0000");
					$(".tr1 a,.tr2 a,.tr3 a,.tr4 a").attr("style","color:#FF9900");
				}
			});
			$("#jiedao,#diqu").hide();
			$("#threeBoxes").attr("style","display:''");
		}
		function showPic(){
			//alert("ok");
			$("#housePic").show();
			$("#allElements").hide();
		}
		function transferTo(id){
			$(".data0").remove();
			testId='123456789011';
			$.ajax({
				type:"post",
				url:str.urlPath+"/History/getHFloorInfo.do?gridNumber="+id+"&type="+type+"&time="+time+"&timeType="+timeType+"&caseTypeNum="+caseTypeNum,
				dataType:"json",
				success:function(data){
					var floor="floor";
					var gis="gis";
					window.firstFrame.location.href="<%=path%>/gisPackage/gisPages/buildLayer.jsp";

					if(type=="all"){
					for(var i=0;i<data[floor].length;i++){
						var tr="<tr class='data0'><td>"+(i+1)+"</td><td class='"+('tr'+i)+"'><a href='javascript:void(0)' id='"+data[floor][i].gridNumber+"'onclick='showPic()'>"+data[floor][i].name+"</a></td><td>"+data[floor][i].hisProblems+"</td><td>"+data[floor][i].dailyProblems+"</td><td>"+data[floor][i].avgNum+"</td><td>"+data[floor][i].resolveRate+"</td></tr>";
						$("#builderTable").append(tr);
					}
					}
					if(type=="history"){
						for(var i=0;i<data[floor].length;i++){
						var tr="<tr class='data0'><td>"+(i+1)+"</td><td class='"+('tr'+i)+"'><a href='javascript:void(0)' id='"+data[floor][i].gridNumber+"'onclick='showPic()'>"+data[floor][i].name+"</a></td><td>"+data[floor][i].hisProblems+"</td><td>"+data[floor][i].avgNum+"</td><td>"+data[floor][i].resolveRate+"</td></tr>";
						$("#builderTable").append(tr);
					}
					}
					if(type=="daily"){
						for(var i=0;i<data[floor].length;i++){
						var tr="<tr class='data0'><td>"+(i+1)+"</td><td class='"+('tr'+i)+"'><a href='javascript:void(0)' id='"+data[floor][i].gridNumber+"'onclick='showPic()'>"+data[floor][i].name+"</a></td><td>"+data[floor][i].dailyProblems+"</td><td>"+data[floor][i].avgNum+"</td><td>"+data[floor][i].resolveRate+"</td></tr>";
						$("#builderTable").append(tr);
					}
					}
					//if(data[gis].length!=0){
					//window.firstFrame.location.href="<%=path%>/gisPackage/gisPages/buildLayer.jsp?stcode="+data[gis][0].stcode+"&CENTERX="+data[gis][0].centerx+"&CENTERY="+data[gis][0].centery+"&commcode="+data[gis][0].commcode;
					//}else{
					//	alert("没有楼层数据，地图不能加载");
					//}
					$(".tr0 a").attr("style","color:#FF0000");
					$(".tr1 a,.tr2 a,.tr3 a,.tr4 a").attr("style","color:#FF9900");
				}
			});
			$("#jiedao,#diqu").hide();
			$("#threeBoxes").attr("style","display:none");
			$("#threeBoxeses").attr("style","display:''");
		}

		function transferG(stcode){
			$(".data").remove();
			testId=stcode.toString();
			$.ajax({
				type:"post",
				url:str.urlPath+"/History/getCommunityInfo.do?gridNumber="+stcode+"&type="+type+"&time="+time+"&timeType="+timeType+"&caseTypeNum="+caseTypeNum,
				dataType:"json",
				success:function(data){
					var community="community";
					var gis="gis";
					if(type=="all"){
					for(var i=0;i<data[community].length;i++){
						var tr="<tr class='data'><td>"+(i+1)+"</td><td class='"+('tr'+i)+"'><a href='javascript:void(0)' id='"+data[community][i].gridNumber+"'onclick='transferTo(id)'>"+data[community][i].name+"</a></td><td>"+data[community][i].hisProblems+"</td><td>"+data[community][i].dailyProblems+"</td><td>"+data[community][i].avgNum+"</td><td>"+data[community][i].resolveRate+"</td></tr>";
						$("#communityTable").append(tr);
					}
					}
					if(type=="history"){
						for(var i=0;i<data[community].length;i++){
						var tr="<tr class='data'><td>"+(i+1)+"</td><td class='"+('tr'+i)+"'><a href='javascript:void(0)' id='"+data[community][i].gridNumber+"'onclick='transferTo(id)'>"+data[community][i].name+"</a></td><td>"+data[community][i].hisProblems+"</td><td>"+data[community][i].avgNum+"</td><td>"+data[community][i].resolveRate+"</td></tr>";
						$("#communityTable").append(tr);
					}
					}
					if(type=="daily"){
						for(var i=0;i<data[community].length;i++){
						var tr="<tr class='data'><td>"+(i+1)+"</td><td class='"+('tr'+i)+"'><a href='javascript:void(0)' id='"+data[community][i].gridNumber+"'onclick='transferTo(id)'>"+data[community][i].name+"</a></td><td>"+data[community][i].dailyProblems+"</td><td>"+data[community][i].avgNum+"</td><td>"+data[community][i].resolveRate+"</td></tr>";
						$("#communityTable").append(tr);
					}
					}
					stcode=data[gis][0].stcode;
					centerx=data[gis][0].centerx;
					centery=data[gis][0].centery;
					fixnum=12;
					$(".tr0 a").attr("style","color:#FF0000");
					$(".tr1 a,.tr2 a,.tr3 a,.tr4 a").attr("style","color:#FF9900");
				}
			});
			$("#jiedao,#diqu").hide();
			$("#threeBoxes").attr("style","display:''");
		}

		function transferToG(commcode){
			$(".data0").remove();
			$.ajax({
				type:"post",
				url:str.urlPath+"/History/getHFloorInfo.do?gridNumber="+commcode+"&type="+type+"&time="+time+"&timeType="+timeType+"&caseTypeNum="+caseTypeNum,
				dataType:"json",
				success:function(data){
					var floor="floor";
					var gis="gis";
					if(type=="all"){
					for(var i=0;i<data[floor].length;i++){
						var tr="<tr class='data0'><td>"+(i+1)+"</td><td class='"+('tr'+i)+"'><a href='javascript:void(0)' id='"+data[floor][i].gridNumber+"'onclick='transferTo(id)'>"+data[floor][i].name+"</a></td><td>"+data[floor][i].hisProblems+"</td><td>"+data[floor][i].dailyProblems+"</td><td>"+data[floor][i].avgNum+"</td><td>"+data[floor][i].resolveRate+"</td></tr>";
						$("#builderTable").append(tr);
					}
					}
					if(type=="history"){
						for(var i=0;i<data[floor].length;i++){
						var tr="<tr class='data0'><td>"+(i+1)+"</td><td class='"+('tr'+i)+"'><a href='javascript:void(0)' id='"+data[floor][i].gridNumber+"'onclick='transferTo(id)'>"+data[floor][i].name+"</a></td><td>"+data[floor][i].hisProblems+"</td><td>"+data[floor][i].avgNum+"</td><td>"+data[floor][i].resolveRate+"</td></tr>";
						$("#builderTable").append(tr);
					}
					}
					if(type=="daily"){
						for(var i=0;i<data[floor].length;i++){
						var tr="<tr class='data0'><td>"+(i+1)+"</td><td class='"+('tr'+i)+"'><a href='javascript:void(0)' id='"+data[floor][i].gridNumber+"'onclick='transferTo(id)'>"+data[floor][i].name+"</a></td><td>"+data[floor][i].dailyProblems+"</td><td>"+data[floor][i].avgNum+"</td><td>"+data[floor][i].resolveRate+"</td></tr>";
						$("#builderTable").append(tr);
					}
					}
					testId='123456789011';//到楼层地图以后testId应为社区编号。12位
					stcode=data[gis][0].stcode;
					centerx=data[gis][0].centerx;
					centery=data[gis][0].centery;
					fixnum=12;
					$(".tr0 a").attr("style","color:#FF0000");
					$(".tr1 a,.tr2 a,.tr3 a,.tr4 a").attr("style","color:#FF9900");
				}
			});
			$("#jiedao,#diqu").hide();
			$("#threeBoxes").attr("style","display:none");
			$("#threeBoxeses").attr("style","display:''");
		}
		//为返回按钮加返回函数
		function goback(){
			if(testId.length==9){
				testId="";
				$("#jiedao,#diqu").show();
				$("#threeBoxes,#threeBoxeses").attr("style","display:none");
				window.firstFrame.location.href="<%=path%>/gisPackage/gisPages/roadLayer.jsp";
			}
			if(testId.length==12){
				testId=testId.substring(0,9);
				$("#jiedao,#diqu").hide();
				$("#threeBoxes").attr("style","display:''");
				$("#threeBoxeses").attr("style","display:none");
				window.firstFrame.location.href="<%=path%>/gisPackage/gisPages/communityLayer.jsp?stcode="+stcode+"&CENTERX="+centerx+"&CENTERY="+centery;
			}
		}
		function forHisAndDaily(){
			$(".cty").remove();
			$.ajax({
				type:"post",
				url:str.urlPath+"/History/getAreaInfo.do?type="+type+"&time="+time+"&timeType="+timeType+"&caseTypeNum="+caseTypeNum,
				dataType:"json",
				success:function(data){
					render(data);
					window.firstFrame.location.href="<%=path%>/gisPackage/gisPages/roadLayer.jsp";
				}
			});
		}
		function showAll2(){
			$("#his1,#his2,#dai1,#dai2").show();
			type="all";
			if(testId==""){
				forHisAndDaily();
			}
			if(testId.length==9){
				var id=testId;
				transfer(id);
			}
			if(testId.length==12){
				var id=testId;
				transferTo(id);
			}
		}
		function showDaily2(){
			$("#dai1,#dai2").show();
			$("#his1,#his2").hide();
			type="daily";
			if(testId==""){
				forHisAndDaily();
			}
			if(testId.length==9){
				var id=testId;
				transfer(id);
			}
			if(testId.length==12){
				var id=testId;
				transferTo(id);
			}

		}
		function showHisory2(){
			$("#his1,#his2").show();
			$("#dai1,#dai2").hide();
			type="history";
			if(testId==""){
				forHisAndDaily();
			}
			if(testId.length==9){
				var id=testId;
				transfer(id);
			}
			if(testId.length==12){
				var id=testId;
				transferTo(id);
			}

		}
		function refreshByTime(){
			if(type=="all"){
				showAll2();
			}
			if(type=="history"){
				showHisory2();
			}
			if(type=="daily"){
				showDaily2();
			}
		}
</script>



<!-- 按钮颜色切换 -->


</head>

<body >
<!-- historHeader start -->
<div id="noTitle"></div>
  <div class="layoutWidth historHeader clearself">
    <span class="historBtnL fl">
      <button type="button" class="btn btn-warning" onclick="showAll(),showAll2()">全部</button>
      <button type="button" class="btn btn-warning" id="daily" onclick="showDaily(),showDaily2()">日常问题</button>
      <button type="button" class="btn btn-warning" id="history" onclick="showHisory(),showHisory2()">历史问题</button>
      <button type="button" class="btn btn-warning" onclick="tjfx()"><b class="btnArrow btn-tj">统计分析</b></button>
    </span>
    <span class="historBtnR fr">
      <button type="button" class="btn btn-warning" onclick="goback()" id="backbtn" ><b class="btnArrow btn-fh">返回</b></button>
    </span>
  </div>
<!-- /historHeader END -->
<!-- navbar start -->
  <div class="layoutWidth navbar clearself">
    <span class="navbar_conditions season" id="currentTime">
        <b onclick="getTime()">
      <input type="button" class="btn btn-small btn-linkother" id="dangqian" name="dang" onclick="dangTime(id)" value="当前" />
      <input type="button" class="btn btn-small btn-linkother" id="dangyue" name="dang" onclick="dangTime(id)" value="当月" />
      <input type="button" class="btn btn-small btn-linkother" id="dangji" name="dang" onclick="dangTime(id)" value="当季" />
      <input type="button" class="btn btn-small btn-linkother" id="dangnian" name="dang" onclick="dangTime(id)" value="当年" />
        </b>
    </span>
    <span class="navbar_conditions year">
      <b class="colTitle">年份</b>
      <input type="button" class="btn btn-small btn-success" value="<<" id="up" />
      <input type="button" class="btn btn-small btn-info btn-linkother" id="yearbtn" />
      <input type="button" class="btn btn-small btn-success" value=">>" id="down"/>
      <a href="javascript:void(0);" class="moreStyle" id="moreYear">[更多]</a>
    </span>
    <span class="navbar_conditions month">
      <b class="colTitle">月份</b>
       <b onclick="getTime()">
      <input type="button" class="btn btn-small btn-linkother" name="monthBtn" id="month1" value="1月" />
      <input type="button" class="btn btn-small btn-linkother" name="monthBtn" id="month2" value="2月" />
      <input type="button" class="btn btn-small btn-linkother" name="monthBtn" id="month3" value="3月" />
      <input type="button" class="btn btn-small btn-linkother" name="monthBtn" id="month4" value="4月" />
      <input type="button" class="btn btn-small btn-linkother" name="monthBtn" id="month5" value="5月" />
      <input type="button" class="btn btn-small btn-linkother" name="monthBtn" id="month6" value="6月" />
      <input type="button" class="btn btn-small btn-linkother" name="monthBtn" id="month7" value="7月" />
      <input type="button" class="btn btn-small btn-linkother" name="monthBtn" id="month8" value="8月" />
      <input type="button" class="btn btn-small btn-linkother" name="monthBtn" id="month9" value="9月" />
      <input type="button" class="btn btn-small btn-linkother" name="monthBtn" id="month10" value="10月" />
      <input type="button" class="btn btn-small btn-linkother" name="monthBtn" id="month11" value="11月" />
      <input type="button" class="btn btn-small btn-linkother" name="monthBtn" id="month12" value="12月" />
       </b>
      <a href="javascript:void(0);" class="moreStyle" id="moreDateBtn">[选择日期]</a>
    </span>
  </div>

  <div class="layoutWidth navbar clearself btnpaddingStyle" style="display:none;" id="allYearDiv">
  </div>
  <div class="layoutWidth navbar clearself btnpaddingStyle" id="moreDate" style="display:none;">
  </div>
  <div style="display:''" id="allElements">
<!-- /navbar END -->
<!-- mainInfo start -->
  <div class="layoutWidth mainInfo clearself">

     <div class="main_problem clearself" id="historyTop">
        <span class="main_problem_text fl">
          <b class="color_orange">历史问题总量：</b><font class="color_blue"><span id="upNum0"/></font>件<br />
		  平均案件：<font class="color_blue"><span id="upAvgNum0"/></font> 件/社区
        </span>
       <ul class="main_problem_xii fl" id="hisImg">

        </ul>
     </div>


     <div class="main_problem otherOne clearself" id="dailyTop">
        <span class="main_problem_text fl">
          <b class="color_orange">日常问题总量：</b><font class="color_blue"><span id="upNum1"></span></font>件<br />
		  平均案件：<font class="color_blue"><span id="upAvgNum1"></span></font> 件/社区
        </span>
       <ul class="main_problem_xii other_xii fl" id="daiImg">

        </ul>

        <span class="xxi_more fl">
          <button type="button" class="btn btn-info" onclick="javascript:openKeyIssue()">重点问题添加</button>
          <a href="#" onclick="javascript:Others()">更多>></a>
        </span>
     </div>

     <div class="mainInfo_threeBox" id="threeBox">
       <div class="mit_left mit_base fl" id="jiedao">
         <h2 >街道全部问题数量排名</h2>
         <div class="tableList" >
           <table width="100%" border="0" cellpadding="0" cellspacing="1" class="tableListForm" id="cityTable">
              <tr>
                <th scope="col">排名</th>
                <th scope="col">街道</th>
                <th scope="col">案件数</th>
                <th scope="col">人均地均发案数</th>
                <th scope="col">日常解决率</th>
              </tr>
            </table>

         </div>
       </div>
        <div class="mit_left sub_mit_base fl" id="threeBoxes" style="display:none">
         <h2>全部社区排名</h2>
         <div class="tableList" >
           <table width="100%" border="0" cellpadding="0" cellspacing="1" class="tableListForm" id="communityTable">
              <tr>
                <th scope="col">排名</th>
                <th scope="col">街道</th>
                <th scope="col" class="tabLFw80" id="his1">历史</th>
                <th scope="col" class="tabLFw80" id="dai1">日常</th>
                <th scope="col">人均地均发案数</th>
                 <th scope="col">解决率</th>
              </tr>

            </table>
         </div>
     </div>
       <div class="mit_left sub_mit_base fl" id="threeBoxeses" style="display:none">
         <h2>楼宇全部问题排名</h2>
         <div class="tableList" >
           <table width="100%" border="0" cellpadding="0" cellspacing="1" class="tableListForm" id="builderTable">
              <tr>
                <th scope="col">排名<br><br></th>
                <th scope="col">楼名<br><br></th>
                <th scope="col" class="tabLFw80" id="his2">历史<br><br></th>
                <th scope="col" class="tabLFw80" id="dai2">日常<br><br></th>
                <th scope="col">人均地均发案数<br><br></th>
                <th scope="col">u 解决率<br><br></th>
              </tr>
            </table>
         </div>
      </div>
       <div class="mit_center fl" id="ifrDIV">
       <a>
       <iframe src="" id="fIframe" height="565" width="620" frameborder="0" scrolling="no" name="firstFrame"></iframe>
      </a>
       </div>
       <div class="mit_right mit_base fl" id="diqu">
         <h2>地区全部问题数量排名</h2>
         	 <div class="tableList">
           <table width="100%" border="0" cellpadding="0" cellspacing="1" class="tableListForm" id="countryTable">
              <tr>
                <th scope="col">排名</th>
                <th scope="col">街道</th>
                <th scope="col">案件数</th>
                <th scope="col">人均地均发案数</th>
                <th scope="col">日常解决率</th>
              </tr>
            </table>
         </div>
       </div>
    </div>
</div>
</div>
<!-- 在这里加入画图板 -->
    <%--<div style="display:none; text-align: center;" id="housePic" >--%>
    	<%--<iframe src="<%=path %>/housePic.jsp" width="1123px" height="800px"></iframe>--%>
    <%--</div>--%>
    <!-- 图片-->
    <div id="images">
      <img draggable="true" src="assets/img/high_tatras2.jpg" width="100" height="100">
      <img draggable="true" src="assets/img/high_tatras3.jpg" width="100" height="100">
      <img draggable="true" src="assets/img/high_tatras4.jpg" width="100" height="100">
    </div>

    <div>
      <li style="margin-top:10px;">
        <button class="btn" id="remove-selected">删除图片</button>
      </li>
    </div>
    <div id="canvas-container">
       <canvas id="canvas" width="800" height="600"></canvas>
    </div>
    <!-- 在这里加入画图板 -->
<!-- /mainInfo END -->
    <script src="assets/js/fabric-min.js"></script>
    <script src="assets/js/modernizr-min.js"></script>
    <script src="assets/js/dragdrop.js"></script><!-- 画图板需要的JS -->

</body>
</html>
