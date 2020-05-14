<template>
  <div>
    <label for="message">メッセージ</label>
    <textarea
      id="message"
      v-model.lazy.trim="message"
      cols="30"
      rows="3"
    ></textarea>
    <button class="btn btn-secondary" @click="addDate">日付を追加</button>
    <button
      v-show="!isUpdating"
      class="btn btn-primary"
      :disabled="isDeleting"
      @click="updateMessage"
    >
      更新
    </button>
    <button v-show="isUpdating" class="btn btn-primary" disabled>更新中</button>
    <button
      v-show="!isDeleting"
      class="btn btn-primary"
      :disabled="isUpdating"
      @click="deleteMessage"
    >
      削除
    </button>
    <button v-show="isDeleting" class="btn btn-primary" disabled>削除中</button>
  </div>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-mixin-decorator'
import { virtualMachineModule } from '@/store'
import Tools from '@/tools'

@Component
export default class Message extends Mixins<Tools>(Tools) {
  public message = ''

  public async created(): Promise<void> {
    await virtualMachineModule
      .LoadMessage()
      .then(() => (this.message = virtualMachineModule.message))
  }

  public addDate(): void {
    this.message = `${this.dateToString(new Date())} ${this.message}`
  }

  public isUpdating = false

  public async updateMessage(): Promise<void> {
    this.isUpdating = true

    await virtualMachineModule
      .PostMessage(this.message)
      .then(() => (this.message = virtualMachineModule.message))
      .finally(() => (this.isUpdating = false))
  }

  public isDeleting = false

  public async deleteMessage(): Promise<void> {
    this.isDeleting = true

    await virtualMachineModule
      .DeleteMessage()
      .then(() => (this.message = ''))
      .finally(() => (this.isDeleting = false))
  }
}
</script>
