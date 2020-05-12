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
import { Component, Vue } from 'vue-property-decorator'

import axios from 'axios'
import moment from 'moment'

@Component
export default class Message extends Vue {
  public message = ''

  public async created(): Promise<void> {
    try {
      const msg = await axios.get<string>('Message')
      this.message = msg.data
    } catch (error) {
      console.log(error)
    }
  }

  public addDate(): void {
    this.message = `${this.dateToString(new Date())} ${this.message}`
  }

  public dateToString(date: Date): string {
    return moment(date).format('YYYY/MM/DD hh:mm:ss')
  }

  public isUpdating = false

  public async updateMessage(): Promise<void> {
    this.isUpdating = true

    try {
      const msg = await axios.post<string>(
        'Message',
        JSON.stringify(this.message),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      this.message = msg.data
    } catch (error) {
      console.log(error)
    } finally {
      this.isUpdating = false
    }
  }

  public isDeleting = false

  public async deleteMessage(): Promise<void> {
    this.isDeleting = true

    try {
      await axios.delete<string>('Message')
      this.message = ''
    } catch (error) {
      console.log(error)
    } finally {
      this.isDeleting = false
    }
  }
}
</script>
