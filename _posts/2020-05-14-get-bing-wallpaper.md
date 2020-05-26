---
layout: post
title: 获取Bing必应首页壁纸
description: 获取Bing必应首页的壁纸
category: Python
---
[Bing首页](https://www.bing.com)的壁纸质量很高，而且每天都会更换，但是如果手动下载的话比较麻烦，而且只能获取前7天到当天的壁纸，所以我们可以写一个爬虫来帮我们下载壁纸  <!-- more -->
## 获取壁纸地址  
必应首页壁纸有一个接口`https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1`,n代表天数，在浏览器上访问，可以看到返回的json数据，其中的url即为图片地址
`url":"/th?id=OHR.NorthRimOpens_ZH-CN9513300299_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp"`  
拼接一下就是壁纸地址`https://www.bing.com/th?id=OHR.NorthRimOpens_ZH-CN9513300299_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp`  
## 下载  
使用python的requests访问网址即可  
## 完整代码  
python3
```
#!/usr/bin/python
# -*- coding: utf-8 -*-
import requests
import json

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
    "Connection": "close",
}

def write_md(image_name,desc):
    data='![{}]({} "{}  ")'.format(desc,image_name,desc)
    data+='<center>'+desc+'</center>  '
    fout = open("wallpaper/README.md",'a+',encoding="UTF-8")
    fout.write(data)
    fout.close()

def get_wallpaper():
    url = "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1"
    res = requests.get(url, headers=headers)
    res.encoding = 'utf8'

    jsonData = json.loads(res.text)
    uri = jsonData['images'][0]['url']

    img = requests.get("https://www.bing.com/"+uri, headers=headers).content
    img_name = jsonData['images'][0]['startdate'] + ".jpg"
    fout = open("wallpaper/"+img_name, 'wb')
    fout.write(img)
    fout.close()
    fout = open("today.jpg", 'wb')
    fout.write(img)
    fout.close()

    write_md(img_name,jsonData['images'][0]['copyright'])

if __name__ == "__main__":
    get_wallpaper()

```  
