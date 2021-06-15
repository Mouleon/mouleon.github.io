---
layout: post
title: C/C++ 操作文件
description: C/C++ 操作文件总结
category: [C++]
---
## 使用C标准库读写文件
C读写文件的标准库函数包含于`<stdio.h>`或`<cstdio>`(C++)
### 打开文件
使用`fopen`来创建一个新的文件或者打开一个已有的文件，这个调用会初始化类型`FILE`的一个对象，类型`FILE`包含了所有用来控制流的必要的信息。
```
FILE *fopen(const char* filename, const char* mode);
```
`mode`的值如下：

| 模式 | 描述 |
| ----- | ----- |
| r	| 打开一个已有的文本文件，允许读取 |
| w	| 打开一个文本文件，允许写入。文件不存在则会创建一个新文件。如果文件存在，则该会被截断重新写入。|
| a | 打开一个文本文件，以追加模式写入文件。文件不存在则会创建一个新文件。|
| r+ | 打开一个文本文件，允许读写。|
| w+ | 打开一个文本文件，允许读写。文件不存在则会创建一个新文件。如果文件存在，则该会被截断重新写入。|
| a+ | 打开一个文本文件，允许读写。文件不存在则会创建一个新文件。读取会从文件的开头开始，写入则只能是追加模式。|

如果处理的是二进制文件，则需使用下面的访问模式来取代上面的访问模式：
```
"rb", "wb", "ab", "rb+", "r+b", "wb+", "w+b", "ab+", "a+b"
```
### 关闭文件
```
int fclose( FILE *fp );
```
如果成功关闭文件，`fclose()`函数返回零，如果关闭文件时发生错误，函数返回`EOF`。这个函数实际上，会清空缓冲区中的数据，关闭文件，并释放用于该文件的所有内存  
### 写入文件
`fputc()`把参数`c`的字符值写入到`fp`所指向的输出流中。如果写入成功，它会返回写入的字符，如果发生错误，则会返回`EOF`：
```
int fputc( int c, FILE *fp );
```
`fputs()`把字符串`s`写入到`fp`所指向的输出流中。如果写入成功，它会返回一个非负值，如果发生错误，则会返回`EOF`:
```
int fputs( const char *s, FILE *fp );
```
`fprintf`把字符格式化写入到`fp`所指向的输出流中。
```
int fprintf(FILE *fp,const char *format, ...)
```
### 读取文件
`fgetc()`函数从`fp`所指向的输入文件中读取一个字符。返回值是读取的字符，如果发生错误则返回`EOF`
```
int fgetc( FILE * fp );
```
`fgets()`从`fp`所指向的输入流中读取`n-1`个字符。它会把读取的字符串复制到缓冲区`buf`并在最后追加一个`null`字符来终止字符串。如果这个函数在读取最后一个字符之前就遇到一个换行符 '\n' 或文件的末尾 EOF，则只会返回读取到的字符，包括换行符。
```
char *fgets( char *buf, int n, FILE *fp );
``` 
`fscanf`从文件中读取字符串，但是在遇到第一个**空格**和换行符时，它会停止读取。
```
int fscanf(FILE *fp, const char *format, ...)
```
### 二进制 I/O 函数
下面两个函数用于二进制输入和输出：
```
size_t fread(void *ptr, size_t size_of_elements, size_t number_of_elements, FILE *a_file);
              
size_t fwrite(const void *ptr, size_t size_of_elements, size_t number_of_elements, FILE *a_file);
```
这两个函数都是用于存储块的读写 - 通常是数组或结构体。
## 使用C++标准库读写文件
C++ 标准类库中有三个类可以用于文件操作，它们统称为文件流类。这三个类是：
* ifstream：用于从文件中读取数据。
* ofstream：用于向文件中写入数据。
* fstream：既可用于从文件中读取数据，又可用于 向文件中写入数据。

使用这三个类时，程序中需要包含`<fstream>`头文件

### 打开或关闭文件
`open()`打开文件并与文件流对象相关联，结束使用时必须要用`close()`关闭文件，切断和文件流对象的关联。
```
void open(const char* szFileName, int mode);
void close();
is_open();  // 检查指定文件是否已打开。  
swap();     // 交换2个文件流对象。  
```

| 模式 | 作用 |
| ----- | ----- |
| ios::in | 打开文件用于读取数据。如果文件不存在，则打开出错。 |
| ios::out | 打开文件用于写入数据。如果文件不存在，则新建该文件；如果文件原来就存在，则打开时清除原来的内容。|
| ios::app	| 打开文件，用于在其尾部添加数据。如果文件不存在，则新建该文件。|
| ios::ate | 打开一个已有的文件，并将文件读指针指向文件末尾。如果文件不存在，则打开出错。|
| ios::trunc | 打开文件时会清空内部存储的所有数据，单独使用时与 ios::out 相同。|
| ios::binary | 以二进制方式打开文件。若不指定此模式，则以文本模式打开。|
| ios::in \| ios::out |	打开已存在的文件，既可读取其内容，也可向其写入数据。文件刚打开时，原有内容保持不变。如果文件不存在，则打开出错。|
| ios::in \| ios::out |	打开已存在的文件，可以向其写入数据。文件刚打开时，原有内容保持不变。如果文件不存在，则打开出错。|
| ios::in \| ios::out \| ios::trunc |	打开文件，既可读取其内容，也可向其写入数据。如果文件本来就存在，则打开时清除原来的内容；如果文件不存在，则新建该文件。|

示例：
```
#include<fstream>
int main(){
   fstream fs;
   fs.open("test.txt",ios::in | ios::out | ios::app)
   fs.close();
   return 0;
}
```
### 读取或写入文件
标准库重载了运算符`<<`(输出)和`>>`(输入)实现文本模式读写
```
// 文本模式读写
#include <iostream>
#include <fstream>
using namespace std;

int main()
{
    string line;
    
    ofstream f_out("D:/test.txt", ios::out|ios::trunc); // 
    f_out << "hello fstream";
    f_out.close();

    ifstream f_in("D:/test.txt", ios::in); // 
    while (f_in >> line) {
        cout << line << endl;
    } 
    f_in.close();
   
    return 0;
}
```

二进制读写则使用下列函数,`buffer`用于指定要写入文件的二进制数据的起始位置；`count`用于指定写入字节的个数。
```
ostream & write(char* buffer, int count);
istream & read(char* buffer, int count);
```
## 参考
http://c.biancheng.net/cplus/60/
