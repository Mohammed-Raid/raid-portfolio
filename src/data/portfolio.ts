export type WorkItem = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  year: string;
  client: string;
  role: string;
  status: "DEPLOYED" | "FIELD-TESTED" | "SHIPPED" | "VALIDATED" | "SIMULATED" | "LAB";
  summary: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  details: string;
  accentClass: string; // text color tailwind class
};

export const WORK: WorkItem[] = [
  {
    slug: "bacnet-ip-streetlights",
    index: "01",
    title: "BACnet/IP · contrôle d'éclairage public",
    subtitle: "Serveur embarqué temps-réel pour 8 zones, déployé en exploitation 24/7",
    year: "2024–2025",
    client: "SE60 — Syndicat d'Énergie de l'Oise",
    role: "Firmware · persistance FRAM/RTC · tests robustesse",
    status: "DEPLOYED",
    summary:
      "Serveur BACnet/IP embarqué sur ESP32-S3 sous FreeRTOS couplé à un modem 4G A7670G. Module de persistance FRAM/RTC en SPI/I²C, six types d'objets BACnet, tests de robustesse menés sur coupures réseau et pertes 4G réelles.",
    stack: ["ESP32-S3", "FreeRTOS", "BACnet/IP", "A7670G · 4G", "FRAM · RTC", "SPI · I²C", "NTP"],
    metrics: [
      { label: "Objets BACnet", value: "6" },
      { label: "Zones mémoire", value: "8" },
      { label: "Exploitation", value: "24/7" },
      { label: "Backhaul", value: "4G" },
    ],
    details:
      "Architecture en tâches FreeRTOS isolées (BACnet, FRAM, RTC, 4G, NTP). Recovery automatique sur power-loss via FRAM, fallback sur perte 4G, resync NTP en arrière-plan. Rapport technique LaTeX 22 pages, document de recette avec tests robustesse fournis au client.",
    accentClass: "text-signal-red",
  },
  {
    slug: "lorawan-hive",
    index: "02",
    title: "Ruches connectées · IoT LoRaWAN 868 MHz",
    subtitle: "Nœud capteur STM32G0 conçu de A à Z — schéma + PCB + firmware",
    year: "2024",
    client: "Projet académique",
    role: "Hardware · PCB · firmware · RF",
    status: "FIELD-TESTED",
    summary:
      "Nœud capteur basse consommation STM32G0 conçu intégralement — schéma et routage PCB sous KiCad, acquisition multi-capteurs I²C/SPI, transmission LoRaWAN classe A validée au-delà de 500 m en environnement réel.",
    stack: ["STM32G0", "LoRaWAN", "KiCad", "I²C · SPI", "Low-power", "Cortex-M0+"],
    metrics: [
      { label: "Portée RF", value: ">500m" },
      { label: "Bande", value: "868MHz" },
      { label: "PCB", value: "4-layer" },
      { label: "Conso", value: "low-pwr" },
    ],
    details:
      "Conception complète : sélection composants, schéma, routage 4 couches, sourcing, soudure, validation. Firmware bare-metal C avec gestion fine du LP mode, réveils périodiques par RTC, payload compressé.",
    accentClass: "text-signal-cobalt",
  },
  {
    slug: "mqtt-ssl-iot",
    index: "03",
    title: "MQTT sécurisé sur Raspberry Pi",
    subtitle: "Architecture pub/sub TLS avec pilotage hardware temps-réel",
    year: "2024",
    client: "TP IoT · L3 ESET",
    role: "Réseau · sécurité · drivers",
    status: "SHIPPED",
    summary:
      "Architecture client/serveur MQTT chiffrée SSL — pilotage d'un afficheur LED 8×8 et d'un joystick via broker, gestion explicite des erreurs réseau et reprise sur déconnexion. Drivers réécrits pour Sense HAT.",
    stack: ["Raspberry Pi", "MQTT", "TLS/SSL", "Python", "Sense HAT", "QoS 2"],
    metrics: [
      { label: "Chiffrement", value: "SSL" },
      { label: "LED matrix", value: "8×8" },
      { label: "QoS", value: "2" },
    ],
    details:
      "Réécriture des drivers Sense HAT : LED matrix, joystick avec debounce, scroll text UTF-8. README GitHub complet pour la branche Drivers. Gestion explicite de la reconnexion sur perte réseau.",
    accentClass: "text-signal-red",
  },
  {
    slug: "dsp-realtime-filter",
    index: "04",
    title: "Filtrage numérique DSP temps-réel",
    subtitle: "Réduction de bruit >20 dB sur DSP Texas Instruments",
    year: "2024",
    client: "Académique · DSP",
    role: "Algorithmique · validation spectrale",
    status: "VALIDATED",
    summary:
      "Implémentation d'un filtre numérique temps-réel sur DSP TI, réduction de bruit mesurée supérieure à 20 dB. Validation spectrale FFT/MATLAB sur banc dédié.",
    stack: ["DSP TI", "C embarqué", "MATLAB", "FFT", "Audio"],
    metrics: [
      { label: "Noise red.", value: ">20dB" },
      { label: "Validation", value: "FFT" },
    ],
    details:
      "Implémentation C optimisée pour cycles par échantillon. Banc de validation MATLAB avec injection de bruit calibré et mesure du noise floor avant/après. Caractérisation du delay group du filtre.",
    accentClass: "text-signal-cobalt",
  },
  {
    slug: "radar-cdma-chain",
    index: "05",
    title: "Chaîne radar · CDMA · Doppler",
    subtitle: "Simulation MATLAB complète — corrélation, FFT, codes orthogonaux",
    year: "2025",
    client: "Académique · communications",
    role: "Modélisation · simulation",
    status: "SIMULATED",
    summary:
      "Chaîne radar complète (FFT, autocorrélation, Doppler) couplée à un système CDMA multi-utilisateurs Walsh-Hadamard / Barker. Analyse BER comparative et caractérisation des seuils de détection.",
    stack: ["MATLAB", "FFT · Autocorr.", "Walsh-Hadamard", "Code de Barker", "Filtres adaptés"],
    metrics: [
      { label: "BER cible", value: "10⁻⁴" },
      { label: "Multi-user", value: "CDMA" },
    ],
    details:
      "TP1 : estimation de délai par autocorrélation/xcorr, effet Doppler sur cibles mobiles. TP2 : décodage CDMA avec codes Walsh-Hadamard, synchronisation Barker, filtres adaptés. Rapport LaTeX manuscrit-style pour épreuves notes autorisées.",
    accentClass: "text-signal-red",
  },
  {
    slug: "riscv-irq-arch",
    index: "06",
    title: "Architecture d'interruptions RISC-V",
    subtitle: "Bare-metal sur DE10-Standard · gestion fine mstatus/mie",
    year: "2025",
    client: "Lab · bas niveau",
    role: "Architecture · assembleur · jeu Pierre-Feuille-Ciseaux",
    status: "LAB",
    summary:
      "Gestion fine des interruptions sur cœur RISC-V — manipulation des registres mstatus, mie, edgecapture en assembleur, intégration sur DE10-Standard. Implémentation d'un jeu Rock-Paper-Scissors en C avec interrupts.",
    stack: ["RISC-V", "Assembleur", "DE10-Standard", "FPGA / SoC", "C bare-metal"],
    metrics: [
      { label: "Bas niveau", value: "ASM" },
      { label: "Plateforme", value: "DE10" },
    ],
    details:
      "Configuration manuelle de la table des vecteurs, masquage/démasquage, edge-capture. I/O via switches et LEDs après difficultés JTAG UART. Code source en assembleur + glue C minimal.",
    accentClass: "text-signal-cobalt",
  },
];

