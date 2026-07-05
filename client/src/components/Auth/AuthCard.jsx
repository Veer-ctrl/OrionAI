const AuthCard = ({ children }) => {
  return (
    <div className="flex items-center justify-center p-6 sm:p-8">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default AuthCard;