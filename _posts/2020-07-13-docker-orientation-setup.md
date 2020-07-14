---
layout: post
title: 简介和安装 - Docker中文文档
description: 简介和安装 - Docker中文文档
category: [Docker]
---
[原始英文文档](https://docs.docker.com/get-started/part1)  
欢迎！我们很高兴您想学习Docker。  
Docker快速入门培训模块教您如何：
* 设置您的Docker环境（在页面）  
* 生成并运行镜像
* 在Docker Hub上共享镜像

## Docker概念
Docker是供开发人员和系统管理员 使用容器**构建** 、**运行**和**共享**应用程序的平台。使用容器部署应用程序称为容器化。容器不是新鲜事物，但用于轻松部署应用程序的容器却是。  
容器化越来越受欢迎，因为容器是：  
* 灵活：即使最复杂的应用程序也可以容器化。
* 轻量级：容器利用并共享了主机内核，在系统资源方面比虚拟机更有效。
* 可移植性：您可以在本地构建，部署到云并在任何地方运行。
* 松散耦合：容器是高度自给自足并封装的容器，使您可以在不破坏其他容器的情况下更换或升级它们。
* 可扩展：您可以在数据中心内增加并自动分布容器副本。
* 安全：容器运行时将积极的约束和隔离应用，无需用户方面的任何配置。  

## 图片和容器
从根本上说，一个容器不过是一个正在运行的进程，并对其应用了一些附加的封装功能，以使其与主机和其他容器隔离。容器隔离的最重要的一个方面是每个容器都与自己的专用文件系统进行交互。该文件系统由Docker 镜像提供。镜像包括运行应用程序所需的一切 - 代码或二进制文件、运行时、依赖项以及所需的任何其他文件系统对象。  
## 容器和虚拟机  
容器在Linux上*本地*运行，并与其他容器共享主机的内核。它运行一个离散进程，不占用任何其他可执行文件更多的内存，从而使其变得轻盈。  

相比之下，**虚拟机**（VM）运行一个完整的“访客操作系统”，并通过*Hypervisor*获取对主机资源的虚拟访问权。通常，VM会产生大量开销，超出了应用程序逻辑所消耗的开销。 
![容器与虚拟机](/static/image/2020/07/20200714145519.jpg)  
## 设置您的Docker环境
### 下载并安装Docker 
Docker Desktop是适用于Mac或Windows环境的易于安装的应用程序，可让您在几分钟内开始编码和容器化。Docker Desktop包含直接从您的机器构建、运行和共享容器化应用程序所需的一切。  
按照适合您的操作系统的说明下载并安装Docker Desktop：  
* [Mac版Docker桌面](https://docs.docker.com/docker-for-mac/install/)
* [Windows版Docker桌面](https://docs.docker.com/docker-for-windows/install/)  

### 测试Docker版本
成功安装Docker Desktop后，打开终端并运行`docker --version`以检查计算机上安装的Docker版本。
```
$ docker --version
Docker version 19.03.5, build 633a0ea
```
### 测试Docker安装
通过运行`hello-world` Docker镜像来测试安装是否正常：  
```
$ docker run hello-world

Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
ca4f61b1923c: Pull complete
Digest: sha256:ca0eeb6fb05351dfc8759c20733c91def84cb8007aa89a5bf606bc8b315b9fc7
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
```
运行`docker image ls`以列出你下载的`hello-world`Docker镜像。  
列出hello-world显示消息后退出的容器（由图像生成）。如果它仍在运行，则不需要以下--all选项：
```
$ docker ps --all

CONTAINER ID     IMAGE           COMMAND      CREATED            STATUS
54f4984ed6a8     hello-world     "/hello"     20 seconds ago     Exited (0) 19 seconds ago
```
## 结尾
至此，您已经在开发机器上安装了Docker Desktop，并进行了快速测试，以确保您已设置为构建和运行第一个容器化应用程序。