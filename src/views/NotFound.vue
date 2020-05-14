<template>
  <error :details="details"></error>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Error from '../views/Error.vue'

@Component({
  components: {
    Error,
  },
})
export default class NotFound extends Vue {
  details =
    '404.0 - Not Found\n探しているリソースは削除されたか、名前が変更されたか、または一時的に使用不可能になっています。'
}
</script>
