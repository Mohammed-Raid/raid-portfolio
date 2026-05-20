export type WorkItem = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  year: string;
  client: string;
  role: string;
  status: "DEPLOYED" | "FIELD-TESTED" | "SHIPPED" | "VALIDATED" | "SIMULATED" | "LAB" | "ONGOING";
  summary: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  details: string;
  accentClass: string;
};

export const WORK: WorkItem[] = [
  {
    slug: "mc68000-gs-maintenance",
    index: "01",
    title: "Systèmes MC68000 · GS Maintenance",
    subtitle: "Stage ingénieur sur architecture Motorola 68000 — détails sous NDA",
    year: "2026",
    client: "GS Maintenance · Melun",
    role: "Stagiaire firmware · maintenance & reverse",
    status: "ONGOING",
    summary:
      "Stage de quatre mois chez GS Maintenance autour d'un système embarqué basé sur le microprocesseur Motorola MC68000. Travail combinant lecture de datasheet historique, analyse bas-niveau, et intégration sur bus série industriels. Livrables détaillés sous confidentialité client.",
    stack: ["MC68000", "Assembleur 68k", "Bus série", "CAN", "Modbus", "RS-485", "Oscilloscope"],
    metrics: [
      { label: "Durée", value: "4 mois" },
      { label: "Plateforme", value: "68k" },
      { label: "Domaine", value: "Indus." },
      { label: "Statut", value: "NDA" },
    ],
    details:
      "Système embarqué historique encore en exploitation industrielle. Travail sur la chaîne de communication (bus série, CAN, Modbus, RS-485), debug à l'oscilloscope, lecture de schéma. Les spécificités fonctionnelles et les livrables techniques sont sous accord de confidentialité avec le client.",
    accentClass: "text-signal-red",
  },
  {
    slug: "bacnet-ip-streetlights",
    index: "02",
    title: "BACnet/IP · contrôle d'éclairage public",
    subtitle: "Serveur embarqué temps-réel pour 8 zones, déployé en exploitation 24/7",
    year: "2024–2025",
    client: "SE60 — Syndicat d'Énergie de l'Oise",
    role: "Firmware · persistance FRAM/RTC · réseau industriel",
    status: "DEPLOYED",
    summary:
      "Serveur BACnet/IP embarqué sur ESP32-S3 sous FreeRTOS couplé à un modem 4G A7670G. Module de persistance FRAM/RTC en SPI/I²C, six types d'objets BACnet, intégration de la pile Ethernet/lwIP côté supervision. Tests de robustesse menés sur coupures réseau et pertes 4G réelles.",
    stack: ["ESP32-S3", "FreeRTOS", "BACnet/IP", "Ethernet · lwIP", "A7670G · 4G", "FRAM · RTC", "SPI · I²C", "NTP"],
    metrics: [
      { label: "Objets BACnet", value: "6" },
      { label: "Zones mémoire", value: "8" },
      { label: "Exploitation", value: "24/7" },
      { label: "Backhaul", value: "4G" },
    ],
    details:
      "Architecture en tâches FreeRTOS isolées (BACnet, FRAM, RTC, 4G, NTP) avec synchronisation par mutex et sémaphores. Recovery automatique sur power-loss via FRAM, fallback sur perte 4G, resync NTP en arrière-plan. Stack TCP/IP lwIP utilisée pour les échanges supervision. Rapport technique LaTeX 22 pages, document de recette avec tests robustesse fournis au client.",
    accentClass: "text-signal-cobalt",
  },
  {
    slug: "lorawan-hive",
    index: "03",
    title: "Ruches connectées · IoT LoRaWAN 868 MHz",
    subtitle: "Nœud capteur STM32G0 conçu de A à Z — schéma + PCB + firmware",
    year: "2024",
    client: "Projet académique",
    role: "Hardware · PCB · firmware · RF",
    status: "FIELD-TESTED",
    summary:
      "Nœud capteur basse consommation STM32G0 conçu intégralement — schéma et routage PCB sous KiCad, soudure CMS (0603, QFP), acquisition multi-capteurs I²C/SPI (HX711, IMU), transmission LoRaWAN classe A validée au-delà de 500 m en environnement réel.",
    stack: ["STM32G0", "LoRaWAN", "KiCad", "I²C · SPI", "HX711 · IMU", "Low-power", "Cortex-M0+"],
    metrics: [
      { label: "Portée RF", value: ">500m" },
      { label: "Bande", value: "868MHz" },
      { label: "PCB", value: "4-layer" },
      { label: "Conso", value: "low-pwr" },
    ],
    details:
      "Conception complète : sélection composants, schéma, routage 4 couches, sourcing, soudure CMS, validation. Firmware bare-metal C avec gestion fine du mode basse consommation, réveils périodiques par RTC, payload compressé. Capteur de pesée HX711 pour suivi du poids des ruches, IMU pour détection de chutes.",
    accentClass: "text-signal-red",
  },
  {
    slug: "mqtt-ssl-iot",
    index: "04",
    title: "MQTT sécurisé sur Raspberry Pi",
    subtitle: "Architecture pub/sub TLS avec pilotage hardware temps-réel",
    year: "2024",
    client: "TP IoT · L3 ESET",
    role: "Réseau · sécurité · drivers Linux",
    status: "SHIPPED",
    summary:
      "Architecture client/serveur MQTT chiffrée TLS/SSL — pilotage d'un afficheur LED 8×8 et d'un joystick via broker, gestion explicite des erreurs réseau et reprise sur déconnexion. Drivers Sense HAT réécrits, cross-compilation Linux ARM testée.",
    stack: ["Raspberry Pi", "MQTT", "TLS/SSL", "Python", "Cross-compile ARM", "Sense HAT", "QoS 2"],
    metrics: [
      { label: "Chiffrement", value: "TLS" },
      { label: "LED matrix", value: "8×8" },
      { label: "QoS", value: "2" },
    ],
    details:
      "Réécriture des drivers Sense HAT : LED matrix, joystick avec debounce, scroll text UTF-8. README GitHub complet pour la branche Drivers. Gestion explicite de la reconnexion sur perte réseau. Pipeline de cross-compilation ARM mis en place pour tester sans déploiement complet.",
    accentClass: "text-signal-cobalt",
  },
  {
    slug: "dsp-realtime-filter",
    index: "05",
    title: "Filtrage numérique DSP temps-réel",
    subtitle: "Réduction de bruit >20 dB sur DSP Texas Instruments — Code Composer Studio",
    year: "2024",
    client: "Académique · DSP",
    role: "Algorithmique · fixed-point · validation spectrale",
    status: "VALIDATED",
    summary:
      "Implémentation d'un filtre FIR/IIR temps-réel sur DSP TI sous Code Composer Studio, arithmétique fixed-point, acquisition DMA continue. Réduction de bruit mesurée supérieure à 20 dB. Validation spectrale FFT/MATLAB sur banc dédié.",
    stack: ["DSP TI", "Code Composer Studio", "C embarqué", "FIR · IIR", "Fixed-point", "DMA", "MATLAB", "FFT"],
    metrics: [
      { label: "Noise red.", value: ">20dB" },
      { label: "Validation", value: "FFT" },
      { label: "Arithm.", value: "Fixed-pt" },
    ],
    details:
      "Implémentation C optimisée pour cycles par échantillon, arithmétique fixed-point pour éviter les coûts du float. Acquisition continue via DMA ping-pong. Compréhension de l'architecture Harvard / VLIW / MAC du DSP. Banc de validation MATLAB avec injection de bruit calibré et mesure du noise floor avant/après.",
    accentClass: "text-signal-red",
  },
  {
    slug: "radar-cdma-chain",
    index: "06",
    title: "Chaîne radar · CDMA · Doppler",
    subtitle: "Simulation MATLAB complète — corrélation, FFT, modulations numériques",
    year: "2025",
    client: "Académique · communications",
    role: "Modélisation · simulation · RF",
    status: "SIMULATED",
    summary:
      "Chaîne radar complète (FFT, autocorrélation, Doppler) couplée à un système CDMA multi-utilisateurs Walsh-Hadamard / Barker. Étude des modulations AM/FM/ASK/FSK/PSK/QAM, calcul de budget de liaison et caractérisation des seuils de détection.",
    stack: ["MATLAB", "FFT · Autocorr.", "Walsh-Hadamard", "Code de Barker", "Modulations num.", "Antennes · Smith chart", "Filtres adaptés"],
    metrics: [
      { label: "BER cible", value: "10⁻⁴" },
      { label: "Multi-user", value: "CDMA" },
    ],
    details:
      "TP1 : estimation de délai par autocorrélation/xcorr, effet Doppler sur cibles mobiles. TP2 : décodage CDMA avec codes Walsh-Hadamard, synchronisation Barker, filtres adaptés. Étude annexe : modulations analogiques (AM/FM) et numériques (ASK/FSK/PSK/QAM), adaptation d'impédance et Smith chart pour les antennes. Rapport LaTeX manuscrit-style pour épreuves notes autorisées.",
    accentClass: "text-signal-cobalt",
  },
  {
    slug: "riscv-irq-arch",
    index: "07",
    title: "Architecture d'interruptions RISC-V",
    subtitle: "Bare-metal sur DE10-Standard · gestion fine mstatus/mie",
    year: "2025",
    client: "Lab · bas niveau",
    role: "Architecture · assembleur · vector table",
    status: "LAB",
    summary:
      "Gestion fine des interruptions sur cœur RISC-V — manipulation des registres mstatus, mie, edgecapture en assembleur, vector table custom, intégration sur DE10-Standard. Implémentation d'un jeu Rock-Paper-Scissors en C avec interrupts.",
    stack: ["RISC-V", "Assembleur", "Vector table", "Linker script", "DE10-Standard", "FPGA / SoC", "C bare-metal"],
    metrics: [
      { label: "Bas niveau", value: "ASM" },
      { label: "Plateforme", value: "DE10" },
    ],
    details:
      "Configuration manuelle de la table des vecteurs, masquage/démasquage, edge-capture. Linker script et startup file modifiés pour la cible. I/O via switches et LEDs après difficultés JTAG UART. Code source en assembleur + glue C minimal.",
    accentClass: "text-signal-red",
  },
];

