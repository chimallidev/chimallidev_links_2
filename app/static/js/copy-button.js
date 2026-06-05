export function initCopyButtons() {
    const buttons = document.querySelectorAll('[data-id="copy-button"]');

    buttons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            event.preventDefault();

            // Ignorar clics mientras el botón está bloqueado
            if (button.dataset.copyLocked === "true") {
                return;
            }

            const textToCopy = button.dataset.copy;

            if (!textToCopy) {
                return;
            }

            const title = button.querySelector(
                ".chimalli-button__title"
            );

            const description = button.querySelector(
                ".chimalli-button__description"
            );

            const iconUse = button.querySelector(
                ".chimalli-button__icon use"
            );

            const originalTitle = title?.textContent ?? "";
            const originalDescription = description?.textContent ?? "";
            const originalIconHref = iconUse?.getAttribute("href") ?? "";

            try {
                // Bloquear interacción
                button.dataset.copyLocked = "true";
                button.classList.add("chimalli-button--locked");

                await navigator.clipboard.writeText(textToCopy);

                if (title) {
                    title.textContent = "COPIADO";
                }

                if (description) {
                    description.textContent =
                        "El correo esta en tu portapapeles ahora.";
                }

                if (iconUse) {
                    iconUse.setAttribute(
                        "href",
                        "#icon-clipboard-check"
                    );
                }

                setTimeout(() => {
                    if (title) {
                        title.textContent = originalTitle;
                    }

                    if (description) {
                        description.textContent =
                            originalDescription;
                    }

                    if (iconUse) {
                        iconUse.setAttribute(
                            "href",
                            originalIconHref
                        );
                    }

                    // Restaurar interacción
                    delete button.dataset.copyLocked;
                    button.classList.remove(
                        "chimalli-button--locked"
                    );
                }, 1500);

            } catch (error) {
                // Restaurar interacción en caso de error
                delete button.dataset.copyLocked;

                button.classList.remove(
                    "chimalli-button--locked"
                );

                console.error(
                    "Error al copiar al portapapeles:",
                    error
                );
            }
        });
    });
}