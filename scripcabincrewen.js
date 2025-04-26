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
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");
    const submitBtn = form.querySelector("button[type='submit']");
    let isSubmitting = false;

    var iti = window.intlTelInput(phoneInput, {
        initialCountry: "fr",
        preferredCountries: ["fr", "pt", "es", "br"],
        separateDialCode: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    function validatePhoneNumber() {
        var fullPhoneNumber = iti.getNumber();
        var isValid = iti.isValidNumber();

        if (!isValid || fullPhoneNumber.includes("undefined")) {
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

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (isSubmitting) return;
        isSubmitting = true;

        var fullPhoneNumber = validatePhoneNumber();
        if (!fullPhoneNumber) {
            isSubmitting = false;
            return;
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            isSubmitting = false;
            return;
        }

        phoneInput.value = fullPhoneNumber;

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        grecaptcha.ready(function() {
            grecaptcha.execute('6LdrdO8qAAAAAAmgcczCLR_rhm1a2_Z-zLUFAOvc', {action: 'submit'})
            .then(function(token) {
                document.getElementById('recaptchaResponse').value = token;

                const formData = new FormData(form);

                fetch("https://validar-recaptcha.geral-284.workers.dev/", {
                    method: "POST",
                    body: JSON.stringify({ recaptcha_response: formData.get("recaptcha_response") }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Se recaptcha OK, agora envia para o teu Google Script
                        fetch(form.action, {
                            method: form.method,
                            body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === "success") {
                                window.location.href = "/sucessoen.html";
                            } else {
                                alert("Error sending the form. Please try again.");
                            }
                        })
                        .catch(error => {
                            console.error("Erro ao enviar o formulário:", error);
                            alert("There was an error sending the form. Please try again.");
                        });
                    } else {
                        alert("Erro na verificação do reCAPTCHA.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao validar reCAPTCHA:", error);
                    alert("Erro ao validar reCAPTCHA.");
                })
                .finally(() => {
                    isSubmitting = false;
                    submitBtn.disabled = false;
                    submitBtn.textContent = "I want to be a cabin crew";
                });
            });
        });
    });
});




document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio imediato

    grecaptcha.ready(function() {
        grecaptcha.execute('6LdrdO8qAAAAAAmgcczCLR_rhm1a2_Z-zLUFAOvc', {action: 'submit'}).then(function(token) {
            document.getElementById('recaptchaResponse').value = token;

            // Agora envia os dados para o Cloudflare Worker
            enviarDados();
        });
    });
});

function enviarDados() {
    let form = document.getElementById('leadForm');
    let formData = new FormData(form);

    fetch("https://validar-recaptcha.geral-284.workers.dev/", { // Substitua pela URL do seu Worker
        method: "POST",
        body: JSON.stringify({ recaptcha_response: formData.get("recaptcha_response") }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Verificação bem-sucedida! Enviando formulário...");
            form.submit(); // Agora podemos enviar o formulário para o Google Sheets
        } else {
            alert("Erro na verificação do reCAPTCHA.");
        }
    })
    .catch(error => console.error("Erro:", error));
}
