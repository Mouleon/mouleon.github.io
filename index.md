---
layout: default
---
<script>
	var uri='';
  var aj = $.ajax( {    
    url:'/bing',// 跳转到 action    
    data:{    
        uri : uri    
    },    
    type:'get',    
    cache:false,    
    dataType:'json',    
    success:function(data) {    
         var jsonObj = data;
	console.log(data.uri);
	$('#particles-js').css({ 'background-image': "url("+jsonObj.uri+")"});   
     },    
     error : function() {    
          // view("异常！");    
          console.log("error");
     }    
  });
</script>
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
  {% include footer.html %}
</body>
