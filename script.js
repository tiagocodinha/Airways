// Header scroll effect with throttling
let lastScrollPosition = window.scrollY;
let ticking = false;

window.addEventListener('scroll', () => {
const header = document.querySelector('.header');

if (window.scrollY > 50) {
header.classList.add('scrolled');
} else {
header.classList.remove('scrolled');
}
});


// Animate elements on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.form-container, .video-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

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







document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("leadForm");
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");

    // Configuração do intl-tel-input
    var iti = window.intlTelInput(phoneInput, {
        initialCountry: "pt",
        preferredCountries: ["pt", "br", "es", "fr"],
        separateDialCode: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    // Função para validar e corrigir número de telefone
    function validatePhoneNumber() {
        var fullPhoneNumber = iti.getNumber().trim(); // Obtém número formatado corretamente
        var isValid = iti.isValidNumber();

        if (!isValid || fullPhoneNumber === "" || fullPhoneNumber.includes("undefined")) {
            phoneError.style.display = "block";
            phoneInput.classList.add("is-invalid");
            phoneInput.setCustomValidity("Número inválido");
            return false;
        } else {
            phoneError.style.display = "none";
            phoneInput.classList.remove("is-invalid");
            phoneInput.setCustomValidity("");
            return fullPhoneNumber;
        }
    }

    // Adiciona eventos para validar o telefone em tempo real
    phoneInput.addEventListener("input", validatePhoneNumber);
    phoneInput.addEventListener("blur", validatePhoneNumber);

    // Modifica o número antes do envio e garante um único evento submit
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio automático

        var fullPhoneNumber = validatePhoneNumber(); // Garante validação antes de enviar
        if (!fullPhoneNumber) return; // Se inválido, bloqueia envio

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        phoneInput.value = fullPhoneNumber; // Atualiza input com número formatado corretamente

        console.log("Número enviado:", fullPhoneNumber); // Debug no console

        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta do servidor:", data);
            if (data.status === "success") {
                window.location.href = "sucesso.html";
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
