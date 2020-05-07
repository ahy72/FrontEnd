<template>
  <div>
    <main class="container">
      <div class="row">
        <div class="col-lg-3"></div>
        <div class="col-lg-6">
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
          <button @click="refresh" class="btn btn-primary float-lg-left" :disabled="!isButtonEnabled">更新</button>
          <p></p>
          <p class="text-lg-left">更新時間：{{dateToString(refreshTime)}}</p>
          <p class="text-lg-left">※更新には数十秒かかります。そのまましばらくお待ちください。</p>
        </div>
        <div class="col-lg-3"></div>
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

    public machines: VirtualMachine[] = [];

    public async created() {
      const msg = await axios.get < VirtualMachine[] > ('').then(
        (res) => res.data
      ).catch((error) => {
        console.log(error);
      });

      if (msg != null) {
        this.machines = msg;
      }

      await this.updateRefreshTime();
    }

    public isButtonEnabled = true;

    public async refresh() {
      this.isButtonEnabled = false;
      try {
        const msg = await axios.post < VirtualMachine[] > ('Refresh').then(
          (res) => res.data
        ).catch((error) => {
          console.log(error);
        });

        if (msg != null) {
          this.machines = msg;
        }

        await this.updateRefreshTime();

      } finally {
        this.isButtonEnabled = true;
      }
    }

    public refreshTime: Date = new Date(0);

    private async updateRefreshTime() {
      const msg = await axios.get < Date > ('RefreshTime').then(
        (res) => res.data
      ).catch((error) => {
        console.log(error);
      });

      if (msg != null) {
        this.refreshTime = msg;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>