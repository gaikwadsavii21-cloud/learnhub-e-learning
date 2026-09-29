/* ============================================================
   assignments.js — assignment list + submission simulation
   ============================================================ */

const STATUS_BADGE = {
  pending: "badge-pending",
  submitted: "badge-submitted",
  completed: "badge-completed",
  overdue: "badge-overdue"
};
const STATUS_LABEL = {
  pending: "Pending", submitted: "Submitted", completed: "Completed", overdue: "Overdue"
};

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("assignmentsTable")) initAssignmentsList();
  if (document.getElementById("submissionForm")) initSubmissionPage();
});

function initAssignmentsList() {
  getAssignments().then(list => {
    const tbody = document.getElementById("assignmentsTable");
    tbody.innerHTML = list.map(a => `
      <tr>
        <td>
          <div class="fw-semibold">${a.title}</div>
          <div class="text-muted small">${a.course}</div>
        </td>
        <td>${a.due}</td>
        <td><span class="badge ${STATUS_BADGE[a.status]}">${STATUS_LABEL[a.status]}</span></td>
        <td><a href="assignment-details.html?id=${a.id}" class="btn btn-sm btn-outline-navy">View Assignment</a></td>
      </tr>`).join("");

    document.querySelectorAll("[data-status-filter]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-status-filter]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.statusFilter;
        tbody.querySelectorAll("tr").forEach(tr => {
          const badge = tr.querySelector(".badge").textContent.trim().toLowerCase();
          tr.style.display = (f === "all" || badge === f) ? "" : "none";
        });
      });
    });
  });
}

function initSubmissionPage() {
  const id = new URLSearchParams(window.location.search).get("id") || 101;
  getAssignments().then(list => {
    const a = list.find(x => x.id == id) || list[0];
    document.getElementById("assignmentTitle").textContent = a.title;
    document.getElementById("assignmentCourse").textContent = a.course;
    document.getElementById("assignmentDue").textContent = a.due;
    document.getElementById("assignmentStatusBadge").className = `badge ${STATUS_BADGE[a.status]}`;
    document.getElementById("assignmentStatusBadge").textContent = STATUS_LABEL[a.status];
  });

  document.getElementById("submissionForm").addEventListener("submit", e => {
    e.preventDefault();
    const answer = document.getElementById("answerText").value.trim();
    if (!answer) {
      document.getElementById("answerText").classList.add("is-invalid");
      return;
    }
    document.getElementById("answerText").classList.remove("is-invalid");
    submitAssignment(id, { answer }).then(res => {
      document.getElementById("submissionForm").classList.add("d-none");
      document.getElementById("submissionConfirm").classList.remove("d-none");
      showToast(res.message, "success");
    });
  });
}
