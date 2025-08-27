// types/feature.ts
export type FeatureDTO = {
  id: number | string;
  title: string;
  desc: string;
  iconKey: string;  // instead of embedding ReactNode
  color?: string;
};


export const features: FeatureDTO[] = [
  { id: 0, title: "Lightning-Fast Websites", desc: "Super-quick page loads", iconKey: "Zap" },
  { id: 1, title: "Free cPanel", desc: "Hosting management simplified", iconKey: "MonitorSmartphone" },
  { id: 2, title: "SNI Enabled", desc: "SSL certificate installation easy", iconKey: "Lock" },
  { id: 3, title: "24×7 Support", desc: "Your websites are our priority", iconKey: "Headset" },
  { id: 4, title: "Easy 1-click Installer", desc: "400+ ready-to-install apps", iconKey: "Wrench" },
  { id: 5, title: "Easy Upgrades", desc: "Increase resources as needed", iconKey: "ArrowUpRight" },
  { id: 6, title: "Free Backup", desc: "We provide free backups", iconKey: "Database" },
  { id: 7, title: "Enhanced Security", desc: "Cloudflare protection", iconKey: "ShieldCheck" },
  { id: 8, title: "Free Website Migrations", desc: "Move your hosting to us", iconKey: "ArrowLeftRight" },
];