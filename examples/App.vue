<template>
   <Crud />
<!--      <Normal />-->
</template>

<script>
import Normal from './Normal.vue';
import Crud from './Crud.vue';

export default {
   name: 'index',
   components: {Normal, Crud}
};
</script>
