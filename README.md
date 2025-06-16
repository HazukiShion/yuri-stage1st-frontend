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
  "id": Number,
  "title": {
    "primary": String,
    "chinese": String,
    "aliases": [String]
  },
  "images": {
    "poster": String,
    "banner": String,
    "logo": String
  },
  "type": {
    "main": String,
    "sub": String
  },
  "status": String,
  "period": {
    "start": String,
    "end": String
  },
  "synopsis": String,
  "counts": {
    "episodes": Number,
    "volumes": Number,
    "chapters": Number
  },
  "tags": [String],
  "staff": [
    {
      "role": String,
      "name": String
    }
  ],
  "characters": [
    {
      "characterId": Number,
      "name": String,
      "role_in_work": String
    }
  ],
  "relations": [
    {
      "relationType": String,
      "workId": Number
    }
  ],
  "yuri_details": {
    "level": String,
    "concentration": Number
  },
  "links": {
    "official_site": String,
    "aniList": String,
    "bangumi": String
  }
}
```

### 3.2 角色 (Character)
*描述角色自身信息的独立实体。*
```json
{
  "id": Number,
  "name": {
    "primary": String,
    "chinese": String,
    "aliases": [String]
  },
  "image": String,
  "description": String,
  "attributes": {
    "birthday": String,
    "height": String
  },
  "staff": [
    {
      "role": String,
      "name": String
    }
  ]
}
```

### 3.3 角色关系 (Relationship)
*描述两个角色之间关系信息的连接实体。*
```json
{
  "id": Number,
  "source_character_id": Number,
  "target_character_id": Number,
  "relation_type": String,
  "context": String
}
```

---

## 4. 页面规划与流程 (Page Plan & Flow)
*(待填充 - 这是我们下一步的重点)*

---

## 5. 技术栈选型 (Technology Stack)
- 前端框架: Vue 3
- 构建工具: Vite
- 编程语言: TypeScript
- UI 组件库: Vuetify
- 状态管理: Pinia
    - 决策理由：用于管理跨页面的状态（如筛选条件），并为未来扩展（如用户状态）提供架构基础。
- 模拟数据方案: Vite Proxy + 本地 JSON 文件。
    - 决策理由：实现前后端分离开发，方便未来无缝对接到真实API。

---

## 6. 开发路线图 (Development Roadmap)
*(待填充)*

- 里程碑 M1: ...
- 里程碑 M2: ...

