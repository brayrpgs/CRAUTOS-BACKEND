export const successAuthHTML = (token: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Autenticación exitosa</title>
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
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 0 35px rgba(0, 0, 0, 0.35);
        max-width: 420px;
        width: 100%;
      }

      .success-icon {
        width: 60px;
        height: 60px;
        margin: 0 auto 1.5rem;
        background: linear-gradient(135deg, #10b981, #059669);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        color: white;
        animation: scaleIn 0.5s cubic-bezier(.22,.9,.36,1);
      }

      @keyframes scaleIn {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
      }

      .spinner {
        border: 3px solid rgba(37, 99, 235, 0.25);
        border-top: 3px solid #2563eb;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        animation: spin 0.8s linear infinite;
        margin: 1.5rem auto 0;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      h2 {
        font-size: 1.4rem;
        margin-bottom: 0.6rem;
        font-weight: 700;
      }

      p {
        color: #cbd5e1;
        font-size: 0.95rem;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="success-icon">✓</div>
      <h2>¡Autenticación exitosa!</h2>
      <p>Redirigiendo al panel...</p>
      <div class="spinner"></div>
    </div>

    <script>
      (function() {
        const token = '${token}';
        const frontendUrl = '${process.env.FRONTEND_URL as string}';

        if (window.opener) {
          window.opener.postMessage(
            { type: 'AUTH_SUCCESS', token: token },
            frontendUrl
          );
          setTimeout(() => window.close(), 1500);
        } else {
          setTimeout(() => {
            window.location.href = frontendUrl + '/panel?token=' + token;
          }, 1500);
        }
      })();
    </script>
  </body>
</html>
`;
