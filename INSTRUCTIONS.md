# P4P Payment Integration Guide

Este documento es una guía paso a paso para que conectes las pasarelas de pago reales (PayPal y Coinbase Commerce) a tu tienda una vez que estés listo para recibir dinero de tus clientes.

### Actualmente
El "Checkout" (`src/app/checkout/page.tsx`) tiene una UI simulada (Sandbox) que espera 1.5 segundos e imita una transacción exitosa para que puedas experimentar la fluidez del diseño KITH x BOXRAW.

---

## 1. Integración de PayPal (Tarjetas, PayPal, Venmo)

PayPal te permite procesar tanto pagos con saldo PayPal como con tarjetas de crédito/débito en todo el mundo.

### Paso 1: Obtener el `Client ID`
1. Entra a [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications/sandbox).
2. Entra con tu cuenta de Negocios de PayPal.
3. Navega a **Apps & Credentials**.
4. Haz clic en **Create App** (Puedes crear una en modo 'Sandbox' para pruebas o 'Live' para el dinero real).
5. Copia el **Client ID**.

### Paso 2: Implementarlo en Next.js
En tu archivo del checkout, añade el paquete oficial de PayPal para React:
`npm install @paypal/react-paypal-js`

Envuelve el botón de pago con el componente oficial:
```tsx
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Dentro de tu return:
<PayPalScriptProvider options={{ "clientId": "TU_CLIENT_ID_AQUI" }}>
    <PayPalButtons 
        createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: total.toString() }
                }]
            });
        }}
        onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
                alert("Transaction completed by " + details.payer.name.given_name);
                // Aquí rediriges a la página /success
            });
        }}
    />
</PayPalScriptProvider>
```

---

## 2. Integración de Coinbase Commerce (Crypto)

Coinbase Commerce es la mejor forma de que una marca audaz de MMA acepte pagos en criptomonedas (BTC, ETH, USDC, etc.) sin intermediarios invasivos.

### Paso 1: Obtener la API
1. Entra a [Coinbase Commerce](https://commerce.coinbase.com/).
2. Regístrate o Inicia Sesión.
3. Ve a **Settings > Security** y busca tu **API Key**.

### Paso 2: Implementarlo en Next.js
Las tiendas hechas a medida suelen generar un "Charge" mediante una ruta en el backend de Next.js (`src/app/api/charge/route.ts`). 

1. El usuario hace clic en "Pay with Crypto".
2. Tu frontend llama a tu backend.
3. El backend llama a la API de Coinbase Commerce y te devuelve un `hosted_url`.
4. Rediriges al usuario a ese enlace, donde paga, y Coinbase lo devuelve automáticamente a tu página `/success`.

Instala la librería en el backend (opcional):
`npm install coinbase-commerce-node`
