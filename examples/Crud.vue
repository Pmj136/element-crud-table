<template>
   <div style="height: 90vh">
      <crud-table @ready="onReady">
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
               <template #default="{searchParams}">
                  <crud-table-btn-add url="http://localhost:7000/add" />
                  <el-button @click="testSlots(searchParams)">按钮</el-button>
               </template>
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
         <crud-table-dialog debug :default-fields="{name:'xxx'}" @opened="ooo" @confirm="ccc">
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
      const table = ref();
      onMounted(() => {
         console.log(table);
      });
      return {
         table,
         aaaaa: 'akfjsfjls',
         onReady(e) {
            // console.log(e)
         },
         ooo(t, d) {
            // console.log(d);
         },
         ccc(t, res) {
            // console.log(res);
         },
         testSlots(a) {
            console.log(a);
         }
      };
   }
};
</script>
