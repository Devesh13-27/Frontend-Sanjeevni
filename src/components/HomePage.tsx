import { useState } from 'react';
import { 
  Calendar, Users, Stethoscope, Pill, Activity, Building2, Shield, 
  AlertCircle, Sparkles, X, Phone, Clock, Star, ChevronRight, FileText 
} from 'lucide-react';
// Keep your existing logo import
import logoImage from '../assets/Untitled design.png';

// --- 1. MOCK DATA CONFIGURATION ---
const MOCK_DATA = {
  emergency: [
    { id: 1, name: 'Mother', relation: 'Parent', phone: '+91 98765 43210', type: 'primary' },
    { id: 2, name: 'Rahul (Brother)', relation: 'Sibling', phone: '+91 98765 43211', type: 'secondary' },
    { id: 3, name: 'City Ambulance', relation: 'Service', phone: '102', type: 'service' },
  ],
  doctors: [
    { id: 1, name: 'Dr. Sarah Smith', special: 'Cardiologist', hospital: 'City Hospital', rating: 4.8 },
    { id: 2, name: 'Dr. Ankit Sharma', special: 'Dentist', hospital: 'Smile Clinic', rating: 4.5 },
    { id: 3, name: 'Dr. Priya Mehta', special: 'General Physician', hospital: 'Care Multi-specialty', rating: 4.9 },
  ],
  pharmacy: [
    { id: 1, name: 'Apollo Pharmacy', sub: '0.5 km away', status: 'Open', eta: '10 mins' },
    { id: 2, name: 'Wellness Forever', sub: '1.2 km away', status: 'Open 24/7', eta: '25 mins' },
    { id: 3, name: 'Janaushadhi Kendra', sub: '2.0 km away', status: 'Closed', eta: '--' },
  ],
  diagnostics: [
    { id: 1, name: 'Full Body Checkup', sub: 'Metropolis Labs', date: 'Upcoming: Dec 10', status: 'pending' },
    { id: 2, name: 'Blood Sugar (F)', sub: 'Suburban Diagnostics', date: 'Nov 01, 2024', status: 'done' },
    { id: 3, name: 'MRI Scan', sub: 'City Scans', date: 'Oct 15, 2024', status: 'done' },
  ],
  hospitals: [
    { id: 1, name: 'City Hospital', sub: 'Multi-specialty', dist: '2.5 km', beds: 'Available' },
    { id: 2, name: 'Global Health City', sub: 'Specialized', dist: '5.0 km', beds: 'Limited' },
    { id: 3, name: 'Fortis Hospital', sub: 'Multi-specialty', dist: '8.2 km', beds: 'Available' },
  ],
  insurance: [
    { id: 1, name: 'HDFC Ergo', sub: 'Health Suraksha', policy: 'POL-987654321', expiry: 'Expires: Dec 2026' },
    { id: 2, name: 'LIC India', sub: 'Life Insurance', policy: 'LIC-123456789', expiry: 'Active' },
  ]
};

// --- Calendar Appointments Data ---
const APPOINTMENTS = [
  { day: 5, title: 'Dentist Visit', time: '10:00 AM', doctor: 'Dr. Ankit Sharma' },
  { day: 12, title: 'Cardio Checkup', time: '2:00 PM', doctor: 'Dr. Sarah Smith' },
  { day: 24, title: 'Follow-up', time: '11:30 AM', doctor: 'Dr. Priya Mehta' }
];

type Props = {
  onNavigateToVault: () => void;
  onNavigateToProfile: () => void;
};

