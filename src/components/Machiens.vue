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
                <td>{{machine.operation}}</td>
                <td>{{machine.connectedMachine}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-lg-3"></div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Prop,
    Vue
  } from 'vue-property-decorator';
  import {
    VirtualMachine
  } from '../VirtualMachine';

  import axios from 'axios';
  import moment from 'moment';

  @Component
  export default class Machiens extends Vue {

    public machines: VirtualMachine[] = [];

    public toDateString(date: Date): string {
      return moment(date).format("YYYY-MM-DD");
    }

    public async created() {
      const msg = await axios.get < VirtualMachine[] > ('/VirtualMachineStatus').then(
        (res) => res.data
      ).catch((error) => {
        console.log(error);
      });

      if (msg != null) {
        this.machines = msg;
        console.log(this.machines);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>