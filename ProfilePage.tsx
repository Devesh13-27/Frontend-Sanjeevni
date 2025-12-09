import { useState, useEffect } from 'react';
import {
  User, Mail, Phone, Activity, FileText, Edit2,
  Download, Droplet, TrendingUp, Calculator, CalendarCheck,
  ChevronDown, Users, Menu, X, Pill, History, LogOut, Calendar
} from 'lucide-react';
import { UserData } from '../App';
import logoImage from '../assets/Untitled design.png';
import { MedicalInfoForm } from './MedicalInfoForm';

// --- MOCK DATA ---
const MOCK_HISTORY_DATA = [
  { id: 1, title: 'Annual Physical Checkup', doctor: 'Dr. Sarah Smith', date: '2025-11-15', type: 'General' },
  { id: 2, title: 'Dental Cleaning', doctor: 'Dr. Emily Chen', date: '2025-10-02', type: 'Dental' },
  { id: 3, title: 'Viral Fever Consultation', doctor: 'Dr. Sarah Smith', date: '2025-08-20', type: 'General' },
  { id: 4, title: 'Eye Vision Test', doctor: 'Dr. A. Patel', date: '2025-06-10', type: 'Vision' },
  { id: 5, title: 'Vaccination (Flu)', doctor: 'Dr. Sarah Smith', date: '2025-01-15', type: 'Immunization' },
];

const MOCK_FAMILY_PROFILES = [
  { id: 'user_002', name: 'Rahul Amberkar (Dad)', relation: 'Father', gender: 'Male', age: '52', blood: 'B+', conditions: ['Hypertension'] },
  { id: 'user_003', name: 'Priya Amberkar (Mom)', relation: 'Mother', gender: 'Female', age: '48', blood: 'O+', conditions: ['Diabetes T2', 'Thyroid'] },
  { id: 'user_004', name: 'Rohan (Brother)', relation: 'Sibling', gender: 'Male', age: '12', blood: 'A+', conditions: [] }
];

type Props = {
  userData: UserData;
  onNavigateToHome: () => void;
  onNavigateToVault: () => void;
  onLogout: () => void;
  onUpdateUserData: (data: UserData) => void;
};

