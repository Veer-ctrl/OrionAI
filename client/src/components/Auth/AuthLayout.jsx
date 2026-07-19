const AuthLayout = ({ children }) => {
  return (
    <div
      className="h-screen flex items-center justify-center p-3 sm:p-5"
      style={{
        backgroundColor: "#0d1b33",
        backgroundImage: `
          radial-gradient(ellipse 70% 60% at 0% 0%, rgba(101,92,255,0.12) 0%, transparent 55%),
          radial-gradient(ellipse 50% 50% at 100% 100%, rgba(255,138,31,0.08) 0%, transparent 55%)
        `,
      }}
    >
      <div
        className="relative w-full flex overflow-hidden"
        style={{
          maxWidth: "980px",
          minHeight: "620px",
          borderRadius: "28px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04) inset",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
