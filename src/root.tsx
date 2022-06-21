import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Store from './store/index';
import Routes from './router/index';

const RootApp = () => {
  return (
    <Provider store={Store}>
      <MemoryRouter>
        <Routes />
      </MemoryRouter>
    </Provider>
  );
};

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<RootApp />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
