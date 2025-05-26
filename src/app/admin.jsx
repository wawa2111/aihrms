import Sidebar from "../components/ui/Sidebar.js";
import Loader from "../components/shared/loaders/Loader.js";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/shared/error/NotFound.js";
import { getRoles } from "../services/role.service.js";
import { useDispatch } from "react-redux";
import { getInsights } from "../services/insights.service.js";
import { getDepartments } from "../services/department.service.js";

const Dashboard = lazy(() => import("../admin/dashboard/Dashboard"));
const Employee = lazy(() => import("../admin/employee/Employee"));
const AddEmployee = lazy(() => import("../admin/employee/CreateEmployee"));
const EditEmployee = lazy(() => import("../admin/employee/UpdateEmployee"));
const ViewEmployee = lazy(() => import("../admin/employee/ViewEmployee"));
const Department = lazy(() => import("../admin/department/Department"));
const Attendance = lazy(() => import("../admin/attendance/Attendance"));
const CheckAttendance = lazy(() =>
  import("../admin/attendance/CheckAttendance")
);
const Feedback = lazy(() => import("../admin/feedback/Feedback"));
const LeaveRequest = lazy(() => import("../admin/leave/LeaveRequest"));
const EmployeeOnLeave = lazy(() => import("../admin/leave/EmployeeOnLeave"));
const Complaint = lazy(() => import("../admin/complaint/Complaint"));
const JobApplications = lazy(() =>
  import("../admin/recruitment/JobApplications")
);
const JobOpenings = lazy(() => import("../admin/recruitment/JobOpenings"));
const PostJob = lazy(() => import("../admin/recruitment/PostJob"));
const Performance = lazy(() => import("../admin/performance/Performance"));
const Report = lazy(() => import("../admin/report/Report"));
const Payroll = lazy(() => import("../admin/payroll/Payroll"));
const Mail = lazy(() => import("../admin/mail/Communication"));

const AdminApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInsights());
    dispatch(getRoles());
    dispatch(getDepartments());
  }, []);

  return (
    <div
      id="transition"
      className="min-h-screen max-h-auto text-gray-800 bg-gray-200 dark:text-gray-200 dark:bg-primary flex justify-between relative"
    >
      <Sidebar />
      <Suspense fallback={<Loader />}>
        <main
          id="overflow"
          className="w-full max-h-auto sm:min-h-screen lg:w-[85%] lg:ml-[255px] py-1 sm:px-2 mt-[69px] lg:mt-0"
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="/employee/:id" element={<ViewEmployee />} />
            <Route path="/employee/create" element={<AddEmployee />} />
            <Route path="/employee/update/:id" element={<EditEmployee />} />
            <Route path="/department" element={<Department />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance/check" element={<CheckAttendance />} />
            <Route path="/leaves" element={<LeaveRequest />} />
            <Route path="/leave/active" element={<EmployeeOnLeave />} />
            <Route path="/performances" element={<Performance />} />
            <Route path="/recruitment" element={<JobOpenings />} />
            <Route
              path="/recruitment/applications"
              element={<JobApplications />}
            />
            <Route path="/recruitment/create" element={<PostJob />} />
            <Route path="/payrolls" element={<Payroll />} />
            <Route path="/feedbacks" element={<Feedback />} />
            <Route path="/feedbacks" element={<Feedback />} />
            <Route path="/complaints" element={<Complaint />} />
            <Route path="/complaints" element={<Complaint />} />
            <Route path="/mails" element={<Mail />} />
            <Route path="/reports" element={<Report />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* <Footer /> */}
        </main>
      </Suspense>
    </div>
  );
};

export default AdminApp;
