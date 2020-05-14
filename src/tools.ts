import Vue from 'vue'
import { Mixin } from 'vue-mixin-decorator'
import moment from 'moment'

@Mixin
export default class Tools extends Vue {
  dateToString(date: Date): string {
    return moment(date).format('YYYY/MM/DD hh:mm:ss')
  }
}
