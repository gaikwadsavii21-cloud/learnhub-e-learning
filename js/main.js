/* ============================================================
   main.js — shared UI behaviour used on every page
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  highlightActiveNav();
  wireLogoutButtons();
});

/* Highlights the current page in the navbar / sidebar based on data-page */
function highlightActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll(`[data-nav="${page}"]`).forEach(el => el.classList.add("active"));
}

/* Any element with data-logout on it asks for confirmation, then
   clears the demo session and sends the user back to the login page. */
function wireLogoutButtons() {
  document.querySelectorAll("[data-logout]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      if (confirm("Log out of E-Learn?")) {
        logoutUser().then(() => {
          const isAdmin = el.dataset.logout === "admin";
          window.location.href = isAdmin ? "login.html" : "../login.html";
        });
      }
    });
  });
}

/* Reusable Bootstrap toast. type: 'success' | 'danger' | 'info' */
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container position-fixed bottom-0 end-0 p-3";
    document.body.appendChild(container);
  }
  const el = document.createElement("div");
  el.className = `toast align-items-center text-bg-${type} border-0`;
  el.setAttribute("role", "alert");
  el.innerHTML = `<div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>`;
  container.appendChild(el);
  const toast = new bootstrap.Toast(el, { delay: 3500 });
  toast.show();
  el.addEventListener("hidden.bs.toast", () => el.remove());
}

/* Simple demo "session" check. Pages that require login call this. */
function requireSession(redirectTo = "login.html") {
  if (!localStorage.getItem("elearn_session")) {
    window.location.href = redirectTo;
  }
}
