import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCards from "../components/dashboard/StatCards";
import RecentDocuments from "../components/dashboard/RecentDocuments";
import QuickActions from "../components/dashboard/QuickActions";
const DashboardPage = () => {
  return (
    <>
      <DashboardHeader></DashboardHeader>
      <StatsCards />
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentDocuments />
        </div>

        <QuickActions />
      </div>
    </>
  );
};

export default DashboardPage;
