import { useState } from 'react';
import { User, Mail, Phone, Users, Activity, FileText, Heart, LogOut, Edit2, Download } from 'lucide-react';
import { UserData } from '../App';
import logoImage from 'figma:asset/8e191f727b2ef8023e7e4984e9036f679c3d3038.png';
import { MedicalInfoForm } from './MedicalInfoForm';

type Props = {
  userData: UserData;
  onNavigateToHome: () => void;
  onNavigateToVault: () => void;
  onLogout: () => void;
  onUpdateUserData: (data: UserData) => void;
};

export function ProfilePage({ userData, onNavigateToHome, onNavigateToVault, onLogout, onUpdateUserData }: Props) {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleFormSubmit = (updatedData: UserData) => {
    onUpdateUserData(updatedData);
    setShowEditForm(false);
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '', 'height=800,width=800');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Vytara - Medical Profile</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #309898; }
              h2 { color: #FF8000; margin-top: 20px; }
              h3 { color: #309898; }
              .section { margin-bottom: 30px; }
              .field { margin-bottom: 10px; }
              .label { font-weight: bold; color: #309898; }
              .value { color: #333; }
              table { width: 100%; border-collapse: collapse; margin: 10px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #309898; color: white; }
            </style>
          </head>
          <body>
            <h1>Vytara Medical Profile</h1>
            <div class="section">
              <h2>Personal Information</h2>
              <div class="field"><span class="label">Full Name:</span> ${userData.personalInfo.fullName}</div>
              <div class="field"><span class="label">Email:</span> ${userData.email}</div>
              <div class="field"><span class="label">Username:</span> @${userData.username}</div>
              <div class="field"><span class="label">Date of Birth:</span> ${new Date(userData.personalInfo.dateOfBirth).toLocaleDateString()}</div>
              <div class="field"><span class="label">Gender:</span> ${userData.personalInfo.gender}</div>
              <div class="field"><span class="label">Blood Group:</span> ${userData.personalInfo.bloodGroup}</div>
              <div class="field"><span class="label">Height:</span> ${userData.personalInfo.height || 'Not specified'}</div>
              <div class="field"><span class="label">Weight:</span> ${userData.personalInfo.weight || 'Not specified'}</div>
              <div class="field"><span class="label">Contact Number:</span> ${userData.personalInfo.contactNumber}</div>
            </div>

            <div class="section">
              <h3>Emergency Contacts</h3>
              <table>
                <tr><th>Name</th><th>Phone</th></tr>
                ${userData.personalInfo.emergencyContacts.map(contact => `
                  <tr><td>${contact.name}</td><td>${contact.phone}</td></tr>
                `).join('')}
              </table>
            </div>

            <div class="section">
              <h2>Current Medical Status</h2>
              ${userData.currentMedical.conditions.length > 0 ? `
                <h3>Current Conditions</h3>
                <p>${userData.currentMedical.conditions.join(', ')}</p>
              ` : ''}
              
              ${userData.currentMedical.medications.length > 0 ? `
                <h3>Current Medications</h3>
                <table>
                  <tr><th>Name</th><th>Dosage</th><th>Frequency</th></tr>
                  ${userData.currentMedical.medications.map(med => `
                    <tr><td>${med.name}</td><td>${med.dosage}</td><td>${med.frequency}</td></tr>
                  `).join('')}
                </table>
              ` : ''}

              ${userData.currentMedical.allergies.length > 0 ? `
                <h3>Allergies</h3>
                <p>${userData.currentMedical.allergies.join(', ')}</p>
              ` : ''}

              ${userData.currentMedical.doctors.length > 0 ? `
                <h3>Current Doctors</h3>
                <table>
                  <tr><th>Name</th><th>Phone</th></tr>
                  ${userData.currentMedical.doctors.map(doc => `
                    <tr><td>${doc.name}</td><td>${doc.phone}</td></tr>
                  `).join('')}
                </table>
              ` : ''}
            </div>

            <div class="section">
              <h2>Past Medical History</h2>
              ${userData.pastMedical.diseases.length > 0 ? `
                <h3>Previous Diseases</h3>
                <p>${userData.pastMedical.diseases.join(', ')}</p>
              ` : ''}

              ${userData.pastMedical.surgeries.length > 0 ? `
                <h3>Past Surgeries</h3>
                <table>
                  <tr><th>Name</th><th>Date</th></tr>
                  ${userData.pastMedical.surgeries.map(surgery => `
                    <tr><td>${surgery.name}</td><td>${new Date(surgery.date).toLocaleDateString()}</td></tr>
                  `).join('')}
                </table>
              ` : ''}
            </div>

            ${userData.familyHistory.length > 0 ? `
              <div class="section">
                <h2>Family Medical History</h2>
                <table>
                  <tr><th>Disease</th><th>Relation</th></tr>
                  ${userData.familyHistory.map(item => `
                    <tr><td>${item.disease}</td><td>${item.relation}</td></tr>
                  `).join('')}
                </table>
              </div>
            ` : ''}

            <script>
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#309898]/10 via-white to-[#FF8000]/10">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Vytara Logo" className="w-12 h-12" />
            <h1 className="text-[#309898]">Vytara - Profile</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateToHome}
              className="px-4 py-2 bg-[#FF8000] text-white rounded-lg hover:bg-[#FF8000]/80 transition"
            >
              Home
            </button>
            <button
              onClick={onNavigateToVault}
              className="px-4 py-2 bg-[#309898] text-white rounded-lg hover:bg-[#309898]/80 transition"
            >
              Visit Vault
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Download className="w-4 h-4" />
              Export as PDF
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-4 border-[#309898]">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#309898] to-[#FF8000] rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-[#309898] mb-2">{userData.personalInfo.fullName}</h2>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#FF8000]" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#FF8000]" />
                  <span>@{userData.username}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Personal Information */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-4 border-[#FF8000]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#FF8000]">Basic Personal Information</h3>
            <button
              onClick={() => setShowEditForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF8000] text-white rounded-lg hover:bg-[#FF8000]/80 transition"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#309898] mb-2">Full Name</label>
              <p className="text-gray-700">{userData.personalInfo.fullName}</p>
            </div>
            
            <div>
              <label className="block text-[#309898] mb-2">Email</label>
              <p className="text-gray-700">{userData.email}</p>
            </div>

            <div>
              <label className="block text-[#309898] mb-2">Date of Birth</label>
              <p className="text-gray-700">{new Date(userData.personalInfo.dateOfBirth).toLocaleDateString()}</p>
            </div>
            
            <div>
              <label className="block text-[#309898] mb-2">Gender</label>
              <p className="text-gray-700">{userData.personalInfo.gender}</p>
            </div>
            
            <div>
              <label className="block text-[#309898] mb-2">Blood Group</label>
              <p className="text-gray-700">{userData.personalInfo.bloodGroup}</p>
            </div>
            
            <div>
              <label className="block text-[#309898] mb-2">Height</label>
              <p className="text-gray-700">{userData.personalInfo.height || 'Not specified'}</p>
            </div>
            
            <div>
              <label className="block text-[#309898] mb-2">Weight</label>
              <p className="text-gray-700">{userData.personalInfo.weight || 'Not specified'}</p>
            </div>
            
            <div>
              <label className="block text-[#309898] mb-2">Contact Number</label>
              <p className="text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF8000]" />
                {userData.personalInfo.contactNumber}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-[#309898] mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Emergency Contacts
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.personalInfo.emergencyContacts.map((contact, idx) => (
                <div key={idx} className="p-4 bg-[#309898]/5 rounded-lg border-2 border-[#309898]/20">
                  <p className="text-[#309898]">{contact.name}</p>
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    {contact.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Medical Status */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-4 border-[#309898]">
          <h3 className="text-[#309898] mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Current Medical Status
          </h3>
          
          {userData.currentMedical.conditions.length > 0 && (
            <div className="mb-4">
              <label className="block text-[#FF8000] mb-2">Current Conditions</label>
              <div className="flex flex-wrap gap-2">
                {userData.currentMedical.conditions.map((condition, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#FF8000]/10 text-[#FF8000] rounded-lg">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          )}

          {userData.currentMedical.medications.length > 0 && (
            <div className="mb-4">
              <label className="block text-[#FF8000] mb-2">Current Medications</label>
              <div className="space-y-2">
                {userData.currentMedical.medications.map((med, idx) => (
                  <div key={idx} className="p-3 bg-[#309898]/5 rounded-lg border-l-4 border-[#309898]">
                    <p className="text-[#309898]">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {userData.currentMedical.allergies.length > 0 && (
            <div className="mb-4">
              <label className="block text-[#FF8000] mb-2">Allergies</label>
              <div className="flex flex-wrap gap-2">
                {userData.currentMedical.allergies.map((allergy, idx) => (
                  <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {userData.currentMedical.treatments.length > 0 && (
            <div className="mb-4">
              <label className="block text-[#FF8000] mb-2">Ongoing Treatments</label>
              <div className="flex flex-wrap gap-2">
                {userData.currentMedical.treatments.map((treatment, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#309898]/10 text-[#309898] rounded-lg">
                    {treatment}
                  </span>
                ))}
              </div>
            </div>
          )}

          {userData.currentMedical.doctors.length > 0 && (
            <div>
              <label className="block text-[#FF8000] mb-2">Current Doctors</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {userData.currentMedical.doctors.map((doctor, idx) => (
                  <div key={idx} className="p-3 bg-[#FF8000]/5 rounded-lg border-l-4 border-[#FF8000]">
                    <p className="text-[#FF8000]">{doctor.name}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      {doctor.phone}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Past Medical History */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-4 border-[#FF8000]">
          <h3 className="text-[#FF8000] mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Past Medical History
          </h3>
          
          {userData.pastMedical.diseases.length > 0 && (
            <div className="mb-4">
              <label className="block text-[#309898] mb-2">Previous Diseases</label>
              <div className="flex flex-wrap gap-2">
                {userData.pastMedical.diseases.map((disease, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#309898]/10 text-[#309898] rounded-lg">
                    {disease}
                  </span>
                ))}
              </div>
            </div>
          )}

          {userData.pastMedical.surgeries.length > 0 && (
            <div className="mb-4">
              <label className="block text-[#309898] mb-2">Past Surgeries</label>
              <div className="space-y-2">
                {userData.pastMedical.surgeries.map((surgery, idx) => (
                  <div key={idx} className="p-3 bg-[#FF8000]/5 rounded-lg border-l-4 border-[#FF8000]">
                    <p className="text-[#FF8000]">{surgery.name}</p>
                    <p className="text-sm text-gray-600">{new Date(surgery.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {userData.pastMedical.hospitalizations.length > 0 && (
            <div className="mb-4">
              <label className="block text-[#309898] mb-2">Hospitalizations</label>
              <div className="space-y-2">
                {userData.pastMedical.hospitalizations.map((hosp, idx) => (
                  <div key={idx} className="p-3 bg-[#309898]/5 rounded-lg border-l-4 border-[#309898]">
                    <p className="text-[#309898]">{hosp.reason}</p>
                    <p className="text-sm text-gray-600">{new Date(hosp.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {userData.pastMedical.injuries.length > 0 && (
            <div className="mb-4">
              <label className="block text-[#309898] mb-2">Past Injuries</label>
              <div className="flex flex-wrap gap-2">
                {userData.pastMedical.injuries.map((injury, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#FF8000]/10 text-[#FF8000] rounded-lg">
                    {injury}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Family Medical History */}
        {userData.familyHistory.length > 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-8 border-4 border-[#309898]">
            <h3 className="text-[#309898] mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6" />
              Family Medical History
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.familyHistory.map((item, idx) => (
                <div key={idx} className="p-4 bg-[#309898]/5 rounded-lg border-2 border-[#309898]/20">
                  <p className="text-[#309898]">{item.disease}</p>
                  <p className="text-sm text-gray-600">{item.relation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
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
