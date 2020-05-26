---
layout: default
---

<body>
  <div class="index-wrapper">
      <div class="category-list">
        {% for category in site.categories %}
          <div class="category">
            <div class="cat-head">
              <h2>{{ category | first }}</h2>
              <!--<span>{{ category | last | size }}</span>-->
            </div>
            <div class="arc-list">
                {% for post in category.last %}
                    <li><a href="{{ post.url }}">{{ post.title }}</a><!--{{ post.date | date:"%d/%m/%Y"}}--></li>
                {% endfor %}
            </div>
          </div>
        {% endfor %}
      </div>
  </div>
</body>
