// rollup.config.js
// import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import {
    terser
} from 'rollup-plugin-terser'
import {
    name,
    version,
    author
} from './package.json'
const pkgName = 'group-bar'
const banner =
    '/*!\n' +
    ` * ${name} v${version}\n` +
    ` * (c) ${new Date().getFullYear()} ${author}\n` +
    ' * Released under the MIT License.\n' +
    ' */'
export default {
    input: 'index.js',
    output: [{
            file: `dist/${pkgName}.umd.js`,
            format: 'umd',
            name: pkgName,
            banner
        }, {
            file: `dist/${pkgName}.cjs.js`,
            format: 'cjs',
            banner
        },
        {
            file: `dist/${pkgName}.esm.js`,
            format: 'es',
            banner
        },
        {
            file: `dist/${pkgName}.amd.js`,
            format: 'amd',
            banner
        },
        {
            file: `dist/${pkgName}.iife.js`,
            format: 'iife',
            banner
        }
    ],
    plugins: [resolve()

    ]
};