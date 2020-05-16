---
layout: default
---

<body>
  <div class="index-wrapper">
    <div class="aside">
      <div class="info-card">
        <h1>Mouleon</h1>
        <a href="https://www.github.com/Mouleon/" target="_blank"><img src="{{site.cdn}}/github.ico" alt="" width="25"/></a>
      </div>
      <div id="particles-js">
        <div id="particles-top"></div>
      </div>
      <script>
        Date.prototype.pattern=function(fmt) {         
          var o = {         
          "M+" : this.getMonth()+1, //月份         
          "d+" : this.getDate(), //日         
          "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
          "H+" : this.getHours(), //小时         
          "m+" : this.getMinutes(), //分         
          "s+" : this.getSeconds(), //秒         
          "q+" : Math.floor((this.getMonth()+3)/3), //季度         
          "S" : this.getMilliseconds() //毫秒         
          };         
          var week = {         
          "0" : "/u65e5",         
          "1" : "/u4e00",         
          "2" : "/u4e8c",         
          "3" : "/u4e09",         
          "4" : "/u56db",         
          "5" : "/u4e94",         
          "6" : "/u516d"        
          };         
          if(/(y+)/.test(fmt)){         
              fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
          }         
          if(/(E+)/.test(fmt)){         
              fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
          }         
          for(var k in o){         
              if(new RegExp("("+ k +")").test(fmt)){         
                  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
              }         
          }         
          return fmt;         
        }       

        var date = new Date();      
        var dd = date.pattern("yyyyMMdd");
        var uri="https://cdn.jsdelivr.net/gh/Mouleon/Bing_Wallpaper/wallpaper/"+dd+".jpg"

        $('#particles-js').css({ 'background-image': "url("+uri+")"});
      </script>

    </div>

    <div class="index-content">
      <ul class="artical-list">
        {% for post in site.categories.blog %}
        <li>
          <a href="{{ post.url }}" class="title">{{ post.title }}</a>
          <div class="title-desc">{{ post.description }}</div>
        </li>
        {% endfor %}
      </ul>
    </div>
  </div>
</body>
