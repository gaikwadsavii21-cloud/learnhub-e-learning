
/* ============================================================
   courses.js — course catalog, details, enroll, my courses
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("courseGrid")) initCourseCatalog();
  if (document.getElementById("courseDetailWrap")) initCourseDetails();
  if (document.getElementById("myCoursesGrid")) initMyCourses();
  if (document.getElementById("featuredCourses")) renderFeatured();
});


/* ============================================================
   LESSON VIDEO AND NOTES LINKS
   ============================================================ */

function getLessonResources(courseId, index, lesson) {

  const notesLinks = {
    1: [
      "https://www.w3schools.com/html/",
      "https://www.w3schools.com/css/",
      "https://www.w3schools.com/bootstrap5/",
      "https://www.w3schools.com/js/",
      "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
      "https://developer.mozilla.org/en-US/docs/Learn_web_development"
    ],
    2: [
      "https://docs.oracle.com/javase/tutorial/java/",
      "https://docs.oracle.com/javase/tutorial/java/concepts/",
      "https://docs.oracle.com/javase/tutorial/collections/",
      "https://docs.oracle.com/javase/tutorial/essential/exceptions/",
      "https://docs.oracle.com/javase/tutorial/essential/io/",
      "https://www.w3schools.com/java/"
    ],
    4: [
      "https://www.tutorialspoint.com/dbms/dbms_er_model.htm",
      "https://www.tutorialspoint.com/dbms/dbms_normalization.htm",
      "https://www.w3schools.com/sql/",
      "https://www.sqlbolt.com/",
      "https://www.tutorialspoint.com/dbms/dbms_transaction.htm",
      "https://www.w3schools.com/sql/"
    ]
  };

  const notesUrl = notesLinks[courseId]?.[index] ||
    "https://www.google.com/search?q=" +
    encodeURIComponent(lesson + " study notes");

  const videoUrl =
    "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(lesson + " tutorial for beginners");

  return `
    <div class="mt-3 d-flex flex-wrap gap-2">

      <a href="${videoUrl}"
         target="_blank"
         rel="noopener noreferrer"
         class="btn btn-sm btn-danger">
        <i class="bi bi-play-circle"></i>
        Watch Video
      </a>

      <a href="${notesUrl}"
         target="_blank"
         rel="noopener noreferrer"
         class="btn btn-sm btn-outline-primary">
        <i class="bi bi-book"></i>
        Study Notes
      </a>

    </div>
  `;
}


/* ============================================================
   COURSE CARD
   ============================================================ */

function courseCardHTML(c, opts = {}) {
  const progress = opts.progress;
  const isEnrolled = opts.enrolled === true;

  let actionButton = "";

  if (opts.showContinue) {
    actionButton = `
      <a href="course-details.html?id=${c.id}"
         class="btn btn-teal btn-sm flex-fill">
        Continue
      </a>`;
  } else if (isEnrolled) {
    actionButton = `
      <button class="btn btn-outline-navy btn-sm flex-fill" disabled>
        Enrolled ✓
      </button>`;
  } else {
    actionButton = `
      <button class="btn btn-teal btn-sm flex-fill"
              data-enroll="${c.id}">
        Enroll
      </button>`;
  }

  return `
    <div class="col-md-6 col-lg-4">
      <div class="card course-card h-100 shadow-sm">

        <div class="thumb" style="background:${c.color}">
          <i class="bi ${c.icon}"></i>
        </div>

        <div class="card-body d-flex flex-column">

          <span class="badge badge-level mb-2 align-self-start">
            ${c.level}
          </span>

          <h5 class="card-title">${c.name}</h5>

          <p class="card-text text-muted small">${c.desc}</p>

          <ul class="list-unstyled small text-muted mb-3">
            <li><i class="bi bi-person"></i> ${c.instructor}</li>
            <li><i class="bi bi-clock"></i> ${c.duration} &middot; ${c.lessons} lessons</li>
          </ul>

          ${
            progress !== undefined
              ? `
                <div class="progress mb-1">
                  <div class="progress-bar" style="width:${progress}%"></div>
                </div>
                <small class="text-muted mb-3">${progress}% complete</small>
              `
              : ""
          }

          <div class="mt-auto d-flex gap-2">
            <a href="course-details.html?id=${c.id}"
               class="btn btn-outline-navy btn-sm flex-fill">
              View Course
            </a>
            ${actionButton}
          </div>

        </div>
      </div>
    </div>`;
}


