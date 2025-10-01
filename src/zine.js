import DataroomElement from 'dataroom-js';

class ZineJS extends DataroomElement {
  async initialize(){
    const router = document.querySelector('router-component');
    const values = router?.getURLValues?.() || {};

    if (!values || Object.keys(values).length === 0) {
      this.#showStartDialog();
    }
  }

  #showStartDialog(){
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
      <form method="dialog">
        <h2>Get started</h2>
        <p>Create a new zine or open an existing one.</p>
        <menu>
          <button id="open-existing" value="open">Open</button>
          <button id="create-new" value="create">Create</button>
        </menu>
      </form>
    `;

    const openBtn = dialog.querySelector('#open-existing');
    const createBtn = dialog.querySelector('#create-new');

    const cleanup = () => {
      dialog.removeEventListener('close', cleanup);
      dialog.remove();
    };

    dialog.addEventListener('close', cleanup);

    openBtn?.addEventListener('click', () => {
      // Close the chooser then open the open dialog
      setTimeout(() => {
        const el = document.createElement('open-zine-dialog');
        document.body.appendChild(el);
      }, 0);
    });

    createBtn?.addEventListener('click', () => {
      // Close the chooser then open the create dialog
      setTimeout(() => {
        const el = document.createElement('create-zine-dialog');
        document.body.appendChild(el);
      }, 0);
    });

    document.body.appendChild(dialog);
    try {
      dialog.showModal();
    } catch {
      dialog.setAttribute('open', '');
    }
  }
}

customElements.define('zine-js', ZineJS);
