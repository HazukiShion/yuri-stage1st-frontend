# yuri-stage1st-frontend

**项目名称：** 百合作品数据库前端 (yuri-stage1st-frontend)

**文档版本：** 0.1

**最后更新：** 2025年6月18日

**前端平台版本：** v0.1.0

---

## 1. 项目愿景与目标

* **核心愿景：** 创建一个专注、全面、信息准确的百合作品线上数据库。
* **目标用户：** 所有对百合文化感兴趣的爱好者、研究者。
* **核心价值：** 提供一个无社交干扰的、纯粹的作品信息查询与发现平台。

---

## 2. 核心功能范围

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

## 3. 核心数据结构

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

## 4. 页面规划

> （仅描述当前前端平台版本所对应的情况）

### 4.1 页面通用项

* **所有页面有统一的顶部导航栏（Navbar）和页脚（Footer）内容。**

### 4.2 首页 (Home Page)

* **目的:** 提供一个简单的网站主页。
* **布局与关键元素:** 无具体要求。

### 4.3 作品列表页 (List Page)

* **目的:** 提供一个简单展示网站所管理的全部作品列表。
* **布局与关键元素:** 无具体要求。

### 4.4 作品详情页 (Detail Page)

* **目的:** 全面、清晰地展示单一作品的所有详细信息、关联内容和核心百合要素，作为网站信息价值的核心载体。
* **布局与关键元素:**
  * **一、页面顶部核心区:**
    * **左侧:** 作品海报图 (`images.poster`)。
    * **右侧:** 作品标题、**两个独立的“百合核心徽章” (百合等级和百合浓度百分比)**、作品简介。
  * **二、页面主体双栏布局 (左窄右宽):**
    * **左侧窄栏 (作品详细资料):** 展示作品类型、发行状况、周期、集数、制作人员、标签、外部链接等静态信息。
    * **右侧宽栏 (关联探索区):** 优先展示角色列表、角色关系、关联作品等动态探索信息。
* **其他要求：**
  * 采用 “渐进式加载 + 骨架屏” 的方案来处理可能存在等待的那部分内容；
  * 页面能够很好地适应不同大小的页面；
  * 利用“可选链操作符”或其他有效方法来处理页面中的可能导致 `TypeError: Cannot read property` 错误的取值操作；

---

## 5. 技术栈选型

* **前端框架:** Vue 3
* **构建工具:** Vite
* **编程语言:** TypeScript
* **UI 组件库:** Vuetify
* **状态管理:** Pinia
* **模拟数据方案:** Vite Proxy + 模拟数据库表的本地 JSON 文件，注意必须使用 Vite Proxy 来对接 JSON 文件。
    * *决策理由：实现前后端分离开发，方便未来无缝对接到真实API。*

---

## 6. 开发路线图

> 按照版本号进行梳理，从 v0.1.0 开始。

### v0.1.0 项目初始化

* **目标:** 初始化项目，配置开发环境，建立文件及目录结构。
* **任务列表:**
  1. 初始化 `Vue + Vite + TS` 的项目环境；
  2. 根据核心数据结构，构建 10 个作品及其各自对应的人物数据；
  3. 配置网站路由；
  4. 配置 `Vite Proxy`；
  5. 配置 `Vuetify`；
  6. 配置 `Pinia`；
    

---

## 7. 问题与决策记录

