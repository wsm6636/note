---
created: 2024-03-27T18:55
updated: 2024-03-28T22:52
tags:
  - 笔记
  - 笔记/文献笔记
  - 待归档
status:
  - todo
---
{% set cleanedString = extra|replace("abstractTranslation: ", "")|replace("titleTranslation: ", "") %}
{% set parts = cleanedString.split("\n") %}
{% set titleTranslation = parts[0] %}
{% set abstractTranslation = parts[1] %}
**TitleTranslation:**  {{ titleTranslation }}
**Journal or Conference:**  {% if journalAbbreviation %}{{journalAbbreviation}}{% endif %} {{conferenceName}} {{publicationTitle}} {{university}}
**Authors:**  {% for t in creators %}{{t.firstName}}{{t.lastName}}{{t.name}}{% if not loop.last %}, {% endif %}{% endfor %}
**Pub.date:**  {% if date %}{{date | format("YYYY-MM")}}{% endif %}
**DOI:**  {% if DOI %}{{DOI}}{% endif %}
**tags:** #{{allTags}}
**zoterolink:**  [zotero]({{select}})

# 摘要

{{ abstractTranslation }}







***

# 笔记

## 1 论文创新在于

## 2 解决了什么问题

## 3 方法

## 4 不足&可继续研究

## 5 可参考

## 6 思考
