
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const showStartupError = (label: string, err: unknown) => {
  const root = document.getElementById('root');
  if (!root) return;
  const message = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
  root.innerHTML = `
    <div style="font-family:Arial,sans-serif;padding:24px;line-height:1.4;color:#111">
      <h2 style="margin:0 0 8px 0;">Erro ao carregar o site</h2>
      <p style="margin:0 0 6px 0;"><strong>Origem:</strong> ${label}</p>
      <p style="margin:0 0 12px 0;"><strong>Mensagem:</strong> ${message}</p>
      <p style="margin:0;color:#555">Atualize a página. Se persistir, envie um print desta tela.</p>
    </div>
  `;
};

window.addEventListener('error', (event) => {
  showStartupError('window.error', event.error || event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  showStartupError('unhandledrejection', event.reason);
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (err) {
  showStartupError('bootstrap', err);
}
