//设置判断是否能进行ajax
$(
    function(){

        var select = document.getElementsByTagName("select")[0];
        var city = select.value; 

        getData(city);

        select.onchange = function(){
            city = select.value;
            // alert(city);
            getData(city);
        }

    }
) 

function nowDataPush(weatherData){  

  // console.log(weatherData);

  var now = document.getElementsByClassName("now")[0];
  var nowItems = now.getElementsByClassName("item");

  for (var i = 0; i < nowItems.length; i++) {

         var nowItemKey = nowItems[i].getAttribute("data-key");
         var nowData = weatherData.result.sk[nowItemKey];
               //如果项目大于2，先移除添加项
        if (nowItems[i].children.length >= 2) {
            $(nowItems[i]).children("#addItem").remove();
            console.log("did")
        }

         $(nowItems[i]).append("<span id='addItem'>"+nowData+"</span>");
     }   
};

function todayDataPush(weatherData){
    var today = document.getElementsByClassName("today")[0];
    var todayItems = today.getElementsByClassName("item");

    for (var i = 0; i < todayItems.length; i++) {
        // $(todayItems[i]).remove()
        var todayItemKey = todayItems[i].getAttribute("data-key");
        var todayObj = weatherData.result.today;
        // console.log(todayObj);
        if (todayItemKey === "time") {
            var todayData = todayObj["date_y"]+"  "+todayObj["week"];
        }else{
            var todayData = todayObj[todayItemKey];

        }
        //如果项目大于2，先移除添加项
        if (todayItems[i].children.length >= 2) {
            $(todayItems[i]).children("#addItem").remove();
            console.log("did")
        }
        $(todayItems[i]).append("<span id='addItem'>"+todayData+"</span>");

    }   
}

function getData(city){
    $.ajax({                                  
        url:"http://v.juhe.cn/weather/index?format=2&cityname="+encodeURI(city)+"&key=0a217265b11b3b81f6165987c32d0fae", 
        type:'GET', 
        dataType:'JSONP',  // 处理Ajax跨域问题
        success: function(data){
            window.Data = data;
            nowDataPush(data); 
            todayDataPush(data);
        } 
    });
}









