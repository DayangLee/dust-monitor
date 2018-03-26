<template>
  <div class="layout-padding list">
    <div class="title">
      <q-icon name="fa-home" size="25px" color="blue" />&nbsp;当前位置:
      <q-btn flat @click="status = 0">设备列表</q-btn>
      <span v-show="status === 1">> <q-btn flat>设备详情</q-btn></span>
    </div>



  </div>
</template>

<script>
export default {
  data: () => ({
    status: 1
  })
};
</script>

<style lang="stylus" scoped>
.title
  margin-bottom 20px
</style>