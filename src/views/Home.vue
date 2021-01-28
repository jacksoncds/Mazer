<template>
  <div class="home">
    <maze />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import maze from '@/components/maze.vue';

export default defineComponent({
  name: 'Home',
  components: {
    maze,
  },
});
</script>
