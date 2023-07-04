import './style.css';
import { WebContainer } from '@webcontainer/api';
import { files } from './files';
import { writableStream } from './stream';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const terminal = new Terminal({
  convertEol: true,
});

/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance;

window.addEventListener('load', async () => {
  // textareaEl.value = files['index.js'].file.contents;
  textareaEl.addEventListener('input', (e) => {
    writeIndexJS(e.currentTarget.value);
  });

  // Call only once
  webcontainerInstance = await WebContainer.boot();
  await webcontainerInstance.mount(files);

  const exitCode = await installDependencies();
  if (exitCode !== 0) {
    throw new Error('Installation failed');
  }

  startDevServer();
});

async function installDependencies() {
  // Install dependencies
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);
  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      terminal.write(data);
    }
  }));

  // Wait for install command to exit
  return installProcess.exit;
}

async function startDevServer() {
  // Run `npm run start` to start the Express app
  const process = await webcontainerInstance.spawn('npm', ['run', 'dev']);

  process.output.pipeTo(new WritableStream({
    write(data) {
      terminal.write(data);
    }
  }));

  // Wait for `server-ready` event
  webcontainerInstance.on('server-ready', (port, url) => {
    iframeEl.src = url;
  });
}

/**
 * @param {string} content
 */

async function writeIndexJS(content) {
  await webcontainerInstance.fs.writeFile('/index.js', content);
}

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="editor">
      <textarea>I am a textarea</textarea>
    </div>
    <div class="preview">
      <iframe src="loading.html"></iframe>
    </div>
  </div>
  <div class="terminal"></div>
`;

const terminalEl = document.querySelector('.terminal');

/** @type {HTMLIFrameElement | null} */
const iframeEl = document.querySelector('iframe');

/** @type {HTMLTextAreaElement | null} */
const textareaEl = document.querySelector('textarea');

terminal.open(terminalEl);
