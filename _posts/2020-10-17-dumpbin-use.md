---
layout: post
title: dumpbin 的基础使用
description: dumpbin 的基础使用
category: [C++,工具]
---
要查看exe依赖哪些动态库或某个DLL包含哪些接口函数依赖哪些动态库，可以使用depends工具或者vs自带的dumpbin工具，这里使用vs自带的dumpbin
## 启动
dumpbin 是使用vs命令行的，有两种方法打开：
* 1、打开vs，工具-命令行-开发者命令提示
* 2、开始菜单-visual stdio xxxx-命令提示符   

## 使用
使用很简单，语法如下：
```
DUMPBIN [options] files...
```
files 为绝对路径，或者将命令行切换到文件所在目录使用  
## 常见用法
一般常见的用法是查看exe依赖哪些动态库或某个DLL包含哪些接口函数依赖哪些动态库
```
# 查看dll接口函数
dumpbin /exports xx.dll

# 查看exe、dll依赖的动态库
dumpbin /dependents xx.dll
```
## 参数
如果记忆dumpbin的参数比较麻烦，可以在打开的vs命令行输入`dumpbin`，然后就会输出全部参数：
```
用法: DUMPBIN [选项] [文件]

  选项:

   /ALL
   /ARCHIVEMEMBERS
   /CLRHEADER
   /DEPENDENTS
   /DIRECTIVES
   /DISASM[:{BYTES|NOBYTES}]
   /ERRORREPORT:{NONE|PROMPT|QUEUE|SEND}
   /EXPORTS
   /FPO
   /HEADERS
   /IMPORTS[:文件名]
      /LINENUMBERS
   /LINKERMEMBER[:{1|2}]
   /LOADCONFIG
   /NOLOGO
      /NOPDB
      /OUT:filename
   /PDATA
   /PDBPATH[:VERBOSE]
   /RANGE:vaMin[,vaMax]
   /RAWDATA[:{NONE|1|2|4|8}[,#]]
   /RELOCATIONS
   /SECTION:名称
   /SUMMARY
   /SYMBOLS
```
参数解释：
### /all
此选项显示除代码反汇编外的所有可用信息。 使用/DISASM显示反汇编。 可以使用/RAWDATA: NONE/所有到忽略的文件的原始二进制的详细信息。
### /dependents
可以使用此选项确定要与应用程序一起重新分发的 Dll, 或查找缺少的依赖项的名称。
### /exports
此选项可显示从可执行文件或 DLL 中导出的所有定义。
### /imports
此选项可显示的 Dll 列表 (静态链接并延迟加载) 的导入到一个可执行文件或 DLL 和的各个导入从每个这些 Dll。(可以显示dll使用的从其他dll导入的函数),可以指定某个dll
```
dumpbin /IMPORTS:msvcrt.dll
```
## 其他用法
导出def、lib:  
实测只能导出debug版的dll  
```
dumpbin test.dll /EXPORTS /OUT:test.def

lib /def:test.def /MACHINE:IX86 /out:test.lib
```

## 参考
[DUMPBIN 选项 -Microsoft Docs](https://docs.microsoft.com/zh-cn/cpp/build/reference/dumpbin-options?view=vs-2019)