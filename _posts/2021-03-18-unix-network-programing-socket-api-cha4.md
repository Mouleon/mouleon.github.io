---
layout: post
title: UNIX网络编程卷1-第四章笔记
description: UNIX网络编程卷1-第四章笔记 基本TCP套接字编程
category: [网络编程]
---
这一章主要讲解一个完整TCP程序所需要的基本套接字函数  
## socket函数
```
#include <sys/socket.h>
int socket(int family, int type, int protocol);
// 返回：若成功则为非负描述符，若出错则为-1
```
`family`参数指明协议族，`type`指明套接字类型，`protocol`应设为某个协议类型常值，或者设为0，已选择所给定`family`和`type`组合的系统默认值
## connect函数
TCP用户用connect函数来建立与TCP服务器的连接
```
#include <sys/socket.h>
int connect(int sockfd,const struct sockaddr *servaddr, socklen_t addrlen);
// 返回：若成功则为0，若出错则为-1
```
sockfd是由socket函数返回的套接字描述符，第2、3个参数分别使一个指向套接字地址结构的指针和该结构的大小  
客户再调用connect函数之前不必非得调用bind函数，因为如果需要的话，内核会确定源IP地址，并选择一个临时端口作为源端口
TCP套接字调用connect函数会激发TCP的三路握手过程，仅在连接建立成功或出错时才会返回，出错可能会有一下几种情况：
* ① 若TCP客户没有收到SYN分节的响应，则返回ETIMEDOUT错误，即超时
* ② 若对客户的SYN的响应是RST(表示复位)，表明服务器主机在指定端口上没有进程在等待与之连接。这是一种`硬错误`,客户端一接收到`RST`就马上返回`ECONNREFUSED`错误
* ③ 若客户发出的SYN在中间的某个路由器上引发了一个`destination unreachable`（目的地不可达）ICMP错误，则认为是一种`软错误`，客户端内核保存该消息，然后按第一种情况继续发送SYN，若在规定时间仍未收到响应，则把保存的消息作为`EHOSTUNREACH`或`ENETUNREACH`错误返回给进程  

## bind函数
bind函数把一个本地协议地址赋予一个套接字  
```
#include <sys/socket.h>
int bind(int sockfd, const struct sockaddr *myaddr, socklen_t addrlen);
// 返回：若成功则为0，若出错则为-1
```
第二个参数是一个指向特定于协议的地址结构的指针，第三个参数是该地址结构的长度。对于TCP，调用bind函数可以指定一个端口号，或指定一个IP地址，也可以两者都绑定，或者两者都不绑定  
如果一个TCP客户或者服务器未曾调用bind绑定端口，当调用connect或listen函数时，内核就要为套接字选择一个临时端口。一般服务器都要指定端口，因为服务器端口需要被大家所获知。  
进程可以把一个特定的IP地址绑定到它的套接字，不过这个IP地址`必须属于其所在主机的网络端口之一`。  
如果指定端口号为0，那么内核就在bind被调用时选择一个临时端口。然而如果指定IP地址为统配地址，那么内核将等到套接字已连接（TCP）或已在套接字上发出数据报（UDP）时菜选择一个本地IP地址  
对于IPv4来说，通配地址由常值`INADDR_ANY`来指定，其值一般为0。IPv4的IP地址是一个32位的值，IPv6的IP地址是存放再一个结构中的，IPv6通常用`in6addr_any`
```
// IPv4
struct sockaddr_in servaddr;
servaddr.sin_addr_s_addr = htonl(INADDR_ANY); 

//IPv6
struct sockaddr_in6 serv;
serv.sin6_addr = in6addr_any;
```
系统预先分配in6addr_any变量并将其初始化位常值IN6ADDR_ANY_INIT。头文件<netinet/in.h>中含有in6addr_any的extern声明  
## listen函数
listen函数仅有TCP服务器调用，它做两件事情：
* ① listen函数把一个未连接的套接字转换成一个被动套接字
* ② 本函数的第二个套接字规定了内核应该位响应套接字排队的最大连接个数  

```
#include <sys/socket.h>
int listen(int sockfd, int backlog);
```  
本函数应该在socket和bind函数之后，accept函数之前调用  
![TCP三路握手和监听套接字的两个队列](/static/image/2021/03/TCP_listen.jpg)
## accept函数
accept函数由TCP服务器调用，用于从已完成连接队列对头返回下一个已完成连接。如果已完成连接队列为空，那么进程被投入睡眠（假定套接字为默认的阻塞方式）
```
#include <sys/socket.h>
int accept(int sockfd, struct sockaddr * cliaddr, socklen_t* addrlen);
```
在讨论accept函数时，我们称它的第一个参数为`监听套接字`描述符(由socket创建，随后用作bind和listen的第一个参数的描述符)，称他的返回值为`已连接套接字`描述符。区分两个套接字很重要。一个服务器通常仅仅创建一个监听套接字，他在该服务器的生命期内一直存在。内核为每个由服务器进程接受的客户连接创建一个已连接套接字。当服务器完成对某个给定客户的服务时，响应的已连接套接字就被关闭。  
本函数最多返回三个值：一个既可能是新套接字描述符也可能是出错指示的整数、客户进程的协议地址以及该地址的大小。如果我们对返回看客户协议地址不感兴趣，那么可以把cliaddr和addrlen均置为空指针  
## fork和exec函数
```
#include <unistd.h>
pid_t fork(void);
// 返回：在子进程中为0，在父进程中为子进程ID，若出错则为-1
```
## 并发服务器
## close函数
close函数用于关闭套接字，并终止TCP连接
```
#include <unistd.h>
int close(int sockfd);
```
close一个TCP套接字的默认行为是把该套接字标记为已关闭，然后立即返回到调用进程。该套接字描述符不能再有调用进程使用，也就是不能再作为read或wirte的第一个参数。然而TCP将尝试发送一排队等待发送到对端的任何数据，发送完毕后发生的是正常的TCP连接终止序列。
## getsockname和getpeername函数
这两个函数或者返回与某个套接字关联的本地协议地址(getsockname)，或者返回某个套接字关联的外地协议地址(getpeername)
```
#include <sys/socket.h>
int getsockname(int sockfd, struct sockaddr *localaddr, socklen_t *addrlen);
int getpeername(int sockfd, struct sockaddr *peeraddr, socklen_t * addrlen);
// 返回：若成功则为0，若出错则为-1
```
