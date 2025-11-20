export const errorAuthHTML = (
  errorMessages: Record<string, string>,
  errorCode: string
) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error de autenticación</title>

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: system-ui, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        color: #ffffff;
        padding: 20px;
      }

      .container {
        text-align: center;
        padding: 2.4rem 2rem;
        background: rgba(30, 41, 59, 0.5);
        border-radius: 16px;
        backdrop-filter: blur(12px);
        border: 1px solid rgba(248, 113, 113, 0.3);
        box-shadow: 0 0 35px rgba(220, 38, 38, 0.28);
        max-width: 420px;
        width: 100%;
      }

      .error-icon {
        width: 60px;
        height: 60px;
        margin: 0 auto 1.5rem;
        border-radius: 50%;
        border: 2px solid #ef4444;
        color: #fca5a5;
        font-size: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(220, 38, 38, 0.15);
        animation: shake 0.5s ease;
      }

      @keyframes shake {
        0%,100% { transform: translateX(0); }
        25% { transform: translateX(-8px); }
        75% { transform: translateX(8px); }
      }

      h2 {
        font-size: 1.35rem;
        margin-bottom: 0.7rem;
        font-weight: 700;
        color: #fecaca;
      }

      p {
        color: #cbd5e1;
        font-size: 0.95rem;
        margin-bottom: 1.6rem;
      }

      button {
        width: 100%;
        padding: 0.85rem 1.5rem;
        background: rgba(255,255,255,0.08);
        border: 1px solid #cbd5e1;
        border-radius: 12px;
        color: white;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s ease;
      }

      button:hover {
        background: white;
        color: #0f172a;
        transform: translateY(-2px);
        box-shadow: 0 6px 14px rgba(255,255,255,0.2);
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="error-icon">✕</div>
      <h2>Error de autenticación</h2>
      <p>${errorMessages[errorCode]}</p>

      <button onclick="redirectToLogin()">Volver al login</button>
    </div>

    <script>
      function redirectToLogin() {
        const frontendUrl = '${process.env.FRONTEND_URL as string}';

        if (window.opener) {
          window.opener.postMessage(
            { type: 'AUTH_ERROR', error: '${errorCode}' },
            frontendUrl
          );
          setTimeout(() => window.close(), 300);
        } else {
          window.location.href = frontendUrl + '/login?error=${errorCode}';
        }
      }
    </script>
  </body>
</html>
`;
