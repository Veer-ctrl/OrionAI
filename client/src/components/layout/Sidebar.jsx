import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";
import logo from "../../assets/logo.png";

const navigation = [
  {
    title: "Navigation",
    items: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Conversations",
        path: "/conversations",
        icon: MessageSquare,
      },
    ],
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen border-r bg-background transition-all duration-200 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b px-4 py-4">
          <div
            className={`flex items-center gap-3 ${
              collapsed ? "justify-center w-full" : ""
            }`}
          >
            
            {!collapsed && (
              <div>
                <p className="text-base font-semibold tracking-tight">
                  OrionAI
                </p>
                <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground/70">
                  Workspace
                </p>
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="rounded-full border border-muted/70 p-2 text-muted-foreground transition hover:border-foreground hover:text-foreground"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav className="flex-1 px-2 py-5">
          <p
            className={`px-3 text-[11px] uppercase tracking-[0.24em] text-muted-foreground/70 ${
              collapsed ? "hidden" : "block"
            }`}
          >
            Navigation
          </p>
          <div className={`${collapsed ? "space-y-1" : "space-y-2"}`}>
            {navigation[0].items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={item.name}
                  className={({ isActive }) =>
                    `group flex items-center ${
                      collapsed ? "justify-center" : "gap-3"
                    } rounded-2xl px-3 py-2.5 transition-all duration-150 ${
                      isActive
                        ? "bg-foreground text-background shadow-sm"
                        : "text-foreground/90 hover:bg-muted hover:text-foreground"
                    }`
                  }
                >
                  <Icon className="h-5 w-5 transition-colors duration-150 group-hover:text-foreground" />
                  {!collapsed && <span className="font-medium">{item.name}</span>}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="border-t px-3 py-4">
          <div
            className={`group flex items-center rounded-2xl bg-muted p-3 transition-all duration-150 ${
              collapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-background">
              V
            </div>
            {!collapsed && (
              <>
                <div className="min-w-0">
                  <p className="truncate font-medium">Veer</p>
                  <p className="text-xs text-muted-foreground/70">AI Workspace</p>
                </div>
                <Settings className="ml-auto h-4 w-4 text-muted-foreground/80 transition-colors duration-150 group-hover:text-foreground" />
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;