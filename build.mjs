import * as esbuild from 'esbuild';
import process from 'node:process';

const baseConfig = {
	entryPoints: ['src/index.ts'],
	bundle: true,
	logLevel: 'info'
};

const esmConfig = {
	...baseConfig,
	format: 'esm'
};

let ctxEsm = await esbuild.context({
	...esmConfig,
	outfile: 'build/mp4-muxer.bundle.js'
});
let ctxEsmMinified = await esbuild.context({
	...esmConfig,
	outfile: 'build/mp4-muxer.bundle.min.js',
	minify: true
});

if (process.argv[2] === '--watch') {
	await Promise.all([
		ctxEsm.watch(),
		ctxEsmMinified.watch(),
	]);
} else {
	ctxEsm.rebuild();
	ctxEsmMinified.rebuild();
        
        console.log("Built");
	await Promise.all([
		ctxEsm.dispose(),
		ctxEsmMinified.dispose()
	]);
}
