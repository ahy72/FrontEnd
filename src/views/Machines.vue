<template>
  <div>
    <main class="container">
      <div v-if="message" class="row">
        <h1 class="col-md-12 text-warning">{{ message }}</h1>
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
              <tr v-for="machine in machines" :key="machine.id">
                <td>{{ machine.name }}</td>
                <td>{{ operationToString(machine.operation) }}</td>
                <td>
                  {{ connectedMachineToString(machine.connectedMachine) }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="clearfix">
            <button
              v-show="!isRefreshing"
              class="btn btn-primary float-sm-left"
              @click="refresh"
            >
              更新
            </button>
            <button
              v-show="isRefreshing"
              class="btn btn-primary float-sm-left"
              disabled
            >
              更新中
            </button>
          </div>
          <p class="text-sm-left">更新時間：{{ dateToString(refreshTime) }}</p>
          <p class="text-sm-left">
            ※更新には数十秒かかります。しばらくお待ちください。
          </p>
        </div>
        <div class="col-md-3"></div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-mixin-decorator'
import { VirtualMachine, OperationStatus } from '../VirtualMachine'
import { virtualMachineModule } from '@/store'
import Tools from '@/tools'

@Component
export default class Machiens extends Mixins<Tools>(Tools) {
  public operationToString(operation: OperationStatus): string {
    return operation == OperationStatus.Work ? '稼働' : '停止'
  }

  public connectedMachineToString(connectedMachine: string): string {
    return !connectedMachine ? '接続なし' : connectedMachine
  }

  public get message(): string {
    return virtualMachineModule.message
  }
  public get machines(): VirtualMachine[] {
    return virtualMachineModule.machines
  }
  public get refreshTime(): Date {
    return virtualMachineModule.refreshTime
  }

  public async created(): Promise<void> {
    await virtualMachineModule.LoadMessage()
    await virtualMachineModule.LoadMachines()
    await virtualMachineModule.LoadRefreshTime()
  }

  public isRefreshing = false

  public async refresh(): Promise<void> {
    this.isRefreshing = true
    await virtualMachineModule
      .Refresh()
      .finally(() => (this.isRefreshing = false))
  }
}
</script>
