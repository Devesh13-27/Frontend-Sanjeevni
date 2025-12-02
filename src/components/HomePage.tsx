import { useState } from 'react';
import { Calendar, Users, Stethoscope, Pill, Activity, Building2, Shield, AlertCircle } from 'lucide-react';
import { UserData, Appointment, InsurancePolicy } from '../App';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/8e191f727b2ef8023e7e4984e9036f679c3d3038.png';
import { AppointmentsModal } from './AppointmentsModal';
import { EmergencyContactsModal } from './EmergencyContactsModal';
import { DoctorsModal } from './DoctorsModal';
import { PharmacyModal } from './PharmacyModal';
import { DiagnosticsModal } from './DiagnosticsModal';
import { HospitalsModal } from './HospitalsModal';
import { InsuranceModal } from './InsuranceModal';

type Props = {
  userData: UserData;
  onNavigateToVault: () => void;
  onNavigateToProfile: () => void;
  appointments: Appointment[];
  onAddAppointment: (appointment: Appointment) => void;
  insurancePolicies: InsurancePolicy[];
  onUpdateEmergencyContacts: (contacts: { name: string; phone: string }[]) => void;
};

type ModalType = 'appointments' | 'emergency' | 'doctors' | 'pharmacy' | 'diagnostics' | 'hospitals' | 'insurance' | null;

export function HomePage({
  userData,
  onNavigateToVault,
  onNavigateToProfile,
  appointments,
  onAddAppointment,
  insurancePolicies,
  onUpdateEmergencyContacts,
}: Props) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const cards = [
    {
      id: 'appointments',
      title: 'Upcoming Appointments',
      icon: Calendar,
      color: '#309898',
      delay: 0.1,
    },
    {
      id: 'emergency',
      title: 'Emergency Contacts',
      icon: Users,
      color: '#FF8000',
      delay: 0.2,
    },
    {
      id: 'doctors',
      title: 'Doctors',
      icon: Stethoscope,
      color: '#309898',
      delay: 0.3,
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy',
      icon: Pill,
      color: '#FF8000',
      delay: 0.4,
    },
    {
      id: 'diagnostics',
      title: 'Diagnostics',
      icon: Activity,
      color: '#309898',
      delay: 0.5,
    },
    {
      id: 'hospitals',
      title: 'Hospitals',
      icon: Building2,
      color: '#FF8000',
      delay: 0.6,
    },
    {
      id: 'insurance',
      title: 'Insurance',
      icon: Shield,
      color: '#309898',
      delay: 0.7,
    },
  ];

  const handleSOSClick = () => {
    alert('SOS Alert! Emergency contacts will be notified immediately.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#309898]/10 via-white to-[#FF8000]/10">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Vytara Logo" className="w-12 h-12" />
            <h1 className="text-[#309898]">Vytara</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateToVault}
              className="px-4 py-2 bg-[#FF8000] text-white rounded-lg hover:bg-[#FF8000]/80 transition"
            >
              Visit Vault
            </button>
            <button
              onClick={onNavigateToProfile}
              className="px-4 py-2 bg-[#309898] text-white rounded-lg hover:bg-[#309898]/80 transition"
            >
              Profile
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SOS Button */}
        <div className="flex justify-center mb-12">
          <motion.button
            onClick={handleSOSClick}
            className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full shadow-2xl flex flex-col items-center justify-center hover:scale-110 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(239, 68, 68, 0.5)',
                '0 0 40px rgba(239, 68, 68, 0.8)',
                '0 0 20px rgba(239, 68, 68, 0.5)',
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <AlertCircle className="w-12 h-12 mb-1" />
            <span className="text-xl font-bold">SOS</span>
          </motion.button>
        </div>

        {/* Service Cards */}
        <div className="relative">
          {/* Squiggly vine background */}
          <svg
            className="absolute inset-0 w-full h-full -z-10 opacity-20"
            viewBox="0 0 800 600"
            preserveAspectRatio="none"
          >
            <path
              d="M 100 50 Q 200 100, 300 80 T 500 120 T 700 100"
              stroke="#309898"
              strokeWidth="4"
              fill="none"
              strokeDasharray="10,5"
            />
            <path
              d="M 150 200 Q 250 250, 350 230 T 550 270 T 750 250"
              stroke="#FF8000"
              strokeWidth="4"
              fill="none"
              strokeDasharray="10,5"
            />
            <path
              d="M 100 350 Q 200 400, 300 380 T 500 420 T 700 400"
              stroke="#309898"
              strokeWidth="4"
              fill="none"
              strokeDasharray="10,5"
            />
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: card.delay, duration: 0.5 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="cursor-pointer"
                  onClick={() => setActiveModal(card.id as ModalType)}
                >
                  <div
                    className="bg-white rounded-2xl shadow-lg p-6 border-4 hover:shadow-2xl transition-all"
                    style={{ borderColor: card.color }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto"
                      style={{ backgroundColor: `${card.color}20` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: card.color }} />
                    </div>
                    <h3 className="text-center" style={{ color: card.color }}>
                      {card.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16 border-t-4 border-[#309898]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoImage} alt="Vytara Logo" className="w-10 h-10" />
                <h3 className="text-[#309898]">Vytara</h3>
              </div>
              <p className="text-gray-600">
                Your Personal Health Companion - Managing your medical records with care and security.
              </p>
            </div>
            
            <div>
              <h4 className="text-[#FF8000] mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button onClick={onNavigateToVault} className="hover:text-[#309898]">Vault</button></li>
                <li><button onClick={onNavigateToProfile} className="hover:text-[#309898]">Profile</button></li>
                <li><button onClick={() => setActiveModal('appointments')} className="hover:text-[#309898]">Appointments</button></li>
                <li><button onClick={() => setActiveModal('emergency')} className="hover:text-[#309898]">Emergency Contacts</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#FF8000] mb-4">Services</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button onClick={() => setActiveModal('doctors')} className="hover:text-[#309898]">Doctors</button></li>
                <li><button onClick={() => setActiveModal('pharmacy')} className="hover:text-[#309898]">Pharmacy</button></li>
                <li><button onClick={() => setActiveModal('diagnostics')} className="hover:text-[#309898]">Diagnostics</button></li>
                <li><button onClick={() => setActiveModal('hospitals')} className="hover:text-[#309898]">Hospitals</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-2 border-[#309898]/20 mt-8 pt-6 text-center text-gray-600">
            <p>&copy; 2024 Vytara. All rights reserved. Your health, our priority.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeModal === 'appointments' && (
        <AppointmentsModal
          appointments={appointments}
          onClose={() => setActiveModal(null)}
          onAddAppointment={onAddAppointment}
        />
      )}
      {activeModal === 'emergency' && (
        <EmergencyContactsModal
          contacts={userData.personalInfo.emergencyContacts}
          onClose={() => setActiveModal(null)}
          onUpdateContacts={onUpdateEmergencyContacts}
        />
      )}
      {activeModal === 'doctors' && (
        <DoctorsModal
          doctors={userData.currentMedical.doctors}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'pharmacy' && (
        <PharmacyModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'diagnostics' && (
        <DiagnosticsModal
          onClose={() => setActiveModal(null)}
          onAddAppointment={onAddAppointment}
        />
      )}
      {activeModal === 'hospitals' && (
        <HospitalsModal
          onClose={() => setActiveModal(null)}
          onAddAppointment={onAddAppointment}
        />
      )}
      {activeModal === 'insurance' && (
        <InsuranceModal
          policies={insurancePolicies}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}