export const STACK = [
  { ref: "U01", name: "C / C++ embarqué", note: "firmware bare-metal · pointeurs · bit-fields", level: 5, cat: "LANG" },
  { ref: "U02", name: "Python", note: "OpenCV · PyTorch · NumPy · MQTT", level: 5, cat: "LANG" },
  { ref: "U03", name: "MATLAB / Simulink", note: "FFT · BER · Doppler · filtres", level: 5, cat: "LANG" },
  { ref: "U04", name: "VHDL", note: "logique synchrone", level: 3, cat: "LANG" },
  { ref: "U05", name: "Assembleur RISC-V", note: "mstatus / mie · vector table", level: 3, cat: "LANG" },
  { ref: "U06", name: "Assembleur 68k", note: "MC68000 · stage GS", level: 3, cat: "LANG" },
  { ref: "U07", name: "C++ (Arduino)", note: "notions · classes simples", level: 2, cat: "LANG" },
  { ref: "U10", name: "ESP32-S3", note: "Wi-Fi + BLE + dual-core", level: 5, cat: "MCU" },
  { ref: "U11", name: "STM32 / STM32G0", note: "Cortex-M0+ / M4F bare-metal", level: 4, cat: "MCU" },
  { ref: "U12", name: "MC68000", note: "Motorola 68k · stage", level: 3, cat: "MCU" },
  { ref: "U13", name: "DE10-Standard", note: "Cyclone V SoC", level: 3, cat: "FPGA" },
  { ref: "U14", name: "DSP Texas Instruments", note: "Harvard / VLIW / MAC", level: 4, cat: "DSP" },
  { ref: "U15", name: "Raspberry Pi", note: "Linux IoT · cross-compile ARM", level: 4, cat: "SBC" },
  { ref: "U20", name: "FreeRTOS", note: "tasks · mutex · semaphores", level: 4, cat: "RTOS" },
  { ref: "U21", name: "Bare-metal Cortex-M", note: "super-loop · IRQ-driven", level: 4, cat: "RTOS" },
  { ref: "U22", name: "Linux embarqué", note: "cross-compilation ARM", level: 3, cat: "RTOS" },
  { ref: "U30", name: "BACnet / IP", note: "objets industriels · 6 types", level: 4, cat: "NET" },
  { ref: "U31", name: "Modbus RTU / TCP", note: "automatisme industriel", level: 3, cat: "NET" },
  { ref: "U32", name: "CAN 2.0 / CAN FD", note: "bus véhicule / industriel", level: 3, cat: "NET" },
  { ref: "U33", name: "MQTT · TLS/SSL", note: "pub/sub sécurisé · QoS 2", level: 4, cat: "NET" },
  { ref: "U34", name: "Ethernet · lwIP", note: "TCP/IP stack embarqué", level: 3, cat: "NET" },
  { ref: "U35", name: "HTTP REST (client embarqué)", note: "API consumer firmware", level: 3, cat: "NET" },
  { ref: "U40", name: "LoRaWAN", note: "classe A / 868 MHz · >500 m", level: 4, cat: "RF" },
  { ref: "U41", name: "Wi-Fi 2.4 GHz", note: "STA / AP · ESP32", level: 4, cat: "RF" },
  { ref: "U42", name: "4G / LTE A7670G", note: "backhaul cellulaire", level: 3, cat: "RF" },
  { ref: "U43", name: "Modulations numériques", note: "ASK · FSK · PSK · QAM", level: 3, cat: "RF" },
  { ref: "U44", name: "Modulations analogiques", note: "AM · FM", level: 3, cat: "RF" },
  { ref: "U45", name: "Antennes · Smith chart", note: "adaptation d'impédance · S-params", level: 3, cat: "RF" },
  { ref: "U50", name: "UART · SPI · I²C", note: "bus série natifs", level: 5, cat: "BUS" },
  { ref: "U51", name: "RS-485 / RS-232", note: "longue distance industrielle", level: 3, cat: "BUS" },
  { ref: "U52", name: "1-Wire", note: "capteurs DS18B20-like", level: 3, cat: "BUS" },
  { ref: "U53", name: "USB device", note: "CDC · HID · MSC", level: 3, cat: "BUS" },
  { ref: "U54", name: "JTAG / SWD", note: "debug bas-niveau", level: 4, cat: "BUS" },
  { ref: "U60", name: "FIR / IIR design", note: "filtres numériques", level: 4, cat: "DSP" },
  { ref: "U61", name: "FFT temps-réel MCU", note: "spectre embarqué", level: 4, cat: "DSP" },
  { ref: "U62", name: "Fixed-point arithmetic", note: "Q-format · quantification", level: 4, cat: "DSP" },
  { ref: "U63", name: "Convolution · corrélation", note: "détection · matching", level: 4, cat: "DSP" },
  { ref: "U64", name: "PLL · synchronisation", note: "phase lock loops", level: 3, cat: "DSP" },
  { ref: "U65", name: "DMA acquisition continue", note: "ping-pong buffer", level: 4, cat: "DSP" },
  { ref: "U70", name: "KiCad", note: "schéma + routage 4 couches", level: 4, cat: "EDA" },
  { ref: "U71", name: "Altium Designer", note: "professionnel · multilayer", level: 3, cat: "EDA" },
  { ref: "U72", name: "Proteus", note: "simulation + PCB", level: 4, cat: "EDA" },
  { ref: "U73", name: "STM32CubeIDE", note: "dev STM32", level: 4, cat: "EDA" },
  { ref: "U74", name: "ESP-IDF", note: "framework Espressif natif", level: 4, cat: "EDA" },
  { ref: "U75", name: "Code Composer Studio", note: "DSP TI", level: 4, cat: "EDA" },
  { ref: "U76", name: "VS Code · Arduino IDE", note: "éditeurs quotidiens", level: 5, cat: "EDA" },
  { ref: "U80", name: "Makefile (manuel)", note: "build hors IDE", level: 3, cat: "BUILD" },
  { ref: "U81", name: "CMake", note: "build cross-platform", level: 3, cat: "BUILD" },
  { ref: "U82", name: "PlatformIO", note: "embedded multi-cible", level: 3, cat: "BUILD" },
  { ref: "U83", name: "ARM-GCC", note: "arm-none-eabi-gcc CLI", level: 3, cat: "BUILD" },
  { ref: "U84", name: "Linker script · .map", note: "lecture · .ld files", level: 3, cat: "BUILD" },
  { ref: "U85", name: "Startup file · vector table", note: ".text · .data · .bss", level: 3, cat: "BUILD" },
  { ref: "U90", name: "Oscilloscope", note: "decode bus série · timings", level: 4, cat: "LAB" },
  { ref: "U91", name: "Analyseur de spectre RF", note: "FFT live · mesures", level: 4, cat: "LAB" },
  { ref: "U92", name: "Multimètre", note: "DC · continuité", level: 5, cat: "LAB" },
  { ref: "U93", name: "Charge électronique · alim labo", note: "tests d'alim", level: 4, cat: "LAB" },
  { ref: "U94", name: "Soudure CMS", note: "0603 · 0402 · QFP", level: 4, cat: "LAB" },
  { ref: "U95", name: "Rework station · air chaud", note: "réparation prototypes", level: 4, cat: "LAB" },
  { ref: "U96", name: "GDB · ST-Link / J-Link", note: "debug embedded", level: 3, cat: "LAB" },
  { ref: "U97", name: "printf via UART", note: "trace série", level: 5, cat: "LAB" },
  { ref: "U100", name: "Lecture de datasheet", note: "timings · registres · electrical", level: 4, cat: "HW" },
  { ref: "U101", name: "Calcul autonomie batterie", note: "low-power design", level: 4, cat: "HW" },
  { ref: "U102", name: "BOM design · sourcing", note: "choix composants", level: 4, cat: "HW" },
  { ref: "U103", name: "EMC / CEM", note: "notions · normes", level: 2, cat: "HW" },
  { ref: "U104", name: "Tests environnementaux", note: "temp · vibration", level: 3, cat: "HW" },
  { ref: "U110", name: "IMU · gyro · accéléro", note: "MPU6050 · BMI160", level: 4, cat: "SENS" },
  { ref: "U111", name: "HX711 load cell", note: "capteur de pesée 24-bit", level: 4, cat: "SENS" },
  { ref: "U112", name: "INA219 · ACS712", note: "mesure de courant", level: 4, cat: "SENS" },
  { ref: "U113", name: "HC-SR04 ultrasons", note: "distance · temps de vol", level: 4, cat: "SENS" },
  { ref: "U114", name: "Capteurs I²C · SPI génériques", note: "datasheet-driven", level: 5, cat: "SENS" },
  { ref: "U120", name: "Doxygen", note: "documentation auto", level: 3, cat: "QA" },
  { ref: "U121", name: "Code reviews", note: "pratique équipe", level: 3, cat: "QA" },
  { ref: "U122", name: "Git", note: "commandes de base", level: 2, cat: "QA" },
  { ref: "U130", name: "UML / SysML", note: "modélisation système", level: 3, cat: "METH" },
  { ref: "U131", name: "Diagrammes Gantt", note: "planification projet", level: 3, cat: "METH" },
  { ref: "U132", name: "Présentations techniques", note: "soutenances · réunions", level: 4, cat: "METH" },
  { ref: "U140", name: "PyTorch / TensorFlow", note: "deep learning", level: 3, cat: "AI" },
  { ref: "U141", name: "OpenCV", note: "computer vision", level: 3, cat: "AI" },
  { ref: "U142", name: "Pandas · NumPy", note: "analyse de données", level: 4, cat: "AI" },
  { ref: "U150", name: "Secure boot · JTAG security", note: "notions", level: 2, cat: "SEC" },
];

