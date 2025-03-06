function updateCountryCode() {
    const select = document.getElementById("countryCode");
    const isMobile = window.innerWidth <= 768;

    for (let option of select.options) {
        let fullText = option.getAttribute("data-fulltext");
        let countryCode = option.value;

        if (!fullText) {
            option.setAttribute("data-fulltext", option.textContent);
        }

        option.textContent = isMobile ? countryCode : option.getAttribute("data-fulltext");
    }
}

document.addEventListener("DOMContentLoaded", updateCountryCode);
window.addEventListener("resize", updateCountryCode);


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


function validatePhoneNumber() {
const phoneInput = document.getElementById("phone");
const countrySelect = document.getElementById("countryCode");
const phoneError = document.getElementById("phoneError");



// Remove espaços e caracteres não numéricos
const phoneNumber = phoneInput.value.replace(/\D/g, "");

if (phoneNumber.length === phoneLength) {
phoneError.style.display = "none";
phoneInput.setCustomValidity("");
} else {
phoneError.style.display = "block";
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
