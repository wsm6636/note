---
created: 2024-02-06T22:23
updated: 2024-07-03T10:29
tags:
  - 模板
---

```contributionGraph
title: 日历视图
graphType: calendar
dateRangeValue: 1
dateRangeType: LATEST_YEAR
startOfWeek: "0"
showCellRuleIndicators: true
titleStyle:
  textAlign: left
  fontSize: 15px
  fontWeight: normal
dataSource:
  type: PAGE
  value: ""
  dateField:
    type: PAGE_PROPERTY
    value: updated
fillTheScreen: true
enableMainContainerShadow: false
mainContainerStyle:
  boxShadow: rgba(0, 0, 0, 0.16) 0px 1px 4px
  backgroundColor: "#00000000"
cellStyleRules:
  - id: Lovely_a
    color: "#fedcdc"
    min: 1
    max: 2
    text: ""
  - id: Lovely_b
    color: "#fdb8bf"
    min: 2
    max: 3
  - id: Lovely_c
    color: "#f892a9"
    min: 3
    max: 5
  - id: Lovely_d
    color: "#ec6a97"
    min: 5
    max: 9999
cellStyle:
  minWidth: 12px
  minHeight: 12px
  borderRadius: ""

```


```contributionGraph
title: ""
graphType: month-track
dateRangeValue: 3
dateRangeType: LATEST_MONTH
startOfWeek: "1"
showCellRuleIndicators: true
titleStyle:
  textAlign: left
  fontSize: 16px
  fontWeight: normal
dataSource:
  type: PAGE
  value: ""
  dateField:
    type: FILE_MTIME
  countField:
    type: DEFAULT
    value: tags
fillTheScreen: false
enableMainContainerShadow: false
mainContainerStyle:
  boxShadow: rgba(0, 0, 0, 0.16) 0px 1px 4px
  backgroundColor: "#00000000"
cellStyleRules:
  - id: Lovely_a
    color: "#fedcdc"
    min: 1
    max: 2
  - id: Lovely_b
    color: "#fdb8bf"
    min: 2
    max: 3
  - id: Lovely_c
    color: "#f892a9"
    min: 3
    max: 5
  - id: Lovely_d
    color: "#ec6a97"
    min: 5
    max: 9999
cellStyle:
  minWidth: 15px
  minHeight: 14px
  borderRadius: ""

```


