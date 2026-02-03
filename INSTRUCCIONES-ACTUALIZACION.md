# 🎓 English Master Academy - Actualización Completa

## ✅ Cambios Realizados

### 1. 💰 **Nuevos Precios**
- **Plan Mensual:** $4.99 USD/mes
- **Plan Anual:** $49.99 USD/año (pago único)
- Ahorro destacado de $10 en el plan anual

### 2. 🎁 **Sistema de Trial de 7 Días**
- Los usuarios pueden registrarse y obtener **7 días gratis** de acceso completo
- Durante el trial tienen acceso a TODO el contenido premium
- El banner de trial muestra los días restantes
- El modal de pago **NO aparece automáticamente** durante el trial
- Solo se muestra si el trial expira o el usuario hace clic en "Premium"

### 3. 📱 **Acceso Multi-Dispositivo (Hasta 3 Dispositivos)**
- Los usuarios pueden usar su cuenta en **hasta 3 dispositivos**
- El sistema detecta automáticamente cada dispositivo
- Si intenta usar un 4to dispositivo, se le pregunta si quiere cerrar sesión en el más antiguo
- Los dispositivos se sincronizan con Firebase

### 4. 🔄 **Sincronización con Firebase**
Los datos ahora se guardan y sincronizan con Firebase:
- Estado de suscripción premium
- Período de trial
- Lista de dispositivos activos
- Progreso del usuario

### 5. 📢 **Google AdSense Mejorado**
- Los anuncios **SOLO se muestran a usuarios FREE** (no registrados o con trial expirado)
- Los usuarios Premium y en Trial **NO ven anuncios**
- Se agregó un banner alternativo para promocionar Premium si AdSense no carga

---

## ⚙️ Configuración Necesaria

### Firebase (Ya configurado)
Tu configuración de Firebase ya está en el código:
```javascript
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBedxOc-6rzXMBWh_vgjF_Cd3gN4FLvG7M",
  authDomain: "english-master-academy-pro.firebaseapp.com",
  databaseURL: "https://english-master-academy-pro-default-rtdb.firebaseio.com",
  projectId: "english-master-academy-pro",
  // ...
};
```

### Estructura de Firebase Realtime Database
Asegúrate de tener estas reglas en Firebase:

```json
{
  "rules": {
    "users": {
      ".read": true,
      ".write": true
    },
    "premium_users": {
      ".read": true,
      ".write": true
    }
  }
}
```

### Google AdSense
Tu ID de publicador ya está configurado: `ca-pub-4675582977351575`

Para activar los anuncios:
1. Ve a [Google AdSense](https://www.google.com/adsense/)
2. Agrega tu sitio web
3. Espera la aprobación (puede tomar días o semanas)
4. Los anuncios aparecerán automáticamente

**Nota:** Mientras tanto, se mostrará un banner promocionando Premium.

---

## 🔧 Cómo Funciona el Sistema

### Flujo del Usuario Nuevo:
1. Usuario visita la app → Ve contenido limitado con anuncios
2. Después de 5 segundos → Se muestra modal de registro
3. Usuario se registra → Obtiene 7 días de trial GRATIS
4. Durante el trial → Acceso completo SIN anuncios
5. Trial expira → Vuelve a ser free con anuncios
6. Usuario puede comprar Premium en cualquier momento

### Flujo de Pago:
1. Usuario hace clic en "Premium"
2. Selecciona plan (Mensual $4.99 o Anual $49.99)
3. Selecciona método de pago (Transferencia/USDT/BTC)
4. Contacta por WhatsApp con los datos
5. Tú verificas el pago y activas en el Admin Panel

### Activar Premium desde Admin Panel:
1. Ve a `admin-panel.html`
2. Inicia sesión con `juanram0302@gmail.com`
3. Ingresa el email del usuario
4. Selecciona el plan
5. Clic en "Activar Premium"

---

## 📋 Comandos Útiles (Consola del Navegador)

```javascript
// Activar premium manualmente (para pruebas)
activatePremium('ADMIN-2025');

// Desactivar premium (para pruebas)
deactivatePremium();

// Ver usuario actual
console.log(currentUser);

// Ver estado premium
console.log('Premium:', isPremium, 'Trial:', isInTrial);
```

---

## 🚀 Despliegue

### Opción 1: GitHub Pages
1. Sube los archivos a GitHub
2. Activa GitHub Pages en Settings
3. Tu app estará en `https://tuusuario.github.io/repositorio/`

### Opción 2: Hosting de Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Opción 3: Netlify
1. Sube los archivos a Netlify
2. Tu app estará lista en minutos

---

## ❓ Preguntas Frecuentes

### ¿Los usuarios pueden usar la app sin registrarse?
Sí, pero tendrán acceso limitado y verán anuncios.

### ¿Qué pasa si un usuario tiene 3 dispositivos y quiere usar otro?
El sistema le pregunta si quiere cerrar sesión en el dispositivo más antiguo.

### ¿Los anuncios se muestran durante el trial?
NO. Los usuarios en trial tienen la misma experiencia que los premium.

### ¿Cómo verifico si un pago es válido?
Revisa tu cuenta bancaria/wallet y luego activa al usuario en el Admin Panel.

### ¿Puedo cambiar los precios después?
Sí, busca `$4.99` y `$49.99` en el código y cámbialos.

---

## 📞 Soporte

Si tienes problemas, contacta al desarrollador original.

---

**Última actualización:** Febrero 2026
