---
layout: post
title: UNIX网络编程卷1-第六章笔记
description: I/O复用：select和poll函数
category: [网络编程]
---
I/O复用典型使用在下列网络应用组合： 
* 当客户处理多个描述符（通常是交互式输入和网络套接字）必须使用I/O复用  
* 一个客户处理多个套接字  
* 一个TCP服务器纪要处理监听套接字，又要处理已连接套接字  
* 一个服务器既要处理TCP，又要处理UDP
* 一个服务器要处理多个服务或协议  

## I/O模型
一个输入操作通常包括两个不同的阶段：  
（1）等待数据准备好  
（2）从内核向进程复制数据  
### 6.2.1 阻塞式I/O模型
![img](/static/image/2021/04/blockingIO.jpg)
进程从调用recvfrom开始到它返回的整段时间内是被阻塞的。recvfrom成功返回之后，应用进程开始处理数据报。  
### 6.2.2 非阻塞式I/O模型
![img](/static/image/2021/04/nonblockingIO.jpg)
### 6.2.3 I/O复用模型
有了I/O复用，我们就可以调用`select`或`poll`，阻塞在这两个系统调用中的某一个之上，而不是阻塞在真正的I/O系统调用上。
![img](/static/image/2021/04/IOmultiplexing.jpg)
### 6.2.4 信号驱动式I/O模型
用信号让内核在描述符就绪时发送`SIGIO`信号通知我们。优势在于等待数据包到达期间进程不被阻塞。
![img](/static/image/2021/04/signal-drivenIO.jpg)
### 6.2.5 异步I/O模型
信号驱动式I/O是由内核通知我们何时可以*启动*一个I/O操作，异步IO模型是由内核通知我们IO操作何时*完成*
![img](/static/image/2021/04/asynchronousIO.jpg)
### 6.2.6 各种I/O模型的比较
* 同步I/O操作导致请求进程堵塞，直到I/O操作完成
* 异步I/O操作不导致请求进程阻塞  

![img](/static/image/2021/04/IOcompare.jpg)
## select 函数
该函数允许进程指示内核等待多个事件中的任何一个发生，并只在有一个或多个事件发生或经历一段指定的时间后才唤醒它
```
#include <sys/select.h>
#include <sys/time.h>

int select(int maxfdpl, fd_set *readset, fd_set *writeset, fd_set *exceptset, const struct timeval *timeout);
// 返回，若有就绪描述符则为其数目，若超时则为0，若出错则为-1
```  
`timeout`参数：它告知内核等待所指定描述符中的任何一个就绪可花多长时间，其timeval结构用于指定这段时间的秒数和微秒数
```
struct timeval{
    long tv_sec;    //秒
    long tv_usec;   //微秒
}
```
该参数有以下三种可能：  
* 永远等下去：仅在有一个描述符准备好I/O时才返回。因此将该参数置为空指针
* 等待一段固定时间：在有一个描述符准备好I/O时返回，但是不超过该参数指定的时间
* 根本不等待：检查描述符后立即返回，这称为轮询。为此该参数指定时间应为0  
 
中间的三个参数readset、writeset和exceptset指定我们要让内核测试读、写和异常条件的描述符。 
maxfdpl参数指定待测试的描述符个数，它的值是待测试的最大描述符加1

## shutdown函数
终止网络连接的通常方法是调用close函数。不过close有两个限制，去可以使用shutdown来避免。
* ① close吧面舒服的应用计数减一，尽在该计数变为0时才关闭套接字。
* ② close终止读和写两个方向的数据传送  

```
#include <sys/socket.h>
int shutdown(int sockfd, iny howto);
```
howto参数  
SHUT_RD 关闭连接的读这一半————套接字不再有数据可接收，而且套接字接收缓冲区的现有数据都被丢弃  
SHUT_WR 关闭连接的写这一半————对于TCP套接字，这成为`半关闭`  
SHUT_RDWR 连接的读半部和写半部都关闭  