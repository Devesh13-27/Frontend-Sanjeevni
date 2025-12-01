import { useState } from 'react';
import { FileText, Receipt, Activity, Shield, Upload, X, ChevronDown } from 'lucide-react';
import { UserData, Document } from '../App';
import logoImage from 'figma:asset/8e191f727b2ef8023e7e4984e9036f679c3d3038.png';

type Props = {
  userData: UserData;
  onNavigateToHome: () => void;
  onNavigateToProfile: () => void;
  documents: Document[];
  onAddDocument: (document: Document) => void;
  onDeleteDocument: (id: string) => void;
};

type Category = 'lab-reports' | 'prescriptions' | 'insurance' | 'bills' | 'all';

export function VaultPage({
  userData,
  onNavigateToHome,
  onNavigateToProfile,
  documents,
  onAddDocument,
  onDeleteDocument,
}: Props) {
  const [selectedOwner, setSelectedOwner] = useState('self');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    name: '',
    category: 'lab-reports' as Category,
  });

  const owners = [
    { value: 'self', label: userData.personalInfo.fullName },
    ...userData.personalInfo.emergencyContacts.map((contact, idx) => ({
      value: `contact-${idx}`,
      label: contact.name,
    })),
  ];

  const categories = [
    { id: 'lab-reports', label: 'Lab Reports', icon: Activity, color: '#309898' },
    { id: 'prescriptions', label: 'Prescriptions', icon: FileText, color: '#FF8000' },
    { id: 'insurance', label: 'Insurance', icon: Shield, color: '#309898' },
    { id: 'bills', label: 'Bills & Receipts', icon: Receipt, color: '#FF8000' },
  ];

  const filteredDocuments = documents
    .filter(doc => doc.owner === selectedOwner)
    .filter(doc => selectedCategory === 'all' || doc.category === selectedCategory)
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadData.name && uploadData.category !== 'all') {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: uploadData.name,
        category: uploadData.category as Exclude<Category, 'all'>,
        uploadDate: new Date().toISOString(),
        owner: selectedOwner,
      };
      onAddDocument(newDoc);
      setUploadData({ name: '', category: 'lab-reports' });
      setShowUploadModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#309898]/10 via-white to-[#FF8000]/10">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Vytara Logo" className="w-12 h-12" />
            <h1 className="text-[#309898]">Vytara - Vault</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateToHome}
              className="px-4 py-2 bg-[#FF8000] text-white rounded-lg hover:bg-[#FF8000]/80 transition"
            >
              Home
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Owner Selector */}
        <div className="mb-8">
          <label className="block text-[#309898] mb-2">Select Person</label>
          <div className="relative">
            <select
              value={selectedOwner}
              onChange={(e) => setSelectedOwner(e.target.value)}
              className="w-full md:w-64 px-4 py-3 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none appearance-none bg-white"
            >
              {owners.map(owner => (
                <option key={owner.value} value={owner.value}>
                  {owner.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#309898] pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Documents Display - Left 2/3 */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#FF8000]">
                {selectedCategory === 'all' ? 'All Documents' : categories.find(c => c.id === selectedCategory)?.label}
              </h2>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#309898] to-[#FF8000] text-white rounded-lg hover:shadow-lg transition"
              >
                <Upload className="w-4 h-4" />
                Add New
              </button>
            </div>

            {filteredDocuments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border-2 border-[#309898]/20">
                <FileText className="w-16 h-16 text-[#309898]/30 mx-auto mb-4" />
                <p className="text-gray-500">No documents found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredDocuments.map(doc => {
                  const category = categories.find(c => c.id === doc.category);
                  const Icon = category?.icon || FileText;
                  const color = category?.color || '#309898';
                  
                  return (
                    <div
                      key={doc.id}
                      className="bg-white p-4 rounded-lg border-2 hover:shadow-lg transition group relative"
                      style={{ borderColor: `${color}40` }}
                    >
                      <button
                        onClick={() => onDeleteDocument(doc.id)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      
                      <div
                        className="w-full h-32 rounded-lg flex items-center justify-center mb-3"
                        style={{ backgroundColor: `${color}10` }}
                      >
                        <Icon className="w-12 h-12" style={{ color }} />
                      </div>
                      
                      <h3 className="text-sm mb-1 truncate" style={{ color }}>
                        {doc.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(doc.uploadDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(doc.uploadDate).toLocaleTimeString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Category Cards - Right 1/3 */}
          <div className="space-y-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full p-4 rounded-2xl border-2 transition ${
                selectedCategory === 'all'
                  ? 'border-[#309898] bg-[#309898]/10'
                  : 'border-[#309898]/30 bg-white hover:border-[#309898]'
              }`}
            >
              <h3 className="text-[#309898]">All Documents</h3>
              <p className="text-2xl text-[#FF8000] mt-2">{documents.filter(d => d.owner === selectedOwner).length}</p>
            </button>

            {categories.map(category => {
              const Icon = category.icon;
              const count = documents.filter(
                d => d.owner === selectedOwner && d.category === category.id
              ).length;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as Category)}
                  className={`w-full p-4 rounded-2xl border-2 transition ${
                    selectedCategory === category.id
                      ? `bg-[${category.color}]/10`
                      : 'bg-white hover:shadow-lg'
                  }`}
                  style={{
                    borderColor: selectedCategory === category.id ? category.color : `${category.color}40`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: category.color }} />
                    </div>
                    <h3 style={{ color: category.color }}>{category.label}</h3>
                  </div>
                  <p className="text-2xl" style={{ color: category.color }}>
                    {count}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border-4 border-[#309898]">
            <div className="p-6 border-b-2 border-[#309898]/20">
              <div className="flex justify-between items-center">
                <h2 className="text-[#309898]">Add New Document</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-[#FF8000] hover:text-[#309898] transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div>
                <label className="block text-[#309898] mb-2">Document Name</label>
                <input
                  type="text"
                  value={uploadData.name}
                  onChange={(e) => setUploadData({ ...uploadData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none"
                  placeholder="e.g., Blood Test Results"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[#309898] mb-2">Category</label>
                <select
                  value={uploadData.category}
                  onChange={(e) => setUploadData({ ...uploadData, category: e.target.value as Category })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="border-2 border-dashed border-[#309898]/30 rounded-lg p-8 text-center hover:border-[#FF8000] transition">
                <Upload className="w-12 h-12 text-[#309898] mx-auto mb-2" />
                <p className="text-gray-600 mb-1">Drop files here or browse</p>
                <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#309898] text-white rounded-lg hover:bg-[#309898]/80 transition"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}