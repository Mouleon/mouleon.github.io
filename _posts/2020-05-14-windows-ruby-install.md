---
layout: post
title: Windows下Ruby安装及使用
description: Windows下Ruby安装及使用
category: [建站,Ruby]
---
Window 系统下，我们可以使用 RubyInstaller 来安装 Ruby 环境，下载地址为：请点击这里下载。
下载 rubyinstaller 之后，解压到新创建的目录下：
双击 rubyinstaller-2.2.3.exe 文件，启动 Ruby 安装向导。
点击 Next，继续向导，记得勾选 Add Ruby executables to your PATH，直到 Ruby 安装程序完成 Ruby 安装为止。
如果您的安装没有适当地配置环境变量，接下来您可能需要进行环境变量的配置。

如果您使用的是 Windows 9x，那么请在您的 c:\autoexec.bat 中添加：set PATH="D:\(ruby 安装目录)\bin;%PATH%"
Windows NT/2000 用户需要修改注册表。
点击控制面板|系统性能|环境变量。
在系统变量下，选择 Path，并点击 EDIT。
在变量值列表的末尾添加 Ruby 目录，并点击 OK。
在系统变量下，选择 PATHEXT，并点击 EDIT。
添加 .RB 和 .RBW 到变量值列表中，并点击 OK。
安装后，通过在命令行中输入以下命令来确保一切工作正常：
$ ruby -v
ruby 2.2.3
如果一切工作正常，将会输出所安装的 Ruby 解释器的版本，如上所示。如果您安装了其他版本，则会显示其他不同的版本。
