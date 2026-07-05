import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  History,
  Settings,
} from "lucide-react";

const navigation = [
  {
    title: "Main",
    items: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Chat",
        path: "/chat",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        name: "Documents",
        path: "/documents",
        icon: FileText,
      },
      {
        name: "Conversations",
        path: "/conversations",
        icon: History,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        name: "Settings",
        path: "/settings",
        icon: Settings,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 border-r bg-background">
      <nav className="flex flex-col gap-6 p-4">
        {navigation.map((section) => (
          <div key={section.title}>
            <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h2>

            <div className="flex flex-col gap-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`
                    }
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;