export function HomePage({ onNavigateToVault, onNavigateToProfile }: Props) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [summaryText, setSummaryText] = useState('');
  const [recentDocs, setRecentDocs] = useState<any[]>([]);

  // Sample documents for demo
  const documents = [
    { id: '1', name: 'Blood Test Report.pdf', uploadDate: '2024-01-15', category: 'lab-reports' },
    { id: '2', name: 'X-Ray Results.pdf', uploadDate: '2024-02-20', category: 'imaging' },
    { id: '3', name: 'Prescription.pdf', uploadDate: '2024-03-10', category: 'prescriptions' },
  ];

  const handleGetSummary = () => {
    const sortedDocs = documents
      .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
      .slice(0, 5);

    if (sortedDocs.length > 0) {
      setRecentDocs(sortedDocs);
      const summary = `AI Summary for ${sortedDocs.length} document${sortedDocs.length > 1 ? 's' : ''}:\n\n${sortedDocs.map(doc => `- ${doc.name}: Analyzed successfully`).join('\n')}\n\nKey findings: All documents processed. No critical issues detected.`;
      setSummaryText(summary);
      setShowSummaryModal(true);
    }
  };

  const closeSummaryModal = () => {
    setShowSummaryModal(false);
  };

  const handleSOSClick = () => {
    alert('🚨 SOS Alert! Emergency contacts will be notified immediately.');
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

  // --- 2. DYNAMIC CONTENT RENDERER ---
  const renderModalContent = () => {
    switch (activeModal) {
      case 'appointments':
        return <CalendarView />;
      case 'emergency':
        return <ListView title="Emergency Contacts" data={MOCK_DATA.emergency} icon={<Phone className="text-red-500" />} type="emergency" />;
      case 'doctors':
        return <ListView title="My Doctors" data={MOCK_DATA.doctors} icon={<Stethoscope className="text-teal-500" />} type="doctors" />;
      case 'pharmacy':
        return <ListView title="Nearby Pharmacy" data={MOCK_DATA.pharmacy} icon={<Pill className="text-orange-500" />} type="pharmacy" />;
      case 'diagnostics':
        return <ListView title="Diagnostics & Labs" data={MOCK_DATA.diagnostics} icon={<Activity className="text-blue-500" />} type="diagnostics" />;
      case 'hospitals':
        return <ListView title="Nearby Hospitals" data={MOCK_DATA.hospitals} icon={<Building2 className="text-purple-500" />} type="hospitals" />;
      case 'insurance':
        return <ListView title="Insurance Vault" data={MOCK_DATA.insurance} icon={<Shield className="text-green-500" />} type="insurance" />;
      default:
        return null;
    }
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
            <img src={logoImage} alt="Vytara Logo" className="w-20 h-20 object-contain flex-shrink-0" />
            <h1 className="text-xl sm:text-2xl font-bold truncate" style={{ color: '#309898' }}>Vytara</h1>
          </div>

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
                  <h3 className="text-center font-semibold">
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

      {/* --- CONTENT MODAL (Dynamic) --- */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setActiveModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            {renderModalContent()}
          </div>
        </div>
      )}

      {/* --- SUMMARY MODAL (Fixed Layout) --- */}
      {showSummaryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          
          {/* Modal Container: Fixed Height with Flex Column */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh] overflow-hidden border border-gray-200">
            
            {/* 1. Header (Fixed at top) */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">AI Medical Summary</h2>
              </div>
              <button
                onClick={closeSummaryModal}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Scrollable Content Area */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white">
              {/* Tags */}
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Analyzed Documents ({recentDocs.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentDocs.map(doc => (
                    <span key={doc.id} className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-100 rounded-full text-xs font-semibold">
                      {doc.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Text Summary */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <pre className="text-gray-700 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {summaryText || '🤖 AI is processing your documents...'}
                </pre>
              </div>
            </div>

            {/* 3. Footer (Pinned at bottom) */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0 flex gap-3">
               <button
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-white transition bg-white shadow-sm"
                onClick={() => alert("Downloading Summary PDF...")}
              >
                <FileText className="w-4 h-4" /> Download PDF
              </button>

              <button
                onClick={closeSummaryModal}
                className="flex-1 py-2.5 rounded-xl bg-teal-600 text-white font-bold shadow-lg hover:bg-teal-700 transition-transform active:scale-95"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
} // <--- THIS BRACKET WAS MISSING!

// --- 3. SUB-COMPONENTS FOR MODALS ---

// Calendar View Component
function CalendarView() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = 5; // Simulating Dec 5th

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-teal-100 rounded-xl">
          <Calendar className="w-8 h-8 text-teal-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Calendar</h2>
          <p className="text-sm text-teal-600 font-medium">December 2025</p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
            <div key={d} className="text-xs font-bold text-gray-400 uppercase">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
           {/* Empty slots for start of month offset */}
           <div></div><div></div>
           {days.map(day => {
              const appt = APPOINTMENTS.find(a => a.day === day);
              const isToday = day === today;
              return (
                <div key={day} className={`aspect-square flex items-center justify-center text-sm rounded-lg relative ${isToday ? 'bg-[#309898] text-white font-bold' : 'bg-white text-gray-700 border border-gray-100'}`}>
                   {day}
                   {appt && !isToday && <div className="absolute bottom-1 w-1.5 h-1.5 bg-orange-400 rounded-full"></div>}
                </div>
              )
           })}
        </div>
      </div>

      <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Upcoming</h3>
      <div className="space-y-3">
        {APPOINTMENTS.map((appt, i) => (
           <div key={i} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:bg-teal-50 transition cursor-pointer group">
              <div className="flex flex-col items-center bg-teal-100 text-teal-800 px-3 py-1 rounded-lg min-w-[60px]">
                 <span className="text-xs font-bold uppercase">Dec</span>
                 <span className="text-lg font-bold">{appt.day}</span>
              </div>
              <div className="flex-1">
                 <p className="font-bold text-gray-800">{appt.title}</p>
                 <p className="text-xs text-gray-500 flex items-center gap-1">
                   <Clock className="w-3 h-3" /> {appt.time} • {appt.doctor}
                 </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-teal-600" />
           </div>
        ))}
      </div>
    </div>
  );
}

// Generic List View Component
function ListView({ title, data, icon, type }: { title: string, data: any[], icon: any, type: string }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gray-100 rounded-xl">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {data.map((item) => (
          <div key={item.id} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition bg-white flex items-center justify-between group">
             <div className="flex-1">
                <p className="font-bold text-gray-900 text-lg">{item.name}</p>
                
                {/* Contextual Subtext */}
                {type === 'emergency' && <p className="text-sm text-gray-500">{item.relation} • <span className="text-blue-600 font-medium">{item.phone}</span></p>}
                
                {type === 'doctors' && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-medium">{item.special}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Star className="w-3 h-3 text-orange-400 fill-orange-400"/> {item.rating}</span>
                  </div>
                )}

                {type === 'pharmacy' && <p className="text-sm text-gray-500">{item.sub} • ETA: {item.eta}</p>}
                
                {(type === 'diagnostics' || type === 'hospitals' || type === 'insurance') && <p className="text-sm text-gray-500">{item.sub} {item.dist ? `• ${item.dist}` : ''} {item.policy ? `• ${item.policy}` : ''}</p>}
             </div>
             
             {/* Status Indicators */}
             <div className="text-right">
                {type === 'pharmacy' && <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === 'Open' || item.status.includes('24/7') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.status}</span>}
                {type === 'doctors' && <button className="text-xs bg-teal-600 text-white px-3 py-1.5 rounded-lg hover:bg-teal-700">Book</button>}
                {type === 'emergency' && <button className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100"><Phone className="w-4 h-4"/></button>}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}