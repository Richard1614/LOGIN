// Alternar entre Login y Registro
document.getElementById("showLogin")?.addEventListener("click", () => {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("showLogin").classList.add("active");
    document.getElementById("showRegister").classList.remove("active");
});

document.getElementById("showRegister")?.addEventListener("click", () => {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("showRegister").classList.add("active");
    document.getElementById("showLogin").classList.remove("active");
});