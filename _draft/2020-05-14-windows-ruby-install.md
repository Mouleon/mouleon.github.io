---
layout: post
title: Windows下Ruby安装及使用
description: Windows下Ruby安装及使用
category: [建站,Ruby]
---
Window 系统下，我们可以使用 RubyInstaller 来安装 Ruby 环境，下载地址为：[https://rubyinstaller.org/downloads/](https://rubyinstaller.org/downloads/)。  
下载 rubyinstaller 之后，解压到新创建的目录下：  
双击 rubyinstaller.exe 文件，启动 Ruby 安装向导。  
点击 Next，继续向导，记得勾选 Add Ruby executables to your PATH，直到 Ruby 安装程序完成 Ruby 安装为止。  
如果您的安装没有适当地配置环境变量，接下来您可能需要进行环境变量的配置。  

安装后，通过在命令行中输入以下命令来确保一切工作正常：  
```
$ ruby -v
ruby 2.7.1
```
