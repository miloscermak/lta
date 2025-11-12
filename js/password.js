// ================================
// PASSWORD PROTECTION
// ================================

(function() {
    'use strict';

    const PASSWORD = 'lta25';
    const SESSION_KEY = 'lta_authenticated';

    // Check if already authenticated in this session
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
        return; // Already authenticated, show page
    }

    // Hide page content
    document.body.style.visibility = 'hidden';

    // Create password overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;

    overlay.innerHTML = `
        <div style="
            background: white;
            padding: 3rem;
            border-radius: 1.5rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            width: 90%;
            text-align: center;
        ">
            <div style="
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
                font-size: 2.5rem;
            ">
                🔒
            </div>

            <h2 style="
                font-size: 1.75rem;
                font-weight: 800;
                color: #111827;
                margin-bottom: 0.5rem;
            ">
                LTA Partners
            </h2>

            <p style="
                color: #6b7280;
                margin-bottom: 2rem;
                font-size: 1rem;
            ">
                Tento prototyp je chráněný heslem.<br>
                Zadejte heslo pro přístup.
            </p>

            <form id="passwordForm" style="margin-bottom: 1rem;">
                <input
                    type="password"
                    id="passwordInput"
                    placeholder="Zadejte heslo"
                    autocomplete="off"
                    style="
                        width: 100%;
                        padding: 1rem;
                        border: 2px solid #e5e7eb;
                        border-radius: 0.75rem;
                        font-size: 1rem;
                        font-family: inherit;
                        margin-bottom: 1rem;
                        transition: all 0.3s ease;
                    "
                />

                <button
                    type="submit"
                    style="
                        width: 100%;
                        padding: 1rem 2rem;
                        background: #059669;
                        color: white;
                        border: none;
                        border-radius: 0.75rem;
                        font-size: 1rem;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-family: inherit;
                    "
                    onmouseover="this.style.background='#047857'; this.style.transform='translateY(-2px)'"
                    onmouseout="this.style.background='#059669'; this.style.transform='translateY(0)'"
                >
                    Přihlásit se
                </button>
            </form>

            <p id="errorMessage" style="
                color: #dc2626;
                font-size: 0.875rem;
                margin-top: 1rem;
                display: none;
                font-weight: 600;
            ">
                ❌ Nesprávné heslo. Zkuste to znovu.
            </p>
        </div>
    `;

    document.body.appendChild(overlay);

    // Focus input
    const input = document.getElementById('passwordInput');
    const form = document.getElementById('passwordForm');
    const errorMessage = document.getElementById('errorMessage');

    setTimeout(() => input.focus(), 100);

    // Add focus style
    input.addEventListener('focus', function() {
        this.style.borderColor = '#059669';
        this.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
    });

    input.addEventListener('blur', function() {
        this.style.borderColor = '#e5e7eb';
        this.style.boxShadow = 'none';
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const enteredPassword = input.value;

        if (enteredPassword === PASSWORD) {
            // Correct password
            sessionStorage.setItem(SESSION_KEY, 'true');

            // Success animation
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
                overlay.remove();
                document.body.style.visibility = 'visible';
            }, 300);
        } else {
            // Wrong password
            errorMessage.style.display = 'block';
            input.value = '';
            input.focus();

            // Shake animation
            const loginBox = overlay.firstElementChild;
            loginBox.style.animation = 'shake 0.5s';

            setTimeout(() => {
                loginBox.style.animation = '';
            }, 500);
        }
    });

    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);

})();
