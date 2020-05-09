---
layout: post
title: jekyll基本命令
description: jekyll基本命令
category: blog
---
# 从0新建jekyll  
    jekyll new folder #会在folder里生成一个新jekyll博客，默认主题
    cd folder
    bundle install

# 已有jekyll的情况下  
    jekyll build #当前文件夹中的内容将会生成到./site文件夹中。
    jekyll build --destination <destination> #当前文件夹中的内容将会生成到目标文件夹<destination>中。
    jekyll build --source <source> --destination <destination> #指定源文件夹<source>中的内容将会生成到目标文件夹<destination>中。
    jekyll build --watch #当前文件夹中的内容将会生成到./site文件夹中，
    # 查看改变，并且自动再生成。

# 运行  
    jekyll serve
    # 一个开发服务器将会运行在http://localhost:4000/
    jekyll serve --detach
    # 功能和`jekyll serve`命令相同，但是会脱离终端在后台运行。
    # 如果你想关闭服务器，可以使用`kill -9 1234`命令，“1234”是进程号(PID)。
    # 如果你找不到进程号，那么就用`ps -aux | gerp jekyll`命令来查看，然后关闭服务器。
    jekyll serve --watch
    # =>和`jekyll`相同，但是会查看变更并且自动再生成。

# 发布  
    可利用nginx反向代理发布
