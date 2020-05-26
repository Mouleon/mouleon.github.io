---
layout: post
title: 设置ssh key访问Github仓库
description: 设置ssh key访问Github仓库
category: git
---
## 查看是否存在ssh key  
执行
`open ~/.ssh`或`cd ~.ssh`  
查看是否有id_rsa.pub文件，没有则生成
## 生成ssh key
执行以下命令生成ssh key(GitHub登录邮箱)  
`ssh-keygen -t rsa -C "example@example.com"`  
此时会询问你密钥存放的地址和是否需要密码，根据自身需求处理
## 获取ssh key  
根据前面的地址，访问id_rsa.pub文件,复制密钥  
## Github添加ssh key  
https://github.com/settings/keys   
添加即可  
## 验证  
执行`ssh -T git@github.com`  
运行结果类似如下  
`Hi xxx! You've successfully authenticated, but GitHub does not provide shell access.`
## 访问    
ssh git访问路径  
`git@github.com:usename/repositories.git`