/* ============================================================
   FEATURED COURSES
   ============================================================ */

function renderFeatured() {
  Promise.all([
    getCourses(),
    getMyCourses().catch(() => [])
  ])
  .then(([courses, myCourses]) => {

    const enrolledIds = new Set(
      myCourses.map(c => Number(c.id))
    );

    document.getElementById("featuredCourses").innerHTML =
      courses.slice(0, 3)
        .map(c => courseCardHTML(c, {
          enrolled: enrolledIds.has(Number(c.id))
        }))
        .join("");

    wireEnrollButtons();
  })
  .catch(error => console.error("Featured courses error:", error));
}


/* ============================================================
   COURSE CATALOG
   ============================================================ */

function initCourseCatalog() {
  Promise.all([
    getCourses(),
    getMyCourses().catch(() => [])
  ])
  .then(([all, myCourses]) => {

    const grid = document.getElementById("courseGrid");
    const search = document.getElementById("courseSearch");
    const categorySel = document.getElementById("categoryFilter");
    const levelSel = document.getElementById("levelFilter");
    const sortSel = document.getElementById("sortBy");

    const enrolledIds = new Set(
      myCourses.map(c => Number(c.id))
    );

    const categories = [
      "All Categories",
      ...new Set(all.map(c => c.category))
    ];

    categorySel.innerHTML = categories
      .map(c => `<option>${c}</option>`)
      .join("");

    function apply() {
      let list = all.filter(c => {

        const term = search.value.trim().toLowerCase();

        const matchesTerm =
          !term ||
          (c.name + c.desc + c.instructor)
            .toLowerCase()
            .includes(term);

        const matchesCat =
          categorySel.value === "All Categories" ||
          c.category === categorySel.value;

        const matchesLevel =
          levelSel.value === "All Levels" ||
          c.level === levelSel.value;

        return matchesTerm && matchesCat && matchesLevel;
      });

      if (sortSel.value === "name") {
        list = [...list].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }

      if (sortSel.value === "duration") {
        list = [...list].sort((a, b) =>
          parseInt(a.duration) - parseInt(b.duration)
        );
      }

      if (sortSel.value === "lessons") {
        list = [...list].sort((a, b) =>
          b.lessons - a.lessons
        );
      }

      grid.innerHTML = list.length
        ? list.map(c => courseCardHTML(c, {
            enrolled: enrolledIds.has(Number(c.id))
          })).join("")
        : `
          <div class="col-12">
            <div class="alert alert-light border text-center">
              No courses match your search.
              Try different keywords or clear the filters.
            </div>
          </div>`;

      document.getElementById("resultCount").textContent =
        `${list.length} course${list.length === 1 ? "" : "s"} found`;

      wireEnrollButtons();
    }

    [search, categorySel, levelSel, sortSel].forEach(el => {
      el.addEventListener("input", apply);
      el.addEventListener("change", apply);
    });

    apply();
  })
  .catch(error => console.error("Course catalog error:", error));
}


/* ============================================================
   COURSE DETAILS
   ============================================================ */

