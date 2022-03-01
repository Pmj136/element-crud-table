<template>
  <div style="height: 97vh">
    <crud-table>
      <crud-table-header inline>
        <crud-table-search :formatter="searchFormatter">
          <el-form-item prop="name">
            <el-input placeholder="姓名"/>
          </el-form-item>
          <el-form-item prop="age">
            <el-input placeholder="年龄"/>
          </el-form-item>
        </crud-table-search>
      </crud-table-header>
      <crud-table-pagination>
        <crud-table-data url="http://localhost:5000/list">
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
        </crud-table-data>
      </crud-table-pagination>
    </crud-table>
  </div>
</template>

<script>

export default {
  setup() {
    return {
      searchFormatter: {
        age: v => ({age: v + 11111}),
        name: v => ({nameStrLength: v.length})
      },
      //格式器还可以是一个函数
      searchFormatter2(form) {
        const {name} = form
        form.nameLength = name.length
      }
    }
  }
}
</script>
