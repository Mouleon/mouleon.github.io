---
layout: post
title: Ubuntu下创建Python虚拟环境
description: Ubuntu下创建Python虚拟环境
category: [Ubuntu,Python,Flask]
---
Flask是一个使用Python编写的轻量级Web应用框架，适合快速开发。简单的话只需要一个py文件就可以创建出一个网站应用，但是在服务器上，不同的业务有不同的版本，会出现冲突，所以需要进行额外配置。python的虚拟环境就可以帮助我们解决这个问题，这里以安装flask为例
## 安装flask
为了解决维护不同应用程序对应不同版本的问题，Python使用了虚拟环境的概念。虚拟环境是Python解释器的完整副本。在虚拟环境中安装三方包时只会作用到虚拟环境，全局Python解释器不受影响。 那么，就为每个应用程序安装各自的虚拟环境。 虚拟环境还有一个好处，即它们由创建它们的用户所拥有，所以不需要管理员帐户。  
先创建项目目录
```
$ mkdir fin
$ cd fin
```
然后创建虚拟环境
```
$ python3 -m venv venv
# 如果失败，可能需要执行 sudo apt install python3-venv进行安装
```
使用这个命令来让Python创建一个名为venv的虚拟环境。在项目文件夹下会出现一个venv的文件夹，用于存储虚拟环境的相关文件  
然后激活，执行
```
$ source venv/bin/activate
(venv) $ _
```
激活一个虚拟环境，终端会话的环境配置就会被修改，之后你键入python的时候，实际上是调用的虚拟环境中的Python解释器。
成功创建和激活了虚拟环境之后，你可以安装Flask了，命令如下:
```
$ pip3 install flask
```
想要验证安装是否成功，可以打开Python解释器，并用import语句来导入它：
```
>>> import Flask
>>>  
# 没有出错即为成功
```
退出虚拟环境
```
$ deactivate
```
## 问题
python3提示错误`ImportError: No module named 'MySQLdb'`
python2和python3在数据库模块支持这里存在区别，python2是mysqldb，而到了python3就变成mysqlclient，pip install mysqlclient即可。
