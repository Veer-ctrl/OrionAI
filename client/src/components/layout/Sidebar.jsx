import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  MessageSquare,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import Logo from "@/assets/Logo.svg";
import { Link } from "react-router-dom";
const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Conversations", path: "/conversations", icon: MessageSquare },
];

/* ─── Expanded Sidebar ─────────────────────────────────────────────────── */
const ExpandedSidebar = ({
  navigation,
  initials,
  displayName,
  user,
  onCollapse,
  onLogout,
}) => (
  <aside
    className="flex h-screen w-[220px] shrink-0 flex-col"
    style={{
      backgroundColor: "#071533",
      borderRight: "1px solid rgba(255,248,236,0.06)",
    }}
  >
    <div className="px-5 pt-5 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src={Logo}
              alt="Orion AI"
              className="h-11 w-11 shrink-0 object-contain"
            />
          </Link>

          <div>
            <h1 className="text-lg font-semibold text-[#FFF8EC] leading-none">
              Orion AI
            </h1>

            <p className="mt-1 text-xs text-[#8D96B8] leading-none">
              Document Intelligence
            </p>
          </div>
        </div>

        <button
          className="rounded-lg p-2 transition-colors hover:bg-white/5"
          aria-label="Collapse Sidebar"
          onClick={onCollapse}
        >
          <ChevronLeft className="h-4 w-4 text-[#8D96B8]" />
        </button>
      </div>
    </div>

    {/* ── Divider ── */}
    <div
      className="mx-4 mb-3"
      style={{ height: "1px", backgroundColor: "rgba(255,248,236,0.06)" }}
    />

    {/* ── Nav section label ── */}
    <p
      className="mx-4 mb-2 text-[9px] font-bold uppercase tracking-[0.12em]"
      style={{ color: "rgba(255,248,236,0.22)" }}
    >
      Workspace
    </p>

    {/* ── Navigation ── */}
    <nav className="flex-1 px-3 space-y-0.5">
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink key={item.path} to={item.path} title={item.name}>
            {({ isActive }) => (
              <div
                className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: isActive
                    ? "rgba(223,255,102,0.1)"
                    : "transparent",
                  color: isActive ? "#DFFF66" : "rgba(255,248,236,0.45)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,248,236,0.05)";
                    e.currentTarget.style.color = "rgba(255,248,236,0.85)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "rgba(255,248,236,0.45)";
                  }
                }}
              >
                {/* Left accent bar */}
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full transition-all duration-200"
                  style={{
                    width: "3px",
                    height: isActive ? "18px" : "0px",
                    backgroundColor: "#DFFF66",
                  }}
                />
                <Icon
                  className="h-[15px] w-[15px] shrink-0 transition-colors duration-150"
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <span className="leading-none">{item.name}</span>
              </div>
            )}
          </NavLink>
        );
      })}
    </nav>

    {/* ── Bottom area ── */}
    <div className="px-3 pb-4 mt-auto">
      {/* Divider */}
      <div
        className="mb-3 mx-1"
        style={{ height: "1px", backgroundColor: "rgba(255,248,236,0.06)" }}
      />

      {/* User profile */}
      <div
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 mb-1"
        style={{ backgroundColor: "rgba(255,248,236,0.04)" }}
      >
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold"
          style={{ backgroundColor: "#FF8A1F", color: "#071533" }}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="truncate text-[12px] font-semibold leading-tight"
            style={{ color: "#FFF8EC" }}
          >
            {displayName}
          </p>
          <p
            className="truncate text-[10px] leading-tight mt-0.5"
            style={{ color: "rgba(255,248,236,0.35)" }}
          >
            {user?.email}
          </p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[12px] font-medium transition-all duration-150"
        style={{ color: "rgba(255,248,236,0.3)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#FF8A1F";
          e.currentTarget.style.backgroundColor = "rgba(255,138,31,0.07)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(255,248,236,0.3)";
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <LogOut className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
        <span>Log out</span>
      </button>
    </div>
  </aside>
);

const CollapsedSidebar = ({ navigation, initials, onExpand, onLogout }) => (
  <aside
    className="flex h-screen w-[60px] shrink-0 flex-col items-center"
    style={{
      backgroundColor: "#071533",
      borderRight: "1px solid rgba(255,248,236,0.06)",
    }}
  >
    {/* Logo slot */}
    <div className="flex flex-col items-center pt-5 pb-4 w-full">
      <Link to="/" className="flex items-center justify-center w-full">
        <img src={Logo} alt="Orion AI" className="h-10 w-10 object-contain" />
      </Link>
    </div>

    {/* Expand toggle */}
    <div
      className="mb-3 w-full flex justify-center"
      style={{
        borderBottom: "1px solid rgba(255,248,236,0.06)",
        paddingBottom: "12px",
      }}
    >
      <button
        type="button"
        aria-label="Expand sidebar"
        onClick={onExpand}
        className="flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-150"
        style={{ color: "rgba(255,248,236,0.25)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "rgba(255,248,236,0.7)";
          e.currentTarget.style.backgroundColor = "rgba(255,248,236,0.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(255,248,236,0.25)";
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>

    {/* Nav icons */}
    <nav className="flex flex-1 flex-col items-center gap-1 px-2 pt-1 w-full">
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            title={item.name}
            className="w-full flex justify-center"
          >
            {({ isActive }) => (
              <div
                className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: isActive
                    ? "rgba(223,255,102,0.12)"
                    : "transparent",
                  color: isActive ? "#DFFF66" : "rgba(255,248,236,0.4)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,248,236,0.06)";
                    e.currentTarget.style.color = "rgba(255,248,236,0.8)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "rgba(255,248,236,0.4)";
                  }
                }}
              >
                {/* Active dot indicator */}
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
                    style={{
                      width: "3px",
                      height: "16px",
                      backgroundColor: "#DFFF66",
                    }}
                  />
                )}
                <Icon
                  className="h-[15px] w-[15px]"
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
              </div>
            )}
          </NavLink>
        );
      })}
    </nav>

    {/* Bottom */}
    <div className="flex flex-col items-center gap-2 pb-4 w-full px-2">
      <div
        className="w-full mb-1"
        style={{ height: "1px", backgroundColor: "rgba(255,248,236,0.06)" }}
      />
      {/* Avatar */}
      <div
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold"
        style={{ backgroundColor: "#FF8A1F", color: "#071533" }}
        title="Profile"
      >
        {initials}
      </div>
      {/* Logout */}
      <button
        onClick={onLogout}
        aria-label="Log out"
        title="Log out"
        className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-150"
        style={{ color: "rgba(255,248,236,0.3)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#FF8A1F";
          e.currentTarget.style.backgroundColor = "rgba(255,138,31,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(255,248,236,0.3)";
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <LogOut className="h-3.5 w-3.5" strokeWidth={1.8} />
      </button>
    </div>
  </aside>
);

/* ─── Root Component ────────────────────────────────────────────────────── */
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.name || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (collapsed) {
    return (
      <CollapsedSidebar
        navigation={navigation}
        initials={initials}
        onExpand={() => setCollapsed(false)}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <ExpandedSidebar
      navigation={navigation}
      initials={initials}
      displayName={displayName}
      user={user}
      onCollapse={() => setCollapsed(true)}
      onLogout={handleLogout}
    />
  );
};

export default Sidebar;
