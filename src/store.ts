/* eslint-disable @typescript-eslint/interface-name-prefix */
import Vue from 'vue'
import Vuex from 'vuex'
import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module,
} from 'vuex-module-decorators'

Vue.use(Vuex)

import axios from 'axios'
declare const VUE_APP_API_ENDPOINT: string // declare しないと認識しない https://github.com/TypeStrong/ts-loader/issues/37
axios.defaults.baseURL = VUE_APP_API_ENDPOINT

import type { VirtualMachine } from '@/VirtualMachine'

// 参考 https://qiita.com/tsrnk/items/fd95c3d8013d0795a260

export interface IVirtualMachineModule {
  message: string
  machines: VirtualMachine[]
  refreshTime: Date
}
export interface IRootState {
  VirtualMachineModule: IVirtualMachineModule
}
const store = new Vuex.Store<IRootState>({})

@Module({ dynamic: true, store, name: 'counter', namespaced: true })
class VirtualMachineModule extends VuexModule implements IVirtualMachineModule {
  public message = ''
  @Mutation
  private SetMessage(value: string): void {
    this.message = value
  }
  @Action({})
  public async LoadMessage(): Promise<void> {
    const msg = await axios.get<string>('Message')
    this.SetMessage(msg.data)
  }
  @Action({})
  public async PostMessage(value: string): Promise<void> {
    const msg = await axios.post<string>('Message', JSON.stringify(value), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    this.SetMessage(msg.data)
  }
  @Action({})
  public async DeleteMessage(): Promise<void> {
    const msg = await axios.delete<string>('Message')
    if (msg) {
      this.SetMessage('msg.data')
    }
  }

  public machines: VirtualMachine[] = []
  @Mutation
  private SetMachines(value: VirtualMachine[]): void {
    this.machines = value
  }
  @Action({})
  public async LoadMachines(): Promise<void> {
    const msg = await axios.get<VirtualMachine[]>('')
    this.SetMachines(msg.data)
  }

  public refreshTime: Date = new Date(0)
  @Mutation
  private SetRefreshTime(value: Date): void {
    this.refreshTime = value
  }
  @Action({})
  public async LoadRefreshTime(): Promise<void> {
    const msg = await axios.get<Date>('RefreshTime')
    this.SetRefreshTime(msg.data)
  }

  @Action({})
  public async Refresh(): Promise<void> {
    const msg = await axios.post<VirtualMachine[]>('Refresh')
    this.SetMachines(msg.data)

    if (msg) {
      await this.LoadRefreshTime()
    }
  }
}

export const virtualMachineModule = getModule(VirtualMachineModule)
