---
layout: post
title: Jekyll博客搭建
description: Jekyll博客搭建
category: [建站]
---
Jekyll 是一款生成静态网站的工具，主题易于定制，自由度很高，也有很多优秀的主题。也可以搭配很多插件，让静态博客拥有更丰富的功能。并且Github支持Jekyll建站并发布，没有主机域名也可以拥有自己的网站。  
我的常用环境是Windows，并且linux 构建jekyll比较简单，所以，这里只说明Windows下安装Jekyll
## 环境
Jekyll 依赖于Ruby，需要先安装Ruby,参见[Windows下Ruby安装及使用](https://www.mouleon.com/windows-ruby-install.html)  
然后执行
```
$ gem install jekyll #安装jekyll
$ jekyll --version #查看jekyll版本
```
不出意外的话，结果如下  
```
jekyll 4.0.0
```
jekyll 安装完成
## 建立jekyll站点  
之后可以选择完全新建一个jekyll 站点，如下
```
$ jekyll new folder #会在folder里生成一个新jekyll博客，默认主题
$ cd folder
$ bundle install
```
之后执行
```
$ bundle exec jekyll serve
```
打开浏览器访问`http://127.0.0.1:4000`就可以看到默认的欢迎界面了。  
当然也可以选择下载别人已有的主题进行构建，如[Mouleon](https://github.com/mouleon/mouleon.github.io)，下载之后解压，cmd进入根目录，执行
```
$ jekyll build
$ jekyll serve
```
打开`http://127.0.0.1:4000`就可以对应的界面了
## 写作  
在本地写博客，可以启动jekyll进行预览，主要命令如下
```
jekyll build #当前文件夹中的内容将会生成到./site文件夹中。
jekyll build --destination <destination> #当前文件夹中的内容将会生成到目标文件夹<destination>中。
jekyll build --source <source> --destination <destination> #指定源文件夹<source>中的内容将会生成到目标文件夹<destination>中。
jekyll build --watch #当前文件夹中的内容将会生成到./site文件夹中，
# 查看改变，并且自动再生成。
jekyll serve # 开发服务器将会运行在http://localhost:4000/
jekyll serve --detach
# 功能和`jekyll serve`命令相同，但是会脱离终端在后台运行。
# Linux 下如果你想关闭服务器，可以使用`kill -9 1234`命令，“1234”是进程号(PID)。
# 如果你找不到进程号，那么就用`ps -aux | grep jekyll`命令来查看，然后关闭服务器。
# 或者`pkill -f jekyll`关闭服务
jekyll serve --watch
# =>和`jekyll`相同，但是会查看变更并且自动再生成。
```
## 部署发布  
### 使用Github pages
Github pages支持jekyll站点托管，可以将站点上传到Github上，Github会自动构建站点。  
在Github新建`username.github.io`仓库，然后上传站点文件，随后在Github仓库的设置-Github Pages选项卡里发布，随后就可以访问`https://username.github.io`看到你的博客了。当然也可以上传到普通仓库，如`sample`，同样是在设置-Github Pages选项卡里发布，之后就可以访问`https://username.github.io/sample`看到博客了。  
还可以通过更改站点根目录的`cname`文件实现自定义域名
### 使用主机发布
Github Pages虽然很方便、良心，但是在国内Github的速度很慢，并且，几年前Github好像遭受过伪装成百度爬虫的大规模攻击，导致Github禁止了百度爬虫的抓取，所以，你的博客如果是在Github pages托管，那就无法被百度收录，因此就只能利用自己的主机进行发布  
jekyll 是静态站点，所以用主机发布很简单，利用`nginx`之类的服务器软件处理一下请求即可，具体如下  
* 运行`jekyll build`生成站点，默认是`_site`
* 将`_site`上传到服务器指定位置，如用户根目录`~/`
* 安装`nginx` 参见[nginx安装](https://www.mouleon.com/nginx-command.html)
* 配置`nginx`，如在`/etc/nginx/conf.d/my.conf`里配置：  
```
server{
        listen 80;
        server_name mouleon.com;
        location /{
                root /home/ubuntu/_site;
        }
        error_page 404 404.html;
}
```
之后`sudo nginx -s reload`重载配置
然后就可以访问主机里的博客了
