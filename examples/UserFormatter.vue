<template>
  <div style="height: 97vh">
    <crud-table>
      <crud-table-pagination>
        <crud-table-data url="http://localhost:5000/list">
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <crud-table-handler>
            <crud-table-btn-edit url="http://localhost:5000/edit"/>
          </crud-table-handler>
        </crud-table-data>
      </crud-table-pagination>
      <crud-table-dialog>
        <div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="姓名" prop="name">
                <el-input placeholder="姓名"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年龄" prop="age">
                <el-input placeholder="年龄"/>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </crud-table-dialog>
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
