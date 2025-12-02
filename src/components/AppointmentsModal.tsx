import { useState } from 'react';
import { X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Appointment } from '../App';

type Props = {
  appointments: Appointment[];
  onClose: () => void;
  onAddAppointment: (appointment: Appointment) => void;
};

export function AppointmentsModal({ appointments, onClose, onAddAppointment }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: '',
    time: '',
    type: '',
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);

  const previousMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1));
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAppointment.title && newAppointment.date && newAppointment.time && newAppointment.type) {
      onAddAppointment({
        id: Date.now().toString(),
        ...newAppointment,
      });
      setNewAppointment({ title: '', date: '', time: '', type: '' });
      setShowAddForm(false);
    }
  };

  const getAppointmentsForDate = (day: number) => {
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return appointments.filter(apt => apt.date === dateStr);
  };

  const isPastDate = (day: number) => {
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-[#309898]">
        <div className="sticky top-0 bg-white p-6 border-b-2 border-[#309898]/20 flex justify-between items-center rounded-t-3xl">
          <h2 className="text-[#309898]">Upcoming Appointments</h2>
          <button onClick={onClose} className="text-[#FF8000] hover:text-[#309898] transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-[#309898]/10 rounded-lg transition"
            >
              <ChevronLeft className="w-6 h-6 text-[#309898]" />
            </button>
            <h3 className="text-[#FF8000]">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-[#FF8000]/10 rounded-lg transition"
            >
              <ChevronRight className="w-6 h-6 text-[#FF8000]" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-[#309898] p-2">
                {day}
              </div>
            ))}
            
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="p-2" />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const dayAppointments = getAppointmentsForDate(day);
              const past = isPastDate(day);
              
              return (
                <div
                  key={day}
                  className={`p-2 border-2 rounded-lg min-h-[80px] cursor-pointer transition ${
                    past
                      ? 'bg-gray-100 border-gray-300'
                      : dayAppointments.length > 0
                      ? 'bg-[#FF8000]/10 border-[#FF8000] hover:bg-[#FF8000]/20'
                      : 'border-[#309898]/30 hover:bg-[#309898]/10'
                  }`}
                  onClick={() => {
                    if (!past) {
                      setNewAppointment({
                        ...newAppointment,
                        date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
                      });
                      setShowAddForm(true);
                    }
                  }}
                >
                  <div className={`text-sm ${past ? 'text-gray-500' : 'text-[#309898]'}`}>
                    {day}
                  </div>
                  {dayAppointments.map(apt => (
                    <div
                      key={apt.id}
                      className="text-xs bg-[#309898] text-white rounded px-1 mt-1 truncate"
                      title={`${apt.title} at ${apt.time}`}
                    >
                      {apt.time} - {apt.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Add Appointment Button */}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#309898] to-[#FF8000] text-white rounded-lg hover:shadow-lg transition"
          >
            <Plus className="w-5 h-5" />
            Add New Appointment
          </button>

          {/* Add Appointment Form */}
          {showAddForm && (
            <form onSubmit={handleAddAppointment} className="mt-6 p-4 bg-[#309898]/5 rounded-lg space-y-4">
              <div>
                <label className="block text-[#309898] mb-2">Title</label>
                <input
                  type="text"
                  value={newAppointment.title}
                  onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none"
                  placeholder="e.g., Doctor Visit"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#309898] mb-2">Date</label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#309898] mb-2">Time</label>
                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#309898] mb-2">Type</label>
                <select
                  value={newAppointment.type}
                  onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Doctor Visit">Doctor Visit</option>
                  <option value="Lab Test">Lab Test</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Therapy">Therapy</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#309898] text-white rounded-lg hover:bg-[#309898]/80 transition"
                >
                  Save Appointment
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
