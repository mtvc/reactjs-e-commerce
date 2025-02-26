function togglePasswords(num) {
  const togglePassword = document.querySelector(`#togglePassword${num}`);
  const password = document.querySelector(`#inputSifra${num}`);
  togglePassword.addEventListener("click", () => {
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    this.classList.toggle("bi-eye");
  });
  return;
}

export default togglePasswords;
