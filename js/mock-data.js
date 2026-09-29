/* ============================================================
   mock-data.js
   Demo data only. Replace with real API responses once the
   Java Spring Boot backend is connected (see js/api.js).
   ============================================================ */

const MOCK_COURSES = [
  { id: 1, name: "Web Development Bootcamp", category: "Web Development", level: "Beginner",
    instructor: "Dr. Anita Sharma", duration: "8 weeks", lessons: 24, icon: "bi-code-slash", color: "#1AA69B",
    desc: "Build responsive websites from scratch using HTML5, CSS3, Bootstrap and JavaScript.",
    curriculum: ["Introduction to HTML5", "CSS3 & Responsive Layouts", "Bootstrap 5 Components", "JavaScript Fundamentals", "DOM Manipulation", "Final Project"] },
  { id: 2, name: "Java Programming Essentials", category: "Programming", level: "Beginner",
    instructor: "Prof. Ramesh Iyer", duration: "10 weeks", lessons: 30, icon: "bi-cup-hot", color: "#0F2B46",
    desc: "Master core Java concepts including OOP, collections and exception handling.",
    curriculum: ["Java Basics & Syntax", "OOP Concepts", "Collections Framework", "Exception Handling", "File I/O", "Mini Project"] },
  { id: 3, name: "Python for Data Analysis", category: "Programming", level: "Intermediate",
    instructor: "Ms. Kavya Reddy", duration: "6 weeks", lessons: 18, icon: "bi-filetype-py", color: "#F2A93B",
    desc: "Analyse and visualise data using Python, pandas and matplotlib.",
    curriculum: ["Python Refresher", "NumPy & pandas", "Data Cleaning", "Visualisation", "Case Study"] },
  { id: 4, name: "Database Management Systems", category: "Databases", level: "Intermediate",
    instructor: "Dr. Sanjay Verma", duration: "8 weeks", lessons: 22, icon: "bi-database", color: "#1D4E9B",
    desc: "Design relational databases and write efficient SQL queries.",
    curriculum: ["ER Modelling", "Normalisation", "SQL Queries", "Joins & Subqueries", "Transactions", "Project: Library DB"] },
  { id: 5, name: "Computer Networks", category: "Networking", level: "Intermediate",
    instructor: "Prof. Leela Nair", duration: "9 weeks", lessons: 20, icon: "bi-diagram-3", color: "#0F7A72",
    desc: "Understand how data travels across networks, from OSI layers to routing.",
    curriculum: ["OSI & TCP/IP Models", "IP Addressing", "Routing & Switching", "Network Security Basics", "Case Studies"] },
  { id: 6, name: "Data Structures & Algorithms", category: "Programming", level: "Advanced",
    instructor: "Dr. Anita Sharma", duration: "12 weeks", lessons: 34, icon: "bi-diagram-2", color: "#B02A2A",
    desc: "Strengthen problem-solving with arrays, trees, graphs and algorithm design.",
    curriculum: ["Arrays & Linked Lists", "Stacks & Queues", "Trees & Graphs", "Sorting & Searching", "Dynamic Programming", "Interview Practice"] },
  { id: 7, name: "Software Engineering Principles", category: "Software Engineering", level: "Advanced",
    instructor: "Prof. Ramesh Iyer", duration: "7 weeks", lessons: 16, icon: "bi-diagram-3-fill", color: "#8A5A00",
    desc: "Learn the SDLC, agile methods and software design best practices.",
    curriculum: ["SDLC Models", "Requirements Engineering", "UML Diagrams", "Agile & Scrum", "Testing Strategies", "Group Project"] }
];

const MOCK_STUDENT = {
  id: "STU2026041", name: "Rahul Mehta", email: "rahul.mehta@example.com",
  mobile: "+91 98765 43210", username: "rahul_m", joined: "12 Jan 2026",
  enrolled: [1, 2, 4], completed: [4],
  progress: { 1: 65, 2: 40, 4: 100 }
};

const MOCK_ASSIGNMENTS = [
  { id: 101, course: "Web Development Bootcamp", title: "Build a Responsive Portfolio Page", due: "05 Oct 2026", status: "pending" },
  { id: 102, course: "Java Programming Essentials", title: "Implement a Library Management Class", due: "28 Sep 2026", status: "submitted" },
  { id: 103, course: "Database Management Systems", title: "Design an ER Diagram for a Hospital System", due: "20 Sep 2026", status: "completed" },
  { id: 104, course: "Web Development Bootcamp", title: "CSS Flexbox Layout Challenge", due: "18 Sep 2026", status: "overdue" }
];

const MOCK_TESTIMONIALS = [
  { name: "Priya Nair", role: "B.Sc CS, Final Year", text: "The structured lessons and progress tracking made it easy to stay consistent with my learning every week." },
  { name: "Arjun Das", role: "B.Tech IT, 3rd Year", text: "I liked how each course broke big topics into small lessons. The assignments felt directly connected to what I learned." },
  { name: "Sneha Kulkarni", role: "MCA, 1st Year", text: "Clean dashboard, clear deadlines, and I always knew exactly how much of a course I had left to finish." }
];

const MOCK_ADMIN_STUDENTS = [
  { id: "STU2026041", name: "Rahul Mehta", email: "rahul.mehta@example.com", courses: 3, status: "active" },
  { id: "STU2026042", name: "Priya Nair", email: "priya.nair@example.com", courses: 2, status: "active" },
  { id: "STU2026043", name: "Arjun Das", email: "arjun.das@example.com", courses: 4, status: "active" },
  { id: "STU2026044", name: "Sneha Kulkarni", email: "sneha.k@example.com", courses: 1, status: "inactive" },
  { id: "STU2026045", name: "Vikram Singh", email: "vikram.singh@example.com", courses: 2, status: "active" }
];

const MOCK_ENROLLMENTS = [
  { student: "Rahul Mehta", course: "Web Development Bootcamp", date: "14 Jan 2026", status: "active" },
  { student: "Priya Nair", course: "Python for Data Analysis", date: "02 Feb 2026", status: "active" },
  { student: "Arjun Das", course: "Data Structures & Algorithms", date: "20 Feb 2026", status: "completed" },
  { student: "Sneha Kulkarni", course: "Database Management Systems", date: "05 Mar 2026", status: "active" }
];

const MOCK_SUBMISSIONS = [
  { student: "Rahul Mehta", assignment: "Library Management Class", course: "Java Programming Essentials", submitted: "27 Sep 2026", status: "submitted" },
  { student: "Priya Nair", assignment: "ER Diagram for Hospital System", course: "Database Management Systems", submitted: "19 Sep 2026", status: "completed" },
  { student: "Arjun Das", assignment: "CSS Flexbox Layout Challenge", course: "Web Development Bootcamp", submitted: "-", status: "overdue" }
];
