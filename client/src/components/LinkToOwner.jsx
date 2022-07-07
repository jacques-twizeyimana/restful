import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopupMolecule from "./Popup";
import { getOwners, updateVehicle } from "../services/auth.service";
import toast from "react-hot-toast";

export default function LinkToOwner() {
  const [showPopup, setShowPopup] = React.useState(true);
  const navigate = useNavigate();
  const [owners, setOwners] = React.useState([]);
  const [selectedOwner, setSelectedOwner] = React.useState(null);

  //get vehicle id from query params
  const vehicleId = new URLSearchParams(window.location.search).get("id");
  console.log(vehicleId);

  //fetch owners from api
  useEffect(() => {
    async function fetchData() {
      const resp = await getOwners();
      setOwners(resp.data.data);
    }

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOwner) toast.error("Please select an owner");
    else {
      try {
        await updateVehicle({
          ownerId: selectedOwner,
          vehicleId,
        });
        toast.success("Owner linked successfully", { duration: 3000 });
        navigate("/dashboard/vehicles");
      } catch (error) {
        toast.error(error.response.data.message || error.response.data);
      }
    }
  };

  return (
    <div>
      <PopupMolecule
        open={showPopup}
        title={"Link Vehicle to owner"}
        onClose={() => navigate(-1)}
      >
        <div className="w-[340px] px-[10px] font-semibold">
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <label
              htmlFor="owner"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Vehicle owner
            </label>
            <select
              id="owner"
              onChange={(e) => setSelectedOwner(e.target.value)}
              className="bg-transparent border border-[#DEE2E6] text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 outline-none block w-full p-2.5 px-4 font-semibold"
            >
              <option selected>Select vehicle owner</option>
              {owners.map((owner) => (
                <option key={owner._id} value={owner._id}>
                  {owner.names}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="rounded-xl font-semibold flex justify-center items-center mt-2 w-full text-white bg-primary-600 p-3 "
            >
              Link to owner
            </button>
          </form>
        </div>
      </PopupMolecule>
    </div>
  );
}
