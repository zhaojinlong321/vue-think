<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      
        <router-view />

    </transition>
  </section>
</template>
<script>
  

export default {
  name: 'AppMain',
  computed:{
    //key，通过给router-view添加一个动态变化的参数，让Vue认为这个组件每一次都是一个新组件，从而重新刷新。
    key() {
      return this.$route.fullPath
    }
  }
}  
</script>
<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>