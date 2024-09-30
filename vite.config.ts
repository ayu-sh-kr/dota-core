import {defineConfig} from "vite";
import {resolve} from "path";
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'dota-ui',
            formats: ["es"],
            fileName: 'dota-ui'
        },

        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.ts')
            },

            output: {
                dir: 'dist',
                entryFileNames: 'index.js',
                chunkFileNames: '[name]-[hash].js',
                assetFileNames: '[name]-[hash][extname]'
            }
        }
    },
    resolve: {
        alias: {
            '@dota': resolve('./src'),
            '@test': resolve('./test')
        }
    },

    plugins: [dts({insertTypesEntry: true})]
})