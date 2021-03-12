---
layout: post
title: UNIX网络编程卷1-第二章笔记
description: UNIX网络编程卷1-第二章笔记 传输层：TCP、UDP和SCTP
category: [网络编程]
---
这一章主要是讲传输层，包括TCP、UDP和SCTP，并提供这些协议的实际设计、实现的具体描述。目前略过了SCTP
## TCP/IP 总图
以下是`TCP/IP`协议族的主要成员
![img](/static/image/2021/03/TCP_IP_overview.jpg)
* IPv4 网际协议版本4(Internet Protocol version 4) 使用32位地址，为TCP、UDP、SCTP、ICMP和IGMP提供分组递送服务
* IPv6 网际协议版本6(Internet Protocol version 6) 使用128位地址，为TCP、UDP、SCTP和ICMPv6提供分组递送服务
* TCP 传输控制协议(Transmission Control Protocol) TCP是面向连接的协议，为用户进程提供`可靠`的全双工字节流，是一种`流套接字(stream socket)`，关心确认、超时和重传之类的细节
* UDP 用户数据报协议(User Datagram Protocol) UDP是一个无连接协议，是一种`数据报套接字`，不能保证到达他们的目的地
* SCTP 流控制传输协议(Stream Control Transmission Protocol) 提供可靠全双工关联的面向连接的协议
* ICMP 网际控制消息协议(Internet Control Message Protocol) ICMP处理在路由器和主机之间流通的错误和控制消息，这些消息通常由TCP/IP网络支持软件本身产生和处理。不过ping和traceroute同样使用ICMP
* IGMP 网际组管理协议(Internet Group Management Protocol) IGMP用于多播
* ARP 地址解析协议(Address Resolution Protocol) ARP将一个IPv4地址映射成一个硬件地址，通常用于广播网络
* RARP 反向地址解析协议(Reverse Address Resolution Protocol)RARP把一个引进地址映射成一个IPv4地址
* ICMPv6 网际控制消息版本6 ，综合了ICMPv4、IGMP和ARP的功能  

## TCP连接的建立和终止
### 三路握手
建立一个TCP连接会发生以下情形：
* ① 服务器准备好接受外来的连接。通常调用socket、bind和listen这3个函数。称为`被动打开`
* ② 客户通过调用connect发起`主动打开`。这导致客户TCP发送一个SYN（同步）分节，他告诉服务器用户将在（待建立的）连接中发送的数据的初始序列号。通常SYM分节不携带数据，只含一个IP首部、一个TCP首部以及可能有的TCP选项
* ③ 服务器必须确认（ACK）客户的SYN，同时自己也得发送一个SYN分节
* ④ 客户必须确认服务器的SYN

这种交换至少需要3个分组，因此称为TCP的`三路握手`
![img 三路握手](/static/image/2021/03/TCP_three_handshake.jpg)
每个SYN的ACK的序列号是该SYN序列号+1  
### TCP选项
每个SYN可以含有多个TCP选项，下面是常用的TCP选项
* MSS选项。发送SYN的TCP一段使用本选项通告对端它的`最大分节大小(maximum segment size)`
* 窗口规模选项。TCP连接任何一端能够通告对端最大窗口大小是65535，因为在TCP首部中对应的字段占16位
* 时间戳选项。对于告诉网络连接是必要的  

## TCP连接终止  
TCP建立需要3个分节，终止则需要4个分节，称为`四路握手`
![img TCP连接终止](/static/image/2021/03/TCP_connect_close.jpg)
![img TCP状态](/static/image/2021/03/TCP_status.jpg)  
## TIME_WAIT状态  
两个存在的理由：
* 可靠的实现TCP全双工连接的终止
* 允许老的重复分节在网络中消逝  

## 端口号
端口一般分为`众所周知的端口(well-known port)`和临时端口。众所周知的端口为0~1023
一台服务器理论上能够创建最多的连接数取决于四元组(本地IP、本地端口、外地IP、外地端口)的数量  
## 缓冲区大小及限制  
## 常见因特网应用的协议使用
![img 常见因特网应用的协议使用](/static/image/2021/03/TCP_IP_use.jpg)  
## 小结
UDP是一个简单的、不可靠、无连接的协议，TCP是复杂、可靠、面向连接的协议。SCTP组合了这两个协议的特性，并提供了TCP不具备的额外特性