import { Routes, Route } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import { LoginSignupModal } from "./components/LoginSignupModal";
import { VaultPage } from "./components/VaultPage";
import ConfirmationEmailPage from "./components/ConfirmEmail";
import Verified from "./components/Verified";
import { HomePage } from "./components/HomePage";
import { ForgotPassword } from "./components/ForgotPassword";
import { ResetPassword } from "./components/ResetPassword";
import { MedicalInfoFormUI } from "./components/MedicalInfoForm";
import HealthInfoFormUI from "./components/CurrentMedicalStatus";
import PastMedicalHistoryUI from "./components/PastMedicalHistory";
import FamilyMedicalHistoryUI from './components/FamilyMedicationHistory'
import ProfilePageUI from "./components/ProfilePage";

import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'vault' | 'profile'>('home');

  const [userData, setUserData] = useState(null);

  const handleLoginSuccess = (data: any) => {
    setUserData(data);
    setIsLoggedIn(true);
  };

  return (
    <Routes>
      
      {/* LOGIN PAGE */}
      <Route path="/" element={
        <LoginSignupModal onLoginSuccess={handleLoginSuccess} />
      } />

      {/* SIGNUP PAGE */}
      <Route path="/signup" element={<SignupPage />} />
      
      <Route path="/login" element={<LoginSignupModal />} />

      <Route path="/confirmemail" element={<ConfirmationEmailPage />} />

      <Route path="/verified" element={<Verified />} />

      <Route path="/home" element={<HomePage />} />

      <Route path="/forgotpassword" element={<ForgotPassword />} />

      <Route path="/resetpassword" element={<ResetPassword />} />

      <Route path="/medicalform" element={<MedicalInfoFormUI />} />      

      <Route path="/healthinfoform" element={<HealthInfoFormUI />} />   

     <Route path="/pastmedicalhistoryform" element={<PastMedicalHistoryUI />} />      

     <Route path="/familymedicalhistory" element={<FamilyMedicalHistoryUI />} />      

     <Route path="/profilepage" element={<ProfilePageUI />} />      
    


      {/* AUTHENTICATED PAGES */}
      {/* {isLoggedIn && (
        <>
          <Route path="/home" element={
            <HomePage
              userData={userData!}
              onNavigateToVault={() => setCurrentView('vault')}
              onNavigateToProfile={() => setCurrentView('profile')}
            />
          } />

          <Route path="/vault" element={
            <VaultPage
              userData={userData!}
              onNavigateToHome={() => setCurrentView('home')}
              onNavigateToProfile={() => setCurrentView('profile')}
            />
          } />

          <Route path="/profile" element={
            <ProfilePage
              userData={userData!}
              onLogout={() => setIsLoggedIn(false)}
            />
          } />
        </>
      )} */}

    </Routes>
  );
}

export default App;
