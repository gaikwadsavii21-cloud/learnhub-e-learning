/* ============================================================
   admin.js — admin login + dashboard + management tables
   All add / edit / delete actions are simulated with JavaScript
   only, matching the rest of this demo frontend.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  wireAdminLogin();
  if (document.getElementById("adminDashboard")) renderAdminDashboard();
  if (document.getElementById("studentsTable")) renderStudentsTable();
  if (document.getElementById("coursesAdminTable")) renderCoursesAdminTable();
  if (document.getElementById("materialsTable")) renderMaterialsTable();
  if (document.getElementById("assignmentsAdminTable")) renderAssignmentsAdminTable();
  if (document.getElementById("enrollmentsTable")) renderEnrollmentsTable();
  if (document.getElementById("submissionsTable")) renderSubmissionsTable();
  wireDeleteButtons();
  wireAddForms();
});

function wireAdminLogin() {
  const form = document.getElementById("adminLoginForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;
    valid = validateField(form.username, form.username.value.trim().length > 0, "Enter the admin username.") && valid;
    valid = validateField(form.password, form.password.value.length > 0, "Enter the admin password.") && valid;
    if (!valid) return;
    localStorage.setItem("elearn_admin_session", "true");
    showToast("Welcome back, Admin.", "success");
    setTimeout(() => (window.location.href = "dashboard.html"), 700);
  });
}

function renderAdminDashboard() {
  document.getElementById("statTotalStudents").textContent = MOCK_ADMIN_STUDENTS.length;
  document.getElementById("statTotalCourses").textContent = MOCK_COURSES.length;
  document.getElementById("statTotalAssignments").textContent = MOCK_ASSIGNMENTS.length;
  document.getElementById("statTotalEnrollments").textContent = MOCK_ENROLLMENTS.length;

  document.getElementById("recentStudents").innerHTML = MOCK_ADMIN_STUDENTS.slice(0, 4).map(s => `
    <li class="list-group-item d-flex justify-content-between">
      <span>${s.name}</span><small class="text-muted">${s.email}</small>
    </li>`).join("");

  document.getElementById("recentEnrollments").innerHTML = MOCK_ENROLLMENTS.slice(0, 4).map(e => `
    <li class="list-group-item d-flex justify-content-between">
      <span>${e.student} &rarr; ${e.course}</span><small class="text-muted">${e.date}</small>
    </li>`).join("");

  document.getElementById("recentSubmissions").innerHTML = MOCK_SUBMISSIONS.slice(0, 4).map(s => `
    <li class="list-group-item d-flex justify-content-between">
      <span>${s.student}: ${s.assignment}</span>
      <span class="badge ${STATUS_BADGE_ADMIN(s.status)}">${s.status}</span>
    </li>`).join("");

  const catCounts = {};
  MOCK_COURSES.forEach(c => (catCounts[c.category] = (catCounts[c.category] || 0) + 1));
  document.getElementById("courseStats").innerHTML = Object.entries(catCounts).map(([cat, n]) => `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <span>${cat}</span>
      <div class="flex-grow-1 mx-3"><div class="progress"><div class="progress-bar" style="width:${(n / MOCK_COURSES.length) * 100}%"></div></div></div>
      <span class="text-muted small">${n}</span>
    </div>`).join("");
}

function STATUS_BADGE_ADMIN(status) {
  return { active: "badge-completed", inactive: "badge-overdue", completed: "badge-completed",
           submitted: "badge-submitted", pending: "badge-pending", overdue: "badge-overdue" }[status] || "badge-pending";
}

function renderStudentsTable(rows = MOCK_ADMIN_STUDENTS) {
  document.getElementById("studentsTable").innerHTML = rows.map(s => `
    <tr data-row>
      <td>${s.id}</td><td>${s.name}</td><td>${s.email}</td><td>${s.courses}</td>
      <td><span class="badge ${STATUS_BADGE_ADMIN(s.status)}">${s.status}</span></td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-navy me-1" data-bs-toggle="modal" data-bs-target="#viewModal" data-view-name="${s.name}" data-view-body="Email: ${s.email}<br>Enrolled courses: ${s.courses}<br>Status: ${s.status}">View</button>
        <button class="btn btn-sm btn-outline-navy me-1" data-bs-toggle="modal" data-bs-target="#editModal" data-edit-name="${s.name}">Edit</button>
        <button class="btn btn-sm btn-outline-danger" data-delete>Delete</button>
      </td>
    </tr>`).join("");
  wireViewButtons(); wireDeleteButtons();
}

function renderCoursesAdminTable(rows = MOCK_COURSES) {
  document.getElementById("coursesAdminTable").innerHTML = rows.map(c => `
    <tr data-row>
      <td>${c.id}</td><td>${c.name}</td><td>${c.category}</td><td>${c.level}</td><td>${c.instructor}</td><td>${c.lessons}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-navy me-1" data-bs-toggle="modal" data-bs-target="#viewModal" data-view-name="${c.name}" data-view-body="Category: ${c.category}<br>Level: ${c.level}<br>Instructor: ${c.instructor}<br>Duration: ${c.duration}">View</button>
        <button class="btn btn-sm btn-outline-navy me-1" data-bs-toggle="modal" data-bs-target="#editModal" data-edit-name="${c.name}">Edit</button>
        <button class="btn btn-sm btn-outline-danger" data-delete>Delete</button>
      </td>
    </tr>`).join("");
  wireViewButtons(); wireDeleteButtons();
}

const MOCK_MATERIALS = [
  { id: 1, title: "HTML5 Cheat Sheet.pdf", course: "Web Development Bootcamp", type: "PDF", uploaded: "10 Jan 2026" },
  { id: 2, title: "OOP Concepts Slides.pptx", course: "Java Programming Essentials", type: "Slides", uploaded: "15 Jan 2026" },
  { id: 3, title: "SQL Practice Set.pdf", course: "Database Management Systems", type: "PDF", uploaded: "22 Feb 2026" },
  { id: 4, title: "Networking Diagrams.pdf", course: "Computer Networks", type: "PDF", uploaded: "01 Mar 2026" }
];
function renderMaterialsTable(rows = MOCK_MATERIALS) {
  document.getElementById("materialsTable").innerHTML = rows.map(m => `
    <tr data-row>
      <td>${m.title}</td><td>${m.course}</td><td>${m.type}</td><td>${m.uploaded}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-navy me-1" data-bs-toggle="modal" data-bs-target="#viewModal" data-view-name="${m.title}" data-view-body="Course: ${m.course}<br>Type: ${m.type}<br>Uploaded: ${m.uploaded}">View</button>
        <button class="btn btn-sm btn-outline-danger" data-delete>Delete</button>
      </td>
    </tr>`).join("");
  wireViewButtons(); wireDeleteButtons();
}

function renderAssignmentsAdminTable(rows = MOCK_ASSIGNMENTS) {
  document.getElementById("assignmentsAdminTable").innerHTML = rows.map(a => `
    <tr data-row>
      <td>${a.title}</td><td>${a.course}</td><td>${a.due}</td>
      <td><span class="badge ${STATUS_BADGE_ADMIN(a.status)}">${a.status}</span></td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-navy me-1" data-bs-toggle="modal" data-bs-target="#viewModal" data-view-name="${a.title}" data-view-body="Course: ${a.course}<br>Due: ${a.due}<br>Status: ${a.status}">View</button>
        <button class="btn btn-sm btn-outline-danger" data-delete>Delete</button>
      </td>
    </tr>`).join("");
  wireViewButtons(); wireDeleteButtons();
}

function renderEnrollmentsTable(rows = MOCK_ENROLLMENTS) {
  document.getElementById("enrollmentsTable").innerHTML = rows.map(e => `
    <tr data-row>
      <td>${e.student}</td><td>${e.course}</td><td>${e.date}</td>
      <td><span class="badge ${STATUS_BADGE_ADMIN(e.status)}">${e.status}</span></td>
      <td class="text-end"><button class="btn btn-sm btn-outline-danger" data-delete>Remove</button></td>
    </tr>`).join("");
  wireDeleteButtons();
}

function renderSubmissionsTable(rows = MOCK_SUBMISSIONS) {
  document.getElementById("submissionsTable").innerHTML = rows.map(s => `
    <tr data-row>
      <td>${s.student}</td><td>${s.assignment}</td><td>${s.course}</td><td>${s.submitted}</td>
      <td><span class="badge ${STATUS_BADGE_ADMIN(s.status)}">${s.status}</span></td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-navy" data-bs-toggle="modal" data-bs-target="#viewModal" data-view-name="${s.assignment}" data-view-body="Student: ${s.student}<br>Course: ${s.course}<br>Submitted: ${s.submitted}<br>Status: ${s.status}">View</button>
      </td>
    </tr>`).join("");
}

function wireViewButtons() {
  document.querySelectorAll('[data-bs-target="#viewModal"]').forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("viewModalTitle").textContent = btn.dataset.viewName;
      document.getElementById("viewModalBody").innerHTML = btn.dataset.viewBody;
    }, { once: false });
  });
}

function wireDeleteButtons() {
  document.querySelectorAll("[data-delete]").forEach(btn => {
    if (btn.dataset.wired) return;
    btn.dataset.wired = "true";
    btn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this record?")) {
        btn.closest("[data-row]").remove();
        showToast("Record deleted.", "danger");
      }
    });
  });
}

function wireAddForms() {
  document.querySelectorAll("[data-add-form]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      showToast("Saved successfully.", "success");
      const modal = form.closest(".modal");
      if (modal) bootstrap.Modal.getInstance(modal)?.hide();
      form.reset();
    });
  });
}
