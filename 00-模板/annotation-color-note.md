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
Journal or Conference: "{% if journalAbbreviation %}{{journalAbbreviation}}{% endif %} {{conferenceName}} {{publicationTitle}} {{university}}"
FirstAuthor: "{{creators[0].firstName}}{{creators[0].lastName}}{{creators[0].name}}"
allAuthors:  {% for t in creators %}{{t.firstName}}{{t.lastName}}{{t.name}}{% if not loop.last %}, {% endif %}{% endfor %}
Pub.date: '{% if date %}{{date | format("YYYY-MM")}}{% endif %}'
DOI: "{% if DOI %}{{DOI}}{% endif %}"
zoterolink: "{{select}}"
notelink: "[[{{title}}]]"
---
# {{title}}
---



# <font color="#ffd400">问题</font>
{% set i=1%}{% for annotation in annotations %}{% if annotation.color == '#ffd400' %}
### 第{{i}}个注释{% set i=i+1 %}
#### 文本:
{{annotation.annotatedText}}
#### 评论:
{{annotation.comment}}{% if annotation.imageBaseName %}
![[{{annotation.imageBaseName}}]]{% endif %}

#### zotero位置:
{{pdfZoteroLink|replace("//select/", "//open-pdf/")|replace(")", "")}}?page={{annotation.page}}&annotation={{annotation.id}})
{% endif %}

{% endfor %}

# <font color="#ff6666">贡献</font>

{% set i=1%}{% for annotation in annotations %}{% if annotation.color == '#ff6666' %}
### 第{{i}}个注释{% set i=i+1 %}
#### 文本:
{{annotation.annotatedText}}
#### 评论: 
{{annotation.comment}}{% if annotation.imageBaseName %}
![[{{annotation.imageBaseName}}]]{% endif %}
#### zotero位置:
{{pdfZoteroLink|replace("//select/", "//open-pdf/")|replace(")", "")}}?page={{annotation.page}}&annotation={{annotation.id}})
{% endif %}

{% endfor %}

# <font color="#5fb236">模型</font>

{% set i=1%}{% for annotation in annotations %}{% if annotation.color == '#5fb236' %}
### 第{{i}}个注释{% set i=i+1 %}
#### 文本:
{{annotation.annotatedText}}
#### 评论: 
{{annotation.comment}}{% if annotation.imageBaseName %}
![[{{annotation.imageBaseName}}]]{% endif %}
#### zotero位置:
{{pdfZoteroLink|replace("//select/", "//open-pdf/")|replace(")", "")}}?page={{annotation.page}}&annotation={{annotation.id}})
{% endif %}

{% endfor %}

# <font color="#2ea8e5">背景</font>

{% set i=1%}{% for annotation in annotations %}{% if annotation.color == '#2ea8e5' %}
### 第{{i}}个注释{% set i=i+1 %}
#### 文本:
{{annotation.annotatedText}}
#### 评论: 
{{annotation.comment}}{% if annotation.imageBaseName %}
![[{{annotation.imageBaseName}}]]{% endif %}
#### zotero位置:
{{pdfZoteroLink|replace("//select/", "//open-pdf/")|replace(")", "")}}?page={{annotation.page}}&annotation={{annotation.id}})
{% endif %}

{% endfor %}

# <font color="#a28ae5">算法</font>

{% set i=1%}{% for annotation in annotations %}{% if annotation.color == '#a28ae5' %}
### 第{{i}}个注释{% set i=i+1 %}
#### 文本:
{{annotation.annotatedText}}
#### 评论: 
{{annotation.comment}}{% if annotation.imageBaseName %}
![[{{annotation.imageBaseName}}]]
{% endif %}
#### zotero位置:
{{pdfZoteroLink|replace("//select/", "//open-pdf/")|replace(")", "")}}?page={{annotation.page}}&annotation={{annotation.id}})
{% endif %}

{% endfor %}

# <font color="#e56eee">参考</font>

{% set i=1%}{% for annotation in annotations %}{% if annotation.color == '#e56eee' %}
### 第{{i}}个注释{% set i=i+1 %}
#### 文本:
{{annotation.annotatedText}}
#### 评论: 
{{annotation.comment}}{% if annotation.imageBaseName %}
![[{{annotation.imageBaseName}}]]{% endif %}
#### zotero位置:
{{pdfZoteroLink|replace("//select/", "//open-pdf/")|replace(")", "")}}?page={{annotation.page}}&annotation={{annotation.id}})
{% endif %}

{% endfor %}

# <font color="#f19837">方法/实验</font>

{% set i=1%}{% for annotation in annotations %}{% if annotation.color == '#f19837' %}
### 第{{i}}个注释{% set i=i+1 %}
#### 文本:
{{annotation.annotatedText}}
#### 评论: 
{{annotation.comment}}{% if annotation.imageBaseName %}
![[{{annotation.imageBaseName}}]]{% endif %}
#### zotero位置:
{{pdfZoteroLink|replace("//select/", "//open-pdf/")|replace(")", "")}}?page={{annotation.page}}&annotation={{annotation.id}})
{% endif %}

{% endfor %}

# <font color="#aaaaaa">不足</font>

{% set i=1%}{% for annotation in annotations %}{% if annotation.color == '#aaaaaa' %}
### 第{{i}}个注释{% set i=i+1 %}
#### 文本:
{{annotation.annotatedText}}
#### 评论: 
{{annotation.comment}}{% if annotation.imageBaseName %}
![[{{annotation.imageBaseName}}]]{% endif %}
#### zotero位置:
{{pdfZoteroLink|replace("//select/", "//open-pdf/")|replace(")", "")}}?page={{annotation.page}}&annotation={{annotation.id}})
{% endif %}

{% endfor %}

# <font color="#b15928">学习</font>

{% set i=1%}{% for annotation in annotations %}{% if annotation.color == '#b15928' %}
### 第{{i}}个注释{% set i=i+1 %}
#### 文本:
{{annotation.annotatedText}}
#### 评论: 
{{annotation.comment}}{% if annotation.imageBaseName %}
![[{{annotation.imageBaseName}}]]{% endif %}
#### zotero位置:
{{pdfZoteroLink|replace("//select/", "//open-pdf/")|replace(")", "")}}?page={{annotation.page}}&annotation={{annotation.id}})
{% endif %}

{% endfor %}

# 导入记录
{% persist "annotations" %}
{% set newAnnotations = annotations | filterby("date", "dateafter", lastImportDate) %}
{% if newAnnotations.length > 0 %}

## Imported: {{importDate | format("YYYY-MM-DD h:mm a")}}

{% for a in newAnnotations %}
> {{a.annotatedText}}
{% endfor %}

{% endif %}
{% endpersist %}
