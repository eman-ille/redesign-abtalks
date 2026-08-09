import data from "../../data/data.json";
import DashboardClient from "./DashboardClient";

export default function Dashboard() {
  const { student, days, levelThresholds } = data;
  return (
    <DashboardClient student={student} days={days} levelThresholds={levelThresholds} />
  );
}