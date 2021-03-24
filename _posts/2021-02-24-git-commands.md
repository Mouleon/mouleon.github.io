---
layout: post
title: Git常用命令
description: Git常用命令
category: [Git,工具]
---
## 工作区、暂存区和版本库
工作区：就是你在电脑里能看到的目录。  
暂存区：英文叫 stage 或 index。一般存放在 .git 目录下的 index 文件（.git/index）中，所以我们把暂存区有时也叫作索引（index） 
版本库：工作区有一个隐藏目录 .git，这个不算工作区，而是 Git 的版本库。  
## 配置用户信息
```
git config --global user.name "oneneko"
git config --global user.email neko@oneneko.com

git config -e               # 修改配置，针对当前仓库 
git config -e --global      # 修改配置，针对全局

#--global 表示全局配置，不加的话就是当前项目配置

git config --list           #查看所有配置
```
## 创建仓库
```
git init                    #使用当前目录作为仓库
git init newrepo            #使用指定目录作为仓库
git clone <repo> <directory>   #从现有仓库克隆到指定目录(缺省则为当前目录)

#例如
git clone git@github.com:oneneko/test.git        #SSH协议
git clone git://github.com/oneneko/test.git      #GIT协议
git clone https://github.com/oneneko/test.git    # HTTPS协议  
```
## 提交与修改
```
git add             #添加文件到仓库
git status          #查看仓库当前的状态，显示有变更的文件。
git diff	        #比较文件的不同，即暂存区和工作区的差异。
git commit	        #提交暂存区到本地仓库。
git reset	        #回退版本。
git rm              #删除工作区文件。
git mv              #移动或重命名工作区文件。

git log	            #查看历史提交记录
git blame <file>	#以列表形式查看指定文件的历史修改记录

git remote	        #远程仓库操作
git fetch	        #从远程获取代码库
git pull	        #下载远程代码并合并
git push	        #上传远程代码并合并
```
## 分支管理
```
git branch                  #列出所有分支
git branch -a               #列出所有分支，包括远程分支
git branch <branchname>     #创建分支
git branch -d <branchname>  #删除指定分支

git checkout <branchname>   #切换到指定分支
git merge <branchname>      #将指定分支合并到当前分支
```
## 查看日志
```
git log                     #查看日志
git blame <file>            #以列表形式查看指定文件的历史修改记录。
```
## 标签
```
git tag                     #查看所有标签
git tag -a v1.0             #执行 git tag -a 命令时，Git 会打开你的编辑器，让你写一句标签注解，就像你给提交写注解一样。
git tag -a v0.9 <提交>      #给指定提交打标签    
```
## 参考
[Git教程](https://www.runoob.com/git)