import './assets/main.css'

import {createApp} from 'vue'
import App from './AppIndexDB.vue'
// import App from './AppLocalStorage.vue'
import router from './router'
// 完整加载
import VueLuckyCanvas from '@lucky-canvas/vue'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import ViewUIPlus from 'view-ui-plus'

const app = createApp(App)
app.use(ViewUIPlus)
app.use(router)
app.use(VueLuckyCanvas)

app.mount('#app')

