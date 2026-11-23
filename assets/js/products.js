/**
 * CATÁLOGO DE PRODUCTOS Y REPUESTOS OFICIALES
 * AMERICAS CONTINENTAL EXPORT LLC
 * Con nombres y descripciones que coinciden 100% con las imágenes reales
 */

const PRODUCT_CATEGORIES = [
  { id: "all", name: "Todos los Productos", icon: "grid" },
  { id: "maquinaria-pesada", name: "Repuestos de Maquinaria Pesada", icon: "disc" },
  { id: "motores-inyeccion", name: "Bombas de Inyección & Hidráulicas", icon: "droplet" },
  { id: "hidraulico-sellos", name: "Hidráulica & Sellos", icon: "droplet" },
  { id: "filtros-pm", name: "Filtros & Mantenimiento", icon: "shield" },
  { id: "herramientas-taller", name: "Herramientas Industriales", icon: "tool" },
  { id: "soldadura", name: "Equipos de Soldadura", icon: "zap" },
  { id: "jardineria-paisajismo", name: "Jardinería & Paisajismo", icon: "wind" }
];

const PRODUCTS_DATA = [
  // --- BOMBAS DE INYECCIÓN, HIDRÁULICA & MÓDULOS ELECTRÓNICOS ---
  {
    id: "prod-001",
    name: "Bomba de Inyección de Combustible Diésel Common Rail",
    category: "motores-inyeccion",
    categoryName: "Inyección Diésel",
    brand: "Bosch / Denso / Caterpillar",
    code: "BOM-INJ-CR / 319-0678",
    image: "productos/bomba-inyeccion-diesel-common-rail.jpeg",
    tags: ["Bomba Inyección", "Diésel", "Common Rail", "Combustible", "CAT C7/C9"],
    badge: "Inyección Diésel",
    shortDesc: "Bomba de inyección diésel de alta presión para motores pesados. Suministro calibrado con precisión micrométrica para máxima potencia y rendimiento.",
    specs: {
      "Sistema": "Common Rail / Inyección Diésel de Alta Presión",
      "Presión de Inyección": "Hasta 2,000 bar continua",
      "Compatibilidad": "Caterpillar, Komatsu, Cummins y motores diésel industriales",
      "Calibración": "100% testeada en banco de pruebas bajo especificaciones de fábrica"
    }
  },
  {
    id: "prod-002",
    name: "Computadora y Módulo de Control Electrónico ECM / ECU",
    category: "motores-inyeccion",
    categoryName: "Computadoras & Módulos ECM",
    brand: "Caterpillar / Delphi / Bosch",
    code: "ECM-A4E4 / 372-2905",
    image: "productos/computadora-modulo-control-ecm.jpeg",
    tags: ["Computadora", "ECM", "ECU", "Eléctrico", "Programada"],
    badge: "Flasheado por VIN",
    shortDesc: "Módulo electrónico central sellado con disipador de calor y conector multipin. Se despacha programado con archivos de fábrica según el VIN de su equipo.",
    specs: {
      "Voltaje": "24V DC blindado",
      "Programación": "Incluida según modelo y serie del equipo",
      "Protección": "IP67 resistente a vibración y humedad extrema"
    }
  },
  {
    id: "prod-004",
    name: "Kit de Componentes Eléctricos (Arranque, Alternador, Sensores & Relés)",
    category: "motores-inyeccion",
    categoryName: "Componentes Eléctricos 24V",
    brand: "Delco Remy / Prestolite / Bosch",
    code: "KIT-ELEC-24V / 10461758",
    image: "productos/componentes-electricos-arranque-alternador.jpeg",
    tags: ["Motor Arranque", "Alternador", "Sensores", "Relés", "24V"],
    badge: "Pack Completo",
    shortDesc: "Solución eléctrica integral con motor de arranque 24V de alto torque, alternador industrial, relés de solenoide y sensores de presión y temperatura.",
    specs: {
      "Voltaje Nominal": "24 Voltios Heavy Duty",
      "Aplicación": "Maquinaria pesada CAT, Komatsu, Case, John Deere",
      "Garantía": "12 Meses"
    }
  },

  // --- FILTROS & SELLOS ---
  {
    id: "prod-005",
    name: "Kit Integral de Filtros de Mantenimiento Preventivo (PM Kit)",
    category: "filtros-pm",
    categoryName: "Filtros & Mantenimiento",
    brand: "Donaldson / Fleetguard / CAT",
    code: "FLT-PM-KIT / 1R-0751",
    image: "productos/kit-filtros-mantenimiento-maquinaria.jpeg",
    tags: ["Filtros", "Donaldson", "Fleetguard", "Aceite", "Diésel", "Aire"],
    badge: "Alta Demanda",
    shortDesc: "Kits de filtración multietapa: filtros de aceite de motor, separadores de agua de combustible y filtros de aire primario y secundario.",
    specs: {
      "Eficiencia": "99.9% de retención desde 4 micras",
      "Modalidad": "Kits para 500 y 1000 horas / Cajas al Mayor",
      "Protección": "Máxima protección del sistema de inyección"
    }
  },
  {
    id: "prod-006",
    name: "Kit de Sellos, O-Rings y Empaquetaduras Hidráulicas en Viton/Nitrilo",
    category: "hidraulico-sellos",
    categoryName: "Hidráulica & Sellos",
    brand: "NOK / Parker / CAT OEM",
    code: "SEAL-KIT-HYD / 270-1528",
    image: "productos/kit-sellos-empaquetaduras-hidraulicas.jpeg",
    tags: ["Sellos", "Gomas", "O-Rings", "Viton", "Hidráulico", "Empaquetaduras"],
    badge: "Cero Fugas",
    shortDesc: "Kit surtido de O-rings y sellos de poliuretano, Viton y nitrilo 90 Shore A para cilindros de pluma, balde, acoples y válvulas de alta presión.",
    specs: {
      "Temperatura": "-35°C hasta +220°C",
      "Resistencia": "Presión pulsante hasta 500 bar",
      "Venta": "Kits específicos por modelo o cajas surtidas taller"
    }
  },

  // --- HERRAMIENTAS INDUSTRIALES DE ALTA PRECISIÓN ---
  {
    id: "prod-007",
    name: "Engrasadora Inalámbrica Milwaukee M18 FUEL de 2 Velocidades",
    category: "herramientas-taller",
    categoryName: "Herramientas Industriales",
    brand: "Milwaukee M18 FUEL",
    code: "MLW-2646-20 / M18GG",
    image: "productos/engrasadora-inalambrica-milwaukee-m18.jpeg",
    tags: ["Milwaukee", "Engrasadora", "M18", "Herramienta", "Taller"],
    badge: "Máxima Presión",
    shortDesc: "Pistola de engrase a batería para mantenimiento de orugas, articulaciones y bujes de maquinaria pesada sin esfuerzo manual.",
    specs: {
      "Presión Máxima": "10,000 PSI",
      "Caudal": "Hasta 280 g/minuto",
      "Batería": "Sistema RedLithium M18 compatible"
    }
  },
  {
    id: "prod-008",
    name: "Kit Combo Taladro Percutor y Llave de Impacto Milwaukee M18 FUEL",
    category: "herramientas-taller",
    categoryName: "Herramientas Industriales",
    brand: "Milwaukee M18 FUEL",
    code: "MLW-2997-22 / COMBO",
    image: "productos/kit-combo-taladro-impacto-milwaukee-m18.jpeg",
    tags: ["Milwaukee", "Taladro", "Impacto", "Inalámbrico", "M18 FUEL"],
    badge: "Alto Torque Mecánico",
    shortDesc: "Combo insignia para mecánica pesada con tecnología FUEL Brushless: llave de impacto de alto torque (1,400 ft-lbs), taladro percutor de mandril metálico, baterías RedLithium XC5.0 y bolso contratista.",
    specs: {
      "Torque Impacto": "Hasta 1,400 ft-lbs de desprendimiento",
      "Tecnología": "Motor Brushless POWERSTATE con baterías RedLithium XC5.0",
      "Incluye": "Taladro 1/2\", Llave de Impacto 1/2\", 2 Baterías 5.0Ah, Cargador rápido y Bolso"
    }
  },
  {
    id: "prod-009",
    name: "Caja de Herramientas y Juego de Dados Snap-on en Maletín Rígido",
    category: "herramientas-taller",
    categoryName: "Herramientas Industriales",
    brand: "Snap-on USA",
    code: "SNAP-SET-RED / 3/8-1/2",
    image: "productos/caja-herramientas-dados-snapon-maletin-rojo.jpeg",
    tags: ["Snap-on", "Herramientas", "Dados", "Chicharra", "Taller Pesado"],
    badge: "Garantía de por Vida",
    shortDesc: "Juego profesional de copas, extensiones y chicharras de precisión de grado aeronáutico e industrial en estuche rojo de alto impacto.",
    specs: {
      "Acero": "Aleación de acero al cromo vanadio forjado Snap-on",
      "Mando": "Encastres 3/8\" y 1/2\" métricos y en pulgadas",
      "Fabricación": "Made in USA"
    }
  },
  {
    id: "prod-010",
    name: "Llave de Impacto a Batería Snap-on Verde Alta Potencia",
    category: "herramientas-taller",
    categoryName: "Herramientas Industriales",
    brand: "Snap-on USA",
    code: "SNAP-CT9080-GREEN",
    image: "productos/llave-impacto-snapon-verde-alta-potencia.jpeg",
    tags: ["Snap-on", "Pistola Impacto", "Verde", "Alto Torque", "Batería"],
    badge: "Alta Gama Taller",
    shortDesc: "Pistola de impacto inalámbrica para desarmar tuercas de ruedas gigantes, zapatas de oruga y mandos finales sin compresor.",
    specs: {
      "Torque": "1,050 ft-lbs de apriete / 1,450 ft-lbs de afloje",
      "Encastre": "1/2\" con anillo de retención tipo fricción",
      "Color": "Verde Snap-on Hi-Viz"
    }
  },
  {
    id: "prod-011",
    name: "Juego de Llaves de Obstrucción Media Luna (Half-Moon) Snap-on",
    category: "herramientas-taller",
    categoryName: "Herramientas Industriales",
    brand: "Snap-on USA",
    code: "SNAP-HALFMOON / CX605",
    image: "productos/torquimetro-micrometrico-precision-industrial.jpeg",
    tags: ["Snap-on", "Llaves Curvas", "Media Luna", "Obstrucción", "Taller"],
    badge: "Acero Forjado USA",
    shortDesc: "Juego de llaves curvas tipo media luna de doble corona de estría para acceso en espacios sumamente reducidos de motores y bombas.",
    specs: {
      "Tipo": "Llaves de media luna de doble corona (Half-Moon)",
      "Tecnología": "Flank Drive para evitar el redondeo de pernos",
      "Uso": "Mecánica pesada, motores diésel y lugares confinados"
    }
  },
  {
    id: "prod-012",
    name: "Juego de Llaves de Trinquete (Ratchet) Industriales",
    category: "herramientas-taller",
    categoryName: "Herramientas Industriales",
    brand: "Snap-on / Williams",
    code: "SET-RATCHET-WRENCH / 8-19MM",
    image: "productos/juego-llaves-combinadas-destornilladores-taller.jpeg",
    tags: ["Llaves Trinquete", "Ratchet", "Mecánica", "Taller", "Cromo"],
    badge: "Ratchet 72 Dientes",
    shortDesc: "Juego de llaves métricas de corona con mecanismo de trinquete de 72 dientes para avance rápido sin retirar la herramienta.",
    specs: {
      "Mecanismo": "Trinquete reversible con corona dentada de 72 dientes",
      "Medidas": "Juego métrico continuo para taller mecánico",
      "Acabado": "Cromo pulido resistente a la corrosión"
    }
  },
  {
    id: "prod-016",
    name: "Kit Combo de Herramientas Inalámbricas Makita LXT (Taladro & Sierra)",
    category: "herramientas-taller",
    categoryName: "Herramientas Industriales",
    brand: "Makita",
    code: "MAK-COMBO-LXT / 18V",
    image: "productos/cortacesped-giro-cero-zero-turn-naranja.jpeg",
    tags: ["Makita", "LXT", "Inalámbrico", "Sierra Sable", "Mantenimiento"],
    badge: "Corte & Mantenimiento",
    shortDesc: "Kit inalámbrico versátil para corte, perforación y mantenimiento en terreno: incluye sierra recíproca de cambio rápido de hoja sin llave, taladro compacto de velocidad variable y cargador balanceado LXT.",
    specs: {
      "Plataforma": "Makita LXT 18V Lithium-Ion de alta autonomía",
      "Herramientas Clave": "Sierra sable recíproca de carrera larga + taladro atornillador",
      "Incluye": "2 Baterías 18V LXT, Cargador rápido balanceado y Bolso de lona reforzado"
    }
  },
  {
    id: "prod-017",
    name: "Pistola de Impacto Neumática Heavy Duty Ingersoll Rand 2235TiMAX",
    category: "herramientas-taller",
    categoryName: "Herramientas Industriales",
    brand: "Ingersoll Rand",
    code: "IR-2235TIMAX / 1/2INCH",
    image: "productos/desmalezadora-motoguadana-stihl-profesional.jpeg",
    tags: ["Ingersoll Rand", "Pistola Neumática", "Impacto", "Titanio", "1/2"],
    badge: "Titanium Heavy Duty",
    shortDesc: "Pistola de impacto neumática de 1/2 pulgada con carcasa de titanio y mecanismo de doble martillo TwinHammer para mecánica pesada.",
    specs: {
      "Torque de Rotura": "1,350 ft-lbs (1,830 Nm)",
      "Mecanismo": "TwinHammer con caja de titanio",
      "Encastre": "Cuadrante de 1/2\" con anillo retenedor"
    }
  },
  {
    id: "prod-018",
    name: "Kit Combo de Herramientas Inalámbricas Bosch Professional 18V",
    category: "herramientas-taller",
    categoryName: "Herramientas Industriales",
    brand: "Bosch Professional",
    code: "BOSCH-COMBO-18V / PRO",
    image: "productos/sopladora-mochila-husqvarna-alta-capacidad.jpeg",
    tags: ["Bosch", "Inalámbrico", "Línea Azul", "CoolPack", "Taller"],
    badge: "Protección CoolPack",
    shortDesc: "Set industrial con protección electrónica de motor (EMP) y baterías CoolPack de disipación térmica: taladro atornillador percutor heavy duty, sierra sable y bolso de transporte para taller e industria.",
    specs: {
      "Plataforma": "Bosch Professional 18V Heavy Duty System",
      "Baterías": "Celdas de litio CoolPack resistentes a sobrecalentamiento",
      "Protección": "Electrónica EMP y ECP contra sobrecargas y bloqueo de motor"
    }
  },

  // --- EQUIPOS & REPUESTOS DE JARDINERÍA, PAISAJISMO & FORESTAL ---
  {
    id: "prod-019",
    name: "Cortacésped Comercial de Giro Cero (Zero Turn Mower)",
    category: "jardineria-paisajismo",
    categoryName: "Jardinería & Paisajismo",
    brand: "Husqvarna / Bad Boy / Kubota",
    code: "ZT-MOWER-60 / COMM",
    image: "productos/motosierra-profesional-tala-stihl-husqvarna.jpeg",
    tags: ["Zero Turn", "Giro Cero", "Cortacésped", "Paisajismo", "Naranja"],
    badge: "Comercial Pesado",
    shortDesc: "Cortacésped comercial de giro cero con plataforma de corte de acero reforzado, doble mando hidrostático y motor de alta cilindrada.",
    specs: {
      "Plataforma de Corte": "54\" a 60\" de ancho de corte de alta succión",
      "Transmisión": "Doble transmisión hidrostática integrada",
      "Velocidad": "Corte de alta velocidad para grandes terrenos"
    }
  },
  {
    id: "prod-021",
    name: "Sopladora Profesional de Mochila Husqvarna 580BTS",
    category: "jardineria-paisajismo",
    categoryName: "Jardinería & Paisajismo",
    brand: "Husqvarna",
    code: "HUSQ-580BTS / BLOWER",
    image: "productos/tractor-cortacesped-asiento-jardineria.jpeg",
    tags: ["Sopladora", "Husqvarna", "Mochila", "580BTS", "Paisajismo"],
    badge: "Máximo Caudal de Aire",
    shortDesc: "Sopladora dorsal de mochila más potente de su clase con motor X-Torq, arnés acolchado y filtro de aire de dos etapas para trabajo continuo.",
    specs: {
      "Caudal de Aire": "Hasta 1,000 CFM en tubo",
      "Velocidad del Aire": "Más de 350 km/h (92 m/s)",
      "Motor": "X-Torq comercial de bajo consumo"
    }
  },
  {
    id: "prod-022",
    name: "Motosierra Profesional para Tala y Despeje Husqvarna 372XP",
    category: "jardineria-paisajismo",
    categoryName: "Jardinería & Paisajismo",
    brand: "Husqvarna",
    code: "HUSQ-372XP / PRO",
    image: "productos/cortadora-cesped-autopropulsada-recolector.jpeg",
    tags: ["Motosierra", "Husqvarna 372XP", "Tala", "Troncos", "Forestal"],
    badge: "Tala Severa 71cc",
    shortDesc: "Motosierra tradicional de gran porte para trabajo forestal pesado. Diseñada para derribo de árboles de gran diámetro y jornadas de corte continuo con espada larga.",
    specs: {
      "Cilindrada / Potencia": "70.7 cc (5.3 HP)",
      "Espada Recomendada": "Espadas de 20\", 24\" y 28\" X-Force",
      "Uso Principal": "Tala pesada y trozado de maderas duras"
    }
  },
  {
    id: "prod-023",
    name: "Motosierra de Alta Tecnología AutoTune Husqvarna 572XP",
    category: "jardineria-paisajismo",
    categoryName: "Jardinería & Paisajismo",
    brand: "Husqvarna",
    code: "HUSQ-572XP / AUTOTUNE",
    image: "productos/desbrozadora-forestal-disco-corte.jpeg",
    tags: ["Motosierra", "Husqvarna 572XP", "AutoTune", "Alta Aceleración", "Aserradero"],
    badge: "AutoTune™ Electrónico",
    shortDesc: "Motosierra forestal moderna con microprocesador AutoTune™ que calibra la mezcla en tiempo real según altitud y temperatura. Máxima aceleración para desrame y volteo técnico.",
    specs: {
      "Tecnología": "Inyección y carburación electrónica AutoTune™ continua",
      "Cilindrada / Salida": "70.6 cc (5.8 HP de respuesta inmediata)",
      "Capacidad de Corte": "12% mayor velocidad de corte que modelos convencionales"
    }
  },
  {
    id: "prod-024",
    name: "Desmalezadora / Motoguadaña Profesional con Manillar Doble",
    category: "jardineria-paisajismo",
    categoryName: "Jardinería & Paisajismo",
    brand: "Stihl / Husqvarna",
    code: "DESM-PRO-MANILLAR / 45CC",
    image: "productos/ahoyadora-barrenadora-suelo-gasolina.jpeg",
    tags: ["Desmalezadora", "Motoguadaña", "Manillar Doble", "Maleza", "Stihl"],
    badge: "Manillar Ergonómico",
    shortDesc: "Desmalezadora de eje rígido para corte de maleza densa, rastrojos y mantenimiento de campos y taludes con manillar tipo bicicleta.",
    specs: {
      "Manillar": "Doble manillar asimétrico tipo bicicleta con acelerador integrado",
      "Herramientas": "Cabezal de tanza de nylon y disco metálico de corte",
      "Transmisión": "Eje cardánico de acero macizo"
    }
  },
  {
    id: "prod-025",
    name: "Cortadora de Césped Autopropulsada Comercial con Recolector",
    category: "jardineria-paisajismo",
    categoryName: "Jardinería & Paisajismo",
    brand: "Honda / Toro / Husqvarna",
    code: "MOW-WALK-21 / COMM",
    image: "productos/podadora-altura-telescopica-sierra.jpeg",
    tags: ["Cortadora Césped", "Autopropulsada", "Recolector", "Jardín"],
    badge: "Autopropulsada",
    shortDesc: "Cortadora de césped comercial de 21 pulgadas con tracción autopropulsada, chasis de acero de alta resistencia y bolsa recolectora trasera.",
    specs: {
      "Tracción": "Autopropulsada en ruedas traseras",
      "Sistema de Corte": "Cuchilla doble con mulching y descarga trasera",
      "Ancho de Corte": "21 pulgadas (53 cm)"
    }
  },
  {
    id: "prod-026",
    name: "Tractor Podador de Jardinería John Deere Serie D/E",
    category: "jardineria-paisajismo",
    categoryName: "Jardinería & Paisajismo",
    brand: "John Deere",
    code: "JD-E140 / LAWN-TRACTOR",
    image: "productos/tractor-podador-jardineria-john-deere.jpeg",
    tags: ["John Deere", "Tractor", "Verde", "Paisajismo", "Mower"],
    badge: "Genuino John Deere",
    shortDesc: "Tractor cortacésped insignia John Deere con sistema de corte Edge, asiento ergonómico con suspensión y transmisión hidrostática suave.",
    specs: {
      "Plataforma": "48 pulgadas con 3 cuchillas de alta succión",
      "Repuestos": "Filtros, correas, cuchillas y poleas disponibles"
    }
  },

  // --- REPUESTOS DE MAQUINARIA PESADA (SOLO REPUESTOS) ---
  {
    id: "prod-027",
    name: "Repuestos para Retroexcavadoras 4x4 (CAT / Case / JCB)",
    category: "maquinaria-pesada",
    categoryName: "Repuestos de Maquinaria Pesada",
    brand: "Caterpillar / Case / JCB",
    code: "CAT-420F / CASE-580N",
    image: "productos/retroexcavadora-sobre-ruedas-cat-case.jpeg",
    tags: ["Retroexcavadora", "CAT 420", "Case 580", "Mandos Finales", "Cilindros"],
    badge: "Solo Repuestos",
    shortDesc: "Componentes mecánicos e hidráulicos de reposición: mandos finales 4WD, vástagos y sellos de cilindro estabilizador, bombas tándem y baldes. Venta exclusiva de partes y piezas (no vendemos el equipo completo).",
    specs: {
      "Línea": "Venta exclusiva de partes y piezas de recambio",
      "Componentes Clave": "Transmisión 4WD, crucetas, corona/piñón de diferencial y cilindros",
      "Compatibilidad": "CAT 416/420, Case 580 Super M/N, JCB 3CX y similares"
    }
  },
  {
    id: "prod-028",
    name: "Repuestos para Excavadoras de Orugas (John Deere / CAT / Komatsu)",
    category: "maquinaria-pesada",
    categoryName: "Repuestos de Maquinaria Pesada",
    brand: "John Deere / Hitachi / Caterpillar",
    code: "JD-210G / HITACHI-ZX200",
    image: "productos/excavadora-hidraulica-orugas-john-deere.jpeg",
    tags: ["Excavadora", "Orugas", "Tren de Rodaje", "Cadenas", "Bombas Hidráulicas"],
    badge: "Solo Repuestos",
    shortDesc: "Despiece integral y componentes de recambio para excavación: eslabones de cadena, zapatas, rodillos de soporte, bombas hidráulicas de caudal variable y motores de giro. Venta exclusiva de piezas de reposición.",
    specs: {
      "Línea": "Venta exclusiva de componentes y partes de recambio",
      "Tren de Rodaje": "Cadenas selladas y lubricadas (SALT), zapatas de triple garra y sprockets",
      "Hidráulica": "Bombas principales de pistones, distribuidores y reductores de giro"
    }
  },
  {
    id: "prod-029",
    name: "Repuestos para Cargadores Frontales (CAT / Komatsu)",
    category: "maquinaria-pesada",
    categoryName: "Repuestos de Maquinaria Pesada",
    brand: "Caterpillar / Komatsu",
    code: "CAT-950H / KOM-WA380",
    image: "productos/cargador-frontal-sobre-ruedas-cat.jpeg",
    tags: ["Cargador Frontal", "Wheel Loader", "Convertidor Par", "Cuchillas Balde", "CAT 950"],
    badge: "Solo Repuestos",
    shortDesc: "Kits de desgaste y tren de fuerza: cuchillas de balde en acero al boro, convertidores de torque, discos de fricción de transmisión y pernos de articulación central. Suministro focalizado únicamente en repuestos.",
    specs: {
      "Línea": "Suministro focalizado únicamente en repuestos y partes de desgaste",
      "Transmisión": "Discos de embrague powershift, sellos de convertidor y bombas de carga",
      "Herramientas de Corte": "Cuchillas reversibles empernables, esquineros y adaptadores de dientes"
    }
  },
  {
    id: "prod-030",
    name: "Repuestos para Minicargadores sobre Ruedas (Skid Steer Bobcat / CAT)",
    category: "maquinaria-pesada",
    categoryName: "Repuestos de Maquinaria Pesada",
    brand: "Bobcat / Caterpillar",
    code: "SKID-WHEEL-REP / S650",
    image: "productos/minicargador-compacto-skid-steer-bobcat.jpeg",
    tags: ["Minicargador Ruedas", "Skid Steer", "Neumáticos Sólidos", "Bobcat", "CAT 246D"],
    badge: "Solo Repuestos",
    shortDesc: "Línea de refacciones para chasis sobre neumáticos: llantas antipinchazo, bombas hidrostáticas de dirección, cadenas de mando final en baño de aceite y bujes de brazo (venta exclusiva de repuestos).",
    specs: {
      "Chasis": "Minicargadores de 4 ruedas / Skid Steer Loaders",
      "Componentes Clave": "Neumáticos industriales 10x16.5 / 12x16.5, bombas tándem hidrostáticas",
      "Suministro": "Exclusivamente partes, repuestos y filtros de recambio"
    }
  },
  {
    id: "prod-031",
    name: "Tren de Rodaje y Repuestos para Minicargadores de Orugas (CTL Bobcat / Kubota)",
    category: "maquinaria-pesada",
    categoryName: "Repuestos de Maquinaria Pesada",
    brand: "Bobcat / Kubota / Caterpillar",
    code: "CTL-TRACK-REP / T770",
    image: "productos/motoniveladora-equipo-nivelacion-pesada.jpeg",
    tags: ["Orugas de Caucho", "Compact Track Loader", "Tren de Rodaje", "Bobcat T770", "Kubota SVL"],
    badge: "Solo Repuestos",
    shortDesc: "Componentes de desgaste para orugas de goma en terrenos blandos o rocosos: bandas de caucho con alma de acero, rodillos inferiores sellados, ruedas tensoras y mandos de traslación (solo partes de recambio).",
    specs: {
      "Tren de Rodaje": "Orugas de goma de paso ancho/estrecho con tecnología anti-descarrilamiento",
      "Componentes": "Ruedas motrices (sprockets), rodillos triples sellados y cilindros tensores",
      "Suministro": "Venta exclusiva de repuestos y componentes de desgaste"
    }
  },
  {
    id: "prod-032",
    name: "Bomba Hidráulica de Engranajes para Maquinaria Pesada",
    category: "motores-inyeccion",
    categoryName: "Bombas Hidráulicas",
    brand: "Caterpillar / Komatsu / Parker",
    code: "BOM-HID-YELLOW",
    image: "productos/bomba-hidraulica-engranajes-amarilla.jpeg",
    tags: ["Bomba Hidráulica", "Hidráulico", "Engranajes", "Presión", "CAT"],
    badge: "Alta Presión",
    shortDesc: "Bomba hidráulica de engranajes y caudal positivo para sistemas principales, de levante y pilotaje en maquinaria pesada.",
    specs: {
      "Tipo": "Bomba Hidráulica de Engranajes / Pistones",
      "Aplicación": "Sistemas de levante, dirección y circuitos hidráulicos",
      "Garantía": "100% probada bajo especificaciones OEM"
    }
  },

  // --- EQUIPOS DE SOLDADURA PROFESIONAL & INDUSTRIAL ---
  {
    id: "prod-weld-001",
    name: "Miller Multimatic 215 PRO (Soldadora Eléctrica Multiproceso de Taller)",
    category: "soldadura",
    categoryName: "Multiproceso (MIG, TIG, Stick)",
    brand: "Miller Electric",
    code: "MIL-MULTIMATIC-215",
    image: "productos/miller-multimatic-215-pro.jpeg",
    tags: ["Soldadora", "Miller", "Multimatic 215", "Multiproceso", "MIG", "TIG", "Stick", "Auto-Set"],
    badge: "Multiproceso (120V / 240V)",
    shortDesc: "Equipo inverter portátil que funciona conectado a corriente de 120 V o 240 V. Permite soldar con MIG, alambre tubular (Flux-Cored), electrodo (Stick) y TIG DC, con pantalla digital y ajustes automáticos (Auto-Set).",
    specs: {
      "Procesos": "Multiproceso: MIG (GMAW), Flux-Cored (FCAW), Electrodo (SMAW) y TIG DC (GTAW)",
      "Voltaje de Entrada": "Doble voltaje 120 V / 240 V (tecnología multi-voltaje MVP™)",
      "Tecnología": "Pantalla LCD a color con configuración automática Auto-Set™ Elite",
      "Aplicación": "Taller mecánico, mantenimiento industrial, carrocería y fabricación liviana a media"
    }
  },
  {
    id: "prod-weld-002",
    name: "Lincoln Electric Power Wave S350 (Fuente de Poder Industrial Avanzada Multiproceso)",
    category: "soldadura",
    categoryName: "Multiproceso Industrial",
    brand: "Lincoln Electric",
    code: "LINC-POWERWAVE-S350",
    image: "productos/lincoln-power-wave-s350.png",
    tags: ["Soldadora", "Lincoln Electric", "Power Wave S350", "Multiproceso", "Industrial", "MIG Pulsado"],
    badge: "Industrial Pesado 350A",
    shortDesc: "Fuente de poder industrial de alto rendimiento pensada para producción pesada y fabricación continua. Entrega hasta 350 A (ciclo de trabajo del 100% a 300 A), entrada de 200 a 600 V y control digital de forma de onda.",
    specs: {
      "Capacidad / Salida": "Hasta 350 A (ciclo de trabajo continuo 100% a 300 A)",
      "Entrada Eléctrica": "200 V a 600 V industrial (monofásica o trifásica)",
      "Control de Onda": "Waveform Control Technology® para MIG, MIG Pulsado, TIG, Stick y desbaste",
      "Aplicación": "Producción pesada, astilleros, estructuras metálicas y manufactura continua"
    }
  },
  {
    id: "prod-weld-003",
    name: "Miller Bobcat 230 (Soldadora con Motor a Gasolina y Generador Integrado)",
    category: "soldadura",
    categoryName: "Multiproceso + Generador",
    brand: "Miller Electric",
    code: "MIL-BOBCAT-230",
    image: "productos/miller-bobcat-230.jpeg",
    tags: ["Soldadora", "Miller", "Bobcat 230", "Motogenerador", "Gasolina", "Campo", "Generador"],
    badge: "Motogenerador 11,000W",
    shortDesc: "Equipo autónomo con motor de combustión interna a gasolina para trabajo pesado en campo o sin red eléctrica. Suelda en Stick, MIG y Flux-Cored, y opera como generador auxiliar de hasta ~11,000 W pico.",
    specs: {
      "Motor / Combustible": "Motor a combustión interna a gasolina (operación 100% autónoma en campo)",
      "Capacidad Generador": "Hasta ~11,000 Watts pico de energía auxiliar para herramientas e iluminación",
      "Procesos": "Electrodo (Stick), MIG y Alambre tubular (Flux-Cored)",
      "Aplicación": "Construcción pesada, faenas agrícolas, minería y reparaciones de maquinaria en campo"
    }
  },
  {
    id: "prod-weld-004",
    name: "Lincoln Electric POWER MIG 180C (Soldadora de Alambre MIG / Flux-Cored de Taller)",
    category: "soldadura",
    categoryName: "De Alambre (MIG / Flux)",
    brand: "Lincoln Electric",
    code: "LINC-POWERMIG-180C",
    image: "productos/lincoln-power-mig-180c.png",
    tags: ["Soldadora", "Lincoln Electric", "Power MIG 180C", "De Alambre", "MIG", "Flux-Cored"],
    badge: "De Alambre (208/230V)",
    shortDesc: "Soldadora alimentadora de alambre diseñada para 208/230 V con salida de 30 a 180 A. Especializada en soldadura MIG con gas y Flux-Cored sin gas para láminas, carrocería y mantenimiento con perillas analógicas.",
    specs: {
      "Tipo": "Soldadora continua con alimentador de alambre interno para taller",
      "Voltaje / Salida": "208/230 V con salida regulable continua de 30 a 180 Amperios",
      "Alambre Compatible": "Carretes de alambre sólido con gas y tubular autoprotegido sin gas",
      "Aplicación": "Chapa automotriz, carrocerías, mantenimiento mecánico y fabricación ligera a media"
    }
  },
  {
    id: "prod-weld-005",
    name: "Lincoln Electric SPRINTER 180T (Soldadora Portátil TIG y Electrodo)",
    category: "soldadura",
    categoryName: "TIG y Electrodo",
    brand: "Lincoln Electric",
    code: "LINC-SPRINTER-180T",
    image: "productos/lincoln-sprinter-180t.png",
    tags: ["Soldadora", "Lincoln Electric", "Sprinter 180T", "TIG", "Electrodo", "Inverter", "Portátil"],
    badge: "TIG & Electrodo (9 kg)",
    shortDesc: "Soldadora inverter ultracompacta de apenas 9 kg y doble voltaje (120 V / 230 V), de 10 a 180 A. Enfocada en soldadura TIG DC de alta frecuencia con modo pulsado para acabados finos y electrodo revestido (Stick).",
    specs: {
      "Tipo": "Inverter profesional TIG DC de alta frecuencia y Electrodo revestido (Stick)",
      "Peso / Portabilidad": "Ultracompacta de apenas 9.0 kg para máxima movilidad",
      "Voltaje / Rango": "Doble voltaje 120 V / 230 V con salida de 10 a 180 Amperios",
      "Funciones Especiales": "Encendido de alta frecuencia (HF TIG) y modo pulsado para soldaduras impecables"
    }
  }
];

window.PRODUCT_CATEGORIES = PRODUCT_CATEGORIES;
window.PRODUCTS_DATA = PRODUCTS_DATA;
