import { useEffect, useState } from "react";
import { getEmployeesOnLeave } from "../../services/leave.service.js";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../utils.js";
import Loader from "../../components/shared/loaders/Loader.js";
import NoDataMessage from "../../components/shared/error/NoDataMessage.js";
import FilterButton from "../../components/shared/buttons/FilterButton.js";
import { employeesOnLeaveButtons } from "../../data.js";
import FetchError from "../../components/shared/error/FetchError.js";

function EmployeeOnLeave() {
  const dispatch = useDispatch();

  const {
    employeesOnLeaveToday = [],
    loading,
    error,
  } = useSelector((state) => state.leave);
  const [status, setStatus] = useState("Present");

  useEffect(() => {
    const dateMapping = {
      yesterday: new Date(new Date().setDate(new Date().getDate() - 1)),
      present: new Date(),
      tomorrow: new Date(new Date().setDate(new Date().getDate() + 1)),
    };

    dispatch(getEmployeesOnLeave(formatDate(dateMapping[status])));
  }, [status, dispatch]);

  return (
    <>
      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg min-h-screen shadow">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          {employeesOnLeaveButtons.map((filter, i) => (
            <FilterButton
              key={i}
              setState={setStatus}
              state={status}
              filter={filter}
            />
          ))}
        </div>
        <div id="overflow" className="overflow-x-auto min-h-[80vh]">
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-headLight dark:bg-head text-primary">
                {[
                  "Emp ID",
                  "Name",
                  "Department",
                  "Position",
                  "Substitute",
                  "Leave Type",
                  "From",
                  "To",
                  "Duration",
                ].map((header, i) => (
                  <th
                    key={i}
                    className="py-3 px-4 border-b border-gray-500"
                    scope="col"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[0.83rem]">
              {employeesOnLeaveToday &&
                employeesOnLeaveToday.map((leave, index) => (
                  <tr
                    key={index}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-gray-500">
                      EMP {leave.employee?.employeeId}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.employee.department?.name || "Null"}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.employee.role?.name || "Null"}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.substitute.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.leaveType}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {formatDate(leave.fromDate)}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {formatDate(leave.toDate)}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.duration} days
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {!loading && !error && employeesOnLeaveToday.length === 0 && (
            <NoDataMessage message={`No employees on leave for ${status}.`} />
          )}
          {error && <FetchError error={error} />}
        </div>
      </section>
    </>
  );
}

export default EmployeeOnLeave;
