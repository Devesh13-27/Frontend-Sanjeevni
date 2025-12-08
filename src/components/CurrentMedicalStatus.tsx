import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../createClient";

export default function HealthInfoFormUI() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUserId(data.user.id)
      }
    }
    getUser();
  }, [])

  const [condition, setConditions] = useState("")

  const handleNext = () => {

  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 my-8 border-4 border-[#309898]">
        <h2 className="text-center text-[#309898] mb-2">Health Information</h2>
        <p className="text-center text-gray-600 mb-6">Section 2/4</p>

        <form onSubmit={handleNext} className="min-h-[500px] space-y-6">

          {/* CONDITIONS */}
          <div className="space-y-4">
            <h3 className="text-[#FF8000] mb-4">Current Diagnosed Conditions</h3>

            {conditions.map((cond, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  value={cond}
                  onChange={(e) => {
                    const updated = [...conditions];
                    updated[index] = e.target.value;
                    setConditions(updated);
                  }}
                  placeholder="e.g., Diabetes, Asthma"
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-[#309898]/30"
                />

                {index > 0 && (
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() =>
                      setConditions(conditions.filter((_, i) => i !== index))
                    }
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={() => setConditions([...conditions, ""])}
              type="button"
              className="flex items-center gap-2 text-[#FF8000] cursor-pointer"
            >
              <Plus className="w-5 h-5" /> Add Condition
            </button>
          </div>

          {/* MEDICATIONS */}
          <div className="space-y-4">
            <h3 className="text-[#FF8000] mb-4">Current Medications</h3>

            {medications.map((med, index) => (
              <div
                key={index}
                className="p-4 border-2 border-[#309898]/30 rounded-lg bg-gray-50 space-y-3 relative"
              >
                {index > 0 && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() =>
                      setMedications(medications.filter((_, i) => i !== index))
                    }
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-[#309898] mb-2">Medication Name</label>
                    <input
                      value={med.name}
                      onChange={(e) => {
                        const updated = [...medications];
                        updated[index].name = e.target.value;
                        setMedications(updated);
                      }}
                      placeholder="e.g., Metformin"
                      className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[#309898] mb-2">Dosage</label>
                    <input
                      value={med.dosage}
                      onChange={(e) => {
                        const updated = [...medications];
                        updated[index].dosage = e.target.value;
                        setMedications(updated);
                      }}
                      placeholder="e.g., 500 mg"
                      className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[#309898] mb-2">Frequency</label>
                    <input
                      value={med.frequency}
                      onChange={(e) => {
                        const updated = [...medications];
                        updated[index].frequency = e.target.value;
                        setMedications(updated);
                      }}
                      placeholder="e.g., Twice a day"
                      className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[#309898] mb-2">Purpose</label>
                    <input
                      value={med.purpose}
                      onChange={(e) => {
                        const updated = [...medications];
                        updated[index].purpose = e.target.value;
                        setMedications(updated);
                      }}
                      placeholder="e.g., Blood sugar control"
                      className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setMedications([
                  ...medications,
                  { name: "", dosage: "", frequency: "", purpose: "" },
                ])
              }
              className="flex items-center gap-2 text-[#FF8000] cursor-pointer"
            >
              <Plus className="w-5 h-5" /> Add Medication
            </button>
          </div>

          {/* ALLERGIES */}
          <div className="space-y-4">
            <h3 className="text-[#FF8000] mb-4">Allergies</h3>

            {allergies.map((allergy, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  value={allergy}
                  onChange={(e) => {
                    const updated = [...allergies];
                    updated[index] = e.target.value;
                    setAllergies(updated);
                  }}
                  placeholder="e.g., Peanuts, Penicillin"
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-[#309898]/30"
                />

                {index > 0 && (
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() =>
                      setAllergies(allergies.filter((_, i) => i !== index))
                    }
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => setAllergies([...allergies, ""])}
              className="flex items-center gap-2 text-[#FF8000] cursor-pointer"
            >
              <Plus className="w-5 h-5" /> Add Allergy
            </button>
          </div>

          {/* TREATMENTS */}
          <div className="space-y-4">
            <h3 className="text-[#FF8000] mb-4">Ongoing Treatments</h3>

            {treatments.map((treat, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  value={treat}
                  onChange={(e) => {
                    const updated = [...treatments];
                    updated[index] = e.target.value;
                    setTreatments(updated);
                  }}
                  placeholder="e.g., Physiotherapy, Dialysis"
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-[#309898]/30"
                />

                {index > 0 && (
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() =>
                      setTreatments(treatments.filter((_, i) => i !== index))
                    }
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => setTreatments([...treatments, ""])}
              className="flex items-center gap-2 text-[#FF8000] cursor-pointer"
            >
              <Plus className="w-5 h-5" /> Add Treatment
            </button>
          </div>

        </form>

        {/* NAVIGATION BUTTON */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            form="healthForm"
            className="flex items-center gap-2 bg-[#FF8000] text-white px-6 py-2 rounded-lg hover:bg-[#309898]"
          >
            Next <ChevronRight />
          </button>
        </div>

      </div>
    </div>
  );
}
