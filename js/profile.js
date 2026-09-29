/* ============================================================
   profile.js — student profile view, edit and password change
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("profileWrap")) return;

  getProfile().then(s => {
    document.getElementById("profileInitial").textContent = s.name.split(" ").map(n => n[0]).join("").slice(0, 2);
    document.getElementById("profileName").textContent = s.name;
    document.getElementById("profileId").textContent = s.id;
    document.getElementById("profileEmail").textContent = s.email;
    document.getElementById("profileMobile").textContent = s.mobile;
    document.getElementById("profileUsername").textContent = s.username;
    document.getElementById("profileJoined").textContent = s.joined;
    document.getElementById("profileEnrolledCount").textContent = s.enrolled.length;
    document.getElementById("profileCompletedCount").textContent = s.completed.length;

    const editForm = document.getElementById("editProfileForm");
    editForm.fullName.value = s.name;
    editForm.email.value = s.email;
    editForm.mobile.value = s.mobile;
  });

  document.getElementById("editProfileForm").addEventListener("submit", e => {
    e.preventDefault();
    updateProfile({}).then(res => {
      showToast(res.message, "success");
      bootstrap.Modal.getInstance(document.getElementById("editProfileModal")).hide();
      document.getElementById("profileName").textContent = e.target.fullName.value;
      document.getElementById("profileEmail").textContent = e.target.email.value;
      document.getElementById("profileMobile").textContent = e.target.mobile.value;
    });
  });

  document.getElementById("changePasswordForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target;
    let ok = true;
    ok = validateField(f.currentPassword, f.currentPassword.value.length > 0, "Enter your current password.") && ok;
    ok = validateField(f.newPassword, f.newPassword.value.length >= 6, "New password must be at least 6 characters.") && ok;
    ok = validateField(f.confirmNewPassword, f.confirmNewPassword.value === f.newPassword.value && f.confirmNewPassword.value.length > 0, "Passwords do not match.") && ok;
    if (!ok) return;
    showToast("Password changed successfully.", "success");
    f.reset();
    f.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
  });
});
