## 介绍
博客效果 [https://blog.oneneko.com](https://blog.oneneko.com)   
主页 [https://www.oneneko.com](https://www.oneneko.com)  
## 安装
```
gem install jekyll
gem install bundler
bundle install
```
## 运行
```
bundle exec jekyll serve --watch --host=127.0.0.1 --port=4000
```
之后会在`_site\`下生成html文件  
访问 http://127.0.0.1:4000 即可看到博客  
## 部署
托管在github上的话直接把推送上去即可，github会自动生成博客  
自己服务器则把`_site\`内的文件部署上去即可