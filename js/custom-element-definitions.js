export const defineCustomElements = () => {
  customElements.define(
    "custom-dialog",
    class extends HTMLElement {
      constructor() {
        super();
        const template = document.querySelector("[data-template-dialog]").content;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.cloneNode(true));

        const trigger = shadowRoot.querySelector("button")

        trigger.addEventListener("click", () => {
          const dialog = shadowRoot.querySelector("dialog");

          dialog.showModal();
        })
      }
    },
  );
}