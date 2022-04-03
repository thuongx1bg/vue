<template>

 <TheHeader/>
 <TheContent/>
 <TheNavbar/>



</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import TheContent from './components/layout/TheContent.vue'
import TheNavbar from './components/layout/TheNavbar.vue'




export default {
  name: 'App',
  components: {
    TheHeader,TheContent,TheNavbar
  }
}
</script>

<style>
@import url(css/main.css);

</style>
