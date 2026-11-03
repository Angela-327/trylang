/* =========================================================
   Phishing Awareness Simulation - script.js
   SAFETY: This script never reads the password value into a
   variable, never sends data anywhere (no fetch/XHR), and never
   uses localStorage, cookies, or a database. The only thing it
   remembers is a simple counter while the page stays open.
   ========================================================= */

// --- Grab the elements we need from the page ---
const loginView   = document.getElementById("login-view");
const resultView  = document.getElementById("result-view");
const form        = document.getElementById("login-form");
const emailInput  = document.getElementById("email");
const pwInput     = document.getElementById("password");
const emailError  = document.getElementById("email-error");
const pwError     = document.getElementById("password-error");
const togglePw    = document.getElementById("toggle-pw");
const loginBtn    = document.getElementById("login-btn");
const resetBtn    = document.getElementById("reset-btn");
const logTime     = document.getElementById("log-time");
const logCount    = document.getElementById("log-count");

// The ONLY thing we record: how many attempts happened (lives in memory only).
let attemptCount = 0;

/* ---------- Show / hide password ---------- */
togglePw.addEventListener("click", () => {
  const isHidden = pwInput.type === "password";
  pwInput.type = isHidden ? "text" : "password";   // flip the input type
  togglePw.textContent = isHidden ? "Hide" : "Show";
  togglePw.setAttribute("aria-pressed", String(isHidden));
  togglePw.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
});

/* ---------- Validation helpers ---------- */
// Show or clear an error message under a field.
function setError(input, errorEl, message) {
  errorEl.textContent = message;
  input.classList.toggle("invalid", Boolean(message));
}

// Returns true if the form looks complete. Only checks that fields are
// not empty, so the password's content is never examined or kept.
function validate() {
  let ok = true;

  const email = emailInput.value.trim();
  if (email === "") {
    setError(emailInput, emailError, "Enter your email or username.");
    ok = false;
  } else {
    setError(emailInput, emailError, "");
  }

  if (pwInput.value === "") {
    setError(pwInput, pwError, "Enter your password.");
    ok = false;
  } else {
    setError(pwInput, pwError, "");
  }

  return ok;
}

// Clear errors as soon as the user starts fixing a field.
emailInput.addEventListener("input", () => setError(emailInput, emailError, ""));
pwInput.addEventListener("input", () => setError(pwInput, pwError, ""));

/* ---------- Login button: simulate the "capture" ---------- */
form.addEventListener("submit", (event) => {
  event.preventDefault();          // stop the browser from actually submitting the form
  if (!validate()) return;

  loginBtn.disabled = true;
  loginBtn.textContent = "Signing in...";

  // Wipe what was typed right away. Nothing was copied, sent, or stored.
  form.reset();
  pwInput.type = "password";
  togglePw.textContent = "Show";

  // Short pause so it feels like a real sign-in, then reveal the lesson.
  setTimeout(() => {
    attemptCount += 1;                                  // record that an attempt happened
    logTime.textContent = new Date().toLocaleTimeString();
    logCount.textContent = attemptCount;

    loginView.classList.add("hidden");
    resultView.classList.remove("hidden");
    resultView.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 900);
});

/* ---------- Try again button ---------- */
resetBtn.addEventListener("click", () => {
  resultView.classList.add("hidden");
  loginView.classList.remove("hidden");
  loginBtn.disabled = false;
  loginBtn.textContent = "Log in";
  emailInput.focus();
});
