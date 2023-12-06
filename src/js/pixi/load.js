import polyfillPixi from '../../vendor/polyfill-pixi.js';
import loadScript from '../loadScript.js';
import storage from '../storage.js';
import App from './App.js';

export default function loadPixi(stats, gui) {
	let resolvePromise;

	const versions = [
		"v3.0.11",
		"v4.0.3", "v4.1.1", "v4.2.3", "v4.3.5", "v4.4.4", "v4.5.6", "v4.6.2", "v4.7.3", "v4.8.9",
		"v5.0.4", "v5.1.5", "v5.2.4", "v5.3.11",
		"v6.0.4", "v6.1.3", "v6.2.1"
	].reverse();

	const guiData = {
		version: versions.includes(storage.get('version')) ? storage.get('version') : 'v6.2.1'
	};

	storage.set('version', guiData.version);

	const guiController = gui.add(guiData, 'version', versions)
	guiController.onChange((version) => {
		storage.set('version', version);

		window.location.href = storage.url().href;
	});

	const libUrl = `https://pixijs.download/${guiData.version}/pixi.min.js`;

	console.log({libUrl})

	loadScript(libUrl)
		.catch(() => {
			console.log(`Could not load Pixi\n[${guiData.version}] from [${libUrl}]\nMay not be a valid version`);
		})
		.then(() => {
			if (window.PIXI) {
				polyfillPixi();

				new App(resolvePromise, stats);
			}
		});

	return new Promise((resolve) => {
		resolvePromise = resolve;
	});
}
