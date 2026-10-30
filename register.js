document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    if (!form) return;

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = form.elements["fullName"].value.trim();
        const email = form.elements["email"].value.trim();
        const password = form.elements["password"].value;
        const confirmPassword = form.elements["confirmPassword"].value;
        const terms = form.elements["terms"].checked;

        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill all required fields.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!terms) {
            alert("Please accept Terms & Conditions.");
            return;
        }

        const button = form.querySelector('button[type="submit"], button:not([type])');
        if (button) {
            button.disabled = true;
            button.textContent = "Registering...";
        }

        try {
            const response = await fetch("http://127.0.0.1:8080/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || "Registration failed");
            }

            alert("Registration successful! Please login.");
            window.location.href = "login.html";
        } catch (error) {
            console.error(error);
            alert("Registration failed: " + error.message);
        } finally {
            if (button) {
                button.disabled = false;
                button.textContent = "Register";
            }
        }
    });
});
