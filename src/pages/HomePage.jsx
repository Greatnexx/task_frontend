import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { GrTransaction } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { Spinner } from "@material-tailwind/react";
import { CiSearch } from "react-icons/ci";

const HomePage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://paystack-backend-five.vercel.app/api/payment/initiate?page=${pageNumber}&search=${searchQuery}`
        );
        const data = await response.json();
        setPayments(data?.data || []);
        setTotalPages(data?.pagination?.totalPages || 1);
        setError(false);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [pageNumber, searchQuery]); 

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); 
    setPageNumber(1);
  };

  const handlePrev = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNext = () => {
    if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
  };

  return (
    <div className="grid grid-cols-12  overflow-y-auto h-screen space-x-6 scroll">
      <div className="col-span-2 bg-[#19004F] overflow-y-auto cursor-pointer">
        <img src={logo} alt="" className="m-auto mt-5" />
        <div className="py-3">
          <h1 className="text-[#fff] text-[20px] text-center">Menu</h1>
          <span className="flex items-center space-x-3 mt-7">
            <MdDashboard className="text-[#F58220] ml-4 text-[25px]" />
            <p className="text-[#fff]">Dashboard</p>
          </span>
          <span className="flex items-center space-x-3 mt-7">
            <GrTransaction className="text-[#F58220] text-[25px] ml-4" />
            <p className="text-[#fff]">Transactions</p>
          </span>
        </div>
      </div>

      <div className="col-span-10 mt-4 overflow-y-scroll">
        <h2 className="text-[25px] font-semibold ml-7">Transactions</h2>
        <div className="relative flex items-center gap-3  mt-3 mb-6">
        <input
          type="search"
          value={searchQuery} 
          onChange={handleSearch} 
          placeholder="Search by email"
          className="py-2 px-14 border rounded-md border-gray-300 outline-none "
        />
          <CiSearch className="absolute left-2 text-[24px] text-gray-400  "  />
         </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-300">Email</th>
                <th className="py-2 px-4 border border-gray-300">Amount</th>
                <th className="py-2 px-4 border border-gray-300">Created At</th>
                <th className="py-2 px-4 border border-gray-300">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4">
                    <div className="flex justify-center items-center h-32">
                      <Spinner className="h-8 w-8" />
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border border-gray-300">
                      {payment.email}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      ${Number(payment.amount).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      {new Date(payment.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      {new Date(payment.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center px-9 float-right gap-3">
          <button
            disabled={pageNumber === 1}
            onClick={handlePrev}
            className={`${
              pageNumber === 1
                ? "bg-gray-400 py-1 px-3 text-[#fff]"
                : "bg-[#F58220] py-1 px-3 text-[#fff]"
            }`}
          >
            Prev
          </button>
          {pageNumber} of {totalPages}
          <button
            disabled={pageNumber === totalPages}
            onClick={handleNext}
            className={`${
              pageNumber === totalPages
                ? "bg-gray-400 py-1 px-3 text-[#fff]"
                : "bg-[#F58220] py-1 px-3 text-[#fff]"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
