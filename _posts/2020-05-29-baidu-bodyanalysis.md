---
layout: post
title: C++ 访问百度Api实例
description: C++ 访问百度Api实例
category: [C++]
---
C++ 由于历史原因，C++的第三方库一般都是提供源代码，需要自己根据需求来编译出dll或者lib才能在程序中使用，无法像Python那样拿来就能用。而编译第三方库又是一个大坑(′д｀ )，这里拿百度人体分析api为例  
根据百度的文档，程序需要 libcurl 、openssl 、jsoncpp三个依赖库，我们需要提前进行编译。  
我的环境是windows10 vs2015，百度sdk文档[人体分析](https://ai.baidu.com/ai-doc/BODY/Tk3cpytrz)
## 编译jsoncpp
首先下载源代码：[https://github.com/open-source-parsers/jsoncpp/releases](https://github.com/open-source-parsers/jsoncpp/releases)，选择一个版本下载，如1.8.4版本  
解压到指定目录  
这里因为需求没有添加依赖，所以可以直接使用cmake生成vs工程  
然后打开vs工程生成  
之后便可以在`\src\lib_json\`找到jsoncpp.lib
## 编译libcurl  
百度的文档提示：
> 安装依赖库libcurl（需要支持https） openssl jsoncpp(>1.6.2版本，0.x版本将不被支持)。  

所以在编译libcurl时需要添加https支持  
下载curl源代码：[https://curl.haxx.se/download.html](https://curl.haxx.se/download.html)，选择一个版本下载,如`curl-7.70.0`
解压到指定目录，查看winbuild，里面有官方文档`BUILD.WINDOWS.txt`，文档里提示，要将依赖放在与curl目录同级的`deps`目录里面，如下  
```
|_ curl-src  
| |_ winbuild  
|  
|_ deps  
  |_ lib  
  |_ include  
  |_ bin
```
我们需要https的支持，所以添加openssl，我们这里可以直接使用现成的[https://windows.php.net/downloads/php-sdk/deps/vc15/x86/](https://windows.php.net/downloads/php-sdk/deps/vc15/x86/)，不容易出错，选择`openssl-1.1.1g-74-vc15-x86.zip`，解压放到deps指定目录
然后打开vs2015 本地命令行`vs2015 x86 本机工具命令提示符` ,进入winbuild目录，然后执行  
```
$ nmake /f Makefile.vc mode=dll VC=15 WITH_SSL=static ENABLE_SSPI=no ENABLE_IPV6=no
```
构建完成之后，会在根目录/builds/libcurl-vc15-x86-release-dll-ssl-static 找到生成的库。进入bin，使用普通cmd，执行
```
$ curl -V
# curl 7.70.0 (i386-pc-win32) libcurl/7.70.0 OpenSSL/1.1.1g WinIDN
# Release-Date: 2020-04-29
# Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtsp smb smbs smtp smtps telnet tftp
# Features: AsynchDNS HTTPS-proxy IDN Largefile NTLM SSL UnixSockets
```
带有OpenSSL则编译成功
## 下载SDK
根据文档，下载sdk代码包
## 实际测试
新建一个win32工程，添加源文件：
```
#include <body_analysis.h>
int main() {
	// 设置APPID/AK/SK
	std::string app_id = "123456";
	std::string api_key = "qwertyuiop";
	std::string secret_key = "asdfghjkl";

	aip::Bodyanalysis client(app_id, api_key, secret_key);
	Json::Value result;

	std::string image;
	aip::get_file_content("E:\\test.jpg", &image);

	// 调用人体关键点识别
	//result = client.body_analysis(image, aip::null);

	return 0;
}
```
填入自己的百度APPID/AK/SK，输入文件  
### 配置项目属性
为避免后期文件移动导致丢失的情况，可以将libcurl、openssl、jsoncpp的include文件夹以及百度sdk放入工程源代码include文件夹内  
jsoncpp.lib、libcurl.lib、libcrypto.lib、libssl.lib均放入lib文件夹  
libcurl.dll放入exe生成目录
然后进行引用
* vs项目属性-C/C++-常规-附加包含目录，添加include路径  
* vs项目属性-链接器-常规-附加库目录，添加lib路径
* vs项目属性-链接器-输入-附加依赖项，添加jsoncpp.lib、libcurl.lib、libcrypto.lib、libssl.lib的引用  
之后运行测试即可

## 可能的问题
### 访问api返回curl_error_code:1
curl未配置https，检查curl是否添加openssl依赖，前面步骤是否生成成功
### std 没有inserter
添加`#include <iterator>`