export function ProfilePage({ userData, onNavigateToHome, onNavigateToVault, onLogout, onUpdateUserData }: Props) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayUser, setDisplayUser] = useState<any>(userData); 
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (!displayUser.isMock) setDisplayUser(userData);
  }, [userData]);

  const handleProfileSwitch = (profile: any) => {
    if (profile === 'me') {
        setDisplayUser(userData); 
    } else {
        const mockUser: any = {
            ...userData, 
            isMock: true,
            personalInfo: {
                ...userData.personalInfo,
                fullName: profile.name,
                gender: profile.gender,
                bloodGroup: profile.blood,
                dateOfBirth: new Date(new Date().getFullYear() - parseInt(profile.age), 0, 1).toISOString(), 
            },
            currentMedical: {
                ...userData.currentMedical,
                conditions: profile.conditions,
                medications: profile.conditions.length > 0 ? [{ name: 'Metformin', dosage: '500mg', frequency: 'Daily' }] : [],
            }
        };
        setDisplayUser(mockUser);
    }
    setShowProfileMenu(false);
  };

  const getHistoricalEvents = () => {
    const today = new Date();
    return MOCK_HISTORY_DATA.filter((event) => new Date(event.date) < today)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const historicalEvents = getHistoricalEvents();

  // --- BMI LOGIC (Safeguarded) ---
  const calculateBMI = () => {
    if ((displayUser as any).isMock) return '24.5';
    let h = parseFloat(displayUser.personalInfo.height || '0');
    const w = parseFloat(displayUser.personalInfo.weight || '0');

    // 1. If height is weirdly small (e.g. "5.9"), assume Feet and convert to CM
    if (h > 0 && h < 10) h = h * 30.48;

    // 2. Convert CM to Meters
    h = h / 100;

    if (h > 0 && w > 0) {
        const bmiValue = (w / (h * h));
        // 3. Final sanity check
        if (bmiValue > 100) return '--';
        return bmiValue.toFixed(1);
    }
    return '--';
  };

  const bmi = calculateBMI();
  const visitCount = (displayUser as any).isMock ? 12 : historicalEvents.length;

  const handleFormSubmit = (updatedData: UserData) => {
    onUpdateUserData(updatedData);
    if (!(displayUser as any).isMock) setDisplayUser(updatedData); 
    else alert("You cannot edit Family profiles in this view.");
    setShowEditForm(false);
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '', 'height=800,width=800');
    if (printWindow) {
      printWindow.document.write(`<html><body><h1>${displayUser.personalInfo.fullName}</h1><script>window.print();window.close();</script></body></html>`);
      printWindow.document.close();
    }
  };

  return (
    // MAIN BACKGROUND: Rich Teal Gradient
    <div className="min-h-screen bg-gradient-to-br from-[#208080] via-[#1a6b6b] to-[#104040] pb-10 font-sans">
      
      {/* 1. Navbar */}
      <header className="bg-white/10 backdrop-blur-md sticky top-0 z-40 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            
            {/* Logo - STRICT SIZE ENFORCED */}
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="Vytara Logo" 
                // IMPORTANT: 'brightness-0 invert' makes it white. Inline style prevents giant size bug.
                className="brightness-0 invert object-contain"
                style={{ height: '40px', width: 'auto' }} 
              />
              <h1 className="text-xl font-bold text-#309898 tracking-wide">Vytara</h1>
            </div>
            
            {/* Hamburger Menu - WHITE ICON */}
            <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-black hover:bg-white/20 rounded-lg flex items-center justify-center transition border border-white/30 bg-white/10 backdrop-blur-sm"
                >
                  {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden origin-top-right animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2 border-b border-gray-50 bg-gray-50">
                        <p className="text-[10px] uppercase font-bold text-gray-400 px-2">Navigation</p>
                    </div>
                    <button onClick={() => { onNavigateToHome(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-[#309898] flex items-center gap-3 transition">Home</button>
                    <button onClick={() => { onNavigateToVault(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-[#309898] flex items-center gap-3 transition">Visit Vault</button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button onClick={() => { handleExportPDF(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-[#309898] flex items-center gap-3 transition"><Download className="w-4 h-4" /> Export PDF</button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button onClick={onLogout} className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-3 transition"><LogOut className="w-4 h-4" /> Logout</button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 2. THE HEADER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* LEFT: Basic Info & KPIs */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-xl shadow-teal-900/20 border border-white/20 flex flex-col justify-between relative overflow-hidden">
            
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-50 to-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-80 pointer-events-none"></div>

            {/* Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <div className="relative">
                    <button 
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur hover:bg-white text-gray-700 rounded-full text-xs font-bold uppercase tracking-wider transition border border-gray-200 shadow-sm"
                    >
                        <Users className="w-3 h-3 text-teal-600" />
                        <span className="hidden sm:inline">Switch Profile</span>
                        <ChevronDown className="w-3 h-3" />
                    </button>
                    
                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                            {MOCK_FAMILY_PROFILES.map((profile) => (
                                <button key={profile.id} onClick={() => handleProfileSwitch(profile)} className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between">
                                    <span>{profile.name}</span>
                                </button>
                            ))}
                            <button onClick={() => handleProfileSwitch('me')} className="w-full text-left px-4 py-3 text-sm font-bold text-teal-600 hover:bg-teal-50 border-t border-gray-100">Back to Me</button>
                        </div>
                    )}
                </div>
                <button onClick={() => setShowEditForm(true)} className="p-2 bg-white/90 backdrop-blur text-gray-500 hover:text-[#FF8000] hover:bg-orange-50 rounded-full border border-gray-200 shadow-sm transition">
                    <Edit2 className="w-4 h-4" />
                </button>
            </div>


            {/* Profile Info */}
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8 mt-2 relative z-0">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center border-[4px] border-white shadow-lg shrink-0">
                    <User className="w-10 h-10 text-teal-700/80" />
              </div>
              <div className="flex-1 w-full pt-2">
                <div className="mb-4">
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{displayUser.personalInfo.fullName}</h2>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wide rounded-full border border-blue-200">
                          {displayUser.personalInfo.gender}
                        </span>
                        <span className="text-gray-400 text-xs ml-1">ID: @{displayUser.username}</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 group hover:text-teal-600 transition">
                    <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-teal-50 flex items-center justify-center"><Mail className="w-3 h-3" /></div> 
                    <span className="truncate">{displayUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 group hover:text-teal-600 transition">
                      <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-teal-50 flex items-center justify-center"><Phone className="w-3 h-3" /></div>
                    <span>{displayUser.personalInfo.contactNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 group hover:text-teal-600 transition">
                      <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-teal-50 flex items-center justify-center"><Calendar className="w-3 h-3" /></div>
                    <span>{new Date(displayUser.personalInfo.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- KPI SECTION --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {/* KPI 1 */}
               <div className="bg-red-50 p-4 rounded-2xl border border-red-100 hover:border-red-300 transition shadow-sm group">
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Droplet className="w-3 h-3 fill-red-400 text-red-400 group-hover:scale-110 transition" /> Blood
                  </p>
                  <p className="text-2xl font-bold text-gray-800">{displayUser.personalInfo.bloodGroup}</p>
               </div>
               
               {/* KPI 2 */}
               <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 hover:border-blue-300 transition shadow-sm group">
                  <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calculator className="w-3 h-3 text-blue-500 group-hover:scale-110 transition" /> BMI
                  </p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold text-gray-800">{bmi}</p>
                    <span className="text-[10px] text-gray-500 font-medium">kg/m²</span>
                  </div>
               </div>

               {/* KPI 3 */}
               <div className="bg-green-50 p-4 rounded-2xl border border-green-100 hover:border-green-300 transition shadow-sm group">
                  <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <TrendingUp className="w-3 h-3 text-green-600 group-hover:scale-110 transition" /> Health
                  </p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold text-gray-800">92</p>
                    <span className="text-[10px] text-gray-500 font-medium">/ 100</span>
                  </div>
               </div>

               {/* KPI 4 */}
               <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 hover:border-purple-300 transition shadow-sm group">
                  <p className="text-[10px] text-purple-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CalendarCheck className="w-3 h-3 text-purple-500 group-hover:scale-110 transition" /> Visits
                  </p>
                  <p className="text-2xl font-bold text-gray-800">{visitCount}</p>
               </div>
            </div>
          </div>

          {/* RIGHT: Historical Visits */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-teal-900/20 border border-white/20 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                 <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600"><History className="w-4 h-4"/></div> 
                 Historical Visits
              </h3>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md transition">View All</button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 max-h-[300px] pr-2 custom-scrollbar">
              {historicalEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-2xl transition cursor-pointer group border border-transparent hover:border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-white group-hover:shadow-md flex flex-col items-center justify-center text-gray-500 group-hover:text-blue-600 shrink-0 transition duration-300">
                      <span className="text-lg font-bold leading-none">{new Date(event.date).getDate()}</span>
                      <span className="text-[10px] font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                  </div>
                  <div className="pt-0.5">
                      <p className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition">{event.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{event.doctor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* 3. THE DASHBOARD GRID - EXPANDED */}
        <div className="bg-white rounded-3xl shadow-xl shadow-teal-900/20 border border-white/20 overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <div className="p-2 bg-teal-50 rounded-lg text-[#309898]"><Activity className="w-5 h-5" /></div>
                <h3 className="font-bold text-gray-800">Current Medical Status</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Active Conditions */}
                <div>
                    <label className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-3 block">Active Conditions</label>
                    <div className="flex flex-wrap gap-2">
                        {displayUser.currentMedical.conditions.length > 0 ? 
                        displayUser.currentMedical.conditions.map((c:string, i:number) => (
                            <span key={i} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">{c}</span>
                        )) : <span className="text-gray-400 text-sm">No active conditions</span>
                        }
                    </div>
                </div>

                {/* Medications */}
                <div>
                    <label className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-3 block">Current Medications</label>
                    <div className="space-y-2">
                        {displayUser.currentMedical.medications.length > 0 ? 
                        displayUser.currentMedical.medications.map((med:any, i:number) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-teal-300 transition group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600"><Pill className="w-4 h-4" /></div>
                                    <span className="font-bold text-gray-700">{med.name}</span>
                                </div>
                                <span className="text-sm font-medium text-gray-500 bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">{med.dosage}</span>
                            </div>
                        )) : <div className="text-sm text-gray-400 italic">No medications</div>
                        }
                    </div>
                </div>
            </div>
        </div>

      </main>

      {/* Edit Form Modal */}
      {showEditForm && (
        <MedicalInfoForm
          initialData={userData}
          onComplete={handleFormSubmit}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
}