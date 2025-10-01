import DataroomElement from 'dataroom-js';

class OpenZineDialog extends DataroomElement {
  async initialize() {
    this.#openDialog();
  }

  #openDialog() {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
      <form method="dialog">
        <h2>Open an existing zine</h2>
        <p>Select a file to open.</p>
        <input id="zine-file" type="file" accept=".json,.txt,.md,.zine" />
        <menu>
          <button value="cancel">Cancel</button>
          <button id="open-btn" value="default">Open</button>
        </menu>
      </form>
    `;

    const onClose = () => {
      dialog.removeEventListener('close', onClose);
      dialog.remove();
      this.remove();
    };

    dialog.addEventListener('close', onClose);

    dialog.querySelector('#open-btn')?.addEventListener('click', (e) => {
      const fileInput = dialog.querySelector('#zine-file');
      const file = fileInput?.files?.[0];
      if (!file) {
        e.preventDefault();
        return;
      }

      // Minimal example: mark URL so the app knows there's now an active zine
      const router = document.querySelector('router-component');
      try {
        router?.setURLValues?.({ zine: file.name });
      } catch {}
    });

    document.body.appendChild(dialog);
    try {
      dialog.showModal();
    } catch {
      dialog.setAttribute('open', '');
    }
  }
}

customElements.define('open-zine-dialog', OpenZineDialog);
