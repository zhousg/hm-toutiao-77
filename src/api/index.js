// 配置一个axios  导出一个配置好的axios
import axios from 'axios'
import store from '@/store'

// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.headers = {
  Authorization: `Bearer ${store.getUser().token}`
}

// 进行导出
export default axios
