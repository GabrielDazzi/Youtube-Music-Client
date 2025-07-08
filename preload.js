const { contextBridge, ipcRenderer } = require("electron");

const clickElement = (selector) => {
  try {
    const element = document.querySelector(selector);
    if (element) {
      element.click();
    } else {
      console.warn(`[Preload] Elemento não encontrado: ${selector}`);
    }
  } catch (error) {
    console.error(`[Preload] Erro ao clicar no elemento ${selector}:`, error);
  }
};
ipcRenderer.on("media-control", (event, action) => {
  console.log(`[Preload] Ação de mídia recebida: ${action}`);

  const selectors = {
    "play-pause": "#play-pause-button",
    "next": ".next-button",
    "previous": ".previous-button",
  };

  const selector = selectors[action];
  if (selector) {
    clickElement(selector);
  }
});

window.addEventListener("load", () => {
  console.log("[Preload] Página carregada.");
});