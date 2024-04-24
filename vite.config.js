import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    // 定义开发服务器配置
    server: {
        // 指定开发服务器监听的主机，默认为 'localhost'
        host: '0.0.0.0',
        // 指定开发服务器监听的端口，默认为 3000
        port: 3000,
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
