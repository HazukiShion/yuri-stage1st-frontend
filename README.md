# yuri-stage1st-frontend

**项目名称：** 百合作品数据库前端 (yuri-stage1st-frontend)

**文档版本：** 0.1

**最后更新：** 2025年6月16日

---

## 1. 项目愿景与目标 (Project Vision & Goals)

* **核心愿景：** 创建一个专注、全面、信息准确的百合作品线上数据库。
* **目标用户：** 所有对百合文化感兴趣的爱好者、研究者。
* **核心价值：** 提供一个无社交干扰的、纯粹的作品信息查询与发现平台。

---

## 2. 核心功能范围 (Core Feature Scope)

**初期阶段 (v1.0) 包含的功能：**
* [✓] 作品信息展示（涵盖动画、漫画、游戏、小说、影视剧等）。
* [✓] 首页：展示核心内容入口及推荐。
* [✓] 作品列表页：提供多维度筛选与排序功能。
* [✓] 作品详情页：全面展示单部作品的详细资料。

**初期阶段 (v1.0) 明确排除的功能：**
* [✗] 用户账户系统（注册、登录）。
* [✗] 用户社交功能（评分、评论、论坛、收藏）。
* [✗] 前端在线编辑/提交作品信息的功能。

---

## 3. 核心数据结构 (Core Data Schema)

本数据库的核心数据模式由“作品(Work)”、“角色(Character)”和“角色关系(Relationship)”三个核心实体构成。它们相互关联，共同组成了整个数据库的基石。

### 3.1 作品 (Work)
*描述作品本身信息的实体。*
```json
{
  "id": "Number",
  "title": {
    "primary": "String",
    "chinese": "String",
    "aliases": ["String"]
  },
  "images": {
    "poster": "String",
    "banner": "String",
    "logo": "String"
  },
  "type": {
    "main": "String",
    "sub": "String"
  },
  "status": "String",
  "period": {
    "start": "String",
    "end": "String"
  },
  "synopsis": "String",
  "counts": {
    "episodes": "Number",
    "volumes": "Number",
    "chapters": "Number"
  },
  "tags": ["String"],
  "staff": [
    {
      "role": "String",
      "name": "String"
    }
  ],
  "characters": [
    {
      "characterId": "Number",
      "name": "String",
      "role_in_work": "String"
    }
  ],
  "relations": [
    {
      "relationType": "String",
      "workId": "Number"
    }
  ],
  "yuri_details": {
    "level": "String",
    "concentration": "Number"
  },
  "links": {
    "official_site": "String",
    "aniList": "String",
    "bangumi": "String"
  }
}
```

### 3.2 角色 (Character)
*描述角色自身信息的独立实体。*
```json
{
  "id": "Number",
  "name": {
    "primary": "String",
    "chinese": "String",
    "aliases": ["String"]
  },
  "image": "String",
  "description": "String",
  "attributes": {
    "birthday": "String",
    "height": "String"
  },
  "staff": [
    {
      "role": "String",
      "name": "String"
    }
  ]
}
```

### 3.3 角色关系 (Relationship)
*描述两个角色之间关系信息的连接实体。*
```json
{
  "id": "Number",
  "source_character_id": "Number",
  "target_character_id": "Number",
  "relation_type": "String",
  "context": "String"
}
```

---

## 4. 页面规划与流程 (Page Plan & Flow)

**所有页面有统一的顶部导航栏和页脚内容。**

### 4.1 作品详情页 (Detail Page)
* **目的:** 全面、清晰地展示单一作品的所有详细信息、关联内容和核心百合要素，作为网站信息价值的核心载体。
* **布局与关键元素:**
  * **一、页面顶部核心区:**
    * **左侧:** 作品海报图 (`images.poster`)。
    * **右侧:** 作品标题、**两个独立的“百合核心徽章” (百合等级和百合浓度百分比)**、作品简介。
  * **二、页面主体双栏布局 (左窄右宽):**
    * **左侧窄栏 (作品详细资料):** 展示作品类型、发行状况、周期、集数、制作人员、标签、外部链接等静态信息。
    * **右侧宽栏 (关联探索区):** 优先展示角色列表、角色关系、关联作品等动态探索信息。角色可点击跳转至角色详情页。

### 4.2 作品列表页 (List Page)
* **目的:** 提供强大而直观的筛选、排序和搜索功能，帮助用户精准地找到目标作品。
* **布局与关键元素:**
  * **筛选/排序栏 (侧边栏或顶部栏):** 提供按类型、状态、百合等级、标签的筛选，以及按日期、标题的排序功能。
  * **结果展示区:**
    * 提供“网格视图”（突出海报）和“列表视图”（突出文字信息）的切换功能。
    * 包含清晰的分页导航。

### 4.3 首页 (Home Page)
* **目的:** 作为网站的欢迎门户，展示核心内容，并为用户提供清晰的导航入口。
* **布局与关键元素:**
  * 采用模块化布局。
  * **顶部英雄区:** 醒目的全局搜索框。
  * **按类型浏览:** 提供【动画】、【漫画】等大分类入口。
  * **近期收录:** 横向滚动展示最新入库的作品。
  * **编辑推荐:** 横向滚动展示管理员推荐的精选作品。

---

## 5. 技术栈选型 (Technology Stack)

* **前端框架:** Vue 3
* **构建工具:** Vite
* **编程语言:** TypeScript
* **UI 组件库:** Vuetify
* **状态管理:** Pinia
  * *决策理由：用于管理跨页面的状态（如筛选条件），并为未来扩展（如用户状态）提供架构基础。*
* **模拟数据方案:** Vite Proxy + 本地 JSON 文件。
  * *决策理由：实现前后端分离开发，方便未来无缝对接到真实API。*

---

## 6. 开发路线图 (Development Roadmap)

* **里程碑 M1:【核心展示】作品详情页的静态实现**
  * **目标:** 在不考虑交互（如筛选、跳转）的情况下，优先将网站的核心——作品详情页——开发出来。
  * **任务列表:**
    1.  初始化 `Vue + Vite + TS + Vuetify + Pinia` 的项目环境。
    2.  根据 `3. 核心数据结构`，手动创建1-2个作品、3-4个角色的模拟 `JSON` 文件。
    3.  创建作品详情页的Vue组件。
    4.  实现 `4.1` 中规划的布局和样式。
    5.  从 `JSON` 文件中读取数据，并将其正确地展示在页面上。
    6.  **重点:** 实现独特的“百合徽章”视觉效果。

---

## 7. 问题与决策记录 (Q&A and Decision Log)

* **Q1 (2025-06-16):** 项目初期是否需要 Pinia?
  * **A1:** 是。为了处理筛选条件等跨页面状态，并为未来扩展做准备。
* **Q2 (2025-06-16):** 如何处理角色间的复杂关系及 `main_couple` 等主观性强的字段？
  * **A2:** 决策采纳“数据独立与关联”原则，将角色关系独立管理，并精简了 `yuri_details` 字段，以保证数据的严谨性和客观性。
* **Q3 (2025-06-16):** 核心数据结构是否应该包含角色和关系？
  * **A3:** 是。核心数据结构已补充“角色(Character)”和“角色关系(Relationship)”的结构定义，使数据蓝图完整。

