---
created: 2024-03-27T12:30
updated: 2024-06-02T23:17
tags:
  - 笔记/文献笔记
  - 待归档
  - 笔记
  - {% for t in tags %}{{t.tag}}{% if not loop.last %}
  - {% endif %}{% endfor %}
status:
  - todo
title: "{{title}}"
TitleTranslation: ' {% if extra %}{% set cleanedString = extra|replace("abstractTranslation: ", "")|replace("titleTranslation: ", "") %}{% set parts = cleanedString.split("\n") %}{% set titleTranslation = parts[0] %}{% set abstractTranslation = parts[1] %}{% endif %}{{ titleTranslation}}'
Pubname: 
  - "{% if journalAbbreviation %}{{journalAbbreviation}}{% endif %} "
  - {{conferenceName}} 
  - {{publicationTitle}} 
  - {{university}}
FirstAuthor: "{{creators[0].firstName}}{{creators[0].lastName}}{{creators[0].name}}"
allAuthors:  
  - {% for t in creators %}{{t.firstName}}{{t.lastName}}{{t.name}}{% if not loop.last %}
  - {% endif %}{% endfor %}
Pubdate: '{% if date %}{{date | format("YYYY-MM")}}{% endif %}'
DOI: "{% if DOI %}https://doi.org/{{DOI}}{% endif %}"
zoterolink: "{{select}}"
---


# {{title}}
---

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
