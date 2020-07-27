---
layout: post
title: strcpy和memcpy的区别
description: strcpy和memcpy的区别 
category: [C++]
---
原型
```
char *strcpy(
   char *strDestination,
   const char *strSource
);
void *memcpy(
   void *dest,
   const void *src,
   size_t count
);
```
## 相似点
strcpy 和 memcpy 都是复制，头文件是`<string.h>`或`<cstring>`(C++)，或`<memory.h>`(memcpy)
## 区别
* 内容不同：strcpy 只能复制字符串，memcpy 则是将计数字节从源复制到目标，可以是字符串、整型、结构体、类...
* 方式不同：strcpy 没有指定长度，复制到`\0`结束，所以有可能会造成溢出，而memcpy是根据第三个参数指定长度  

## 安全调用
> Strcpy函数将strSource（包括终止 null 字符）复制到strDestination指定的位置。 如果源和目标字符串重叠，则strcpy的行为是不确定的。  
> 由于strcpy在复制strSource之前不检查strDestination中是否有足够的空间，因此它可能会导致缓冲区溢出。 因此，我们建议你使用 strcpy_s  

在vs中，使用`strcpy`会报错，建议使用`strcpy_s`，防止溢出

strcpy_s原型：
```
errno_t strcpy_s(
   char *dest, //目标字符串地址
   rsize_t dest_size, //目标字符串大小，必须大于源字符串（包括终止字符）大小
   const char *src //源
);
```
