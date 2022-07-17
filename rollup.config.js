import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import { version } from './package.json';

const globals = {
    'v8n': 'v8n',
    'underscore': '_',
};

const now = new Date();
const year = now.getFullYear();

const banner = `/**
* @license
* v8n
* ----------------------------------
* v${version}
*
* Distributed under MIT license
*
*/\n\n`;

const footer = '';

export default [
    {
        input: 'src/v8n.js',
        external: ['v8n', 'underscore'],
        output: [
            {
                file: 'lib/v8n.js',
                format: 'umd',
                name: 'v8nx',
                exports: 'named',
                sourcemap: true,
                globals,
                banner,
                footer
            },
            {
                file: 'lib/v8n.esm.js',
                format: 'es'
            }
        ],
        plugins: [
            eslint({ exclude: ['package.json'] }),
            json(),
            babel()
        ]
    },
    {
        input: 'src/v8n.js',
        external: ['v8n', 'underscore'],
        output: [
            {
                file: 'lib/v8n.min.js',
                format: 'umd',
                name: 'v8nx',
                exports: 'named',
                sourcemap: true,
                globals,
                banner,
                footer
            }
        ],
        plugins: [
            json(),
            babel(),
            terser({ output: { comments: /@license/ } })
        ]
    }
]