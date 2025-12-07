import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

export default function HealthInfoFormUI() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 my-8 border-4 border-[#309898]">
        
        <h2 className="text-center text-[#309898] mb-2">Health Information</h2>
        <p className="text-center text-gray-600 mb-6">Section 2/4</p>

        {/* Main Container */}
        <div className="min-h-[500px] space-y-6">
          
          {/* Current Diagnosed Conditions */}
          <div className="space-y-4">
            <h3 className="text-[#FF8000] mb-4">Current Diagnosed Conditions</h3>
            <div className="flex gap-2">
              <input
                placeholder="e.g., Diabetes, Asthma"
                className="flex-1 px-4 py-2 rounded-lg border-2 border-[#309898]/30"
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-2 text-[#FF8000]"
            >
              <Plus className="w-5 h-5" /> Add Condition
            </button>
          </div>

          {/* Current Medications */}
          <div className="space-y-4">
            <h3 className="text-[#FF8000] mb-4">Current Medications</h3>
            <div className="p-4 border-2 border-[#309898]/30 rounded-lg bg-gray-50 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[#309898] mb-2">
                    Medication Name
                  </label>
                  <input
                    placeholder="e.g., Metformin"
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30"
                  />
                </div>
                <div>
                  <label className="block text-[#309898] mb-2">Dosage</label>
                  <input
                    placeholder="e.g., 500 mg"
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30"
                  />
                </div>
                <div>
                  <label className="block text-[#309898] mb-2">
                    Frequency
                  </label>
                  <input
                    placeholder="e.g., Twice a day"
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#309898] mb-2">Purpose</label>
                  <input
                    placeholder="e.g., Blood sugar control"
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 text-[#FF8000]"
            >
              <Plus className="w-5 h-5" /> Add Medication
            </button>
          </div>

          {/* Allergies */}
          <div className="space-y-4">
            <h3 className="text-[#FF8000] mb-4">Allergies</h3>
            <div className="flex gap-2">
              <input
                placeholder="e.g., Peanuts, Penicillin"
                className="flex-1 px-4 py-2 rounded-lg border-2 border-[#309898]/30"
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-2 text-[#FF8000]"
            >
              <Plus className="w-5 h-5" /> Add Allergy
            </button>
          </div>

          {/* Ongoing Treatments */}
          <div className="space-y-4">
            <h3 className="text-[#FF8000] mb-4">Ongoing Treatments</h3>
            <div className="flex gap-2">
              <input
                placeholder="e.g., Physiotherapy, Dialysis"
                className="flex-1 px-4 py-2 rounded-lg border-2 border-[#309898]/30"
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-2 text-[#FF8000]"
            >
              <Plus className="w-5 h-5" /> Add Treatment
            </button>
          </div>

          {/* Current Doctor */}
          <div className="space-y-4">
            <h3 className="text-[#FF8000] mb-4">Current Doctor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[#309898] mb-2">Doctor Name</label>
                <input
                  placeholder="e.g., Dr. Neha Verma"
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30"
                />
              </div>
              <div>
                <label className="block text-[#309898] mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g., 9876543210"
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30"
                />
              </div>
              <div>
                <label className="block text-[#309898] mb-2">Speciality</label>
                <input
                  placeholder="e.g., Cardiologist"
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            className="flex items-center gap-2 text-[#309898] cursor-pointer"
          >
            <ChevronLeft /> Previous
          </button>

          <button
            type="button"
            className="flex items-center gap-2 bg-[#FF8000] text-white px-6 py-2 rounded-lg hover:bg-[#309898] cursor-pointer"
          >
            Next <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}