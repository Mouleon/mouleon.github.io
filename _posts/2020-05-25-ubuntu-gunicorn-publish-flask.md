---
layout: post
title: Ubuntu使用Gunicorn部署Flask
description: Ubuntu使用gunicorn部署Flask
category: [Ubuntu,Python,Gunicorn,Flask,建站]
---
Flask是一个使用Python编写的轻量级Web应用框架，很适合用于快速开发，但是其生产环境不够稳定，无法承受大量请求的并发，所以需要使用Web服务来处理各种请求，如Gunicorn、Nginx或Apache，而且为了提高性能，常常会使用Nginx和Gunicorn的组合方式，分别处理不同的资源。  
## 安装
```
pip3 install gunicorn
```
## 部署
Gunicorn可以通过命令行或者文件启动服务
比如Flask主程序为：`main.py`
```
from flask import Flask
app = Flask(__name__)

@app.route('/hello')
def index():
    return "hello"

if __name__ == '__main__':
    app.run()
```
### 命令行启动
最简`gunicorn main:app`  
main是运行文件  
app是运行文件中的app  
即可启动服务
### 配置文件启动
创建`config.py`
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
### 发布
随后在Nginx里面进行转发处理请求即可
