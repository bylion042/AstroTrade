const signInBtn = document.querySelector("#sign-in-btn");
const signUpBtn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

signUpBtn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

signInBtn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});








// PASSWORD EYE
document.addEventListener("DOMContentLoaded", () => {
  // Select all toggle password icons and their respective inputs
  const togglePasswords = document.querySelectorAll(".toggle-password");

  togglePasswords.forEach(togglePassword => {
    const passwordInput = togglePassword.previousElementSibling; // The input just before the toggle icon

    togglePassword.addEventListener("click", () => {
      // Toggle input type between "password" and "text"
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;

      // Toggle icon class between "eye" and "eye-off"
      togglePassword.innerHTML =
        type === "password"
          ? '<i class="ri-eye-line"></i>'
          : '<i class="ri-eye-off-line"></i>';
    });
  });
});
