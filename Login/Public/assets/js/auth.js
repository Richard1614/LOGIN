// Configuración de Supabase (ya la tienes)
const SUPABASE_URL = "https://owyucmmgvcvkzqdmlihd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93eXVjbW1ndmN2a3pxZG1saWhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MjY0MTksImV4cCI6MjA2OTQwMjQxOX0.DBpgT5WNCRDjWZMk8D0z4Rm0RqutSrxSq5yMI9N_KTQ";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==== REGISTRO ====
if (document.getElementById("registerBtn")) {
    document.getElementById("registerBtn").addEventListener("click", async () => {
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;

        if (!email || !password) {
            showMessage("Por favor, completa todos los campos.", "error");
            return;
        }

        try {
            const { data, error } = await supabaseClient.auth.signUp({ 
                email, 
                password,
                options: {
                    emailRedirectTo: window.location.origin + "/dashboard.html" // Opcional: URL post-confirmación
                }
            });

            if (error) throw error;
            showMessage("¡Registro exitoso! Revisa tu correo para confirmar.", "success");
            // Limpiar campos después del registro
            document.getElementById("registerEmail").value = "";
            document.getElementById("registerPassword").value = "";
        } catch (error) {
            showMessage("Error: " + error.message, "error");
        }
    });
}

// ==== LOGIN ====
if (document.getElementById("loginBtn")) {
    document.getElementById("loginBtn").addEventListener("click", async () => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        if (!email || !password) {
            showMessage("Por favor, completa todos los campos.", "error");
            return;
        }

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
            if (error) throw error;
            window.location.href = "dashboard.html";
        } catch (error) {
            showMessage("Error: Credenciales incorrectas o usuario no registrado.", "error");
        }
    });
}

// ==== LOGOUT ====
if (document.getElementById("logoutBtn")) {
    document.getElementById("logoutBtn").addEventListener("click", async () => {
        await supabaseClient.auth.signOut();
        window.location.href = "index.html";
    });
}

// ==== PROTECCIÓN DE RUTAS + VERIFICACIÓN DE SESIÓN ====
(async () => {
    const currentPage = window.location.pathname.split("/").pop();
    const { data: { session }, error } = await supabaseClient.auth.getSession();

    // Redirigir si no hay sesión en páginas privadas
    if (currentPage === "dashboard.html" && !session) {
        window.location.href = "index.html";
    }

    // Redirigir si hay sesión en páginas públicas (ej: index.html)
    if ((currentPage === "index.html" || currentPage === "") && session) {
        window.location.href = "dashboard.html";
    }
})();

// ==== FUNCIÓN PARA MOSTRAR MENSAJES (FEEDBACK VISUAL) ====
function showMessage(message, type = "success") {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}