export const SECTORS = [
  { id: "industrial", label: "Industriel", sub: "Automatisation · contrôle commande · supervision", angle: "BACnet · Modbus · CAN · RS-485 · FreeRTOS" },
  { id: "iot", label: "IoT", sub: "Grand public · industriel · smart infrastructure", angle: "LoRaWAN · MQTT · Wi-Fi · ESP32 · low-power" },
  { id: "rf", label: "RF · Télécoms", sub: "5G · satellite · radiocommunications", angle: "Modulations · antennes · Smith chart · DSP" },
  { id: "ai-edge", label: "AI embarquée · Edge ML", sub: "Computer vision · inference on-device", angle: "OpenCV · PyTorch · MCU + ML · DSP TI" },
  { id: "robotics", label: "Robotique · drones", sub: "Contrôle temps-réel · capteurs · navigation", angle: "IMU · fixed-point · interrupts · STM32" },
];

export const TIMELINE = [
  { hash: "a4f9d20", when: "2026 · APR", kind: "WORK" as const, title: "Stagiaire — Systèmes MC68000", org: "GS Maintenance", loc: "Melun · FR", status: "HEAD" },
  { hash: "7c3e1b8", when: "2024–2026", kind: "EDU" as const, title: "Master ESET — Électronique, embarqué & télécoms", org: "Univ. Savoie Mont Blanc", loc: "Le Bourget-du-Lac · FR", status: "ACTIVE" },
  { hash: "f1a807c", when: "2024", kind: "WORK" as const, title: "Stage — Maintenance radar (ENNA)", org: "Navigation Aérienne", loc: "Biskra · DZ", status: "DONE" },
  { hash: "b9d52a3", when: "2023", kind: "WORK" as const, title: "Stage — Tests & qualité production", org: "IRIS Électroménagers", loc: "Sétif · DZ", status: "DONE" },
  { hash: "3e62091", when: "2020–2024", kind: "EDU" as const, title: "CPGE MPSI — classé 291ᵉ / 1800", org: "École Nationale de Technologie", loc: "Algérie", status: "DONE" },
];

export const PROFILE = {
  languages: [
    { name: "Arabe", level: "Natif" },
    { name: "Français", level: "B2" },
    { name: "Anglais", level: "C1+" },
  ],
  credentials: ["Permis B"],
  softSkills: [
    "Présentations techniques régulières (soutenances, réunions équipe)",
    "Documentation rigoureuse (Doxygen, rapports LaTeX 22+ pages)",
    "Travail en équipe (projet BACnet 5 personnes)",
    "Autonomie technique (PCB end-to-end : schéma → soudure → debug)",
  ],
};

export const CONTACT = {
  email: "abadou.mohamedraid@gmail.com",
  phone: "+33 7 45 09 25 80",
  linkedin: "https://www.linkedin.com/in/mohamed-raid-charaf-eddine-abadou-8726152a3",
  linkedinLabel: "mohamed-raid-abadou",
  location: "Chambéry · FR",
  available: "Septembre 2026",
  zones: "Grenoble · Chambéry · Annecy · Lyon",
};
