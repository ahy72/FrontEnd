<template>
  <div class="home">
    <Machiens />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Machiens from '@/components/Machiens.vue'

  export default {
    name: 'Home',
    components: {
      Machiens
    }
  }
</script>