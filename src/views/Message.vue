<template>
  <div>
    <label for="message">メッセージ</label>
    <textarea id="message" cols="30" rows="3" v-model.lazy.trim="message"></textarea>
    <button @click="addDate" class="btn btn-secondary">日付を追加</button>
    <button v-show="!isUpdating" @click="updateMessage" class="btn btn-primary" :disabled="isDeleting">更新</button>
    <button v-show="isUpdating" class="btn btn-primary" disabled>更新中</button>
    <button v-show="!isDeleting" @click="deleteMessage" class="btn btn-primary" :disabled="isUpdating">削除</button>
    <button v-show="isDeleting" class="btn btn-primary" disabled>削除中</button>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from 'vue-property-decorator';

  import axios from 'axios';
  import moment from 'moment';

  @Component
  export default class Message extends Vue {

    public message = '';

    public async created() {
      try {
        const msg = await axios.get < string > ('Message');
        this.message = msg.data;
      } catch (error) {
        console.log(error);
      }
    }

    public addDate() {
      this.message = `${this.dateToString(new Date())} ${this.message}`;
    }

    public dateToString(date: Date): string {
      return moment(date).format('YYYY/MM/DD hh:mm:ss');
    }

    public isUpdating = false;

    public async updateMessage() {
      this.isUpdating = true;

      try {
        const msg = await axios.post < string > ('Message', JSON.stringify(this.message), {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        this.message = msg.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isUpdating = false;
      }
    }

    public isDeleting = false;

    public async deleteMessage() {
      this.isDeleting = true;

      try {
        await axios.delete < string > ('Message');
        this.message = '';
      } catch (error) {
        console.log(error);
      } finally {
        this.isDeleting = false;
      }
    }
  }
</script>