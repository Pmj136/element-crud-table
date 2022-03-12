<template>
  <div style="height: 90vh">
    <crud-table @ready="onReady">
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
          <crud-table-btn-add url="http://localhost:7000/add" dialog-title="自定义标题"/>
        </crud-table-action>
      </crud-table-header>
      <crud-table-pagination>
        <crud-table-data url="http://localhost:7000/list" :auto-load="false">
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <crud-table-handler>
            <crud-table-btn-preview/>
            <crud-table-btn-edit url="http://localhost:7000/edit"/>
            <crud-table-btn-del url="http://localhost:7000/del"/>
          </crud-table-handler>
        </crud-table-data>
      </crud-table-pagination>
      <crud-table-dialog :form-props="{rules:{name:[{required:true}]}}">
        <wrap/>
        <el-card>
          <el-form-item prop="aaa11">
            <el-input/>
          </el-form-item>
        </el-card>
      </crud-table-dialog>
    </crud-table>
  </div>
</template>

<script>
import Wrap from "./Wrap";

export default {
  name: "index",
  components: {Wrap},
  setup() {
    return {
      aaaaa: "akfjsfjls",
      onReady(e) {
        e.initData({a: 1}, true)
      }
    }
  }
}
</script>
