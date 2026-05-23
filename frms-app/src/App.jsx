import React, { useState, useEffect } from 'react';
import { Home, Film, Clock, User, Armchair, Ticket, Database, Search, Check, Trash2, Plus, ChevronRight, AlertCircle, X, SearchCode } from 'lucide-react';

/* =====================================================================
   MOCK THE SYSTEM - DATABASE ARRAYS (Hardcoded)
   ===================================================================== */
let movies = [
  { movie_id: 'M01', title: '3 Idiots', genre: 'Comedy', duration: 170, language: 'Hindi', rating: 8.4, poster_url: 'https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg' },
  { movie_id: 'M02', title: 'Avengers', genre: 'Action', duration: 143, language: 'English', rating: 8.0, poster_url: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg' },
  { movie_id: 'M03', title: 'Interstellar', genre: 'Sci-Fi', duration: 169, language: 'English', rating: 8.7, poster_url: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg' },
  { movie_id: 'M04', title: 'DDLJ', genre: 'Drama', duration: 189, language: 'Hindi', rating: 8.1, poster_url: 'https://upload.wikimedia.org/wikipedia/en/8/80/Dilwale_Dulhania_Le_Jayenge_poster.jpg' },
  { movie_id: 'M05', title: 'Dhurandhar', genre: 'Action', duration: 140, language: 'Hindi', rating: 7.5, poster_url: 'https://upload.wikimedia.org/wikipedia/en/b/b5/Bade_Miyan_Chote_Miyan_1998.jpg' },
  { movie_id: 'M06', title: '12th Fail', genre: 'Drama', duration: 147, language: 'Hindi', rating: 9.2, poster_url: 'https://upload.wikimedia.org/wikipedia/en/f/f2/12th_Fail_poster.jpeg' },
  { movie_id: 'M07', title: 'Taare Zameen Par', genre: 'Drama', duration: 165, language: 'Hindi', rating: 8.3, poster_url: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Taare_Zameen_Par_Like_Stars_on_Earth_poster.png' },
  { movie_id: 'M08', title: 'King Kong', genre: 'Action', duration: 187, language: 'English', rating: 7.2, poster_url: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Kingkong_poster.jpg' },
  { movie_id: 'M09', title: 'Jurassic Park', genre: 'Sci-Fi', duration: 127, language: 'English', rating: 8.2, poster_url: 'https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg' },
  { movie_id: 'M10', title: 'PK', genre: 'Comedy', duration: 153, language: 'Hindi', rating: 8.1, poster_url: 'https://upload.wikimedia.org/wikipedia/en/c/c3/PK_poster.jpg' },
  { movie_id: 'M11', title: 'Singham', genre: 'Action', duration: 143, language: 'Hindi', rating: 6.8, poster_url: 'https://upload.wikimedia.org/wikipedia/en/d/d9/Singham_poster.jpg' },
  { movie_id: 'M12', title: 'Drishyam', genre: 'Thriller', duration: 163, language: 'Hindi', rating: 8.2, poster_url: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Drishyam_2015_film.jpg' },
  { movie_id: 'M13', title: 'Fast and Furious', genre: 'Action', duration: 106, language: 'English', rating: 6.8, poster_url: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Fast_and_Furious_Poster.jpg' },
  { movie_id: 'M14', title: 'Mission Impossible', genre: 'Action', duration: 110, language: 'English', rating: 7.1, poster_url: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Mission_Impossible_1_poster.jpg' },
  { movie_id: 'M15', title: 'Bahubali', genre: 'Action', duration: 159, language: 'Hindi', rating: 8.0, poster_url: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Baahubali_The_Beginning_poster.jpg' }
];

let theatres = [
  { theatre_id: 'T1', theatre_name: 'PVR Pune', location: 'Pune', contact_number: '9876543210' },
  { theatre_id: 'T2', theatre_name: 'INOX Pune', location: 'Pune', contact_number: '9876543211' },
  { theatre_id: 'T3', theatre_name: 'Cinepolis Pune', location: 'Pune', contact_number: '9876543212' },
  { theatre_id: 'T4', theatre_name: 'City Pride Pune', location: 'Pune', contact_number: '9876543213' }
];

// 12 Screens (3 per theatre), total_seats = 20 (for UI demonstration purposes A1-D5)
let screens = theatres.flatMap(t => 
  [1, 2, 3].map(num => ({ screen_id: `${t.theatre_id}_S${num}`, theatre_id: t.theatre_id, screen_name: `Screen ${num}`, total_seats: 20 }))
);

// 30 Shows
const times = ['10:00 AM', '01:30 PM', '05:00 PM', '09:30 PM'];
const prices = [150, 200, 300, 400];
let shows = [];
let showCounter = 1;
movies.slice(0, 10).forEach((m, idx) => {
  [0, 1, 2].forEach(sIdx => {
    shows.push({
      show_id: `SHW${showCounter++}`,
      movie_id: m.movie_id,
      screen_id: screens[(idx + sIdx) % 12].screen_id,
      show_date: 'Today',
      show_time: times[sIdx % 4],
      ticket_price: prices[sIdx % 4]
    });
  });
});

let customers = [
  { customer_id: 'C01', name: 'Tanvi', email: 'tanvi@mock.com', phone_number: '9111111111' },
  { customer_id: 'C02', name: 'Parth', email: 'parth@mock.com', phone_number: '9222222222' },
  { customer_id: 'C03', name: 'Darsh', email: 'darsh@mock.com', phone_number: '9333333333' },
  { customer_id: 'C04', name: 'Shravani', email: 'shravani@mock.com', phone_number: '9444444444' },
  { customer_id: 'C05', name: 'Krishna', email: 'krishna@mock.com', phone_number: '9555555555' },
  { customer_id: 'C06', name: 'Prachi', email: 'prachi@mock.com', phone_number: '9666666666' },
  { customer_id: 'C07', name: 'Yash', email: 'yash@mock.com', phone_number: '9777777777' },
  { customer_id: 'C08', name: 'Rahul', email: 'rahul@mock.com', phone_number: '9888888888' },
  { customer_id: 'C09', name: 'Shreya', email: 'shreya@mock.com', phone_number: '9999999999' },
  { customer_id: 'C10', name: 'Praveen', email: 'praveen@mock.com', phone_number: '9000000000' },
  { customer_id: 'C11', name: 'Riya', email: 'riya@mock.com', phone_number: '8111111111' },
  { customer_id: 'C12', name: 'Kartik', email: 'kartik@mock.com', phone_number: '8222222222' },
  { customer_id: 'C13', name: 'Siya', email: 'siya@mock.com', phone_number: '8333333333' },
  { customer_id: 'C14', name: 'Sakshi', email: 'sakshi@mock.com', phone_number: '8444444444' }
];

// Seat mapping (A1-D5) for each screen -> 240 seats
let seats = [];
const rows = ['A', 'B', 'C', 'D'];
screens.forEach(s => {
  rows.forEach(r => {
    for (let c = 1; c <= 5; c++) {
      seats.push({
        seat_id: `${s.screen_id}_${r}${c}`,
        screen_id: s.screen_id,
        seat_number: `${r}${c}`,
        seat_type: r === 'D' ? 'Premium' : 'Regular'
      });
    }
  });
});

let bookings = [];
// Generate 20 mock bookings
for (let i = 0; i < 20; i++) {
  const show = shows[i % shows.length];
  const screenSeats = seats.filter(s => s.screen_id === show.screen_id);
  const seat = screenSeats[i % screenSeats.length];
  bookings.push({
    booking_id: `B${100 + i}`,
    customer_id: customers[i % customers.length].customer_id,
    show_id: show.show_id,
    seat_id: seat.seat_id,
    booking_date: 'Today',
    total_amount: show.ticket_price
  });
}

/* =====================================================================
   SQL MOCK QUERY FUNCTIONS (22 required)
   ===================================================================== */
const executeDbQuery = (qId, param) => {
  try {
    switch(qId) {
      case 1: return movies.map(m => ({ title: m.title, genre: m.genre, language: m.language, rating: m.rating })); // All movies
      case 2: return theatres.map(t => ({ theatre_name: t.theatre_name, location: t.location })); // All theatres
      case 3: return screens.map(s => ({ screen_name: s.screen_name, total_seats: s.total_seats })); // All screens
      case 4: return shows.map(s => ({ show_time: s.show_time, ticket_price: s.ticket_price })); // Show times & price
      case 5: return customers.map(c => ({ name: c.name, phone_number: c.phone_number })); // Customers & phone
      case 6: return shows.map(s => { // Movie title + show time + price
        const m = movies.find(x => x.movie_id === s.movie_id); return { title: m?.title, show_time: s.show_time, ticket_price: s.ticket_price }; });
      case 7: return screens.map(s => { // Theatre name + screen names
        const t = theatres.find(x => x.theatre_id === s.theatre_id); return { theatre_name: t?.theatre_name, screen_name: s.screen_name }; });
      case 8: return bookings.map(b => { // Customer names + booking details
        const c = customers.find(x => x.customer_id === b.customer_id); return { name: c?.name, booking_id: b.booking_id, amount: b.total_amount }; });
      case 9: return shows.map(s => { // Movie + theatre + show time
        const m = movies.find(x => x.movie_id === s.movie_id); const sc = screens.find(x => x.screen_id === s.screen_id); const t = theatres.find(x => x.theatre_id === sc?.theatre_id);
        return { title: m?.title, theatre_name: t?.theatre_name, show_time: s.show_time }; });
      case 10: return seats.slice(0, 100).map(s => ({ screen_id: s.screen_id, seat_number: s.seat_number, type: s.seat_type })); // Seat info (limit 100 for display)
      case 11: return [{ total_movies: movies.length }]; // COUNT movies
      case 12: return [{ avg_ticket_price: (shows.reduce((a, b) => a + b.ticket_price, 0) / shows.length).toFixed(2) }]; // AVG ticket price
      case 13: { // Bookings count per show
        const counts = {}; bookings.forEach(b => counts[b.show_id] = (counts[b.show_id] || 0) + 1);
        return Object.entries(counts).map(([show_id, count]) => ({ show_id, count }));
      }
      case 14: return screens.map(s => ({ screen_id: s.screen_id, total_seats: s.total_seats })); // Total seats per screen
      case 15: return movies.filter(m => m.language === 'Hindi'); // Hindi movies
      case 16: return shows.filter(s => s.ticket_price > 200); // Price > 200
      case 17: return customers.filter(c => c.name.startsWith('S')); // Customers starting with 'S'
      case 18: return bookings.filter(b => b.customer_id === param); // Bookings by customer
      case 19: return bookings.filter(b => b.show_id === param); // Seats booked for show
      case 20: return bookings.map(b => { // Booking history + joins
        const c = customers.find(x => x.customer_id === b.customer_id); const sh = shows.find(x => x.show_id === b.show_id);
        const m = movies.find(x => x.movie_id === sh?.movie_id); const t = theatres.find(x => x.theatre_id === screens.find(sc => sc.screen_id === sh?.screen_id)?.theatre_id);
        return { booking_id: b.booking_id, customer: c?.name, movie: m?.title, theatre: t?.theatre_name };
      });
      case 23: return bookings.map(b => { // New Basic Join
        const c = customers.find(x => x.customer_id === b.customer_id);
        return { booking_id: b.booking_id, customer_name: c?.name, amount_paid: b.total_amount, date: b.booking_date };
      });
      case 21: { // Delete a booking
        const bIdx = bookings.findIndex(b => b.booking_id === param); if(bIdx > -1) bookings.splice(bIdx, 1);
        return [{ status: 'Deleted', table: 'bookings', id: param }];
      }
      case 22: { // Delete a customer
        const cIdx = customers.findIndex(c => c.customer_id === param); if(cIdx > -1) customers.splice(cIdx, 1);
        return [{ status: 'Deleted', table: 'customers', id: param }];
      }
      default: return [];
    }
  } catch(e) { return [{ error: e.message }]; }
};


/* =====================================================================
   MAIN APP & ROUTING LOGIC
   ===================================================================== */
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [selectedTab, setSelectedTab] = useState('queries');
  const [qIndex, setQIndex] = useState(0);
  const [toasts, setToasts] = useState([]);
  
  // State ticker to trigger re-renders after mock DB mutations
  const [dbTick, setDbTick] = useState(0);
  const forceUpdate = () => setDbTick(t => t + 1);

  const showToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const navTo = (page) => { setCurrentPage(page); window.scrollTo(0,0); };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0a0a0f] text-gray-200 font-sans">
      
      {/* GLOBAL STYLES & FONTS (Requirements compliance) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');
        h1, h2, h3, h4, .bebas { font-family: 'Bebas Neue', cursive; letter-spacing: 1px; }
        .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .glass:hover { border-color: rgba(229, 9, 20, 0.4); }
        .movie-card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(229, 9, 20, 0.15); }
        
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #e50914; }
        
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      
      {/* SIDEBAR */}
      <aside className="w-64 flex-shrink-0 flex flex-col border-r border-gray-800 bg-[#0d0d14]">
        <div className="p-6">
          <h1 className="text-3xl text-red-600 bebas flex items-center gap-2">
            <Film size={28} className="text-[#e50914]"/> CINE DB
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'movies', icon: Film, label: 'Movies' },
            { id: 'shows', icon: Clock, label: 'Shows' },
            { id: 'seats', icon: Armchair, label: 'Seat Booking' },
            { id: 'customers', icon: User, label: 'Customers' },
            { id: 'bookings', icon: Ticket, label: 'Bookings' },
            { id: 'admin', icon: Database, label: 'Admin DB View' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => navTo(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentPage === item.id 
                  ? 'bg-red-900/10 border-l-4 border-[#e50914] text-[#e50914]' 
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-7xl mx-auto pb-20 fade-in" key={currentPage}>
          
          {/* PAGE 1: HOME DASHBOARD */}
          {currentPage === 'home' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl bebas mb-2 text-white">Dashboard</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: 'Total Movies', value: movies.length, icon: Film, color: 'text-blue-500' },
                  { title: 'Total Bookings', value: bookings.length, icon: Ticket, color: 'text-green-500' },
                  { title: 'Total Customers', value: customers.length, icon: User, color: 'text-purple-500' },
                  { title: 'Total Revenue', value: `₹${bookings.reduce((sum, b) => sum + b.total_amount, 0)}`, icon: Database, color: 'text-[#f5c518]' }
                ].map((stat, i) => (
                  <div key={i} className="glass rounded-xl p-6 transition-transform hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                        <h3 className="text-3xl font-bold mt-2 font-mono">{stat.value}</h3>
                      </div>
                      <stat.icon size={24} className={stat.color} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-xl bebas mb-4 text-[#e50914]">Recent Bookings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-gray-800 text-gray-400">
                      <tr>
                        <th className="pb-3 px-2">ID</th>
                        <th className="pb-3 px-2">Customer</th>
                        <th className="pb-3 px-2">Movie</th>
                        <th className="pb-3 px-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {executeDbQuery(8).slice(-5).reverse().map((b, i) => (
                        <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                          <td className="py-3 px-2 font-mono text-gray-500">{b.booking_id}</td>
                          <td className="py-3 px-2">{b.name}</td>
                          <td className="py-3 px-2 text-gray-300">{movies.find(m => m.movie_id === bookings.find(x => x.booking_id === b.booking_id)?.show_id ? shows.find(s => s.show_id === bookings.find(x => x.booking_id === b.booking_id).show_id).movie_id : null)?.title || 'Unknown'}</td>
                          <td className="py-3 px-2 text-[#f5c518]">₹{b.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2: MOVIES */}
          {currentPage === 'movies' && (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-4xl bebas text-white">Now Showing</h2>
                </div>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                    <input type="text" placeholder="Search..." className="bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-red-600" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {movies.map(m => (
                  <div key={m.movie_id} className="glass rounded-xl overflow-hidden movie-card flex flex-col">
                    <div className="h-64 bg-gray-800 relative">
                      <img src={m.poster_url} alt={m.title} className="w-full h-full object-cover" />
                      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-[#f5c518] flex items-center gap-1">
                        ⭐ {m.rating}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-2xl bebas mb-1 truncate">{m.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-gray-800 text-gray-300 border border-gray-700">{m.genre}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider border ${m.language === 'Hindi' ? 'bg-red-900/20 border-red-800 text-red-300' : 'bg-blue-900/20 border-blue-800 text-blue-300'}`}>{m.language}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-gray-800 text-gray-400 border border-gray-700">{m.duration}m</span>
                      </div>
                      <div className="mt-auto pt-4">
                        <button 
                          onClick={() => { setSelectedMovie(m); navTo('shows'); }}
                          className="w-full py-2 bg-[#e50914] hover:bg-red-600 text-white font-bold rounded flex items-center justify-center gap-2 transition-colors text-sm"
                        >
                          View Shows <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 3: SHOW LISTING */}
          {currentPage === 'shows' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <button onClick={() => navTo('movies')} className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white">
                  <ChevronRight size={24} className="rotate-180" />
                </button>
                <h2 className="text-4xl bebas text-white">
                  {selectedMovie ? `Shows for ${selectedMovie.title}` : 'All Shows'}
                </h2>
              </div>

              <div className="grid gap-4">
                {shows.filter(s => !selectedMovie || s.movie_id === selectedMovie.movie_id).map(s => {
                  const m = movies.find(x => x.movie_id === s.movie_id);
                  const scr = screens.find(x => x.screen_id === s.screen_id);
                  const t = theatres.find(x => x.theatre_id === scr?.theatre_id);
                  const bookedSeats = bookings.filter(b => b.show_id === s.show_id).length;
                  const available = (scr?.total_seats || 20) - bookedSeats;

                  return (
                    <div key={s.show_id} className="glass p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex gap-5 items-center">
                        <div className="w-16 h-20 rounded-lg bg-gray-800 shrink-0 overflow-hidden">
                          <img src={m?.poster_url} alt={m?.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">{m?.title}</h4>
                          <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                            <Database size={14}/> {t?.theatre_name} • {scr?.screen_name}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-8 bg-black/20 p-4 rounded-lg">
                        <div className="text-center">
                          <p className="text-xs text-gray-500 uppercase">Time</p>
                          <p className="font-mono text-lg">{s.show_time}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 uppercase">Price</p>
                          <p className="font-mono text-lg text-[#f5c518]">₹{s.ticket_price}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 uppercase">Available</p>
                          <p className={`font-mono text-lg ${available > 5 ? 'text-green-500' : 'text-red-500'}`}>{available}</p>
                        </div>
                      </div>

                      <button 
                        disabled={available === 0}
                        onClick={() => { setSelectedShow(s); navTo('seats'); }}
                        className="py-3 px-8 bg-[#e50914] hover:bg-red-600 disabled:bg-gray-800 disabled:text-gray-600 text-white font-bold rounded-lg transition-colors"
                      >
                        {available === 0 ? 'SOLD OUT' : 'Book Seats'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PAGE 4: SEAT SELECTION */}
          {currentPage === 'seats' && selectedShow && (() => {
            const m = movies.find(x => x.movie_id === selectedShow.movie_id);
            const scr = screens.find(x => x.screen_id === selectedShow.screen_id);
            const showSeats = seats.filter(s => s.screen_id === selectedShow.screen_id);
            const bookedSeatIds = bookings.filter(b => b.show_id === selectedShow.show_id).map(b => b.seat_id);

            const toggleSeat = (s_id) => {
              if (bookedSeatIds.includes(s_id)) return;
              setSelectedSeatIds(prev => 
                prev.includes(s_id) ? prev.filter(id => id !== s_id) : [...prev, s_id]
              );
            };

            const confirmBooking = () => {
              if(selectedSeatIds.length === 0 || customers.length === 0) return;
              // using first customer as mock active user
              const cId = customers[0].customer_id;
              
              selectedSeatIds.forEach(sId => {
                bookings.push({
                  booking_id: `B${Date.now()}${Math.floor(Math.random()*100)}`,
                  customer_id: cId,
                  show_id: selectedShow.show_id,
                  seat_id: sId,
                  booking_date: 'Today',
                  total_amount: selectedShow.ticket_price
                });
              });
              
              forceUpdate();
              showToast(`Successfully booked ${selectedSeatIds.length} seats!`);
              setSelectedSeatIds([]);
              setTimeout(() => navTo('bookings'), 1000);
            };

            return (
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-gray-800 pb-4">
                  <button onClick={() => navTo('shows')} className="p-2 hover:bg-gray-800 rounded-full text-gray-400"><ChevronRight size={24} className="rotate-180"/></button>
                  <div>
                    <h2 className="text-3xl bebas text-white">Select Seats</h2>
                    <p className="text-gray-400 text-sm flex gap-2">
                       {m?.title} • <span className="text-[#f5c518]">₹{selectedShow.ticket_price}</span> • {selectedShow.show_time}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1 glass p-8 rounded-xl flex flex-col items-center">
                    <div className="w-full max-w-md h-8 border-t-[8px] border-gray-600 rounded-[50%] mb-12 relative flex justify-center opacity-50 shadow-[0_-20px_40px_rgba(255,255,255,0.1)]">
                       <span className="absolute -top-6 text-xs text-gray-500 uppercase tracking-widest">Screen</span>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-4">
                      {showSeats.map(s => {
                        const isBooked = bookedSeatIds.includes(s.seat_id);
                        const isSelected = selectedSeatIds.includes(s.seat_id);
                        return (
                          <button
                            key={s.seat_id}
                            disabled={isBooked}
                            onClick={() => toggleSeat(s.seat_id)}
                            className={`w-12 h-12 rounded-t-lg rounded-b-sm font-mono text-xs font-bold transition-all duration-200 shadow-sm
                              ${isBooked ? 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50 border-t-2 border-red-900' : 
                                isSelected ? 'bg-[#e50914] text-white transform scale-110 shadow-[0_0_15px_rgba(229,9,20,0.5)]' : 
                                s.seat_type === 'Premium' ? 'bg-[#1a1a24] text-gray-400 hover:bg-gray-700 border-t-2 border-[#f5c518]' : 
                                'bg-[#1a1a24] text-gray-400 hover:bg-gray-700'}
                            `}
                          >
                            {s.seat_number}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-center gap-6 mt-12 text-sm text-gray-400">
                      <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#1a1a24] rounded-sm"></div> Available</div>
                      <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#e50914] rounded-sm shadow-[0_0_8px_rgba(229,9,20,0.5)]"></div> Selected</div>
                      <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-800 opacity-50 border-t border-red-900 rounded-sm"></div> Booked</div>
                      <div className="flex items-center gap-2"><div className="w-4 h-4 border-t-2 border-[#f5c518] rounded-sm"></div> Premium</div>
                    </div>
                  </div>

                  <div className="w-full lg:w-80 glass p-6 rounded-xl h-fit">
                    <h3 className="text-xl bebas border-b border-gray-800 pb-4 mb-4">Summary</h3>
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Seats</span>
                        <span className="font-mono text-white">{selectedSeatIds.length || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Price/Ticket</span>
                        <span className="font-mono text-white">₹{selectedShow.ticket_price}</span>
                      </div>
                      <div className="border-t border-gray-800 pt-4 flex justify-between">
                        <span className="text-gray-300 font-bold">Total Amount</span>
                        <span className="font-mono text-2xl text-[#f5c518] font-bold">₹{selectedSeatIds.length * selectedShow.ticket_price}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={confirmBooking}
                      disabled={selectedSeatIds.length === 0}
                      className="w-full py-4 bg-[#e50914] disabled:bg-gray-800 hover:bg-red-600 text-white font-bold rounded-lg transition-colors focus:ring-4 ring-red-900 outline-none"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
          {currentPage === 'seats' && !selectedShow && (
             <div className="text-center py-20 text-gray-500">
                <AlertCircle size={48} className="mx-auto mb-4 opacity-50"/>
                <p>No show selected. Please go back to Movies.</p>
             </div>
          )}

          {/* PAGE 5: CUSTOMERS */}
          {currentPage === 'customers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <h2 className="text-4xl bebas text-white">Customers Management</h2>
                <button onClick={() => showToast("Add customer DB action mock!") }className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm text-gray-300 transition-colors">
                  <Plus size={16}/> Add Customer
                </button>
              </div>
              
              <div className="glass rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-black/40 text-gray-400 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="p-4 rounded-tl-xl text-center">ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4 text-right">Phone</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c, i) => (
                      <tr key={c.customer_id} className={`border-b border-gray-800/30 hover:bg-gray-800/20 ${i%2===0?'bg-transparent':'bg-gray-900/10'}`}>
                         <td className="p-4 font-mono text-gray-500 text-center">{c.customer_id}</td>
                         <td className="p-4 font-medium text-gray-200">{c.name}</td>
                         <td className="p-4 text-gray-400">{c.email}</td>
                         <td className="p-4 font-mono text-gray-400 text-right">{c.phone_number}</td>
                         <td className="p-4 text-center">
                           <button 
                              onClick={() => { 
                                executeDbQuery(22, c.customer_id); 
                                forceUpdate(); 
                                showToast(`Deleted customer ${c.name}`);
                              }}
                              className="text-red-900 hover:text-red-500 p-2 transition-colors rounded hover:bg-red-500/10"
                            >
                             <Trash2 size={16} />
                           </button>
                         </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PAGE 6: BOOKINGS */}
          {currentPage === 'bookings' && (
            <div className="space-y-6">
              <h2 className="text-4xl bebas text-white">Booking Records</h2>
              <div className="glass rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-black/40 text-gray-400 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="p-4">Booking ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Movie</th>
                      <th className="p-4">Theatre</th>
                      <th className="p-4 text-right">Amount</th>
                      <th className="p-4 text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice().reverse().map((b, i) => {
                      const details = executeDbQuery(20).find(x => x.booking_id === b.booking_id) || {};
                      return (
                        <tr key={b.booking_id} className="border-b border-gray-800/30 hover:bg-gray-800/20">
                           <td className="p-4 font-mono text-[#f5c518]">{b.booking_id}</td>
                           <td className="p-4 font-medium">{details.customer || 'Unknown'}</td>
                           <td className="p-4 text-gray-300">{details.movie}</td>
                           <td className="p-4 text-gray-400">{details.theatre}</td>
                           <td className="p-4 text-right font-mono text-green-400">₹{b.total_amount}</td>
                           <td className="p-4 text-center">
                             <button
                               onClick={() => {
                                 executeDbQuery(21, b.booking_id);
                                 forceUpdate();
                                 showToast(`Booking ${b.booking_id} cancelled`, 'error');
                               }}
                               className="text-red-900 hover:text-red-500 transition-colors"
                             >
                               <Trash2 size={16}/>
                             </button>
                           </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PAGE 7: ADMIN DB VIEW - 20 SQL Queries execution playground */}
          {currentPage === 'admin' && (() => {
            
            const queriesList = [
              { id: 1, label: "Q1: SELECT title, genre, language, rating FROM Movie" },
              { id: 2, label: "Q2: SELECT theatre_name, location FROM Theatre" },
              { id: 3, label: "Q3: SELECT screen_name, total_seats FROM Screen" },
              { id: 4, label: "Q4: SELECT show_time, ticket_price FROM Show" },
              { id: 5, label: "Q5: SELECT name, phone_number FROM Customer" },
              { id: 6, label: "Q6: SELECT movie.title, show.show_time, show.ticket_price FROM Show JOIN Movie" },
              { id: 7, label: "Q7: SELECT theatre.name, screen.name FROM Screen JOIN Theatre" },
              { id: 8, label: "Q8: SELECT customer.name, booking.id, booking.amount FROM Booking JOIN Customer" },
              { id: 9, label: "Q9: SELECT movie, theatre, showtime (3-Way JOIN)" },
              { id: 10, label: "Q10: SELECT seat_id, type FROM Seat LIMIT 100" },
              { id: 11, label: "Q11: SELECT COUNT(*) FROM Movie" },
              { id: 12, label: "Q12: SELECT AVG(ticket_price) FROM Show" },
              { id: 13, label: "Q13: SELECT show_id, COUNT(*) FROM Booking GROUP BY show_id" },
              { id: 14, label: "Q14: SELECT screen_id, total_seats FROM Screen" },
              { id: 15, label: "Q15: SELECT * FROM Movie WHERE language = 'Hindi'" },
              { id: 16, label: "Q16: SELECT * FROM Show WHERE ticket_price > 200" },
              { id: 17, label: "Q17: SELECT * FROM Customer WHERE name LIKE 'S%'" },
              { id: 20, label: "Q20: SELECT booking history with all details (FULL JOIN)" },
              { id: 23, label: "Q23: SELECT booking_id, customer.name, total_amount, booking_date FROM Booking JOIN Customer ON Booking.customer_id = Customer.customer_id" }
            ];

            const handleQuery = (idx) => {
              setQIndex(idx);
            };

            const qResult = executeDbQuery(queriesList[qIndex].id);
            const hdrs = qResult.length > 0 ? Object.keys(qResult[0]) : [];

            return (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                  <Database className="text-[#e50914]" size={32} />
                  <h2 className="text-4xl bebas text-white">Admin DB Sandbox</h2>
                </div>

                <div className="flex gap-4 mb-4">
                  {['queries', 'tables'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setSelectedTab(t)}
                      className={`px-4 py-2 uppercase text-sm font-bold tracking-wider rounded border transition-colors ${selectedTab === t ? 'border-[#e50914] bg-red-900/20 text-[#e50914]' : 'border-gray-800 text-gray-500 hover:bg-gray-800 hover:text-gray-300'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {selectedTab === 'queries' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="glass rounded-xl p-4 lg:col-span-1 border-gray-800 h-96 overflow-y-auto">
                      <h4 className="text-xs uppercase text-gray-500 font-bold mb-4 flex items-center gap-2 tracking-wider">
                         <SearchCode size={14}/> Test Queries
                      </h4>
                      <div className="space-y-1">
                        {queriesList.map((q, i) => (
                           <button 
                             key={q.id}
                             onClick={() => handleQuery(i)}
                             className={`w-full text-left p-3 text-xs font-mono rounded transition-colors truncate ${i === qIndex ? 'bg-red-900/30 text-red-400 border-l-2 border-red-500' : 'text-gray-400 hover:bg-gray-800/50'}`}
                           >
                             {q.label}
                           </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-[#050508] border border-gray-800 rounded-xl p-4 shadow-inner">
                         <div className="flex gap-2 items-center mb-2">
                            <span className="w-3 h-3 rounded-full bg-red-500/20 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-500/20 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></span>
                            <span className="w-3 h-3 rounded-full bg-green-500/20 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                            <span className="ml-4 text-[10px] text-gray-600 font-mono">SQL Terminal</span>
                         </div>
                         <code className="text-[#a277ff] text-sm font-mono block whitespace-pre-wrap leading-relaxed">
                            {queriesList[qIndex].label.split(': ')[1]}
                         </code>
                      </div>

                      <div className="glass rounded-xl overflow-hidden border border-gray-800 max-h-[500px] overflow-y-auto">
                        {qResult.length === 0 ? (
                          <div className="p-8 text-center text-gray-500">No results found.</div>
                        ) : (
                          <table className="w-full text-left text-xs font-mono">
                            <thead className="bg-[#12121a] text-gray-400 uppercase tracking-widest sticky top-0">
                               <tr>
                                  <th className="w-12 p-3 text-center border-b border-gray-800">#</th>
                                  {hdrs.map(h => <th key={h} className="p-3 border-b border-gray-800">{h}</th>)}
                               </tr>
                            </thead>
                            <tbody>
                               {qResult.map((row, i) => (
                                 <tr key={i} className="border-b border-gray-800/20 hover:bg-gray-800/30">
                                    <td className="p-3 text-center text-gray-600">{i+1}</td>
                                    {hdrs.map(h => <td key={h} className={`p-3 ${typeof row[h] === 'number' ? 'text-green-400' : 'text-blue-300'}`}>{JSON.stringify(row[h]).replace(/"/g, '')}</td>)}
                                 </tr>
                               ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                      <div className="text-right text-xs text-gray-500 font-mono">{qResult.length} rows returned</div>
                    </div>
                  </div>
                )}
                
                {selectedTab === 'tables' && (
                  <div className="glass p-8 text-center text-gray-500 h-64 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-700">
                    <Database size={48} className="mb-4 opacity-50"/>
                    <p>Raw table view. See queries tab for actual mock outputs required by task.</p>
                  </div>
                )}
              </div>
            );
          })()}

        </div>
      </main>

      {/* TOAST SYSTEM */}
      <div className="fixed bottom-6 right-6 space-y-3 z-50">
        {toasts.map(t => (
          <div key={t.id} className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg border text-sm font-medium fade-in min-w-[250px]
             ${t.type === 'error' ? 'bg-red-950/80 border-red-900 text-red-200 shadow-red-900/20' : 'bg-green-950/80 border-green-900 text-green-200 shadow-green-900/20'}`}>
            {t.type === 'success' ? <Check size={18} className="text-green-400"/> : <X size={18} className="text-red-400"/>}
            {t.msg}
          </div>
        ))}
      </div>

    </div>
  );
}
