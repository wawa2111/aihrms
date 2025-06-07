import { downloadXls } from "../../utils.js";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Error from "../../components/shared/error/Error.js";
import Modal from "../../components/shared/modals/Modal.js";
import Loader from "../../components/shared/loaders/Loader.js";
import FilterBar from "../../components/shared/others/FilterBar.js";
import Pagination from "../../components/shared/others/Pagination.js";
import {
  deleteEmployee,
  getAllEmployees,
} from "../../services/employee.service.js";
import NoDataMessage from "../../components/shared/error/NoDataMessage.js";
import ImportExcelModal from "../../components/shared/modals/ImportExcelModal.js";
import FetchError from "../../components/shared/error/FetchError.js";
import CTAButton from "../../components/shared/CTAButton.js";
import ButtonBase from "../../components/shared/buttons/ButtonBase.js";

function Employee() {
  const dispatch = useDispatch();
  const { employees, pagination, loading, error } = useSelector(
    (state) => state.employee
  );

  const [uiState, setUiState] = useState({
    toggleFilterBar: false,
    toggleModal: false,
    toggleExcelModal: false,
    deletedEmployee: null,
    exportLoading: false,
    currentPage: 1,
  });

  const [filters, setFilters] = useState({
    department: "",
    role: "",
    status: "",
    name: "",
    departmentName: "",
    roleName: "",
  });

  const goToPage = (page) =>
    setUiState((prev) => ({ ...prev, currentPage: page }));

  const confirmation = useCallback(() => {
    dispatch(deleteEmployee(uiState.deletedEmployee._id));
    setUiState((prev) => ({
      ...prev,
      deletedEmployee: null,
      toggleModal: false,
    }));
  }, [dispatch, uiState.deletedEmployee]);

  const handleExportToExcel = useCallback(() => {
    setUiState((prev) => ({ ...prev, exportLoading: true }));

    const data = employees.map((employee) => ({
      EmployeeID: employee.employeeId,
      Name: employee.name,
      DateOfBirth: employee.dob,
      Email: employee.email,
      PhoneNumber: employee.phoneNumber,
      Address: `${employee.address.street}, ${employee.address.city}, ${employee.address.state}, ${employee.address.postalCode}, ${employee.address.country}`,
      DateOfJoining: employee.dateOfJoining,
      Gender: employee.gender,
      MaritalStatus: employee.maritalStatus,
      Department: employee.department.name,
      Position: employee.role.name,
      EmploymentType: employee.employmentType,
      Shift: employee.shift,
      Status: employee.status,
      Salary: employee.salary,
      BankDetails: `${employee.bankDetails.accountNumber} - ${employee.bankDetails.bankName}`,
      EmergencyContact: `${employee.emergencyContact.name} (${employee.emergencyContact.relationship}) - ${employee.emergencyContact.phoneNumber}`,
      LeaveBalance: employee.leaveBalance,
      Admin: employee.admin ? "Yes" : "No",
    }));

    setTimeout(() => {
      downloadXls(data);
      setUiState((prev) => ({ ...prev, exportLoading: false }));
    }, 2000);
  }, [employees]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setUiState((prev) => ({ ...prev, toggleFilterBar: false }));
  };

  const clearFilter = (filterKey) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: "",
      [`${filterKey}Name`]: "",
    }));
  };

  const renderFilters = Object.keys(filters)
    .filter(
      (key) => filters[key] && key !== "departmentName" && key !== "roleName"
    )
    .map((key) => (
      <button
        key={key}
        className="flex justify-between items-center gap-2 text-[0.9rem] border border-gray-300 py-1 px-5 rounded-2xl hover:border-blue-500 hover:bg-blue-100 hover:text-blue-600 
   dark:hover:border-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500  transition-all  ease-in-out duration-300"
      >
        {filters[key + "Name"] || filters[key]}
        <i
          onClick={() => clearFilter(key)}
          className="fa-solid fa-close text-xs cursor-pointer"
        ></i>
      </button>
    ));

  useEffect(() => {
    dispatch(getAllEmployees({ currentPage: uiState.currentPage, filters }));
  }, [dispatch, uiState.currentPage, filters]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", uiState.toggleFilterBar);
  }, [uiState.toggleFilterBar]);

  if (!employees) return <Error />;

  return (
    <>
      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg min-h-screen shadow">
        <div className="relative flex gap-1 items-center justify-between py-1 sm:px-3 mb-3">
          {!(
            filters.status ||
            filters.department ||
            filters.role ||
            filters.name
          ) && (
            <CTAButton
              text="Apply Filters"
              onClick={() =>
                setUiState((prev) => ({ ...prev, toggleFilterBar: true }))
              }
              variant="outline"
              size="sm"
              icon="fa-solid fa-filter"
              ariaLabel="Open filter options"
              className="hidden sm:flex"
            />
          )}

          <div className="flex flex-wrap items-center gap-2">
            {renderFilters}
          </div>

          <div className="flex items-center gap-3">
            <CTAButton
              text={uiState.exportLoading ? "Exporting..." : "Export to Excel"}
              onClick={handleExportToExcel}
              variant="outline"
              size="sm"
              icon={uiState.exportLoading ? "fas fa-spinner fa-spin" : "fas fa-file-excel"}
              loading={uiState.exportLoading}
              disabled={uiState.exportLoading}
              ariaLabel="Export employee data to Excel"
              className="hidden sm:flex"
            />
            <CTAButton
              text="Import from Excel"
              onClick={() =>
                setUiState((prev) => ({ ...prev, toggleExcelModal: true }))
              }
              variant="outline"
              size="sm"
              icon="fas fa-file-excel"
              ariaLabel="Import employee data from Excel"
              className="hidden sm:flex"
            />
          </div>
        </div>

        <div id="overflow" className="overflow-x-auto min-h-[80vh]">
          <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
            <thead>
              <tr className="bg-headLight dark:bg-head text-primary">
                {[
                  "Employee ID",
                  "Name",
                  "Department",
                  "Position",
                  "Status",
                  "Contact Info",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="py-3 px-4 border-b border-secondary"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 &&
                employees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-secondary">
                      {employee.admin && (
                        <i className="fa-solid fa-crown text-[gold] mr-2"></i>
                      )}
                      EMP {employee.employeeId}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {employee.department?.name || "Null"}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {employee.role?.name || "Null"}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {employee.status}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {employee.phoneNumber}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      <div className="flex items-center space-x-2">
                        <ButtonBase
                          link={`/employee/${employee._id}`}
                          variant="ghost"
                          size="xs"
                          icon="fa-solid fa-eye"
                          ariaLabel={`View ${employee.name}'s details`}
                          className="text-blue-500 hover:text-blue-400"
                        />
                        <ButtonBase
                          link={`/employee/update/${employee._id}`}
                          variant="ghost"
                          size="xs"
                          icon="fa-solid fa-edit"
                          ariaLabel={`Edit ${employee.name}'s information`}
                          className="text-green-500 hover:text-green-400"
                        />
                        <ButtonBase
                          onClick={() =>
                            setUiState((prev) => ({
                              ...prev,
                              deletedEmployee: employee,
                              toggleModal: true,
                            }))
                          }
                          variant="ghost"
                          size="xs"
                          icon="fa-solid fa-trash"
                          ariaLabel={`Delete ${employee.name}`}
                          className="text-red-500 hover:text-red-400"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {!loading && !error && employees.length === 0 && (
            <NoDataMessage message={"No employee found"} />
          )}
          {error && <FetchError error={error} />}
        </div>
        {!loading && employees.length > 0 && (
          <Pagination {...pagination} onPageChange={goToPage} />
        )}

        {uiState.toggleFilterBar && (
          <FilterBar
            isOpen={uiState.toggleFilterBar}
            handleApplyFilters={handleApplyFilters}
            hideFilterBar={() =>
              setUiState((prev) => ({ ...prev, toggleFilterBar: false }))
            }
          />
        )}

        {uiState.toggleModal && (
          <Modal
            onClose={() =>
              setUiState((prev) => ({ ...prev, toggleModal: false }))
            }
            action={"delete"}
            isConfirm={confirmation}
          />
        )}

        {uiState.toggleExcelModal && (
          <ImportExcelModal
            onClose={() =>
              setUiState((prev) => ({ ...prev, toggleExcelModal: false }))
            }
          />
        )}
      </section>
    </>
  );
}

export default Employee;
