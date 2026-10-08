export type ProductCategory = "Hardware" | "Software";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string; // URL slug and anchor id (e.g. "edgegateway-x4")
  name: string;
  tagline: string;
  category: ProductCategory;
  badge?: "Best Seller" | "Revenue Grade" | "Ultra-Low Power" | "Cloud SaaS";
  benefit: string; // One-sentence punchy benefit for Home teaser
  description: string; // In-depth description for Products page
  icon: "Router" | "Zap" | "Thermometer" | "BarChart3";
  features: string[];
  specs: ProductSpec[];
}

/**
 * Single source of truth for VoltEdge Energy products.
 * Used across Home page teaser, Products catalog, and Contact form query routing.
 * Note: All latency claims use strictly realistic industrial terminology (sub-second / real-time WebSocket).
 */
export const products: Product[] = [
  {
    id: "edgegateway-x4",
    name: "EdgeGateway X4",
    tagline: "Industrial-Grade IoT Communication Hub",
    category: "Hardware",
    badge: "Best Seller",
    benefit: "Aggregates 200+ field sensors with LoRaWAN, 4G LTE failover, and sub-second telemetry.",
    description:
      "Multi-protocol industrial gateway supporting LoRaWAN, 4G LTE, and Ethernet backhaul. Aggregates data from up to 200 field sensors and delivers real-time telemetry to PowerCloud Analytics with sub-second latency.",
    icon: "Router",
    features: [
      "200+ Field sensor capacity with LoRaWAN & Modbus",
      "Dual SIM 4G LTE failover & PoE+ gigabit ethernet",
      "IP67 milled aluminum casing with DIN-rail mount",
      "Local 90-day encrypted ring buffer during WAN outage",
    ],
    specs: [
      { label: "Protocols", value: "LoRaWAN EU868/US915, 4G LTE, RS-485, Modbus RTU" },
      { label: "Sensor Capacity", value: "Up to 200 wireless / 32 wired nodes" },
      { label: "Operating Temp", value: "-40°C to +75°C industrial tolerance" },
      { label: "Power Supply", value: "9–36V DC redundant inputs / PoE+ (802.3at)" },
      { label: "Enclosure", value: "IP67 Die-Cast Aluminum, DIN-Rail EN 50022" },
      { label: "Security & Certs", value: "Hardware Secure Element, IEC 62443, CE, FCC" },
    ],
  },
  {
    id: "voltpulse-pro",
    name: "VoltPulse Pro",
    tagline: "Three-Phase Precision Energy Submeter",
    category: "Hardware",
    badge: "Revenue Grade",
    benefit: "Class 0.5S active submetering with automated 15-minute peak demand threshold alarms.",
    description:
      "Revenue-grade three-phase energy submeter with Modbus RTU/TCP and BACnet support. Measures active, reactive, and apparent power with Class 0.5S precision for automated ISO 50001 compliance.",
    icon: "Zap",
    features: [
      "Class 0.5S active energy metering accuracy (IEC 62053-22)",
      "OLED high-contrast display with multi-harmonic analysis",
      "Split-core current transformer support up to 5,000A",
      "Non-intrusive busbar retrofit without plant shutdown",
    ],
    specs: [
      { label: "Accuracy Class", value: "Class 0.5S Active (IEC 62053-22), Class 2 Reactive" },
      { label: "Communication", value: "Dual RS-485 Modbus RTU, 10/100 Ethernet Modbus TCP" },
      { label: "Voltage Range", value: "3 × 57.7/100V to 3 × 277/480V AC" },
      { label: "Current Input", value: "1A / 5A CT secondary, Rogowski coil compatible" },
      { label: "Power Quality", value: "Total Harmonic Distortion (THD) up to 31st harmonic" },
      { label: "Form Factor", value: "Standard 4-module 35mm DIN-rail mount" },
    ],
  },
  {
    id: "thermosense-wireless",
    name: "ThermoSense Wireless",
    tagline: "Transformer & Switchgear Thermal Monitor",
    category: "Hardware",
    badge: "Ultra-Low Power",
    benefit: "10-year battery life wireless thermal sensor for continuous busbar and motor bearing health.",
    description:
      "Industrial wireless temperature and vibration sensor engineered for transformer windings, busbars, and pump bearings. Features a 10-year battery life with continuous thermal anomaly tracking.",
    icon: "Thermometer",
    features: [
      "10-year continuous battery lifespan (replaceable lithium)",
      "High-power magnetic or bolt-on industrial mount",
      "Sub-degree thermal tracking (-40°C to +125°C)",
      "Tri-axial vibration analysis for early bearing wear",
    ],
    specs: [
      { label: "Temperature Range", value: "-40°C to +125°C with ±0.2°C accuracy" },
      { label: "Vibration Detection", value: "3-axis MEMS accelerometer (0–16g)" },
      { label: "Radio Protocol", value: "LoRaWAN 1.0.4 Class A / Private Sub-GHz" },
      { label: "Battery Life", value: "10 Years at 15-minute report interval" },
      { label: "Enclosure Rating", value: "IP68 Submersible, UV-resistant Lexan" },
      { label: "Hazardous Locations", value: "ATEX Zone 2 / IECEx certified" },
    ],
  },
  {
    id: "powercloud-analytics",
    name: "PowerCloud Analytics",
    tagline: "Cloud-Native Industrial Energy Intelligence Platform",
    category: "Software",
    badge: "Cloud SaaS",
    benefit: "Autonomous peak shaving, real-time load balancing, and audit-ready ISO 50001 reports.",
    description:
      "Enterprise SaaS platform for automated peak demand forecasting, real-time load balancing, and audit-ready ISO 50001 sustainability reporting across multi-facility footprints.",
    icon: "BarChart3",
    features: [
      "Machine learning peak shaving & anomaly detection",
      "Automated ISO 50001 & GHG Protocol Scope 1/2 reporting",
      "Real-time WebSocket telemetry streaming",
      "Native SCADA, Modbus, and ERP API connectors",
    ],
    specs: [
      { label: "Deployment Options", value: "SaaS Multi-Tenant, Dedicated VPC, or Hybrid On-Prem" },
      { label: "Data Telemetry", value: "Sub-second live streaming via MQTT / WebSockets" },
      { label: "Compliance Engines", value: "ISO 50001, ESG Scope 2 GHG, SEC Climate Disclosures" },
      { label: "Integrations", value: "REST API, OPC-UA, SCADA Modbus Gateway, SAP ERP" },
      { label: "Security & SLA", value: "SOC 2 Type II, TLS 1.3, 99.98% availability guarantee" },
      { label: "Access Control", value: "Role-Based Access (RBAC), SAML 2.0 / Okta SSO" },
    ],
  },
];
