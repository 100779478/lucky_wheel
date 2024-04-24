import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 完整加载
import VueLuckyCanvas from '@lucky-canvas/vue'
const app = createApp(App)

app.use(router)
app.use(VueLuckyCanvas)

app.mount('#app')

