---
layout: post
title: Ubuntu设置时区
description: Ubuntu设置时区
category: ubuntu
---
系统：ubuntu18.04  
输入`date`可以查看时间、时区  
执行`tzselect`设置时区  
如设为shanghai所在时区  
然后执行`sudo cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime`使设置永久生效
