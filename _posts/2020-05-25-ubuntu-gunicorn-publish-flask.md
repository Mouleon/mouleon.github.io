---
layout: post
title: ubuntu使用gunicorn部署flask
description: ubuntu使用gunicorn部署flask
category: blog
---
## 安装

## 部署
### 命令行启动
最简`gunicorn main:app`  
main是运行文件
app是运行文件中的app

### 配置文件启动
创建config.py
```
# config.py
import os
import gevent.monkey
gevent.monkey.patch_all()

import multiprocessing

# debug = True
loglevel = 'debug'
bind = "127.0.0.1:5000"
pidfile = "log/gunicorn.pid"
accesslog = "log/access.log"
errorlog = "log/debug.log"
daemon = True

# 启动的进程数
workers = multiprocessing.cpu_count()
worker_class = 'gevent'
x_forwarded_for_header = 'X-FORWARDED-FOR'
```
然后在nginx里进行转发即可
