<template>
  <div id="app">
    <header class="header">
      <router-link to="/" class="section Carter Capocaccia section-home">
        <p class="title">Carter Capocaccia</p>
      </router-link>
      <router-link to="/about" class="section About section-second">
        <p class="title">About</p>
      </router-link>
      <router-link to="/projects" class="section Projects section-third">
        <p class="title">Projects</p>
      </router-link>
      <router-link to="/connect" class="section Connect section-first">
        <p class="title">Connect</p>
      </router-link>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}

</script>

<style lang="scss" scoped>
  @import 'scss/modules/_utility.scss';
  @import 'scss/modules/_header.scss';

</style>
