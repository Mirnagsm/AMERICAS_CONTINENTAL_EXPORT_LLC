/**
 * AMERICAS CONTINENTAL EXPORT LLC
 * Configuración Global del Sitio Web
 * Basado en las especificaciones oficiales de la empresa
 */

const APP_CONFIG = {
  company: {
    name: "Americas Continental Export LLC",
    tagline: "Compra y Exportación de Repuestos para Maquinaria Pesada y Herramientas Industriales al Mayor y al Detal",
    shortDescription: "Suministro directo desde EE. UU. hacia toda Latinoamérica. Atención personalizada vía WhatsApp para cotizaciones transparentes con flete incluido a su destino.",
    salesModes: ["Ventas al Detal (Piezas individuales & Paro de Máquina)", "Ventas al Mayor (Contenedores, Talleres y Distribuidores)"],
    address: "Myrtle Beach, South Carolina, Estados Unidos",
    email: "ventas@americascontinentalexport.com",
    phoneDisplay: "+1 (843) 446-9786",
    // Número directo de WhatsApp Business
    whatsappNumber: "18434469786",
    hours: "Lunes a sábado: 6:00 a. m. – 6:00 p. m. (EST)",
    
    paymentMethods: [
      { name: "Bank of America (Wire / ACH)", icon: "landmark" },
      { name: "Transferencias Internacionales SWIFT", icon: "globe" },
      { name: "PayPal Comercial", icon: "credit-card" },
      { name: "Zelle Business", icon: "zap" }
    ],

    // Marcas Oficiales suministradas
    brands: {
      heavyMachinery: [
        "Caterpillar (CAT)",
        "Komatsu",
        "John Deere",
        "Volvo Construction Equipment",
        "CASE Construction Equipment",
        "Bobcat",
        "Hitachi",
        "JCB"
      ],
      industrialTools: [
        "Milwaukee",
        "Snap-on",
        "Bosch",
        "Makita",
        "Ingersoll Rand",
        "DEWALT"
      ],
      weldingEquipment: [
        "Miller Electric",
        "Lincoln Electric",
        "ESAB"
      ],
      landscapingGardening: [
        "Stihl",
        "Husqvarna",
        "Toro",
        "Echo",
        "Exmark",
        "Scag",
        "Bad Boy",
        "John Deere",
        "Kubota",
        "Hustler",
        "Gravely"
      ]
    }
  },
  colors: {
    yellow: "#FFD300",
    dark: "#292528",
    lightGray: "#DCDFD6"
  }
};

window.APP_CONFIG = APP_CONFIG;
