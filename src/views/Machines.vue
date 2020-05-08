<template>
  <div>
    <main class="container">
      <div v-if="message" class="row">
        <h1 class="col-md-12 text-warning">{{message}}</h1>
      </div>
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <table class="table container">
            <thead>
              <tr>
                <th>マシン名</th>
                <th>状態</th>
                <th>接続</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(machine, index) in machines" :key="index">
                <td>{{machine.name}}</td>
                <td>{{operationToString(machine.operation)}}</td>
                <td>{{connectedMachineToString(machine.connectedMachine)}}</td>
              </tr>
            </tbody>
          </table>
          <div class="clearfix">
            <button v-show="!isRefreshing" @click="refresh" class="btn btn-primary float-sm-left">更新</button>
            <button v-show="isRefreshing" class="btn btn-primary float-sm-left" disabled>更新中</button>
          </div>
          <p class="text-sm-left">更新時間：{{dateToString(refreshTime)}}</p>
          <p class="text-sm-left">※更新には数十秒かかります。しばらくお待ちください。</p>
        </div>
        <div class="col-md-3"></div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from 'vue-property-decorator';
  import {
    VirtualMachine,
    OperationStatus
  } from '../VirtualMachine';

  import axios from 'axios';
  import moment from 'moment';

  @Component
  export default class Machiens extends Vue {
    public dateToString(date: Date): string {
      return moment(date).format('YYYY/MM/DD hh:mm:ss');
    }

    public operationToString(operation: OperationStatus): string {
      return (operation == OperationStatus.Work) ? '稼働' : '停止';
    }

    public connectedMachineToString(connectedMachine: string): string {
      return (!connectedMachine) ? '接続なし' : connectedMachine;
    }

    public message = '';
    public machines: VirtualMachine[] = [];

    public async created() {
      try {
        const msg = await axios.get < string > ('Message');
        this.message = msg.data;
      } catch (error) {
        console.log(error);
      }

      try {
        const msg = await axios.get < VirtualMachine[] > ('');
        this.machines = msg.data;
      } catch (error) {
        console.log(error);
      }

      await this.updateRefreshTime();
    }

    public isRefreshing = false;

    public async refresh() {
      this.isRefreshing = true;

      try {
        const msg = await axios.post < VirtualMachine[] > ('Refresh');
        this.machines = msg.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isRefreshing = false;
      }
    }

    public refreshTime: Date = new Date(0);

    private async updateRefreshTime() {
      try {
        const msg = await axios.get < Date > ('RefreshTime');
        this.refreshTime = msg.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>