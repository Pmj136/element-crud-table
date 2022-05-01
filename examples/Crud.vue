<template>
   <div style="height: 90vh">
      <crud-table ref="tableRef">
         <crud-table-header ref="table" inline>
            <crud-table-search>
               <el-form-item prop="name">
                  <el-input placeholder="姓名" />
               </el-form-item>
               <el-form-item prop="age">
                  <el-input placeholder="年龄" />
               </el-form-item>
               <el-form-item prop="address">
                  <el-input placeholder="地址" />
               </el-form-item>
            </crud-table-search>
            <crud-table-action>
               <crud-table-btn-add url="http://localhost:7000/add" />
               <el-button type="primary" @click="refreshData">刷新</el-button>
            </crud-table-action>
         </crud-table-header>
         <crud-table-pagination>
            <crud-table-data url="http://localhost:7000/list">
               <el-table-column prop="id" label="id"></el-table-column>
               <el-table-column prop="name" label="姓名"></el-table-column>
               <crud-table-handler>
                  <crud-table-btn-preview />
                  <crud-table-btn-edit url="http://localhost:7000/edit" />
                  <crud-table-btn-del url="http://localhost:7000/del" />
               </crud-table-handler>
            </crud-table-data>
         </crud-table-pagination>
         <crud-table-dialog debug>
            <el-form-item prop="name" label="姓名" required :rules="{required:true}">
               <el-input />
            </el-form-item>
            <el-form-item prop="age" label="年龄" required :rules="{required:true}">
               <el-time-picker
                  arrow-control
                  placeholder="Arbitrary time"
               />
            </el-form-item>
         </crud-table-dialog>
      </crud-table>
   </div>
</template>

<script>
import Wrap from './Wrap';
import { onMounted, ref } from 'vue';

export default {
   name: 'Crud',
   components: {Wrap},
   setup() {
      const tableRef = ref();
      return {
         tableRef,
         refreshData() {
            tableRef.value.resetData();
         }
      };
   }
};
</script>
