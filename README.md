# 🎬 Invitación al cine · Toy Story 5

Una invitación digital romántica e interactiva para invitar a tu novia a ver **Toy Story 5**. Hecha con HTML, CSS y JavaScript puro (sin dependencias), lista para desplegar en segundos.

## ✨ Qué incluye

- Pantalla de bienvenida con marquesina de cine y nubes estilo "el cielo de Andy".
- Un **ticket de cine** con el póster de Toy Story 5 y todos los detalles de la cita.
- Botón **"Sí"** que crece y botón **"No"** escurridizo 😅 (con mensajes tiernos).
- 🎉 **Confeti** animado al aceptar.
- ⏳ **Cuenta regresiva** hasta el día de la función.
- Diseño **responsive** (se ve genial en el celular).

## 🛠️ Personalización

Abre `script.js` y edita el bloque `CONFIG` al inicio:

```js
const CONFIG = {
  guestName: "Su nombre aquí 💛",          // Nombre que aparece en el ticket
  dateTime: "2026-07-18T19:30:00",        // Fecha y hora de la cita (o null)
  dateLabel: "Viernes 18 de julio, 7:30 pm",
  noMessages: [ /* tus frases tiernas */ ],
};
```

> Tip: si pones la fecha real en `dateTime`, la cuenta regresiva funcionará sola.


## 📁 Estructura

```
invitación/
├── index.html      # Estructura de la invitación
├── styles.css      # Estilos (tema Toy Story + cine)
├── script.js       # Interacciones, confeti y cuenta regresiva
└── README.md       # Este archivo
```

Hecho con 💛 para una función muy especial.
