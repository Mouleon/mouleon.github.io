---
layout: post
title: 构建和运行镜像 - Docker中文文档
description: 构建和运行镜像 - Docker中文文档
category: [Docker]
---
[原始英文文档](https://docs.docker.com/get-started/part2)
## 前提
完成[前一步](/docker-orientation-setup.html)简介的阅读和安装
## 介绍
现在，您已经设置了开发环境，您可以开始开发容器化应用程序。通常，开发工作流程如下所示：
* 1.首先创建Docker镜像，为应用程序的每个组件创建和测试单独的容器。
* 2.将您的容器和基础支持结构组装成一个完整的应用程序。
* 3.测试、共享和部署完整的容器化应用程序。  

在本教程的此阶段，我们将重点放在此工作流程的第1步：创建容器所依赖的镜像。请记住，Docker镜像捕获了容器化进程运行所需的私有文件系统；您需要创建一个镜像，其中包含您的应用程序运行所需要的内容。
## 设置
让我们下载node-bulletin-board示例项目。这是一个用Node.js编写的简单公告板应用程序。
### Git
如果使用的是Git，则可以从GitHub克隆示例项目：
```
git clone https://github.com/dockersamples/node-bulletin-board
cd node-bulletin-board/bulletin-board-app
```
## 使用Dockerfile定义容器
下载项目后，查看公告板应用程序中的`Dockerfile`。Dockerfile描述了如何为容器组装私有文件系统，并且还可以包含一些元数据，这些元数据描述了如何基于该镜像运行容器。  
有关公告板应用程序中使用的Dockerfile的更多信息，请参见Dockerfile示例。  
## 建立并测试镜像
现在您已经有了一些源代码和一个Dockerfile，现在该构建您的第一个镜像，并确保从其启动的容器能够按预期工作。  
使用cd命令确保您位于终端或PowerShell 中的目录位于`node-bulletin-board/bulletin-board-app`中。运行以下命令来构建公告板镜像：
```
docker build --tag bulletinboard:1.0 .
```
您将看到Docker逐步完成Dockerfile中的每条指令，逐步构建镜像。如果成功，则构建过程应以`Successfully tagged bulletinboard:1.0`的信息结束。
* Windows用户： 
本示例使用Linux容器。右键单击系统托盘中的Docker徽标，然后单击切换到Linux容器，以确保您的环境正在运行Linux容器。不用担心-本教程中的所有命令对于Windows容器的工作方式都完全相同   
运行镜像后，您可能会收到一条标题为"SECURITY WARNING"(安全警告)的消息，其中指出了为添加到镜像中的文件设置的读取，写入和执行权限。在此示例中，我们不处理任何敏感信息，因此在此示例中，请不要理会警告。

## 将镜像作为容器运行
1. 运行以下命令以基于新镜像启动容器：  
```
docker run --publish 8000:8080 --detach --name bb bulletinboard:1.0
```
这里有几个常见的标志：
* --publish要求Docker将主机端口8000上传入的流量转发到容器的端口8080。容器拥有自己的专用端口集，因此，如果要从网络访问某个端口，则必须以这种方式将流量转发到该端口。否则，作为默认的安全状态，防火墙规则将阻止所有网络流量到达您的容器。
* --detach 要求Docker在后台运行此容器。
* --name指定一个名称，在后续命令中，您可以使用该名称来引用您的容器bb。  

2.在浏览器中访问`localhost:8000`来查看您的应用程序。您应该看到公告板应用程序已启动并正在运行。在这一步，您通常会尽一切可能确保容器按预期方式工作。例如，现在是运行单元测试的时候了。  
对公告板容器正常工作感到满意后，可以将其删除：
```
docker rm --force bb
```
该--force选件停止正在运行的容器，因此可以将其删除。如果先停止运行该容器`docker stop bb`，则无需使用--force来删除它。
## 结尾
至此，您已经成功构建了镜像，对应用程序进行了简单的容器化，并确认您的应用程序已在其容器中成功运行。下一步将在Docker Hub上共享您的镜像，以便可以轻松下载它们，并在任何目标计算机上运行它们。