export const STACK = [
  { ref: "U1", name: "C / C++ embarqué", note: "firmware bare-metal", level: 5, cat: "LANG" },
  { ref: "U2", name: "Python", note: "MQTT · DSP · scripts", level: 5, cat: "LANG" },
  { ref: "U3", name: "MATLAB / Simulink", note: "FFT · BER · Doppler", level: 5, cat: "LANG" },
  { ref: "U4", name: "VHDL", note: "logique synchrone", level: 3, cat: "LANG" },
  { ref: "U5", name: "Assembleur RISC-V", note: "mstatus / mie", level: 3, cat: "LANG" },
  { ref: "U10", name: "ESP32-S3", note: "Wi-Fi + BLE + dual-core", level: 5, cat: "MCU" },
  { ref: "U11", name: "STM32 / STM32G0", note: "Cortex-M0+ / M4", level: 4, cat: "MCU" },
  { ref: "U12", name: "FreeRTOS", note: "tasks · queues · ISR", level: 4, cat: "RTOS" },
  { ref: "U13", name: "Raspberry Pi", note: "Linux IoT", level: 4, cat: "SBC" },
  { ref: "U14", name: "DSP Texas Instruments", note: "filtre temps-réel", level: 4, cat: "DSP" },
  { ref: "U15", name: "DE10-Standard", note: "Cyclone V SoC", level: 3, cat: "FPGA" },
  { ref: "U20", name: "LoRaWAN", note: "classe A / 868 MHz", level: 4, cat: "RF" },
  { ref: "U21", name: "BACnet / IP", note: "objets industriels", level: 4, cat: "NET" },
  { ref: "U22", name: "MQTT · TLS/SSL", note: "pub/sub sécurisé", level: 4, cat: "NET" },
  { ref: "U23", name: "4G / LTE A7670G", note: "backhaul cellulaire", level: 3, cat: "RF" },
  { ref: "U30", name: "UART · SPI · I²C", note: "bus série", level: 5, cat: "BUS" },
  { ref: "U40", name: "KiCad", note: "schéma + PCB routing", level: 4, cat: "EDA" },
  { ref: "U41", name: "STM32CubeIDE · Proteus", note: "dev + simu", level: 4, cat: "EDA" },
  { ref: "U50", name: "Oscilloscope", note: "signal trace", level: 4, cat: "LAB" },
  { ref: "U51", name: "Analyseur de spectre", note: "RF / FFT live", level: 4, cat: "LAB" },
  { ref: "U52", name: "Analyseur logique", note: "debug bus série", level: 4, cat: "LAB" },
];

