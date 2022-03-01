# element-crud-table

基于 [vue3](https://github.com/vuejs/core) + [element-plus](https://github.com/element-plus/element-plus) 构建的业务表格组件

## 特性介绍

- 零件化，精细化控制，免去难以理解的配置化。内置12个功能组件（零件）！
- 只对 [element-plus](https://element-plus.gitee.io/zh-CN/guide/design.html) 做增强，没有任何侵入代码。
- 仅仅提供几个后端接口，就可以完成增删改查（接口返回需要有一些约定）；加载、分页、搜索、新增、编辑就可以自动完成！
- 支持所有表单元素

## 使用

### 安装与引入

安装

- vue版本必须3.2+
- 安装 [element-plus](https://element-plus.gitee.io/zh-CN/guide/design.html)
- 需安装图标库 [@element-plus/icons-vue](https://element-plus.gitee.io/zh-CN/component/icon.html)

```shell
// pnpm
pnpm add element-crud-table
// yarn
yarn add element-crud-table
```

全部引入

```js
// 引入element-plus
import {createApp} from 'vue'
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

import ElementCrudTable from "element-crud-table";

createApp(App)
    .use(ElementPlus, {locale: zhCn})
    .use(ElementCrudTable)
    .mount('#app')
```

按需引入

```js
// 引入element-plus
import {createApp} from 'vue'
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

import {CrudTable, CrudTableData, CrudTablePagination} from "element-crud-table";

createApp(App)
    .use(ElementPlus, {locale: zhCn})
    .use(CrudTable)
    .use(CrudTableData)
    .use(CrudTablePagination)
    .mount('#app')
```

### 基本使用

#### 1、简单的展示数据（不分页数据）。

- 接口返回数据需如下：

```json
{
  "data": []
}
```

- 页面示例代码

```vue

<template>
  <crud-table>
    <crud-table-data url="http://localhost:5000/list">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
    </crud-table-data>
  </crud-table>
</template>
```

#### 2、添加分页，只需要使用 **crud-table-pagination** 包裹数据组件即可 。

- 此时接口返回的数据必须如下所示：

```json
{
  "data": {
    "records": [],
    "total": 156
  }
}
```

- 页面示例代码

```vue

<template>
  <crud-table>
    <crud-table-pagination>
      <crud-table-data url="http://localhost:5000/list2">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
      </crud-table-data>
    </crud-table-pagination>
  </crud-table>
</template>
```

#### 3、添加头部与搜索栏

- 页面示例代码

```vue

<template>
  <crud-table>
    <crud-table-header inline>
      <crud-table-search>
        <el-form-item prop="name">
          <el-input placeholder="姓名"/>
        </el-form-item>
        <el-form-item prop="age">
          <el-input placeholder="年龄"/>
        </el-form-item>
        <el-form-item prop="address">
          <el-input placeholder="地址"/>
        </el-form-item>
      </crud-table-search>
    </crud-table-header>
    <crud-table-pagination>
      <crud-table-data url="http://localhost:5000/list2">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
      </crud-table-data>
    </crud-table-pagination>
  </crud-table>
</template>
```

#### 4、完整示例：数据操作：新增、预览、编辑与删除

- 代码

```vue

<template>
  <crud-table>
    <crud-table-header inline>
      <crud-table-search>
        <el-form-item prop="name">
          <el-input placeholder="姓名"/>
        </el-form-item>
        <el-form-item prop="age">
          <el-input placeholder="年龄"/>
        </el-form-item>
        <el-form-item prop="address">
          <el-input placeholder="地址"/>
        </el-form-item>
      </crud-table-search>
      <crud-table-action>
        <crud-table-btn-add url="http://localhost:5000/add"/>
      </crud-table-action>
    </crud-table-header>
    <crud-table-pagination>
      <crud-table-data url="http://localhost:5000/list2">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <crud-table-handler>
          <crud-table-btn-preview/>
          <crud-table-btn-edit url="http://localhost:5000/edit"/>
          <crud-table-btn-del url="http://localhost:5000/del"/>
        </crud-table-handler>
      </crud-table-data>
    </crud-table-pagination>
    <crud-table-dialog>
      <el-form-item label="名称" prop="name">
        <el-input/>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input/>
      </el-form-item>
    </crud-table-dialog>
  </crud-table>
</template>
```

## 参考

```text
可以在注册的时候，提供请求自定义请求方法、请求headers，默认组件内部使用 fetch 进行网路请求

//请求时会携带token头
app.use(ElementTablePlus,{headers:{token:'xxxxxx'}})

//你自定义的请求方法
import request from '/path'
app.use(ElementTablePlus,{requestMethod:request,headers:{token:'xxxxxx'}})


//还可以是axios
import axios from 'axios'
app.use(ElementTablePlus,{requestMethod:axios})

//按需引入时
import request from '/path'
import {CrudTable,CrudTableData} from 'element-crud-table'
app.use(CrudTable,{requestMethod:request})
    .use(CrudTableData)
```

### 1、CrudTable 【**required**】

```text
描述：顶层容器
```

| 参数      | 说明                           | 类型    | 默认值  | 
| -------- | ------------------------------| ------ | ------- | 
| gap     | header、data、main 之间的间隙    | number |    0   | 

### 2、CrudTableData 【**required**】

```text
描述：数据引擎容器
内部使用 el-table-column 显示列
```

| 参数      | 说明                           | 类型    | 默认值  | 
| -------- | ------------------------------| ------ | ------- | 
| url   | 数据列表 接口地址      | string | **required** | 

### 3、CrudTablePagination

```text
描述：包裹CrudTableData，提供分页功能
```

| 参数      | 说明                           | 类型    | 默认值  | 
| -------- | ------------------------------| ------ | ------- | 
| pageSize   | 每页数据大小      | number | 15 | 

### 4、CrudTableHeader

```text
描述：头部容器，有头部需求时可以使用
```

| 参数      | 说明                           | 类型    | 默认值  | 
| -------- | ------------------------------| ------ | ------- | 
| inline   | 是否使用 inline-flex 布局      | boolean |   false | 

### 5、CrudTableSearch

```text
描述：搜索表单容器，含有一个默认插槽，用于渲染表单
内部使用 el-form-item 包裹表单元素且要提供prop属性，提供的prop属性就是发送到后端的字段；
表单元素会自动绑定v-model，无需手动绑定
```

| 参数      | 说明                           | 类型    | 默认值  | 
| -------- | ------------------------------| ------ | ------- | 
| defaultFields   | 表单项默认值      | object |  | 
| formatter   | 字段格式器,[使用参考](https://github.com/Pmj136/element-crud-table/blob/main/examples/UserFormatter.vue)     |  function 或 object |  | 

### 6、CrudTableDialog

```text
描述：弹窗表单容器，含有一个默认插槽，用于渲染新增、编辑的表单
内部使用 el-form-item 包裹表单元素且要提供prop属性，提供的prop属性就是发送到后端的字段；
表单元素会自动绑定v-model，无需手动绑定
```

内部使用 el-form-item 包裹表单元素，并且必须提供 prop 属性

| 参数      | 说明                           | 类型    | 默认值  | 
| -------- | ------------------------------| ------ | ------- | 
| defaultFields   | 表单项默认值      | object |  | 
| formProps   | el-form props     |   |  | 
| inFormatter   | 字段格式器，用于弹窗打开前,[使用方式同formatter，参考](https://github.com/Pmj136/element-crud-table/blob/main/examples/UserFormatter.vue)     |  function 或 object |  | 
| outFormatter   | 字段格式器，用于发送表单前,[使用方式同formatter，参考](https://github.com/Pmj136/element-crud-table/blob/main/examples/UserFormatter.vue)     |  function 或 object |  | 
| ...rest   | 支持el-dialog 的其他所有属性     |   |  | 

### 7、CrudTableAction

```text
描述：语义化标签、无特殊功能。头部按钮区：自定义的功能按钮将合理的布局在头部
```

### 8、CrudTableHandler

```text
描述：行操作按钮容器，语义化、实际渲染的是一个 el-table-column
默认插槽可以拿到行数据
```

| 参数      | 说明                           | 类型    | 默认值  | 
| -------- | ------------------------------| ------ | ------- |
| ...rest   | 支持el-table-column 的其他所有属性     |   |  | 

### 9、CrudTableBtnAdd

```text
描述：新增按钮，内部绑定对应的功能
```

| 参数      | 说明                           | 类型    | 默认值  | 
| -------- | ------------------------------| ------ | ------- | 
| text   | 按钮文字      | string | 新增 | 
| url   | 提交新增网络请求的 api 路径     |  string |  **required** | 
| ...rest   | 支持el-button 的其他所有属性     |   |  | 

**_注意协商后端接口_：**

```text
假设 url 为 '/api/user' ,在提交请求时，内部不会做转换，请求方式为 'post'，并携带表单请求体
```

### 10、CrudTableBtnEdit

```text
描述：编辑按钮，内部绑定对应的功能
```

| 参数      | 说明                           | 类型    | 默认值  | 
| -------- | ------------------------------| ------ | ------- | 
| text   | 按钮文字      | string | 编辑 | 
| url   | 提交 编辑 请求的 api 路径     |  string |  **required** | 
| echoUrl   |回显 api路径； 可选，在打开编辑的时候，默认是从表格行中获取数据，若设置了此字段，则从此接口获取数据   |  string |  | 
| ...rest   | 支持el-button 的其他所有属性     |   |  | 

**_注意协商后端接口_：**

```text
假设 url 为 '/api/user' ,在提交请求时，内部会自动转换为 '/api/user/[id]'，请求方式为 'put'，并携带表单请求体
假设 echoUrl 为 '/api/user' ,内部会转换为 '/api/user/[id]'，请求方式为 'get'
```

### 11、CrudTableBtnDel

```text
描述：删除按钮，内部绑定对应的功能
```

| 参数      | 说明                           | 类型    | 默认值  | 
| -------- | ------------------------------| ------ | ------- | 
| text   | 按钮文字      | string | 删除 | 
| url   | 提交 删除 请求的 api 路径     |  string |  **required** | 
| ...rest   | 支持el-button 的其他所有属性     |   |  | 

**_注意协商后端接口_：**

```text
假设 url 为 '/api/user' ,在提交请求时，内部会自动转换为 '/api/user/[id]'，请求方式为 'delete'
```

### 10、CrudTableBtnPreview

```text
描述：预览按钮，显示的表单无法编辑
```

| 参数      | 说明                           | 类型    | 默认值  | 
| -------- | ------------------------------| ------ | ------- | 
| text   | 按钮文字      | string | 查看 |
| echoUrl   |回显 api路径； 可选，在打开预览的时候，默认是从表格行中获取数据，若设置了此字段，则从此接口获取数据   |  string |  | 
| ...rest   | 支持el-button 的其他所有属性     |   |  | 

**_注意协商后端接口_：**

```text
假设 echoUrl 为 '/api/user' ,内部会转换为 '/api/user/[id]'，请求方式为 'get'
