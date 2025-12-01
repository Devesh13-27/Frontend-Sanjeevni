import { useState } from 'react';
import { X, Shield, Calendar, DollarSign, FileText } from 'lucide-react';
import { InsurancePolicy } from '../App';

type Props = {
  policies: InsurancePolicy[];
  onClose: () => void;
};

export function InsuranceModal({ policies, onClose }: Props) {
  const [selectedPolicy, setSelectedPolicy] = useState<InsurancePolicy | null>(null);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-[#309898]">
        <div className="sticky top-0 bg-white p-6 border-b-2 border-[#309898]/20 flex justify-between items-center rounded-t-3xl">
          <h2 className="text-[#309898]">Insurance Policies</h2>
          <button onClick={onClose} className="text-[#FF8000] hover:text-[#309898] transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {policies.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-[#309898]/30 mx-auto mb-4" />
              <p className="text-gray-500">No insurance policies added yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {policies.map(policy => (
                <div
                  key={policy.id}
                  className="p-4 border-2 border-[#309898]/30 rounded-lg hover:border-[#309898] hover:shadow-lg transition cursor-pointer"
                  onClick={() => setSelectedPolicy(policy)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#309898]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-[#309898]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#309898] mb-1">{policy.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{policy.provider}</p>
                      <div className="flex items-center gap-2 text-xs text-[#FF8000]">
                        <FileText className="w-3 h-3" />
                        <span>{policy.policyNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Policy Details Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border-4 border-[#FF8000]">
            <div className="p-6 border-b-2 border-[#FF8000]/20">
              <div className="flex justify-between items-center">
                <h2 className="text-[#FF8000]">{selectedPolicy.name}</h2>
                <button
                  onClick={() => setSelectedPolicy(null)}
                  className="text-[#309898] hover:text-[#FF8000] transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-[#309898] mb-1">
                  <Shield className="w-5 h-5" />
                  <span>Provider</span>
                </div>
                <p className="text-gray-700 ml-7">{selectedPolicy.provider}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-[#309898] mb-1">
                  <FileText className="w-5 h-5" />
                  <span>Policy Number</span>
                </div>
                <p className="text-gray-700 ml-7">{selectedPolicy.policyNumber}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-[#FF8000] mb-1">
                  <Calendar className="w-5 h-5" />
                  <span>Duration</span>
                </div>
                <p className="text-gray-700 ml-7">
                  {new Date(selectedPolicy.startDate).toLocaleDateString()} - {new Date(selectedPolicy.endDate).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-[#FF8000] mb-1">
                  <Shield className="w-5 h-5" />
                  <span>Coverage</span>
                </div>
                <p className="text-gray-700 ml-7">{selectedPolicy.coverage}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-[#309898] mb-1">
                  <DollarSign className="w-5 h-5" />
                  <span>Premium</span>
                </div>
                <p className="text-gray-700 ml-7">{selectedPolicy.premium}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
