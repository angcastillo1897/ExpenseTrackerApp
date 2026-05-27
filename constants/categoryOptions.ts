export interface ColorOption {
    name: string;
    hex: string;
}

export interface IconOption {
    key: string;
    name: string;
}

export const CATEGORY_COLORS: ColorOption[] = [
    { name: "Rojo", hex: "#EF4444" },
    { name: "Naranja", hex: "#F97316" },
    { name: "Amarillo", hex: "#EAB308" },
    { name: "Verde", hex: "#22C55E" },
    { name: "Azul", hex: "#3B82F6" },
    { name: "Morado", hex: "#A855F7" },
    { name: "Rosa", hex: "#EC4899" },
    { name: "Gris", hex: "#6B7280" },
    { name: "Cian", hex: "#06B6D4" },
    { name: "Indigo", hex: "#6366F1" },
    { name: "Rojo Oscuro", hex: "#B91C1C" },
    { name: "Naranja Oscuro", hex: "#C2410C" },
    { name: "Ámbar Oscuro", hex: "#B45309" },
    { name: "Verde Oscuro", hex: "#15803D" },
    { name: "Verde Esmeralda", hex: "#047857" },
    { name: "Azul Oscuro", hex: "#1D4ED8" },
    { name: "Azul Profundo", hex: "#1E3A8A" },
    { name: "Morado Oscuro", hex: "#6B21A8" },
];

export const CATEGORY_ICONS: IconOption[] = [
    // 💰 Finanzas / ingresos
    { key: "dollar-sign", name: "Dólar" },
    { key: "money-bill", name: "Billete" },
    { key: "money-bill-wave", name: "Pago" },
    { key: "wallet", name: "Billetera" },
    { key: "piggy-bank", name: "Ahorros" },
    { key: "coins", name: "Monedas" },
    { key: "chart-line", name: "Ingresos" },

    // 🛒 Compras
    { key: "cart-shopping", name: "Carrito" },
    { key: "bag-shopping", name: "Compras" },
    { key: "store", name: "Tienda" },
    { key: "basket-shopping", name: "Canasta" },

    // 🍔 Comida
    { key: "utensils", name: "Comida" },
    { key: "burger", name: "Hamburguesa" },
    { key: "pizza-slice", name: "Pizza" },
    { key: "mug-hot", name: "Café" },

    // 🚗 Transporte
    { key: "car", name: "Auto" },
    { key: "bus", name: "Bus" },
    { key: "train", name: "Tren" },
    { key: "gas-pump", name: "Gasolina" },

    // 🏠 Hogar
    { key: "home", name: "Hogar" },
    { key: "couch", name: "Muebles" },
    { key: "lightbulb", name: "Luz" },
    { key: "toolbox", name: "Herramientas" },

    // 💼 Trabajo / negocio
    { key: "briefcase", name: "Trabajo" },
    { key: "building", name: "Empresa" },
    { key: "file-invoice-dollar", name: "Facturación" },

    // ❤️ Salud
    { key: "heart", name: "Salud" },
    { key: "hospital", name: "Hospital" },
    { key: "stethoscope", name: "Consulta" },
    { key: "pills", name: "Medicinas" },

    // 🎓 Educación
    { key: "book", name: "Libros" },
    { key: "graduation-cap", name: "Educación" },
    { key: "school", name: "Escuela" },

    // 🎮 Entretenimiento
    { key: "gamepad", name: "Juegos" },
    { key: "film", name: "Películas" },
    { key: "music", name: "Música" },
    { key: "tv", name: "Televisión" },

    // ✈️ Viajes
    { key: "plane", name: "Viajes" },
    { key: "hotel", name: "Hotel" },
    { key: "map", name: "Mapa" },

    // 👕 Personal
    { key: "shirt", name: "Ropa" },
    { key: "glasses", name: "Accesorios" },

    // 📱 Servicios / suscripciones
    { key: "mobile-screen", name: "Celular" },
    { key: "wifi", name: "Internet" },
    { key: "bolt", name: "Electricidad" },

    // 🏦 Bancos / pagos
    { key: "credit-card", name: "Tarjeta" },
    { key: "building-columns", name: "Banco" },
    { key: "receipt", name: "Recibo" },

    // 🎁 Otros
    { key: "gift", name: "Regalos" },
];
