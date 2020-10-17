---
layout: post
title: libcurl 的基础使用
description: libcurl 的基础使用
category: [C++,工具]
---
在工作中需要调用webservice服务，之前使用的是gsoap，但是编译比较麻烦，考虑到使用的webservice比较简单，只需要发送简单get请求即可获取数据，所以这里考虑使用libcurl库。
## 编译
### 下载
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
* 注：如果需要https支持，需要添加openssl
我们这里可以直接使用现成的[https://windows.php.net/downloads/php-sdk/deps/vc15/x86/](https://windows.php.net/downloads/php-sdk/deps/vc15/x86/)，不容易出错，选择`openssl-1.1.1g-74-vc15-x86.zip`，解压放到deps指定目录  

### 构建
打开vs2015 本地命令行`vs2015 x86 本机工具命令提示符` ,进入winbuild目录，然后执行  
```
$ nmake /f Makefile.vc mode=dll VC=15 WITH_SSL=static ENABLE_SSPI=no ENABLE_IPV6=no
```
构建完成之后，会在根目录`/builds/libcurl-vc15-x86-release-dll-ssl-static` 找到生成的库。进入bin，使用普通cmd，执行
```
$ curl -V
# curl 7.70.0 (i386-pc-win32) libcurl/7.70.0 OpenSSL/1.1.1g WinIDN
# Release-Date: 2020-04-29
# Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtsp smb smbs smtp smtps telnet tftp
# Features: AsynchDNS HTTPS-proxy IDN Largefile NTLM SSL UnixSockets
```
带有OpenSSL则编译成功  

## 引入
新建vs工程，在工程目录里新建`include`、`lib`文件夹，将`libcurl-vc15-x86-release-dll-ssl-static`里的文件放入对应文件夹，`curl\`放入`include\`，`libcurl.lib`放入`lib\`，把`bin\`下的`libcurl.dll`放在exe根目录(如果是https，还需要将ssl相关的dll放入，否则会报错)  
然后再工程属性中添加对include和lib的引用  
## 使用
这里主要是介绍基础使用，所以使用的是easy API
### 初始化
`CURL *curl_easy_init( );`  
`curl_easy_init`用来初始化一个CURL的指针，对应销毁函数为`curl_easy_cleanup`  
一般curl_easy_init意味着一个会话的开始. 它会返回一个easy_handle(CURL*对象)  
### 销毁
`void curl_easy_cleanup(CURL *handle);`  
这个调用用来结束一个会话，清理资源，与curl_easy_init配合着用.   
### 设置参数
`CURLcode curl_easy_setopt(CURL *handle, CURLoption option, parameter);`
这个是非常重要的函数，通过这个函数，我们来定义会话的各种行为  
<table border="1">
  <tr>
    <th>参数</th>
    <th>含义</th>
  </tr>
  <tr>
    <td>CURLOPT_URL</td>
    <td>访问的url</td>
  </tr>
  <tr>
    <td>CURLOPT_WRITEFUNCTION</td>
    <td>回调函数</td>
  </tr>
</table>  

### 运行
`CURLcode curl_easy_perform(CURL *handle);`  
启动会话  
示例：
```
#include<string>
#include "curl\curl.h"
#include <iostream>
#include<vector>
using namespace std;

// UTF-8转std::string
std::string UTF8_To_string(const std::string& str)
{
	int nwLen = MultiByteToWideChar(CP_UTF8, 0, str.c_str(), -1, NULL, 0);
	wchar_t* pwBuf = new wchar_t[nwLen + 1];    //一定要加1，不然会出现尾巴 
	memset(pwBuf, 0, nwLen * 2 + 2);
	MultiByteToWideChar(CP_UTF8, 0, str.c_str(), str.length(), pwBuf, nwLen);
	int nLen = WideCharToMultiByte(CP_ACP, 0, pwBuf, -1, NULL, NULL, NULL, NULL);
	char* pBuf = new char[nLen + 1];
	memset(pBuf, 0, nLen + 1);
	WideCharToMultiByte(CP_ACP, 0, pwBuf, nwLen, pBuf, nLen, NULL, NULL);

	std::string strRet = pBuf;

	delete[]pBuf;
	delete[]pwBuf;
	pBuf = NULL;
	pwBuf = NULL;

	return strRet;
}

// std::string转UTF8
std::string string_To_UTF8(const std::string& str)
{
	int nwLen = ::MultiByteToWideChar(CP_ACP, 0, str.c_str(), -1, NULL, 0);
	wchar_t* pwBuf = new wchar_t[nwLen + 1];    //一定要加1，不然会出现尾巴 
	ZeroMemory(pwBuf, nwLen * 2 + 2);
	::MultiByteToWideChar(CP_ACP, 0, str.c_str(), str.length(), pwBuf, nwLen);
	int nLen = ::WideCharToMultiByte(CP_UTF8, 0, pwBuf, -1, NULL, NULL, NULL, NULL);
	char* pBuf = new char[nLen + 1];
	ZeroMemory(pBuf, nLen + 1);
	::WideCharToMultiByte(CP_UTF8, 0, pwBuf, nwLen, pBuf, nLen, NULL, NULL);

	std::string strRet(pBuf);

	delete[]pwBuf;
	delete[]pBuf;
	pwBuf = NULL;
	pBuf = NULL;

	return strRet;
}

//回调函数
size_t WriteGetResp(void* buffer, size_t size, size_t nmemb, void *userp)
{
	//wchar_t tt = (wchar_t)buffer;
	//((string*)userp)->append(buffer, 0, size*nmemb);
	((std::string*)userp)->append(
		reinterpret_cast<char*>(buffer), size * nmemb);
	return size*nmemb;
}

//发送get请求
int HttpGet(char* url)
{
	string respData;
	CURL* curl;
	CURLcode res;

	curl = curl_easy_init();
	if (curl == NULL)
	{
		return 1;
	}
	
	curl_easy_setopt(curl, CURLOPT_URL, url);   //设置url
	curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteGetResp);    //设置回调函数
	curl_easy_setopt(curl, CURLOPT_WRITEDATA, &respData);   //设置目标字符串

	res = curl_easy_perform(curl);
	if (res != CURLE_OK)
	{
		cout << curl_easy_strerror(res) << endl;
	}

	curl_easy_cleanup(curl);
	respData = UTF8_To_string(respData);    //网络传输的字节流一般是utf8，需要自己转换，否则会出现中文乱码(libcurl只关注传输字节)
	cout << respData << endl;
	return 0;
}

int main() {
	HttpGet("https://www.baidu.com");
	return 0;
}
```