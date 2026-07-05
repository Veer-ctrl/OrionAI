const AuthLayout = ({ children }) => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {children}
    </div>
  );
};

export default AuthLayout;