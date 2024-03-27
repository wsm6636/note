---
created: 
updated: 
tags:
  - 笔记
  - 笔记/文献笔记
  - 待归档
---

**TitleTranslation:**  {% if titleTranslation %}{{titleTranslation}}{% endif %} 
**Journal or Conference:**  {% if journalAbbreviation %}{{journalAbbreviation}}{% endif %} {{conferenceName}} {{publicationTitle}} {{university}}
**Authors:**  {% for t in creators %}{{t.firstName}}{{t.lastName}}{{t.name}}{% if not loop.last %}, {% endif %}{% endfor %}
**Pub.date:**  {% if date %}{{date | format("YYYY-MM")}}{% endif %}
**DOI:**  {% if DOI %}{{DOI}}{% endif %}
**tags:** {{allTags}}
**zoterolink:**  [zotero]({{select}})

# 摘要
{{abstractTranslation}}

***

# 笔记

## 1 论文创新在于

## 2 解决了什么问题

## 3 方法

## 4 不足&可继续研究

## 5 可参考

## 6 思考
