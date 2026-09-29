/* ============================================================
   auth.js — registration & login validation (frontend only)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  wirePasswordToggles();
  wireRegisterForm();
  wireLoginForm();
});

function wirePasswordToggles() {
  document.querySelectorAll("[data-toggle-password]").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = document.querySelector(btn.dataset.togglePassword);
      const icon = btn.querySelector("i");
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      icon.className = show ? "bi bi-eye-slash" : "bi bi-eye";
    });
  });
}

function wireRegisterForm() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const mobile = form.mobile.value.trim();
    const username = form.username.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const terms = form.terms.checked;

    valid = validateField(form.fullName, fullName.length >= 3, "Enter your full name (at least 3 characters).") && valid;
    valid = validateField(form.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), "Enter a valid email address.") && valid;
    valid = validateField(form.mobile, /^[6-9]\d{9}$/.test(mobile.replace(/\D/g, "").slice(-10)), "Enter a valid 10-digit mobile number.") && valid;
    valid = validateField(form.username, username.length >= 4, "Username must be at least 4 characters.") && valid;
    valid = validateField(form.password, password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password),
      "Password needs 6+ characters, one uppercase letter and one number.") && valid;
    valid = validateField(form.confirmPassword, confirmPassword === password && confirmPassword.length > 0, "Passwords do not match.") && valid;

    const termsFeedback = document.getElementById("termsFeedback");
    if (!terms) { termsFeedback.style.display = "block"; valid = false; }
    else { termsFeedback.style.display = "none"; }

    if (!valid) return;

    registerUser({ fullName, email, mobile, username, password }).then(res => {
      showToast(res.message, "success");
      form.reset();
      form.classList.remove("was-validated");
      setTimeout(() => (window.location.href = "login.html"), 1200);
    });
  });
}

function wireLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;
    const identifier = form.identifier.value.trim();
    const password = form.password.value;

    valid = validateField(form.identifier, identifier.length > 0, "Enter your username or email.") && valid;
    valid = validateField(form.password, password.length > 0, "Enter your password.") && valid;
    if (!valid) return;

    loginUser({ identifier, password }).then(res => {
      localStorage.setItem("elearn_session", JSON.stringify({ token: res.token, name: res.user.name }));
      showToast(`Welcome back, ${res.user.name.split(" ")[0]}.`, "success");
      setTimeout(() => (window.location.href = "dashboard.html"), 800);
    });
  });
}

function validateField(input, condition, message) {
  const feedback = input.parentElement.querySelector(".invalid-feedback") ||
                    input.closest(".mb-3, .col-12, .col-md-6")?.querySelector(".invalid-feedback");
  if (condition) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    if (feedback) feedback.textContent = message;
  }
  return condition;
}
