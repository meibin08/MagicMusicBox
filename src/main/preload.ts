import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
// 在顶部插入一个可以移动的dom
function createHeaderDragBar() {
  const topDiv = document.createElement('div'); // 创建节点
  topDiv.style.position = 'fixed'; // 一直在顶部
  topDiv.style.top = '0';
  topDiv.style.left = '0';
  topDiv.style.height = '50px'; // 顶部20px才可拖动
  topDiv.style.width = '100%'; // 宽度100%
  topDiv.style.zIndex = '9999'; // 悬浮于最外层
  topDiv.style.pointerEvents = 'none'; // 用于点击穿透
  // @ts-ignore
  topDiv.style['-webkit-user-select'] = 'none'; // 禁止选择文字
  // @ts-ignore
  topDiv.style['-webkit-app-region'] = 'drag'; // 拖动
  document.body.appendChild(topDiv); // 添加节点
}

window.addEventListener('DOMContentLoaded', createHeaderDragBar, false);
