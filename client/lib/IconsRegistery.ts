// icons/registry.ts
import type { LucideIcon } from "lucide-react";
import {
  Globe, Smartphone, ShoppingCart, Server, Shield, Code, 
  HelpCircle ,
    Zap,
  MonitorSmartphone,
  Lock,
  Headset,
  Wrench,
  ArrowUpRight,
  Database,
  ShieldCheck,
  ArrowLeftRight,
 
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  ShoppingCart,
  Server,
  Shield,
  Code,
   Zap,
  MonitorSmartphone,
  Lock,
  Headset,
  Wrench,
  ArrowUpRight,
  Database,
  ShieldCheck,
  ArrowLeftRight,
 
};

export const getIcon = (key?: string): LucideIcon => ICONS[key ?? ""] ?? HelpCircle;
export const iconKeys = Object.keys(ICONS);
