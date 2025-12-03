import { useState } from 'react';
import { Calendar, Users, Stethoscope, Pill, Activity, Building2, Shield, AlertCircle, Sparkles, Check, FileText, X } from 'lucide-react';
import logoImage from 'figma:asset/3356ef9e7b4ecad1a9839c039785983e296f414d.png';

export default function HomePage({ onNavigateToVault, onNavigateToProfile }) {
  const [activeModal, setActiveModal] = useState(null);
  const [summaryMode, setSummaryMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Sample documents for demo
  const documents = [
    { id: '1', name: 'Blood Test Report.pdf', uploadDate: '2024-01-15', category: 'lab-reports' },
    { id: '2', name: 'X-Ray Results.pdf', uploadDate: '2024-02-20', category: 'imaging' },
    { id: '3', name: 'Prescription.pdf', uploadDate: '2024-03-10', category: 'prescriptions' },
  ];

  const handleGetSummary = () => {
    setSummaryMode(true);
    setSelectedFiles(new Set());
  };

  const handleCancelSummary = () => {
    setSummaryMode(false);
    setSelectedFiles(new Set());
  };

  const handleFileClick = (docId) => {
    if (summaryMode) {
      const newSelected = new Set(selectedFiles);
      if (newSelected.has(docId)) {
        newSelected.delete(docId);
      } else {
        newSelected.add(docId);
      }
      setSelectedFiles(newSelected);
    }
  };

  const handleGo = () => {
    if (selectedFiles.size > 0) {
      setShowSummaryModal(true);
    }
  };

  const closeSummaryModal = () => {
    setShowSummaryModal(false);
    setSummaryMode(false);
    setSelectedFiles(new Set());
  };

  const cards = [
    { id: 'appointments', title: 'Upcoming Appointments', icon: Calendar, color: '#309898' },
    { id: 'emergency', title: 'Emergency Contacts', icon: Users, color: '#FF8000' },
    { id: 'doctors', title: 'Doctors', icon: Stethoscope, color: '#309898' },
    { id: 'pharmacy', title: 'Pharmacy', icon: Pill, color: '#FF8000' },
    { id: 'diagnostics', title: 'Diagnostics', icon: Activity, color: '#309898' },
    { id: 'hospitals', title: 'Hospitals', icon: Building2, color: '#FF8000' },
    { id: 'insurance', title: 'Insurance', icon: Shield, color: '#309898' },
  ];

  const handleSOSClick = () => {
    alert('🚨 SOS Alert! Emergency contacts will be notified immediately.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-teal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {/* limit logo size and ensure it doesn't push content */}
            <img src={logoImage} alt="Vytara Logo" className="w-12 h-12 object-contain flex-shrink-0" />
            <h1 className="text-teal-600 text-xl sm:text-2xl font-bold truncate">Vytara</h1>
          </div>

          {/* prevent this group from shrinking or wrapping offscreen */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleGetSummary}
              disabled={documents.length === 0}
              className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-lg font-semibold"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Get Summary</span>
            </button>

            <button
              onClick={onNavigateToVault}
              className="px-3 py-2 rounded-lg transition-all font-semibold shadow-lg border-2"
              style={{ backgroundColor: '#FF8000', color: 'white', borderColor: '#FF8000' }}
            >
              <span className="hidden sm:inline">Vault</span>
              <span className="sm:hidden">Vault</span>
            </button>

            <button
              onClick={onNavigateToProfile}
              className="px-3 py-2 rounded-lg transition-all font-semibold shadow-lg border-2"
              style={{ backgroundColor: '#309898', color: 'white', borderColor: '#309898' }}
            >
              <span className="hidden sm:inline">Profile</span>
              <span className="sm:hidden">Profile</span>
            </button>
          </div>
        </div>
      </header>


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SOS Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleSOSClick}
            className="w-40 h-40 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full shadow-2xl flex flex-col items-center justify-center hover:scale-110 transition-transform duration-200"
          >
            <AlertCircle className="w-14 h-14 mb-1" />
            <span className="text-2xl font-bold">SOS</span>
          </button>
        </div>

        {/* Documents Section */}
        {summaryMode && (
          <div className="mb-8">
            <div className="bg-purple-100 border-2 border-purple-600 rounded-lg p-3 mb-4">
              <p className="text-sm text-purple-800 flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Click on files to select them for AI summary. {selectedFiles.size} file(s) selected.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-teal-200">
              <h3 className="text-teal-600 mb-4 text-xl font-semibold">Select Documents for Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => {
                  const isSelected = selectedFiles.has(doc.id);
                  return (
                    <div
                      key={doc.id}
                      onClick={() => handleFileClick(doc.id)}
                      className={`relative bg-white rounded-xl shadow p-4 border-2 transition-all cursor-pointer ${
                        isSelected ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 mb-3">
                        <FileText className="w-5 h-5 text-gray-600" />
                      </div>
                      <h4 className="text-gray-800 mb-1 text-sm font-medium">{doc.name}</h4>
                      <p className="text-xs text-gray-500">{new Date(doc.uploadDate).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-400 mt-1 capitalize">{doc.category.replace('-', ' ')}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleCancelSummary}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGo}
                  disabled={selectedFiles.size === 0}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition disabled:opacity-50 font-medium"
                >
                  Go ({selectedFiles.size})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="cursor-pointer transition-all duration-300 hover:scale-105"
                onClick={() => setActiveModal(card.id)}
              >
                <div
                  className="bg-white rounded-2xl shadow-lg p-8 border-4 hover:shadow-xl transition-all"
                  style={{ borderColor: card.color }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto"
                    style={{ backgroundColor: `${card.color}30` }}
                  >
                    <Icon className="w-10 h-10" style={{ color: card.color }} />
                  </div>
                  <h3 className="text-center font-semibold" style={{ color: card.color }}>
                    {card.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 mt-16 border-t-2 border-teal-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  V
                </div>
                <h3 className="text-teal-600 text-xl font-bold">Vytara</h3>
              </div>
              <p className="text-gray-600">
                Your Personal Health Companion - Managing your medical records with care and security.
              </p>
            </div>
            
            <div>
              <h4 className="text-orange-500 mb-4 font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button className="hover:text-teal-600">Vault</button></li>
                <li><button className="hover:text-teal-600">Profile</button></li>
                <li><button className="hover:text-teal-600">Appointments</button></li>
                <li><button className="hover:text-teal-600">Emergency Contacts</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-orange-500 mb-4 font-semibold">Services</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button className="hover:text-teal-600">Doctors</button></li>
                <li><button className="hover:text-teal-600">Pharmacy</button></li>
                <li><button className="hover:text-teal-600">Diagnostics</button></li>
                <li><button className="hover:text-teal-600">Hospitals</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-2 border-teal-100 mt-8 pt-6 text-center text-gray-600">
            <p>&copy; 2024 Vytara. All rights reserved. Your health, our priority.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setActiveModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveModal(null)}
              className="float-right text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-teal-600 mb-4 capitalize">{activeModal}</h2>
            <p className="text-gray-600">This is a placeholder for the {activeModal} modal.</p>
          </div>
        </div>
      )}

      {/* Summary Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 border-4 border-purple-600">
            <button
              onClick={closeSummaryModal}
              className="float-right text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h2 className="text-purple-600 text-2xl font-bold">AI Medical Summary</h2>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                Analyzing {selectedFiles.size} document{selectedFiles.size !== 1 ? 's' : ''}...
              </p>
              <div className="flex flex-wrap gap-2">
                {documents
                  .filter(doc => selectedFiles.has(doc.id))
                  .map(doc => (
                    <span key={doc.id} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {doc.name}
                    </span>
                  ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 min-h-[300px] border-2 border-gray-200 flex items-center justify-center">
              <p className="text-gray-500 italic">
                🤖 AI summary will appear here...
              </p>
            </div>

            <button
              onClick={closeSummaryModal}
              className="w-full mt-6 bg-gradient-to-r from-teal-600 to-orange-500 text-white py-3 rounded-lg hover:shadow-lg transition font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}