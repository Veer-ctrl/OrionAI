const StatCard = ({ title, value, icon: Icon, accent = "#FF8A1F" }) => {
  return (
    <div
      className="rounded-2xl p-6 transition-all duration-200"
      style={{
        backgroundColor: "rgba(7,21,51,0.03)",
        border: "1px solid rgba(7,21,51,0.08)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(7,21,51,0.14)";
        e.currentTarget.style.backgroundColor = "rgba(7,21,51,0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(7,21,51,0.08)";
        e.currentTarget.style.backgroundColor = "rgba(7,21,51,0.03)";
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: accent + "18" }}
        >
          <Icon className="h-4 w-4" style={{ color: accent }} />
        </div>
        <span
          className="text-3xl font-bold tracking-tight tabular-nums"
          style={{ color: "#071533" }}
        >
          {value}
        </span>
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(7,21,51,0.4)" }}>
        {title}
      </p>
    </div>
  );
};

export default StatCard;
