---
layout: post
title: MySQL遇到的坑
description: MySQL遇到的坑
category: [Ubuntu,数据库]
---
## 错误1449
在执行`flask db migrate`时遇到：
`(1449, "The user specified as a definer ('mysql.infoschema'@'localhost') does not exist")`  
用户不存在或者是权限不够  
百度上解决方案都是针对mysql旧版本的  
```
mysql> grant all privileges on *.* to root@"%" identified by ".";
mysql> flush privileges;
```
mysql8 修改了添加新用户的方式，如下：
```
mysql> CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'newpassword';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'newuser'@'localhost';
```
`*.*` 前面是数据库，后面是表，* 代表所有，localhost可以换成 % ,代表所有