export const TIMELINE = [
  {
    hash: "a4f9d20",
    when: "2026 · APR",
    kind: "WORK" as const,
    title: "Stagiaire — Systèmes MC68000",
    org: "GS Maintenance",
    loc: "Melun · FR",
    status: "HEAD",
  },
  {
    hash: "7c3e1b8",
    when: "2024–2026",
    kind: "EDU" as const,
    title: "Master ESET — Électronique, embarqué & télécoms",
    org: "Univ. Savoie Mont Blanc",
    loc: "Le Bourget-du-Lac · FR",
    status: "ACTIVE",
  },
  {
    hash: "f1a807c",
    when: "2024",
    kind: "WORK" as const,
    title: "Stage — Maintenance radar (ENNA)",
    org: "Navigation Aérienne",
    loc: "Biskra · DZ",
    status: "DONE",
  },
  {
    hash: "b9d52a3",
    when: "2023",
    kind: "WORK" as const,
    title: "Stage — Tests & qualité production",
    org: "IRIS Électroménagers",
    loc: "Sétif · DZ",
    status: "DONE",
  },
  {
    hash: "3e62091",
    when: "2020–2024",
    kind: "EDU" as const,
    title: "CPGE MPSI — classé 291ᵉ / 1800",
    org: "École Nationale de Technologie",
    loc: "Algérie",
    status: "DONE",
  },
];

export const CONTACT = {
  email: "abadou.mohamedraid@gmail.com",
  phone: "+33 7 45 09 25 80",
  linkedin: "https://www.linkedin.com/in/mohamed-raid-charaf-eddine-abadou-8726152a3",
  linkedinLabel: "mohamed-raid-abadou",
  location: "Chambéry · FR",
  available: "Septembre 2026",
  zones: "Grenoble · Chambéry · Annecy · Lyon",
};
