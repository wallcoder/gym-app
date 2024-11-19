import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(new URL('.', import.meta.url).pathname, 'frontend/src'), // Path to the src folder
            '@root': path.resolve(new URL('.', import.meta.url).pathname), // Path to the root directory
        },
    },
});
