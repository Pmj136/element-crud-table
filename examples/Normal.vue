<template>
   <div>
      <el-dialog v-model="visible">
         <el-form :model="form">
            <el-form-item prop="time" required :rules="{required:true}">
               <el-time-picker
                  v-model="form.time"
                  arrow-control
                  placeholder="Arbitrary time"
               />
            </el-form-item>
         </el-form>
      </el-dialog>
      <el-button @click="visible=true">open</el-button>
   </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({});

const visible = ref(false);
</script>
