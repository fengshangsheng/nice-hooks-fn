import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import cleaner from 'rollup-plugin-cleaner';

export default {
  input: './src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    cleaner({
      targets: [
        './dist/'
      ]
    })
  ],
  // 外链 - 指出哪些视为外部模块，不会将外部模块与当前项目一起打包
  external: ['react']
}
