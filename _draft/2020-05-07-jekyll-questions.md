---
layout: post
title: Jekyll遇到的问题汇总
description: Jekyll遇到的问题汇总
category: [建站,Jekyll]
---
## 本地运行无法使用redcarpet
在`_config.yml`里将markdown解析器设为`redcarpet`，出现
```
Markdown processor: "redcarpet" is not a valid Markdown processor.
                    Available processors are: kramdown

  Conversion error: Jekyll::Converters::Markdown encountered an error while converting '_posts/2020-05-08-SQL.md':
                    Invalid Markdown processor given: redcarpet
             ERROR: YOUR SITE COULD NOT BE BUILT:
                    ------------------------------------
                    Invalid Markdown processor given: redcarpet
```
暂时还不清楚是啥问题，windows上会出现，ubuntu上却没有问题
