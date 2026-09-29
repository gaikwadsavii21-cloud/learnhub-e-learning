/* ============================================================
   api.js
   Central place for future backend calls to the Java Spring Boot
   REST API. Every function currently resolves with mock data so
   the frontend works with no backend running. When the backend
   is ready, replace the body of each function with a real fetch()
   call to API_BASE_URL and keep the same function name/shape so
   no UI code needs to change.
   ============================================================ */

const API_BASE_URL = "http://localhost:8080/api";

/* Small helper to fake network latency + Promise-based responses,
   so swapping in real fetch() calls later is a drop-in change. */
function mockResponse(data, delay = 300) {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
}

/* ---------- Auth ---------- */
function loginUser(credentials) {
  // Future: return fetch(`${API_BASE_URL}/auth/login`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(credentials) }).then(r => r.json());
  return mockResponse({ token: "demo-token", user: MOCK_STUDENT });
}

function registerUser(payload) {
  // Future: POST to `${API_BASE_URL}/auth/register`
  return mockResponse({ success: true, message: "Account created successfully." });
}

function logoutUser() {
  localStorage.removeItem("elearn_session");
  return mockResponse({ success: true });
}

/* ---------- Courses ---------- */
function getCourses(filters = {}) {
  // Future: GET `${API_BASE_URL}/courses?search=...&category=...`
  return mockResponse(MOCK_COURSES);
}

function getCourseById(id) {
  // Future: GET `${API_BASE_URL}/courses/${id}`
  return mockResponse(MOCK_COURSES.find(c => c.id == id));
}

function enrollCourse(courseId) {
  // Future: POST `${API_BASE_URL}/enrollments` { courseId }
  return mockResponse({ success: true, message: "Enrolled successfully." });
}

function getMyCourses() {
  // Future: GET `${API_BASE_URL}/students/me/courses`
  return mockResponse(MOCK_COURSES.filter(c => MOCK_STUDENT.enrolled.includes(c.id)));
}

/* ---------- Assignments ---------- */
function getAssignments() {
  // Future: GET `${API_BASE_URL}/students/me/assignments`
  return mockResponse(MOCK_ASSIGNMENTS);
}

function submitAssignment(assignmentId, submissionData) {
  // Future: POST `${API_BASE_URL}/assignments/${assignmentId}/submit`
  return mockResponse({ success: true, message: "Assignment submitted successfully." });
}

/* ---------- Profile ---------- */
function getProfile() {
  // Future: GET `${API_BASE_URL}/students/me`
  return mockResponse(MOCK_STUDENT);
}

function updateProfile(payload) {
  // Future: PUT `${API_BASE_URL}/students/me`
  return mockResponse({ success: true, message: "Profile updated successfully." });
}
