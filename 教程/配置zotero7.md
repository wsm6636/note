---
created: 2023-11-17T10:37
updated: 2024-02-13T22:39
tags:
  - 笔记
  - 笔记/教程
---

# 同步

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311171057635.png)

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311171057882.png)

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311171057600.png)

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311171058753.png)

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311171058156.png)
![](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311171058156.png
# tags

| 序号 | 配置名 | 参数       |
| ---- | ------ | ---------- |
| 1    | 名称   | schedule   |
|      | 事件   | 无         |
|      | 操作   | 自定义脚本 |
|      |  数据      |      item.addTag("schedule");item.addTag("ing");item.removeTag("unread");item.removeTag("❌");   
| 2    | 名称   | ing   |
|      | 事件   | 打开文献         |
|      | 操作   | 自定义脚本 |
|      |  数据      |      item.addTag("ing");item.removeTag("unread");item.removeTag("❌");   
| 3    | 名称   | 已读   |
|      | 事件   | 无         |
|      | 操作   | 自定义脚本 |
|      |  数据      |      item.removeTag("unread");item.removeTag("ing");item.addTag("readed");   
| 4    | 名称   | 移除书签   |
|      | 事件   | 无         |
|      | 操作   | 移除标签 |
|      |  数据      |      bookmark   
| 5    | 名称   | 未读   |
|      | 事件   | 新建条目         |
|      | 操作   | 自定义脚本 |
|      |  数据      |      item.addTag("unread");item.removeTag("ing");item.removeTag("readed");
| 6    | 名称   | 书签   |
|      | 事件   | 无         |
|      | 操作   | 自定义脚本 |
|      |  数据      |      item.addTag("bookmark");item.addTag("ing");item.removeTag("unread");item.removeTag("❌");   
| 7    | 名称   | 取消schedule   |
|      | 事件   | 无         |
|      | 操作   | 移除标签 |
|      |  数据      |      schedule
| 8    | 名称   | ❌   |
|      | 事件   | 无         |
|      | 操作   | 自定义脚本 |
|      |  数据      |      item.addTag("❌");item.removeTag("unread");item.removeTag("ing");item.removeTag("bookmark");item.removeTag("schedule");

# 期刊标签
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311171107694.png)
> ccf, CCF, sci, eii, sciUp
> ccf=CCF, SCI=JCR, EI检索=EI, /计算机科学(\d+)区/=计$1,SCI升级版=中科院,/工程技术(\d+)区/=工$1,/材料科学(\d+)区/=材$1,
> # EE0000, # 2F998C, # D2A500
> # 86dad1
> auto
> CCF, -ccf, -sci, -sciUP, -eii

# 标签
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311171109942.png)
> /^#(?:.+\/)*(.+)/
> auto
> # 8e44ad