import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { getVehicles } from "../services/auth.service";

export default function Vehicles() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const owners = await getVehicles();
      setData(owners.data.data);
    }

    fetchData();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="px-6 pt-6 2xl:container">
      {/* grid gap-6 md:grid-cols-2 lg:grid-cols-3 */}
      <div className="font-semibold">
        <div className="bg-white p-8 rounded-md w-full">
          <div className=" flex items-center justify-end pb-6">
            <div className="lg:ml-40 ml-10 space-x-8">
              <Link to="/dashboard/new-vehicle">
                <button
                  onClick={() => navigate("/dashboard/new-vehicle")}
                  className="bg-primary-600 px-5 py-2 rounded-xl text-white font-semibold tracking-wide cursor-pointer"
                >
                  Register vehicle
                </button>
              </Link>
            </div>
          </div>
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 text-primary-600 border-primary-600 bg-primary-500 text-left text-xs font-semibold  uppercase tracking-wider">
                        CHASSIS NO.
                      </th>
                      <th className="px-5 py-3 border-b-2 text-primary-600 border-primary-600 bg-primary-500 text-left text-xs font-semibold  uppercase tracking-wider">
                        MANUFACTURE CO...
                      </th>
                      <th className="px-5 py-3 border-b-2 text-primary-600 border-primary-600 bg-primary-500 text-left text-xs font-semibold  uppercase tracking-wider">
                        YEAR
                      </th>
                      <th className="px-5 py-3 border-b-2 text-primary-600 border-primary-600 bg-primary-500 text-left text-xs font-semibold  uppercase tracking-wider">
                        vehicle price
                      </th>
                      <th className="px-5 py-3 border-b-2 text-primary-600 border-primary-600 bg-primary-500 text-left text-xs font-semibold  uppercase tracking-wider">
                        plate no
                      </th>

                      <th className="px-5 py-3 border-b-2 text-primary-600 border-primary-600 bg-primary-500 text-left text-xs font-semibold  uppercase tracking-wider">
                        Model name
                      </th>

                      <th className="px-5 py-3 border-b-2 text-primary-600 border-primary-600 bg-primary-500 text-left text-xs font-semibold  uppercase tracking-wider">
                        Owner
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((vh) => (
                      <tr key={vh._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {vh.chasisNumber}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {vh.manufacturer}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {vh.manufactureYear}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {vh.price}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {vh.plateNumber}
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {vh.model}
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {!vh.ownerId && (
                              <Link
                                to={"/dashboard/link-vehicle?id=" + vh._id}
                                className="tex-sm text-primary-600 underline"
                              >
                                Link owner
                              </Link>
                            )}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 10 of {data.length} Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm text-primary-400 transition duration-150 hover:bg-primary-600 bg-primary-600 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  &nbsp; &nbsp;
                  <button className="text-sm text-primary-400 transition duration-150 hover:bg-primary-600 bg-primary-600 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
