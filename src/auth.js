// 1. Initialize Supabase (Replace with your actual URL and Key)
const SUPABASE_URL = 'https://xkjsaurodxakdaruerri.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhranNhdXJvZHhha2RhcnVlcnJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNTEzNTEsImV4cCI6MjA4NzcyNzM1MX0.6YFAkOsfxq2pqOlB0blYLZ1vpgfApepNB1M5dCjpB20';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Get the DOM Elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const messageDiv = document.getElementById('auth-message');

// Helper function to display messages on the screen
function showMessage(text, isError = false) {
    messageDiv.textContent = text;
    messageDiv.className = isError ? 'error-msg' : 'success-msg';
    messageDiv.style.display = 'block';
}

// 3. Register Function
registerBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        return showMessage("Please enter both email and password.", true);
    }

    showMessage("Registering...", false);

    // Call Supabase to create a new user
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        showMessage(error.message, true);
    } else {
        showMessage("Registration successful! You can now log in.", false);
        // Note: If you have "Email Confirmations" turned on in Supabase, 
        // they will need to check their email before logging in.
    }
});

// 4. Login Function
loginBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        return showMessage("Please enter both email and password.", true);
    }

    showMessage("Logging in...", false);

    // Call Supabase to verify credentials
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        showMessage("Invalid login credentials.", true);
    } else {
        showMessage("Login successful! Redirecting...", false);
        // Redirect the user to the dashboard
        window.location.href = 'dashboard.html';
    }
});

// 5. Auto-Redirect if already logged in
async function checkCurrentSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        // If they already logged in recently, skip the login page entirely
        window.location.href = 'dashboard.html';
    }
}

checkCurrentSession();