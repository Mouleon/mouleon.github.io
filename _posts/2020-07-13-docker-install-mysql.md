---
layout: post
title: Arm机器部署MySQL
description: Arm机器部署MySQL
category: [MySQL,Docker]
---
由于Arm平台服务器用户量不大，各大应用对其支持也较小，所以很多在x86平台上很方便安装的应用放在Arm上就比较难了，因为需要配置编译链，要装一大堆东西，而且某些依赖Arm平台不全，变相提高了安装门槛，所以使用Docker安装就是一个较好的选择
## MySQL选择
根据[Docker官方文档](https://hub.docker.com/r/mysql/mysql-server/)  
> MySQL Server 5.6 (tag: 5.6) (mysql-server/5.6/Dockerfile)
> MySQL Server 5.7 (tag: 5.7) (mysql-server/5.7/Dockerfile)
> MySQL Server 8.0, the latest GA, for both x86 and AArch64(ARM64) architectures (tag: 8.0, latest) (mysql-server/8.0/Dockerfile)  

我们选择MySQL8进行安装
## 安装
根据[MySQL文档](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html),先下载MySQL Server Docker镜像  
```
$ docker pull mysql/mysql-server:8.0
不输入8.0则默认最新 latest
```
下载完成后，检查  
```
$ docker images
REPOSITORY           TAG                 IMAGE ID            CREATED             SIZE
mysql/mysql-server   latest              3157d7f55f8d        4 weeks ago         241MB
```
## 启动
运行命令启动容器
```
$ docker run --name=mysql1 -d mysql/mysql-server:8.0
```
启动成功后，使用命令查看容器状态  
```
$ docker ps -a
CONTAINER ID   IMAGE                COMMAND                  CREATED             STATUS                              PORTS                NAMES
a24888f0d6f4   mysql/mysql-server   "/entrypoint.sh my..."   14 seconds ago      Up 13 seconds (health: starting)    3306/tcp, 33060/tcp  mysql1
```
上面-d的`docker run`命令中使用 的选项使容器在后台运行。使用以下命令监视容器的输出：
```
$ docker logs mysql1
```
初始化完成后，命令的输出将包含为root用户生成的随机密码。使用以下命令检查密码：
```
$ docker logs mysql1 2>&1 | grep GENERATED
GENERATED ROOT PASSWORD: Axegh3kAJyDLaRuBemecis&EShOs
```
## 从容器内连接到MySQL
使用docker exec -it命令在已启动的Docker容器内启动 mysql客户端，如下所示：
```
$ docker exec -it mysql1 mysql -uroot -p
```
连接之后重置密码
```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123456'; 如果不对使用下面那条
mysql> SET PASSWORD = PASSWORD('123456');
```
至此MySQL安装完成
## shell访问MySQL
```
docker exec -it mysqld bash
```
之后就可以在里面运行linux 命令
## 维护
容器名使用`docker ps -a `查看
```
启动
$ docker start mysql1
停止
$ docker stop mysql1
```