---
layout: post
title: Ubuntu设置cron
description: Ubuntu设置cron
category: blog
---
cron执行定时任务的服务，每个用户都会有自己的任务计划,ubuntu18.04  
## 设置定时任务  
执行`crontab -e`打开crontab  
添加定时任务  
定时任务格式为
`* * * * * [command]`  
依次为
```
minute(0-59)  
hour(0-23)  
day of month(1-31)  
month(1-12) or jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec  
day of week (0-7) (Sunday=0 or 7) or sun,mon,tue,wed,thu,fri,sat  
* 表示每[m,h,d]执行
a-b 表示从第[m,h,d]到第[m,h,d]都要执行  
*/n 表示每n个[m,h,d]执行一次
a,b,c 表示第a,b,c[m,h,d]执行一次
```
## 设置的栗子  
`* * * * * [command] #每分钟执行一次`  
`8 * * * * [command] #每天每小时8分执行一次`  
`20 19 * * * [command] #每天19时20分执行一次`  
`20 19 1 * * [command] #每月1日19时20分执行一次`  
`20 19 1 5 * [command] #5月1日19时20分执行一次`  
`20 19 * * 4 [command] #周四19时20分执行一次`  
`*/20 9-17 * 5 * [command] #5月每天9-17时每隔20分钟执行一次`  
`0 9-17/2 * * 1-5 [command] #周一到周五9-17时每隔两小时执行一次`  
## 开启crontab日志  
* 使用cron日志
```
sudo vim /etc/rsyslog.d/50-default.conf
sudo service rsyslog  restart
vi /var/log/cron.log
```  
* 自定义输出  
如`27 10 * * * /usr/bin/sh /opt/lyy/checkES.sh >>/opt/lyy/checkES.log 2>&1`
