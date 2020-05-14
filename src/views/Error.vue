<template>
  <div>
    <h3 class="text-danger">エラー</h3>
    <h4 id="error-details">
      {{ displayString }}
    </h4>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Error extends Vue {
  @Prop({ default: '' })
  details!: string

  get displayString(): string {
    return this.$route?.params?.details ?? this.details ?? ''
  }
}
</script>

<style scoped>
#error-details {
  white-space: pre-wrap;
}
</style>