function initCourseDetails() {
  const id = new URLSearchParams(window.location.search).get("id") || 1;

  getCourseById(id)
    .then(c => {

      if (!c) {
        document.getElementById("courseDetailWrap").innerHTML = `
          <div class="alert alert-warning">Course not found.</div>`;
        return;
      }

      document.title = `${c.name} — E-Learn`;

      document.getElementById("courseDetailWrap").innerHTML = `
        <div class="row g-4">

          <div class="col-lg-8">

            <span class="badge badge-level mb-2">${c.level}</span>

            <h1 class="h2">${c.name}</h1>

            <p class="text-muted">${c.desc}</p>

            <ul class="list-unstyled text-muted small mb-4">
              <li><i class="bi bi-person"></i> Instructor: ${c.instructor}</li>
              <li><i class="bi bi-clock"></i> ${c.duration} &middot; ${c.lessons} lessons</li>
              <li><i class="bi bi-folder2"></i> Category: ${c.category}</li>
            </ul>

            <h5>Course curriculum</h5>

            <div class="accordion" id="curriculumAcc">

              ${c.curriculum.map((m, i) => `
                <div class="accordion-item">

                  <h2 class="accordion-header">
                    <button
                      class="accordion-button ${i ? "collapsed" : ""}"
                      data-bs-toggle="collapse"
                      data-bs-target="#mod${i}">
                      Module ${i + 1}: ${m}
                    </button>
                  </h2>

                  <div
                    id="mod${i}"
                    class="accordion-collapse collapse ${i ? "" : "show"}"
                    data-bs-parent="#curriculumAcc">

                    <div class="accordion-body">

                      <p class="text-muted mb-2">
                        Learn ${m} with video lectures and study materials.
                      </p>

                      ${getLessonResources(c.id, i, m)}

                    </div>
                  </div>
                </div>
              `).join("")}

            </div>
          </div>

          <div class="col-lg-4">

            <div class="card shadow-sm">

              <div class="thumb"
                   style="background:${c.color};height:120px;display:flex;align-items:center;justify-content:center;">

                <i class="bi ${c.icon} text-white"
                   style="font-size:2.4rem"></i>

              </div>

              <div class="card-body">

                <div class="progress mb-1">
                  <div class="progress-bar"
                       style="width:0%"
                       id="detailProgress"></div>
                </div>

                <small class="text-muted">
                  Enroll to start tracking progress
                </small>

                <button class="btn btn-teal w-100 mt-3"
                        id="enrollBtn"
                        data-enroll="${c.id}">
                  Enroll in this course
                </button>

                <a href="my-courses.html"
                   class="btn btn-outline-navy w-100 mt-2">
                  Go to My Courses
                </a>

              </div>
            </div>
          </div>
        </div>

        <h3 class="mt-5 mb-3">Related courses</h3>

        <div class="row g-4" id="relatedCourses"></div>
      `;

      getCourses().then(all => {
        document.getElementById("relatedCourses").innerHTML =
          all.filter(x =>
            x.category === c.category && x.id !== c.id
          )
          .slice(0, 3)
          .map(x => courseCardHTML(x))
          .join("")
          ||
          `<p class="text-muted">No related courses yet.</p>`;

        wireEnrollButtons();
      });

      getMyCourses()
        .then(myCourses => {
          const enrolled = myCourses.some(
            x => Number(x.id) === Number(c.id)
          );

          const btn = document.getElementById("enrollBtn");

          if (enrolled && btn) {
            btn.textContent = "Enrolled ✓";
            btn.disabled = true;
            btn.classList.remove("btn-teal");
            btn.classList.add("btn-outline-navy");
          }
        })
        .catch(() => {});

      wireEnrollButtons();
    })
    .catch(error => console.error("Course details error:", error));
}


/* ============================================================
   MY COURSES
   ============================================================ */

function initMyCourses() {
  getMyCourses()
    .then(list => {

      const grid = document.getElementById("myCoursesGrid");

      grid.innerHTML = list.length
        ? list.map(c => courseCardHTML(c, {
            progress: c.progress || 0,
            enrolled: true,
            showContinue: true
          })).join("")
        : `
          <div class="col-12">
            <div class="alert alert-light border text-center">
              You have not enrolled in any course yet.
              <a href="courses.html">Browse courses</a>.
            </div>
          </div>`;
    })
    .catch(error => console.error("My courses error:", error));
}


/* ============================================================
   ENROLL BUTTONS
   ============================================================ */

function wireEnrollButtons() {
  document.querySelectorAll("[data-enroll]").forEach(btn => {

    if (btn.dataset.wired === "true") return;

    btn.dataset.wired = "true";

    btn.addEventListener("click", () => {

      if (btn.disabled) return;

      btn.disabled = true;

      enrollCourse(btn.dataset.enroll)
        .then(res => {

          showToast(res.message, "success");

          btn.textContent = "Enrolled ✓";
          btn.classList.remove("btn-teal");
          btn.classList.add("btn-outline-navy");

        })
        .catch(error => {

          btn.disabled = false;

          showToast(
            error.message || "Enrollment failed.",
            "error"
          );

          console.error("Enrollment error:", error);
        });
    });
  });
}
