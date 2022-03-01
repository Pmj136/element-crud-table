<template>
 <div style="height: 97vh">
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
       <crud-table-data url="http://localhost:5000/list">
         <el-table-column prop="id" label="id"></el-table-column>
         <el-table-column prop="name" label="姓名"></el-table-column>
         <crud-table-handler>
           <crud-table-btn-preview  echoUrl="http://localhost:5000/echo"/>
           <crud-table-btn-edit url="http://localhost:5000/edit"/>
           <crud-table-btn-del url="http://localhost:5000/del"/>
         </crud-table-handler>
       </crud-table-data>
     </crud-table-pagination>
     <crud-table-dialog :default-fields="{name:1}" :form-props="{rules:{name:[{required:true}]}}">
       <el-form-item label="名称" prop="name">
         <el-input/>
       </el-form-item>
       <el-form-item label="年龄" prop="age">
         <el-input/>
       </el-form-item>
     </crud-table-dialog>
   </crud-table>
 </div>
</template>

<script>

export default {
  setup() {
  }
}
</script>
