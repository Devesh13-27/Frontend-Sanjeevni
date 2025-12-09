import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import logoImage from "figma:asset/8e191f727b2ef8023e7e4984e9036f679c3d3038.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../createClient";

export default function FamilyMedicalHistoryUI() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (data.user) setUserId(data.user.id);
    }
    getUser();
  }, []);

  // STATE
  const [familyMedicalHistory, setFamilyMedicalHistory] = useState([
    { disease: "", relation: "" },
  ]);

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const familyData = {
        familyMedicalHistory
    }

    const { error } = await supabase
        .from("profiles")
        .update( {family_health_history: familyData} )
        .eq("uid", userId)

    if (error) {
        alert("Erorr: " + error.message);
    } else {
        navigate("/home")
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 my-8 border-4 border-[#309898]">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logoImage} alt="Vytara Logo" className="w-16 h-16" />
        </div>

        <h2 className="text-center text-[#309898] mb-2">Family Medical History</h2>
        <p className="text-center text-gray-600 mb-6">Section 4/4</p>

        <form className="space-y-6" onSubmit={handlesubmit}>

          {/* TITLE */}
          <h3 className="text-[#FF8000] mb-2">Family Medical History</h3>

          {/* DYNAMIC ROWS – UI KEPT SAME */}
          {familyMedicalHistory.map((row, index) => (
            <div key={index} className="flex gap-4 items-center relative">

              {/* INPUT */}
              <input
                value={row.disease}
                onChange={(e) => {
                  const updated = [...familyMedicalHistory];
                  updated[index].disease = e.target.value;
                  setFamilyMedicalHistory(updated);
                }}
                placeholder="e.g., Diabetes"
                className="flex-1 px-4 py-2 rounded-lg border-2 border-[#309898]/30"
              />

              {/* SELECT */}
              <select
                value={row.relation}
                onChange={(e) => {
                  const updated = [...familyMedicalHistory];
                  updated[index].relation = e.target.value;
                  setFamilyMedicalHistory(updated);
                }}
                className="flex-1 px-4 py-2 rounded-lg border-2 border-[#309898]/30"
              >
                <option value="">Select Relation</option>
                <option>Father</option>
                <option>Mother</option>
                <option>Brother</option>
                <option>Sister</option>
                <option>Grandparents</option>
              </select>

              {/* REMOVE BUTTON */}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setFamilyMedicalHistory(
                      familyMedicalHistory.filter((_, i) => i !== index)
                    );
                  }}
                  className="text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}

          {/* ADD BUTTON */}
          <button
            type="button"
            onClick={() =>
              setFamilyMedicalHistory([
                ...familyMedicalHistory,
                { disease: "", relation: "" },
              ])
            }
            className="flex items-center gap-2 text-[#FF8000] cursor-pointer"
          >
            <Plus className="w-5 h-5" /> Add More
          </button>

          {/* NEXT BUTTON */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#FF8000] text-white px-6 py-2 rounded-lg hover:bg-[#309898] cursor-pointer"
            >
              Next <ChevronRight />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
