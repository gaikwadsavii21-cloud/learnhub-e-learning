/* ============================================================
   dashboard.js — student dashboard widgets
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("dashboardWrap")) return;

  const session = JSON.parse(localStorage.getItem("elearn_session") || "null");
  document.getElementById("welcomeName").textContent = (session && session.name) ? session.name.split(" ")[0] : MOCK_STUDENT.name.split(" ")[0];

  Promise.all([getMyCourses(), getAssignments(), getProfile()]).then(([myCourses, assignments, s]) => {
    document.getElementById("statEnrolled").textContent = s.enrolled.length;
    document.getElementById("statCompleted").textContent = s.completed.length;
    document.getElementById("statPending").textContent = assignments.filter(a => a.status === "pending" || a.status === "overdue").length;
    const avg = Math.round(Object.values(s.progress).reduce((a, b) => a + b, 0) / Object.values(s.progress).length) || 0;
    document.getElementById("statProgress").textContent = avg + "%";

    document.getElementById("recentCourses").innerHTML = myCourses.slice(0, 3).map(c => `
      <div class="d-flex align-items-center justify-content-between border-bottom py-3">
        <div class="d-flex align-items-center gap-3">
          <div class="thumb rounded d-flex align-items-center justify-content-center" style="width:48px;height:48px;background:${c.color}">
            <i class="bi ${c.icon} text-white"></i>
          </div>
          <div>
            <div class="fw-semibold">${c.name}</div>
            <small class="text-muted">${s.progress[c.id] || 0}% complete</small>
          </div>
        </div>
        <a href="course-details.html?id=${c.id}" class="btn btn-sm btn-outline-navy">Continue</a>
      </div>`).join("");

    document.getElementById("upcomingAssignments").innerHTML = assignments
      .filter(a => a.status === "pending" || a.status === "overdue")
      .map(a => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div><div class="fw-semibold">${a.title}</div><small class="text-muted">${a.course}</small></div>
          <span class="badge ${a.status === "overdue" ? "badge-overdue" : "badge-pending"}">${a.due}</span>
        </li>`).join("") || `<li class="list-group-item text-muted">No upcoming assignments. You're all caught up.</li>`;
  });

  const activity = [
    { icon: "bi-check2-circle", text: "Completed lesson: SQL Queries", time: "2 hours ago" },
    { icon: "bi-journal-plus", text: "Enrolled in Web Development Bootcamp", time: "1 day ago" },
    { icon: "bi-upload", text: "Submitted assignment: Library Management Class", time: "2 days ago" }
  ];
  document.getElementById("recentActivity").innerHTML = activity.map(a => `
    <li class="list-group-item d-flex align-items-center gap-3">
      <i class="bi ${a.icon} text-teal" style="color:#1AA69B;font-size:1.1rem"></i>
      <div><div>${a.text}</div><small class="text-muted">${a.time}</small></div>
    </li>`).join("");
});
