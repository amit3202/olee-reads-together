import { Home, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  active: "today" | "progress" | "settings";
  onChange: (tab: "today" | "progress" | "settings") => void;
}

export const BottomNav = ({ active, onChange }: BottomNavProps) => {
  const items = [
    { id: "today" as const, label: "Today", icon: Home },
    { id: "progress" as const, label: "Progress", icon: BarChart3 },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ];
  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-card border-t border-border px-2 pt-2 pb-3 flex justify-around">
      {items.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl transition-colors min-w-[64px]",
              isActive ? "bg-primary-light" : ""
            )}
          >
            <Icon
              size={22}
              className={cn(isActive ? "text-primary" : "text-muted-foreground")}
              strokeWidth={2.4}
            />
            <span
              className={cn(
                "text-[11px] font-bold",
                isActive ? "text-primary-deep" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
