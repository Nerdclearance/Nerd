function showView(viewName) {
  document.querySelectorAll(".view").forEach(view => {
    view.classList.add("hidden");
  });

  const target = document.getElementById(viewName);

  if (target) {
    target.classList.remove("hidden");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   LOGIN
   ========================= */

function login(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    showToast("Please enter your email and password.");
    return;
  }

  const savedUser = JSON.parse(
    localStorage.getItem("nerdUser") || "null"
  );

  if (!savedUser) {
    showToast("No registered account was found.");
    return;
  }

  if (
    savedUser.email !== email ||
    savedUser.password !== password
  ) {
    showToast("Incorrect email or password.");
    return;
  }

  localStorage.setItem("nerdLoggedIn", "true");

  showToast("Login successful.");

  setTimeout(() => {
    showView("dashboard");
  }, 700);
}


/* =========================
   REGISTRATION
   ========================= */

function saveRegistration(event) {
  event.preventDefault();

  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;

  const firstName = document.getElementById("firstName")?.value.trim() || "";
  const middleName = document.getElementById("middleName")?.value.trim() || "";
  const surname = document.getElementById("surname")?.value.trim() || "";

  if (!email || !password || !firstName || !surname) {
    showToast("Please complete all required fields.");
    return;
  }

  if (password.length < 6) {
    showToast("Password must contain at least 6 characters.");
    return;
  }

  const user = {
    email: email,
    password: password,
    firstName: firstName,
    middleName: middleName,
    surname: surname
  };

  localStorage.setItem(
    "nerdUser",
    JSON.stringify(user)
  );

  localStorage.setItem(
    "nerdLoggedIn",
    "true"
  );

  showToast("Registration successful.");

  setTimeout(() => {
    showView("dashboard");
  }, 700);
}


/* =========================
   LOGOUT
   ========================= */

function logout() {
  localStorage.removeItem("nerdLoggedIn");

  showToast("You have been signed out.");

  setTimeout(() => {
    showView("landing");
  }, 500);
}


/* =========================
   TOAST MESSAGE
   ========================= */

function showToast(message) {

  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";

    document.body.appendChild(toast);
  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


/* =========================
   PAYMENT
   ========================= */

let paymentCompleted = false;

function makePayment() {

  const amount = 4500;

  /*
   * This is the required NERD
   * platform support payment.
   */

  if (amount !== 4500) {
    showToast("Invalid payment amount.");
    return;
  }

  /*
   * Demo payment completion.
   *
   * Connect this section to your
   * real payment gateway/backend
   * when ready.
   */

  paymentCompleted = true;

  localStorage.setItem(
    "nerdPaymentCompleted",
    "true"
  );

  showToast(
    "₦4,500 platform support payment completed."
  );

  setTimeout(() => {
    showView("upload");
  }, 800);
}


/* =========================
   PROJECT UPLOAD
   ========================= */

function handleProjectUpload(event) {

  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if (!allowedTypes.includes(file.type)) {

    showToast(
      "Only PDF, DOC and DOCX files are allowed."
    );

    event.target.value = "";
    return;
  }

  const maxSize = 10 * 1024 * 1024;

  if (file.size > maxSize) {

    showToast(
      "File size must not exceed 10MB."
    );

    event.target.value = "";
    return;
  }

  const fileName =
    document.getElementById("fileName");

  if (fileName) {
    fileName.textContent = file.name;
  }

  showToast(
    "Project selected successfully."
  );
}


/* =========================
   DRAG AND DROP
   ========================= */

function setupDropzone() {

  const dropzone =
    document.querySelector(".dropzone");

  const fileInput =
    document.getElementById("projectFile");

  if (!dropzone || !fileInput) {
    return;
  }

  dropzone.addEventListener(
    "dragover",
    event => {
      event.preventDefault();

      dropzone.classList.add("dragover");
    }
  );

  dropzone.addEventListener(
    "dragleave",
    () => {
      dropzone.classList.remove("dragover");
    }
  );

  dropzone.addEventListener(
    "drop",
    event => {

      event.preventDefault();

      dropzone.classList.remove("dragover");

      const file =
        event.dataTransfer.files[0];

      if (!file) {
        return;
      }

      fileInput.files =
        event.dataTransfer.files;

      fileInput.dispatchEvent(
        new Event("change")
      );
    }
  );
}


/* =========================
   PAYMENT METHOD
   ========================= */

function selectPaymentMethod(element) {

  document
    .querySelectorAll(".pay-method")
    .forEach(method => {
      method.classList.remove("selected");
    });

  element.classList.add("selected");
}


/* =========================
   INITIALIZATION
   ========================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    setupDropzone();

    const projectFile =
      document.getElementById("projectFile");

    if (projectFile) {

      projectFile.addEventListener(
        "change",
        handleProjectUpload
      );
    }

    /*
     * Restore payment state.
     */

    paymentCompleted =
      localStorage.getItem(
        "nerdPaymentCompleted"
      ) === "true";

    /*
     * Start on landing page.
     */

    showView("landing");
  }
);
