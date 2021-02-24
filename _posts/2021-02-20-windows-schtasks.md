---
layout: post
title: windows计划任务程序基本命令
description: windows计划任务程序基本命令
category: [工具]
---
Schtasks.exe是windows自带的计划任务程序，存在于`C:\Windows\System32`文件夹下和`C:\Windows\SysWow64`文件夹下，使管理员可以在本地或远程电脑创建、删除、查询、修改和结束计划任务。无参数运行`Schtask.exe`将会显示每个注册任务的状态和下次运行时间。  
下面是一些基本指令
## 创建任务参数
下列语法用于创建任务  
```
schtasks /Create 
/SC schedule [/MO modifier] [/D day]
[/M months] [/I idletime] /TN taskname /TR taskrun [/ST starttime]
[/SD startdate] [/ED enddate] [/Z] [/F]
```
### **/SC** 时间表
指定计划频率的值。有效值为：分钟、小时、每日、每周、每月、一次、ONLOGON、ONIDLE 和 ONEVENT。
### **/MO** 修饰语
改进计划类型的值，以便对计划任务频率进行更精细的控制。有效值是
```
MINUTE: 1 - 1439 分.
HOURLY: 1 - 23 时.
DAILY: 1 - 365 天.
WEEKLY: 周 1 - 52.
ONCE: No modifiers.
ONSTART: No modifiers.
ONLOGON: No modifiers.
ONIDLE: No modifiers.
MONTHLY: 1 - 12, or FIRST, SECOND, THIRD, FOURTH, LAST, and LASTDAY.
ONEVENT: XPath event query string.
```
### **/D** 天
指定周几运行任务，有效值为：`MON,TUE,WED,THU,FRI,SAT,SUN`以及月度时间`1 - 31`(每月的第几天)。通配符`*`指所有天
### **/M** 月
指定月份。默认为该月的第一天。有效值为：`JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC`。通配符`*`指所有月
### **/TN** 任务名称
指定计划任务的名称(唯一)
### **/TR** 任务
指定在计划时间时要运行程序的路径和文件名，例如`C:\Windows\System32\calc.exe.`
### **/ST** 开始时间
指定运行任务的开始时间。时间格式为`HH:mm`(24小时制)。如果未指定，则默认为任务创建时间
### **/SD** 开始日期
指定运行任务的开始日期。时间格式为`HH:mm`(24小时制)。如果未指定，则默认为任务创建时间。不适用于以下类型：ONCE, ONSTART, ONLOGON, ONIDLE, and ONEVENT。
### **/Z**
在最后一次运行后删除任务
### **/F**
如果指定任务已经存在时忽略警告强制创建任务
### **/DELAY** 延时时间
在某个事件发生后延时触发。时间格式是`mmmm:ss`。该选项只在`ONSTART, ONLOGON, ONEVENT`类型下有效
### **/?**
显示帮助信息
## 删除任务
下列语法用于删除一个或多个任务
```
schtasks /Delete 
[/S system [/U username [/P [password]]]]
[/TN taskname] [/F]
```
### /TN 任务名称
## 运行任务
下列语法用于立即运行一个计划的任务
```
schtasks /Run 
[/S system [/U username [/P [password]]]]
/TN taskname
```
### /TN 任务名称
## 结束任务
下列语法用于结束一个计划的任务
```
schtasks /End 
/TN taskname
```
### /TN 任务名称
## 查询任务信息
```
schtasks /Query 
[/FO format | /XML] [/NH] [/V] [/TN taskname] [/?]
```
## 修改任务
与创建任务类似，只是将`/Create`改为`Change`，可以使用`/Create /F`强制覆盖
## 举例
```
# 创建一个名为“TurnOff”的每天18：00定时关机的计划任务
schtasks.exe /Create /tn "TurnOff" /tr "shutdown /s /t 60"  /sc DAILY /st 18:00 /F
# 创建一个名为“TurnOff”的每3天18：00定时关机的计划任务
schtasks.exe /Create /tn "TurnOff" /tr "shutdown /s /t 60"  /sc DAILY /mo 3 /st 18:00 /F
```
## 参考
[Schtasks.exe Win32 apps](https://docs.microsoft.com/zh-cn/windows/win32/taskschd/schtasks)