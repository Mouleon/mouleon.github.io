---
layout: post
title: Windows和Ubuntu安装MySQL8.0
description: Windows和Ubuntu安装MySQL8.0
category: [Ubuntu,MySQL,数据库]
---
Windows 10 和 Ubuntu18.04 下安装 MySQL8.0  
##  Windows10
### 下载安装包  
首先去官网下载安装包，[https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)  
解压到安装目录，如`F:mysql-8.0.20-winx64\`  
注意： 路径上不要有中文和空格  
### 配置MySQL
在根目录创建`my.ini`  
写入
```
[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录
basedir=F:\mysql-8.0.20-winx64
# 设置mysql数据库的数据的存放目录
datadir=F:\mysql-8.0.20-winx64\Data
# 允许最大连接数
max_connections=200
# 允许连接失败的次数。
max_connect_errors=10
# 服务端使用的字符集默认为utf8
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
#mysql_native_password
default_authentication_plugin=mysql_native_password
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8
```
添加环境变量，在path 添加`F:mysql-8.0.20-winx64\bin`  
### 安装
以管理员身份打开cmd到安装目录
初始化  
`mysqld --initialize --user=mysql --console`  
完成之后会生成临时密码，记住它  
随后进行安装  
`mysqld -install`  
启动MySQL  
`net start mysql`  
### 修改密码
此时用数据库连接工具使用临时密码连接MySQL会报  
`1862 - Your Password has expired.To log you must change it using a client that supports expired password`  
这里是说密码已过期，之前的临时密码只能在命令行里使用  
所以我们需要修改root密码  
依旧是管理员cmd,登录MySQL:  
`mysql -u root -p`  
然后输入临时密码  
```
using mysql;
ALTER USER 'root'@'localhost' IDENTIFIED BY '你的密码';
```
修改完成之后就可以使用自己的密码登陆了，至此Windows下安装MySQL完成  
## Ubuntu 下安装MySQL
### 安装MySQL
```
sudo apt-get install mysql-server
sudo apt-get install mysql-client
```
我安装时并没有配置密码，还需要修改默认密码  
### 修改默认密码
`sudo vi /etc/mysql/debian.cnf`  
[!img]({{site.cdn}}/static/image/2020/05/202005201228.jpg)  
使用里面的默认用户和密码登录MySQL  
`mysql -u debian-sys-maint -p`  
修改密码  
```
use mysql;
update mysql.user set authentication_string=password('你的密码') where user='root' and Host ='localhost';
update user set plugin="mysql_native_password";
flush privileges;
quit;
```
Ubuntu安装MySQL完成
