import DataroomElement from 'dataroom-js';

class CreateZineDialog extends DataroomElement {
  async initialize() {
    this.#openDialog();
  }

  #openDialog() {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
      <form method="dialog">
        <h2>Create a new zine</h2>
        <label>
          Name
          <input name="zineName" type="text" required />
        </label>
        <menu>
          <button value="cancel">Cancel</button>
          <button id="create-btn" value="default">Create</button>
        </menu>
      </form>
    `;

    const onClose = () => {
      dialog.removeEventListener('close', onClose);
      dialog.remove();
      // Remove the component wrapper too once dialog is closed
      this.remove();
    };

    dialog.addEventListener('close', onClose);

    // Handle Create action
    dialog.querySelector('#create-btn')?.addEventListener('click', (e) => {
      const form = dialog.querySelector('form');
      const data = new FormData(form);
      const name = (data.get('zineName') || '').toString().trim();
      if (!name) {
        e.preventDefault();
        return;
      }
      const router = document.querySelector('router-component');
      try {
        router?.setURLValues?.({ zine: name });
      } catch {}
    });

    document.body.appendChild(dialog);
    try {
      dialog.showModal();
    } catch {
      // Fallback if showModal throws (e.g., already open): ensure visible
      dialog.setAttribute('open', '');
    }
  }
}

customElements.define('create-zine-dialog', CreateZineDialog);
