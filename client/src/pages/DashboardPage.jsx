import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { user, logout, isLoading, error } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl p-8">
        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold">Dashboard</h1>
              <p className="mt-2 text-slate-400">Welcome back, {user?.name || "user"}.</p>
            </div>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <Link
                to="/"
                className="rounded-full border border-cyan-500 px-5 py-2 text-cyan-400 transition hover:bg-cyan-500/10"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="rounded-full bg-cyan-500 px-5 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>

          {error && <p className="mb-4 rounded-xl bg-rose-500/10 p-4 text-rose-300">{error}</p>}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-slate-800 p-6 shadow-lg">
              <h2 className="text-2xl font-semibold">Account Info</h2>
              <p className="mt-4 text-slate-300">Email: {user?.email}</p>
              <p className="mt-2 text-slate-300">Member since: {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
            <div className="rounded-3xl bg-slate-800 p-6 shadow-lg">
              <h2 className="text-2xl font-semibold">Quick Actions</h2>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li>View profile</li>
                <li>Update settings</li>
                <li>Connect with other users</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
