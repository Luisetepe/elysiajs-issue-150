await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist/server',
    minify: true,
    target: 'bun',
    sourcemap: 'none'
})

export {}
