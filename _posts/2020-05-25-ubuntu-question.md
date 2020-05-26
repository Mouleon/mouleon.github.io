---
layout: post
title: ubuntu使用时遇到的一些问题
description: ubuntu使用时遇到的一些问题
category: Ubuntu
---
## python3安装multiprocessing时出错  
在使用pip3安装multiprocessing,使用`pip3 install multiprocessing`报`print`错误
```
Collecting multiprocessing
  Using cached https://files.pythonhosted.org/packages/b8/8a/38187040f36cec8f98968502992dca9b00cc5e88553e01884ba29cbe6aac/multiprocessing-2.6.2.1.tar.gz
    Complete output from command python setup.py egg_info:
    Traceback (most recent call last):
      File "<string>", line 1, in <module>
      File "/tmp/pip-build-ixmx_ceb/multiprocessing/setup.py", line 94
        print 'Macros:'
                      ^
    SyntaxError: Missing parentheses in call to 'print'. Did you mean print('Macros:')?

    ----------------------------------------
Command "python setup.py egg_info" failed with error code 1 in /tmp/pip-build-ixmx_ceb/multiprocessing/
```
解决：将命令更换为`pip3 install multiprocess`
