---
layout: post
title: 数据库基本语句
description: 数据库的一些基本语句
category: blog
---
## 增加  
建立数据库
`create database 库名;`  
建表
`create table 表名(字段名 数据类型 是否主键，名字 数据类型 是否主键)； #注意逗号`  
增加字段
`alter table 表名 add 字段名 类型 约束`  
增加数据`insert into 表名（·,·,·）values(·,·,·);`  
复制表`Insert into 新表 select * from 旧表;`  
从旧表更新新表数据`Update table1 set pid1={select pid2 from table2  where table1.pid=table2.pid2}`  
## 删除  
删除字段`alter table 表名 drop 字段名；`  
删除数据`delete from 表名 where 字段名=值;`  
删除主键,先确认是否有自增长，有则  
    `alter table products change pid pid int;`    
		`alter table  表名 drop primary key;`  
## 查找  
展示字段
`desc 表名;`  
展示表或数据库
`show tables/databases;`  
`select 字段名 from 表名；`  
`select distinct 字段名 from 表名；#去除重复`  
`select 字段名 from 表名 order by 字段名；#默认升序 desc降序`  
`select 字段名 from 表名 where 字段名 like 值;`  
查询前100条数据`limit 100;`  
## 修改  
修改字段`alter table 表名 change 原字段名 新字段名 类型 约束；`  
修改数据`update 表名 set 字段名=新数据 where 约束；`  
