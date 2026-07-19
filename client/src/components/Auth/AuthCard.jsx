const AuthCard = ({ children }) => {
  return (
    <div
      className="flex flex-1 items-center justify-center px-8 py-10 sm:px-12 lg:px-14"
      style={{ backgroundColor: "#111827" }}
    >
      <div className="w-full" style={{ maxWidth: "400px" }}>
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
