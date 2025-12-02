import { useState, KeyboardEvent } from 'react';
import {
  Calendar,
  Users,
  Stethoscope,
  Pill,
  Activity,
  Building2,
  Shield,
  AlertCircle,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { UserData, Appointment, InsurancePolicy } from '../App';
import { motion } from 'motion/react';
import Joyride from 'react-joyride';
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

type ModalType =
  | 'appointments'
  | 'emergency'
  | 'doctors'
  | 'pharmacy'
  | 'diagnostics'
  | 'hospitals'
  | 'insurance'
  | null;

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
  const [runTour, setRunTour] = useState(false);
  const [showSOSConfirm, setShowSOSConfirm] = useState(false);

  // defensive defaults
  const safeAppointments = appointments ?? [];
  const safeInsurance = insurancePolicies ?? [];
  const safePersonal = userData?.personalInfo ?? { emergencyContacts: [], fullName: 'User' };
  const safeMedical = userData?.currentMedical ?? { doctors: [] };

  // central card definitions
  const allCards = [
    {
      id: 'appointments',
      title: 'Upcoming Appointments',
      icon: Calendar,
      color: '#309898',
      delay: 0.1,
      count: safeAppointments.length,
    },
    {
      id: 'emergency',
      title: 'Emergency Contacts',
      icon: Users,
      color: '#FF8000',
      delay: 0.2,
      count: (safePersonal?.emergencyContacts ?? []).length,
    },
    {
      id: 'doctors',
      title: 'Doctors',
      icon: Stethoscope,
      color: '#309898',
      delay: 0.3,
      count: (safeMedical?.doctors ?? []).length,
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy',
      icon: Pill,
      color: '#FF8000',
      delay: 0.4,
      count: 0,
    },
    {
      id: 'diagnostics',
      title: 'Diagnostics',
      icon: Activity,
      color: '#309898',
      delay: 0.5,
      count: 0,
    },
    {
      id: 'hospitals',
      title: 'Hospitals',
      icon: Building2,
      color: '#FF8000',
      delay: 0.6,
      count: 0,
    },
    {
      id: 'insurance',
      title: 'Insurance Policies',
      icon: Shield,
      color: '#309898',
      delay: 0.7,
      count: safeInsurance.length,
    },
  ] as const;

  // choose which go top (keep these 4 in quick stats)
  const topStatIds = ['appointments', 'emergency', 'doctors', 'insurance'];
  const topCards = topStatIds
    .map((id) => allCards.find((c) => c.id === id))
    .filter(Boolean) as typeof allCards;
  const remainingCards = allCards.filter((c) => !topStatIds.includes(c.id));

  const tourSteps = [
    { target: '[data-tour="vault"]', content: 'Visit your secure Vault to manage your medical records.' },
    { target: '[data-tour="profile"]', content: 'Access your profile to update personal information.' },
    { target: '[data-tour="sos"]', content: 'In emergencies, click the SOS button to alert your contacts immediately.' },
    { target: '[data-tour="appointments"]', content: 'View and manage your upcoming medical appointments.' },
    { target: '[data-tour="emergency"]', content: 'Manage your emergency contacts for quick access in critical situations.' },
    { target: '[data-tour="doctors"]', content: 'Find and connect with healthcare professionals in your area.' },
    { target: '[data-tour="pharmacy"]', content: 'Locate nearby pharmacies and manage prescriptions.' },
    { target: '[data-tour="diagnostics"]', content: 'Access diagnostic services and test results.' },
    { target: '[data-tour="hospitals"]', content: 'Find nearby hospitals and emergency care facilities.' },
    { target: '[data-tour="insurance"]', content: 'Manage your health insurance policies and claims.' },
  ];

  const handleSOSClick = () => {
    setShowSOSConfirm(true);
  };

  const confirmSOS = () => {
    // replace alert with real integration later
    alert('SOS Alert! Emergency contacts will be notified immediately.');
    setShowSOSConfirm(false);
  };

  const handleTourCallback = (data: any) => {
    const { status } = data;
    if (status === 'finished' || status === 'skipped') setRunTour(false);
  };

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>, id: ModalType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveModal(id);
    }
  };

  // universal fixed height and big padding for all cards
  const CARD_HEIGHT_CLASS = 'h-56'; // large height
  const CARD_PADDING_CLASS = 'p-10'; // big padding per your request

  function StatCard({
    id,
    title,
    Icon,
    color,
    count,
    delay,
  }: {
    id: ModalType;
    title: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: string;
    count: number;
    delay: number;
  }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.45 }}
        whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer"
        onClick={() => setActiveModal(id)}
        data-tour={id ?? undefined}
      >
        <div className="relative pl-1">
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            aria-hidden
            style={{ background: `linear-gradient(to bottom, ${color}, ${color}80)` }}
          />
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleCardKeyDown(e, id)}
            aria-label={`${title}. ${count} items.`}
            className={`${CARD_HEIGHT_CLASS} ${CARD_PADDING_CLASS} bg-white rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center`}
            style={{ outlineColor: color }}
          >
            <Icon className="w-10 h-10 mx-auto mb-3" style={{ color }} aria-hidden />
            <h3 className="text-3xl font-bold mb-2" style={{ color }}>
              <span aria-live="polite" aria-atomic="true">
                {count}
              </span>
            </h3>
            <p className="text-gray-600 text-sm">{title}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#309898]/10 via-white to-[#FF8000]/10">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Vytara — Personal Health Companion" className="w-12 h-12 object-contain" />
            <h1 className="text-[#309898] text-lg font-semibold">Vytara</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setRunTour(true)}
              className="px-4 py-2 bg-[#309898] text-white rounded-lg hover:bg-[#309898]/80 transition focus:outline-none focus:ring-2 focus:ring-[#309898]"
              data-tour="start-tour"
            >
              Start Tour
            </button>
            <button
              type="button"
              onClick={onNavigateToVault}
              className="px-4 py-2 bg-[#FF8000] text-white rounded-lg hover:bg-[#FF8000]/80 transition focus:outline-none focus:ring-2 focus:ring-[#FF8000]"
              data-tour="vault"
            >
              Visit Vault
            </button>
            <button
              type="button"
              onClick={onNavigateToProfile}
              className="px-4 py-2 bg-[#309898] text-white rounded-lg hover:bg-[#309898]/80 transition focus:outline-none focus:ring-2 focus:ring-[#309898]"
              data-tour="profile"
            >
              Profile
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden">
        {/* decorative floating dots (aria-hidden) */}
        <div className="absolute inset-0 opacity-20" aria-hidden>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                backgroundColor: i % 2 === 0 ? '#309898' : '#FF8000',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12 relative z-10">
          <h2 className="text-3xl font-bold text-[#309898] mb-2">Welcome back, {safePersonal.fullName}!</h2>
          <p className="text-gray-600 text-lg">Your health companion is ready. How can we assist you today?</p>
        </motion.div>

        {/* SOS */}
        <div className="flex justify-center mb-16">
          <motion.button
            onClick={handleSOSClick}
            type="button"
            aria-label="Emergency SOS Button"
            style={{
              background: 'linear-gradient(135deg, #ff0000, #b00000)',
            }}
            className="w-72 h-72 text-white rounded-full shadow-2xl flex flex-col items-center justify-center gap-6 text-6xl font-extrabold hover:scale-105 transition focus:outline-none focus:ring-4 focus:ring-red-300 border-8 border-red-500 cursor-pointer relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 0 40px rgba(255,0,0,0.6), 0 0 0 8px rgba(255,0,0,0.3)',
                '0 0 80px rgba(255,0,0,1), 0 0 0 12px rgba(255,0,0,0.5)',
                '0 0 40px rgba(255,0,0,0.6), 0 0 0 8px rgba(255,0,0,0.3)',
              ],
            }}
            transition={{
              boxShadow: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            data-tour="sos"
          >
            <AlertCircle className="w-16 h-16" strokeWidth={3} />
            SOS
          </motion.button>
        </div>

        {/* Quick Stats using StatCard (all same size/padding) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 relative z-10">
          {topCards.map((card) => (
            <StatCard key={card.id} id={card.id as ModalType} title={card.title} Icon={card.icon} color={card.color} count={card.count} delay={card.delay} />
          ))}
        </div>

        {/* Lower grid: remaining unique cards (also use StatCard) */}
        <div className="relative">
          <svg className="absolute inset-0 w-full h-full -z-10 opacity-20" viewBox="0 0 800 600" preserveAspectRatio="none" aria-hidden>
            <path d="M 100 50 Q 200 100, 300 80 T 500 120 T 700 100" stroke="#309898" strokeWidth="4" fill="none" strokeDasharray="10,5" />
            <path d="M 150 200 Q 250 250, 350 230 T 550 270 T 750 250" stroke="#FF8000" strokeWidth="4" fill="none" strokeDasharray="10,5" />
            <path d="M 100 350 Q 200 400, 300 380 T 500 420 T 700 400" stroke="#309898" strokeWidth="4" fill="none" strokeDasharray="10,5" />
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingCards.map((card) => (
              <StatCard key={card.id} id={card.id as ModalType} title={card.title} Icon={card.icon} color={card.color} count={card.count} delay={card.delay} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16 border-t-4 border-[#309898]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoImage} alt="Vytara Logo" className="w-10 h-10 object-contain" />
                <h3 className="text-[#309898]">Vytara</h3>
              </div>
              <p className="text-gray-600">Your Personal Health Companion - Managing your medical records with care and security.</p>
            </div>

            <div>
              <h4 className="text-[#FF8000] mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <button type="button" onClick={onNavigateToVault} className="hover:text-[#309898]">
                    Vault
                  </button>
                </li>
                <li>
                  <button type="button" onClick={onNavigateToProfile} className="hover:text-[#309898]">
                    Profile
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setActiveModal('appointments')} className="hover:text-[#309898]">
                    Appointments
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setActiveModal('emergency')} className="hover:text-[#309898]">
                    Emergency Contacts
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#FF8000] mb-4">Services</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <button type="button" onClick={() => setActiveModal('doctors')} className="hover:text-[#309898]">
                    Doctors
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setActiveModal('pharmacy')} className="hover:text-[#309898]">
                    Pharmacy
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setActiveModal('diagnostics')} className="hover:text-[#309898]">
                    Diagnostics
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setActiveModal('hospitals')} className="hover:text-[#309898]">
                    Hospitals
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t-2 border-[#309898]/20 mt-8 pt-6 text-center text-gray-600">
            <p>&copy; 2024 Vytara. All rights reserved. Your health, our priority.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeModal === 'appointments' && <AppointmentsModal appointments={safeAppointments} onClose={() => setActiveModal(null)} onAddAppointment={onAddAppointment} />}
      {activeModal === 'emergency' && (
        <EmergencyContactsModal contacts={safePersonal.emergencyContacts} onClose={() => setActiveModal(null)} onUpdateContacts={onUpdateEmergencyContacts} />
      )}
      {activeModal === 'doctors' && <DoctorsModal doctors={safeMedical.doctors} onClose={() => setActiveModal(null)} />}
      {activeModal === 'pharmacy' && <PharmacyModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'diagnostics' && <DiagnosticsModal onClose={() => setActiveModal(null)} onAddAppointment={onAddAppointment} />}
      {activeModal === 'hospitals' && <HospitalsModal onClose={() => setActiveModal(null)} onAddAppointment={onAddAppointment} />}
      {activeModal === 'insurance' && <InsuranceModal policies={safeInsurance} onClose={() => setActiveModal(null)} />}

      {/* SOS Confirmation Modal */}
      <AlertDialog open={showSOSConfirm} onOpenChange={setShowSOSConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm SOS Alert</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to send an emergency SOS alert? This will notify your emergency contacts immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSOS}>Send SOS Alert</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Joyride
        steps={tourSteps}
        run={runTour}
        callback={handleTourCallback}
        continuous
        showProgress
        showSkipButton
        styles={{
          options: {
            primaryColor: '#309898',
            textColor: '#333',
            backgroundColor: '#fff',
            overlayColor: 'rgba(0,0,0,0.5)',
          },
        }}
      />
    </div>
  );
}
