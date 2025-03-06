document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("leadForm");

    form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
            event.preventDefault(); // Bloqueia o envio
            event.stopPropagation();
            form.reportValidity(); // Exibe mensagens nativas de erro do navegador
            return;
        }

        form.classList.add("was-validated"); // Para exibir erros corretamente com Bootstrap
    });
});


function validatePhoneNumber() {
    const phoneInput = document.getElementById("phone");
    const countrySelect = document.getElementById("countryCode");
    const phoneError = document.getElementById("phoneError");

    // Obtém o tamanho permitido pelo atributo data-length do <option>
    const selectedOption = countrySelect.options[countrySelect.selectedIndex];
    const phoneLength = parseInt(selectedOption.getAttribute("data-length"));

    // Remove espaços e caracteres não numéricos
    const phoneNumber = phoneInput.value.replace(/\D/g, "");

    if (phoneNumber.length === phoneLength) {
        phoneError.style.display = "none";
        phoneInput.setCustomValidity("");
    } else {
        phoneError.style.display = "block";
        phoneError.textContent = `O número deve ter ${phoneLength} dígitos.`;
        phoneInput.setCustomValidity("Número inválido");
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("leadForm");

    form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.reportValidity();
            return;
        }

        event.preventDefault(); // Evita o envio normal do formulário

        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData
        })
        .then(response => response.json()) // ← Garante que a resposta será convertida para JSON
        .then(data => {
            console.log("Resposta do servidor:", data);

            if (data.status === "success") {
                window.location.href = "sucesso.html"; // Redireciona se for sucesso
            } else {
                alert("Erro ao enviar o formulário. Tente novamente.");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar o formulário:", error);
            alert("Ocorreu um erro ao enviar o formulário. Tente novamente.");
        });
    });
});
