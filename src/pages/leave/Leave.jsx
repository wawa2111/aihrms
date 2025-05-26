import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form.js";
import { zodResolver } from "@hookform/resolvers/zod.js";
import { createLeave } from "../../services/leave.service.js";
import { leaveSchema } from "../../validations.js";

const Leave = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.leave);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leaveSchema),
  });

  const onSubmit = (data) => {
    dispatch(createLeave(data))
      .unwrap()
      .then(() => reset())
      .catch((error) => console.error("Error creating leave:", error));
  };

  return (
    <section className="h-screen overflow-hidden bg-gray-50">
      <main className="flex justify-center items-center w-full h-full text-black font-medium">
        <div className="w-[94%] sm:w-[490px] rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="flex flex-col items-center py-8">
            <h1 className="text-[1.3rem] mt-3 font-extrabold flex items-center gap-2">
              <i className="fa-regular fa-calendar-minus"></i>
              Apply for Leave
            </h1>
          </div>

          <form
            className="flex flex-col items-center gap-2 pb-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Leave Type */}
            <div className="w-[85%] relative">
              <select
                id="select"
                {...register("leaveType")}
                className={`w-full bg-[#EFEFEF] text-center text-sm p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] ${
                  errors.leaveType && "border border-red-500"
                }`}
                disabled={loading}
              >
                <option value="">--- Select Leave Type ---</option>
                <option value="Sick">Sick Leave</option>
                <option value="Casual">Casual Leave</option>
                <option value="Vacation">Vacation Leave</option>
                <option value="Unpaid">Unpaid</option>
              </select>
              {errors.leaveType && (
                <p className="text-red-500 text-xs mt-1 ml-3">
                  {errors.leaveType.message}
                </p>
              )}
            </div>

            {/* Duration */}
            <div className="w-[85%]">
              <input
                type="number"
                placeholder="Duration (in days)"
                {...register("duration")}
                className={`w-full bg-[#EFEFEF] text-sm text-center p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] ${
                  errors.duration && "border border-red-500"
                }`}
                disabled={loading}
              />
              {errors.duration && (
                <p className="text-red-500 text-xs mt-1 ml-3">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* From Date */}
            <div className="w-[85%]">
              <input
                type="text"
                placeholder="From Leave Date"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                {...register("fromDate")}
                className={`w-full bg-[#EFEFEF] text-sm text-center p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] ${
                  errors.fromDate && "border border-red-500"
                }`}
                disabled={loading}
              />
              {errors.fromDate && (
                <p className="text-red-500 text-xs mt-1 ml-3">
                  {errors.fromDate.message}
                </p>
              )}
            </div>

            {/* To Date */}
            <div className="w-[85%]">
              <input
                type="text"
                placeholder="To Leave Date"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                {...register("toDate")}
                className={`w-full bg-[#EFEFEF] text-sm text-center p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] ${
                  errors.toDate && "border border-red-500"
                }`}
                disabled={loading}
              />
              {errors.toDate && (
                <p className="text-red-500 text-xs mt-1 ml-3">
                  {errors.toDate.message}
                </p>
              )}
            </div>

            {/* Leave Description */}
            <div className="w-[85%]">
              <textarea
                {...register("description")}
                placeholder="Write your reason..."
                rows="4"
                className={`w-full bg-[#EFEFEF] text-sm p-[18px] rounded-lg focus:outline focus:outline-2 focus:outline-gray-700 font-[500] ${
                  errors.description && "border border-red-500"
                }`}
                disabled={loading}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1 ml-3">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-[85%] rounded-full bg-blue-600 p-4 text-sm text-white transition hover:bg-blue-700"
            >
              {loading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Submit Leave Application"
              )}
            </button>
          </form>
        </div>
      </main>
    </section>
  );
};

export default Leave;
