import { useEffect, useState } from "react";
import { formatDate } from "../../utils.js";
import { FaStar } from "react-icons/fa.js";
import { getFeedbacks } from "../../services/feedback.service.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/loaders/Loader.js";
import Pagination from "../../components/shared/others/Pagination.js";
import NoDataMessage from "../../components/shared/error/NoDataMessage.js";
import FilterButton from "../../components/shared/buttons/FilterButton.js";
import { feedbackButtons } from "../../data.js";
import FetchError from "../../components/shared/error/FetchError.js";

function Feedback() {
  const dispatch = useDispatch();
  const { feedbacks, loading, pagination, error } = useSelector(
    (state) => state.feedback
  );

  const [reviewFilter, setReviewFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    dispatch(getFeedbacks({ review: reviewFilter.toLowerCase(), currentPage }));
  }, [reviewFilter, currentPage]);

  return (
    <>
      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg min-h-screen shadow">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          {feedbackButtons.map((filter, i) => (
            <FilterButton
              key={i}
              setState={setReviewFilter}
              state={reviewFilter}
              filter={filter}
            />
          ))}
        </div>

        <div id="overflow" className="overflow-x-auto min-h-[90vh]">
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="dark:bg-head bg-headLight text-primary">
                {[
                  "Emp ID",
                  "Name",
                  "Department",
                  "Position",
                  "AI Review",
                  "Description",
                  "Date",
                  "Rating",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="py-3 px-4 border-b border-secondary"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feedbacks.length > 0 &&
                feedbacks.map((feedback, index) => (
                  <tr
                    key={index}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-secondary">
                      {feedback.employee.employeeId}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {feedback.employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {feedback.employee.department?.name || "Null"}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {feedback.employee.role?.name || "Null"}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {feedback.review}
                    </td>

                    {/* Description with Tooltip */}
                    <td
                      className="py-3 px-4 border-b border-secondary relative cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {feedback.description.slice(0, 10) + "...."}

                      {hoveredIndex === index && (
                        <div className="absolute left-0 top-full mt-1 max-w-[300px] h-auto bg-gray-900 dark:bg-gray-200 dark:text-black text-white text-xs p-2 rounded shadow-lg z-10 break-words whitespace-normal">
                          <i className="fas fa-quote-left dark:text-gray-700 text-white mr-2"></i>
                          {feedback.description}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4 border-b border-secondary">
                      {formatDate(feedback.createdAt)}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary flex items-center gap-2">
                      {feedback.rating} <FaStar color="gold" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {!loading && !error && feedbacks.length === 0 && (
            <NoDataMessage message={"No feedback found"} />
          )}
          {error && <FetchError error={error} />}
        </div>
        {!loading && feedbacks.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination?.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>
    </>
  );
}

export default Feedback;
