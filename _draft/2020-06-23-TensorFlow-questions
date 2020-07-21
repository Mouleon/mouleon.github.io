---
layout: post
title: TensorFlow遇到的问题
description: TensorFlow遇到的问题
category: [TensorFlow]
---
## AttributeError: module 'tensorflow' has no attribute 'Session'
原因是在新的Tensorflow 2.0版本中已经移除了Session这一模块，改换运行代码
```
tf.compat.v1.Session()
```
## RuntimeError: The Session graph is empty. Add operations to the graph before calling run().解决方法
问题产生的原因：无法执行sess.run()的原因是tensorflow版本不同导致的，tensorflow版本2.0无法兼容版本1.0.

解决办法：tf.compat.v1.disable_eager_execution()
