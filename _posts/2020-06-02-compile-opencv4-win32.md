---
layout: post
title: OpenCV4 32位编译
description: OpenCV4 32位编译
category: [C++,OpenCV]
---
## 下载安装
访问官网[https://opencv.org/releases/](https://opencv.org/releases/)，下载相应的安装包，我这里是windows。  
下载下来是自解压安装包，解压到指定文件夹  
## 构建
打开cmake，添加源代码路径(opencv下的source)，目标路径自己指定，我的是build-32  
点击Configure，选择编译器，平台选win32  
然后确认，开始构建  
构建之后，会有选项，如：
* BUILD_SHARED_LIBS  会生成dll
* BUILD_opencv_world 将会像官方一样生成world.lib，但是会比较大，不勾选则会分开  

构建完成之后点Generate，生成vs项目  

## 编译
打开build-32里的opencv.sln，选择debug或者release进行编译即可
