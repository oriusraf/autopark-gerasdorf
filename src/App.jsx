import React, { useState, useEffect } from 'react';
import {
  Search, MapPin, Phone, Mail, Clock, ChevronRight, ChevronLeft, Menu, X,
  Car, Calendar, Gauge, Fuel, Settings, Users, Award, Shield, CreditCard,
  Heart, Share2, Eye, Plus, Edit, Trash2, LogOut, LayoutDashboard, List,
  CheckCircle2, TrendingUp, Image as ImageIcon, Upload, Save, AlertCircle,
  Star, ArrowRight, ArrowUpRight, Facebook, Instagram, ChevronDown, Filter,
  Wrench, Banknote, Truck, Camera
} from 'lucide-react';

// ────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ────────────────────────────────────────────────────────────────────────────
const C = {
  bg: '#F8F6F1',
  surface: '#FFFFFF',
  ink: '#1A1D29',
  ink2: '#4A4E5C',
  ink3: '#8A8E9A',
  line: '#E8E4DC',
  line2: '#F0EDE5',
  red: '#C8102E',
  redDark: '#A00D26',
  gold: '#B8945F',
};

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Manrope:wght@300;400;500;600;700;800&display=swap');
  .font-display { font-family: 'Playfair Display', Georgia, serif; }
  .font-body { font-family: 'Manrope', system-ui, sans-serif; }
  body { background: ${C.bg}; }
  * { -webkit-font-smoothing: antialiased; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .anim-in { animation: fadeIn 0.5s ease-out both; }
  .anim-delay-1 { animation-delay: 0.1s; }
  .anim-delay-2 { animation-delay: 0.2s; }
  .anim-delay-3 { animation-delay: 0.3s; }
  .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
  .scrollbar-thin::-webkit-scrollbar-thumb { background: ${C.line}; border-radius: 3px; }
`;

// ────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ────────────────────────────────────────────────────────────────────────────
const SAMPLE_CARS = [
  {
    id: 1, folder: '1-skoda-octavia-rs', images: 1,
    brand: 'Škoda', model: 'Octavia RS 2,0 TSI Green tec',
    year: 2015, km: 152076, price: 12990,
    fuel: 'Benzin', transmission: 'Schaltgetriebe', power: 220,
    body: 'Limousine', color: '', doors: 5, seats: 5,
    features: ['Neues Pickerl', 'Gültiges Pickerl', 'Gewährleistung'],
    status: 'aktiv', featured: true, views: 0,
  },
  {
    id: 2, folder: '2-seat-leon-sport', images: 1,
    brand: 'Seat', model: 'Leon Sport 1,8 TSI',
    year: 2009, km: 140000, price: 3990,
    fuel: 'Benzin', transmission: 'Schaltgetriebe', power: 160,
    body: 'Schrägheck', color: '', doors: 5, seats: 5,
    features: ['Neues Pickerl', 'Gewährleistung', 'Finanzierung möglich'],
    status: 'aktiv', featured: false, views: 0,
  },
  {
    id: 3, folder: '3-bmw-520d-xdrive', images: 1,
    brand: 'BMW', model: '520d xDrive M Paket',
    year: 2018, km: 115000, price: 34990,
    fuel: 'Diesel', transmission: 'Automatik', power: 190,
    body: 'Limousine', color: '', doors: 4, seats: 5,
    features: ['Gültiges Pickerl', 'Gewährleistung', 'Garantie', 'M-Paket'],
    status: 'aktiv', featured: true, views: 0,
  },
  {
    id: 4, folder: '4-citroen-grand-c4-picasso', images: 1,
    brand: 'Citroën', model: 'Grand C4 Picasso BlueHDi 120 S&S EAT6 Seduction',
    year: 2015, km: 130583, price: 8490,
    fuel: 'Diesel', transmission: 'Automatik', power: 120,
    body: 'Van', color: '', doors: 5, seats: 7,
    features: ['Gültiges Pickerl', 'Gewährleistung'],
    status: 'aktiv', featured: true, views: 0,
  },
  {
    id: 5, folder: '5-audi-tt-coupe', images: 1,
    brand: 'Audi', model: 'TT Coupé 2,0 TFSI quattro S-tronic S-Line',
    year: 2011, km: 176552, price: 12990,
    fuel: 'Benzin', transmission: 'Automatik', power: 211,
    body: 'Coupé', color: '', doors: 3, seats: 4,
    features: ['Gültiges Pickerl', 'Gewährleistung', 'S-Line', 'quattro'],
    status: 'aktiv', featured: true, views: 0,
  },
  {
    id: 6, folder: '6-vw-polo-cool-family', images: 1,
    brand: 'VW', model: 'Polo Cool Family 1,2',
    year: 2006, km: 127000, price: 2990,
    fuel: 'Benzin', transmission: 'Schaltgetriebe', power: 54,
    body: 'Kleinwagen', color: '', doors: 5, seats: 5,
    features: ['Neues Pickerl', 'Gewährleistung'],
    status: 'aktiv', featured: false, views: 0,
  },
  {
    id: 7, folder: '7-vw-polo-limited', images: 1,
    brand: 'VW', model: 'Polo Limited 1,2',
    year: 2008, km: 79333, price: 3990,
    fuel: 'Benzin', transmission: 'Schaltgetriebe', power: 60,
    body: 'Kleinwagen', color: '', doors: 5, seats: 5,
    features: ['Neues Pickerl', 'Gewährleistung', 'Finanzierung möglich', '79.000 km'],
    status: 'aktiv', featured: false, views: 0,
  },
];

// ────────────────────────────────────────────────────────────────────────────
// LOGO + UTILITY COMPONENTS
// ────────────────────────────────────────────────────────────────────────────
const Logo = ({ size = 'md', dark = false }) => {
  const sizes = { sm: 32, md: 48, lg: 72 };
  const h = sizes[size];
  return (
    <div className="flex items-center" style={{ height: h }}>
      <img
        src="/logo.png"
        alt="Auto Park Gerasdorf"
        style={{
          height: h,
          width: 'auto',
          objectFit: 'contain',
          filter: dark ? 'brightness(0) invert(1)' : 'none',
        }}
      />
    </div>
  );
};

const CAR_PHOTO_EXTS = ['png', 'jpg', 'jpeg', 'webp'];

function useCarPhotos(folder, max = 15) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (!folder) { setPhotos([]); return; }
    let cancelled = false;
    const found = [];

    const probe = (i) => new Promise((resolve) => {
      let ei = 0;
      const tryNext = () => {
        if (ei >= CAR_PHOTO_EXTS.length) return resolve(null);
        const url = `/cars/${folder}/${i}.${CAR_PHOTO_EXTS[ei]}`;
        const img = new window.Image();
        img.onload = () => resolve(url);
        img.onerror = () => { ei++; tryNext(); };
        img.src = url;
      };
      tryNext();
    });

    (async () => {
      for (let i = 1; i <= max; i++) {
        const url = await probe(i);
        if (cancelled) return;
        if (!url) break;
        found.push(url);
        setPhotos([...found]);
      }
    })();

    return () => { cancelled = true; };
  }, [folder]);

  return photos;
}

const CarPhoto = ({ car, size = 'md', index = 1, className = '' }) => {
  const heights = { sm: 'h-32', md: 'h-56', lg: 'h-96', xl: 'h-[500px]' };
  const candidates = car.folder
    ? ['png', 'jpg', 'jpeg', 'webp'].map(ext => `/cars/${car.folder}/${index}.${ext}`)
    : [];
  const [tryIdx, setTryIdx] = useState(0);
  const failed = !candidates.length || tryIdx >= candidates.length;

  return (
    <div className={`relative overflow-hidden ${heights[size]} ${className}`}
         style={{ background: `linear-gradient(135deg, ${C.line2} 0%, ${C.line} 60%, #DDD7CB 100%)` }}>
      {!failed && (
        <img
          src={candidates[tryIdx]}
          alt={`${car.brand} ${car.model}`}
          onError={() => setTryIdx(i => i + 1)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {failed && (
        <>
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${C.ink} 0 1px, transparent 1px 14px)`
          }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <Car size={size === 'sm' ? 28 : size === 'md' ? 44 : 72} strokeWidth={1.2} style={{ color: C.ink3 }} />
            <div className="mt-2 font-display italic" style={{ color: C.ink2, fontSize: size === 'sm' ? 11 : 14 }}>
              {car.brand} {car.model.split(' ').slice(0, 2).join(' ')}
            </div>
            <div className="mt-1 text-[10px] tracking-[0.2em] uppercase" style={{ color: C.ink3 }}>
              Foto folgt
            </div>
          </div>
        </>
      )}
      {car.status === 'verkauft' && (
        <div className="absolute top-3 left-3 px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-bold text-white" style={{ background: C.ink }}>
          Verkauft
        </div>
      )}
      {car.status === 'reserviert' && (
        <div className="absolute top-3 left-3 px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-bold text-white" style={{ background: C.gold }}>
          Reserviert
        </div>
      )}
    </div>
  );
};

const fmtPrice = (n) => new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const fmtNum = (n) => new Intl.NumberFormat('de-AT').format(n);

// ────────────────────────────────────────────────────────────────────────────
// HEADER
// ────────────────────────────────────────────────────────────────────────────
const Header = ({ view, setView }) => {
  const nav = [
    { id: 'home', label: 'Startseite' },
    { id: 'listings', label: 'Fahrzeuge' },
    { id: 'about', label: 'Über uns' },
    { id: 'services', label: 'Leistungen' },
    { id: 'contact', label: 'Kontakt' },
  ];
  return (
    <>
      <div className="border-b text-[12px]" style={{ background: C.ink, color: '#D8D6D0', borderColor: 'transparent' }}>
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5"><Phone size={12} /><span>+43 660 123 45 67</span></div>
            <div className="hidden md:flex items-center gap-1.5"><Mail size={12} /><span>office@autopark-gerasdorf.at</span></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5"><MapPin size={12} /><span>Brünner Straße 71-73, 2201 Gerasdorf</span></div>
            <div className="flex items-center gap-2.5">
              <Facebook size={13} className="cursor-pointer hover:text-white" />
              <Instagram size={13} className="cursor-pointer hover:text-white" />
            </div>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-30 border-b backdrop-blur-md" style={{ borderColor: C.line, background: 'rgba(248,246,241,0.92)' }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => setView('home')} className="flex items-center">
            <Logo size="md" />
          </button>
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map(n => (
              <button key={n.id} onClick={() => setView(n.id)}
                      className="px-4 py-2 text-sm font-medium tracking-wide transition-colors relative"
                      style={{ color: view === n.id ? C.red : C.ink }}>
                {n.label}
                {view === n.id && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px]" style={{ background: C.red }} />}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setView('listings')}
                    className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: C.red }}>
              Fahrzeuge ansehen <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// FOOTER
// ────────────────────────────────────────────────────────────────────────────
const Footer = ({ setView }) => (
  <footer style={{ background: C.ink, color: '#B8BAC2' }}>
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
        <div>
          <div className="inline-flex bg-white px-3 py-2">
            <Logo size="md" />
          </div>
          <p className="mt-5 text-sm leading-relaxed max-w-xs">
            Ihr vertrauensvoller Partner für hochwertige Gebrauchtwagen in Gerasdorf bei Wien.
          </p>
          <div className="flex gap-3 mt-5">
            <a className="w-9 h-9 grid place-items-center border cursor-pointer hover:border-white transition-colors" style={{ borderColor: '#3A3D49' }}><Facebook size={15} /></a>
            <a className="w-9 h-9 grid place-items-center border cursor-pointer hover:border-white transition-colors" style={{ borderColor: '#3A3D49' }}><Instagram size={15} /></a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-display text-lg mb-4">Navigation</h4>
          <ul className="space-y-2.5 text-sm">
            {[['home','Startseite'],['listings','Fahrzeuge'],['about','Über uns'],['services','Leistungen'],['contact','Kontakt']].map(([id,l])=>(
              <li key={id}><button onClick={() => setView(id)} className="hover:text-white transition-colors">{l}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-display text-lg mb-4">Öffnungszeiten</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Mo – Do</span><span>09:00 – 18:00</span></li>
            <li className="flex justify-between"><span>Freitag</span><span>09:00 – 18:00</span></li>
            <li className="flex justify-between"><span>Samstag</span><span>09:00 – 18:00</span></li>
            <li className="flex justify-between" style={{ color: '#6A6D78' }}><span>Sonntag</span><span>Geschlossen</span></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-display text-lg mb-4">Kontakt</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="flex gap-2.5"><MapPin size={15} className="mt-0.5 flex-shrink-0" /><span>Brünner Straße 71-73 / Box 9<br />2201 Gerasdorf</span></li>
            <li className="flex gap-2.5"><Phone size={15} className="flex-shrink-0" /><span>+43 660 123 45 67</span></li>
            <li className="flex gap-2.5"><Mail size={15} className="flex-shrink-0" /><span>office@autopark-gerasdorf.at</span></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between gap-3 text-xs" style={{ borderColor: '#2A2D39' }}>
        <span>© 2026 Auto Park Gerasdorf · Inh. Danijel Pajkovic</span>
        <div className="flex gap-5">
          <a className="hover:text-white cursor-pointer">Impressum</a>
          <a className="hover:text-white cursor-pointer">Datenschutz</a>
          <a className="hover:text-white cursor-pointer">AGB</a>
        </div>
      </div>
    </div>
  </footer>
);

// ────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ────────────────────────────────────────────────────────────────────────────
const HomePage = ({ setView, openCar }) => {
  const featured = SAMPLE_CARS.filter(c => c.featured).slice(0, 4);
  const highlight = SAMPLE_CARS.find(c => c.id === 3) || SAMPLE_CARS[0];
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: C.bg }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, ${C.red} 0%, transparent 40%), radial-gradient(circle at 80% 70%, ${C.ink} 0%, transparent 50%)`
        }} />
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 anim-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border" style={{ borderColor: C.line, background: C.surface }}>
                <span className="w-2 h-2 rounded-full" style={{ background: C.red }} />
                <span className="text-xs tracking-[0.18em] uppercase font-semibold" style={{ color: C.ink2 }}>
                  Seit 2023 · Familiengeführt
                </span>
              </div>
              <h1 className="font-display text-5xl lg:text-7xl leading-[1.05] tracking-tight" style={{ color: C.ink }}>
                Ihr Fahrzeug.<br />
                <span className="italic" style={{ color: C.red }}>Mit Vertrauen</span> gewählt.
              </h1>
              <p className="mt-7 text-lg leading-relaxed max-w-xl" style={{ color: C.ink2 }}>
                Hochwertige Gebrauchtwagen, persönliche Beratung und faire Finanzierung – in Gerasdorf bei Wien. Sorgfältig geprüfte Fahrzeuge mit §57a-Pickerl und Gewährleistung.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <button onClick={() => setView('listings')}
                        className="px-7 py-4 text-sm font-semibold tracking-wide text-white inline-flex items-center gap-2 transition-all hover:gap-3"
                        style={{ background: C.ink }}>
                  Aktuelle Fahrzeuge entdecken <ArrowRight size={16} />
                </button>
                <button onClick={() => setView('contact')}
                        className="px-7 py-4 text-sm font-semibold tracking-wide inline-flex items-center gap-2 border-2"
                        style={{ borderColor: C.ink, color: C.ink }}>
                  Termin vereinbaren
                </button>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8 max-w-md">
                {[['2023','Familiengeführt seit'],['§57a','Pickerl neu inkl.']].map(([n,l],i)=>(
                  <div key={i}>
                    <div className="font-display text-3xl" style={{ color: C.ink }}>{n}</div>
                    <div className="text-xs mt-1 tracking-wide uppercase" style={{ color: C.ink3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 anim-in anim-delay-2">
              <div className="relative">
                <CarPhoto car={highlight} size="xl" className="shadow-2xl" />
                <div className="absolute -bottom-6 -left-6 bg-white p-5 shadow-xl border" style={{ borderColor: C.line }}>
                  <div className="text-xs tracking-[0.18em] uppercase mb-1" style={{ color: C.ink3 }}>Aktuelles Highlight</div>
                  <div className="font-display text-xl" style={{ color: C.ink }}>{highlight.brand} {highlight.model.split(' ').slice(0, 2).join(' ')}</div>
                  <div className="text-lg font-semibold mt-1" style={{ color: C.red }}>{fmtPrice(highlight.price)}</div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white px-4 py-3 shadow-xl border" style={{ borderColor: C.line }}>
                  <div className="flex items-center gap-2">
                    <Award size={18} style={{ color: C.gold }} />
                    <div className="text-xs font-semibold" style={{ color: C.ink }}>Geprüfter<br/>Händler</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SEARCH */}
      <section className="relative -mt-8 px-6 pb-16">
        <div className="max-w-6xl mx-auto bg-white p-8 shadow-xl border" style={{ borderColor: C.line }}>
          <div className="flex items-center gap-3 mb-5">
            <Search size={18} style={{ color: C.red }} />
            <h3 className="font-display text-xl" style={{ color: C.ink }}>Schnellsuche</h3>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { label: 'Marke', options: ['Alle Marken', 'BMW', 'Audi', 'VW', 'Mercedes'] },
              { label: 'Karosserie', options: ['Alle', 'Limousine', 'Kombi', 'SUV'] },
              { label: 'Preis bis', options: ['Beliebig', '15.000 €', '25.000 €', '40.000 €'] },
              { label: 'Baujahr ab', options: ['Beliebig', '2018', '2020', '2022'] },
            ].map((f,i) => (
              <div key={i}>
                <label className="text-[11px] tracking-[0.15em] uppercase font-semibold" style={{ color: C.ink3 }}>{f.label}</label>
                <select className="mt-1.5 w-full px-3 py-2.5 border text-sm bg-white" style={{ borderColor: C.line, color: C.ink }}>
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <button onClick={() => setView('listings')}
                    className="self-end px-5 py-2.5 text-sm font-semibold text-white flex items-center justify-center gap-2"
                    style={{ background: C.red }}>
              Suchen <Search size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED CARS */}
      <section className="py-20" style={{ background: C.surface }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-xs tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: C.red }}>Aktuelle Highlights</div>
              <h2 className="font-display text-4xl lg:text-5xl" style={{ color: C.ink }}>Empfohlene Fahrzeuge</h2>
            </div>
            <button onClick={() => setView('listings')} className="hidden md:flex items-center gap-2 text-sm font-semibold tracking-wide" style={{ color: C.ink }}>
              Alle ansehen <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((car, i) => (
              <CarCard key={car.id} car={car} onClick={() => openCar(car)} delay={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="py-20" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: C.red }}>Unsere Leistungen</div>
            <h2 className="font-display text-4xl lg:text-5xl" style={{ color: C.ink }}>Alles aus einer Hand</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Car, title: 'Gebrauchtwagen', text: 'Sorgfältig ausgewählte Fahrzeuge aller Marken und Klassen.' },
              { icon: Banknote, title: 'Finanzierung', text: 'Maßgeschneiderte Finanzierung – auch ohne Anzahlung möglich.' },
              { icon: Shield, title: 'Garantie-Pakete', text: '12 bis 36 Monate Garantie für Ihre Sicherheit.' },
              { icon: Truck, title: 'Lieferung Österreichweit', text: 'Bequem bis vor Ihre Haustür – egal wo Sie wohnen.' },
            ].map((s,i) => (
              <div key={i} className="bg-white p-7 border hover:shadow-lg transition-shadow group" style={{ borderColor: C.line }}>
                <div className="w-12 h-12 grid place-items-center mb-5" style={{ background: C.ink }}>
                  <s.icon size={20} className="text-white" />
                </div>
                <h3 className="font-display text-xl mb-2" style={{ color: C.ink }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.ink2 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / TRUST */}
      <section className="py-20" style={{ background: C.surface }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: C.red }}>Über uns</div>
              <h2 className="font-display text-4xl lg:text-5xl mb-6" style={{ color: C.ink }}>
                Persönlich. Ehrlich. <span className="italic">Verlässlich.</span>
              </h2>
              <p className="text-lg leading-relaxed mb-5" style={{ color: C.ink2 }}>
                Seit 2023 stehen wir für ein Versprechen: <strong style={{ color: C.ink }}>Qualität, die Sie spüren – und ein Service, der bleibt.</strong> Als familiengeführter Betrieb in Gerasdorf bei Wien kennen wir jedes unserer Fahrzeuge persönlich.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: C.ink2 }}>
                Kein anonymer Großhändler, sondern ein Ansprechpartner, der Sie auch nach dem Kauf nicht vergisst.
              </p>
              <div className="grid grid-cols-2 gap-5 mb-8">
                {[
                  ['Geprüfte Qualität', 'Jedes Fahrzeug technisch begutachtet'],
                  ['Faire Preise', 'Marktgerechte Bewertung & transparente Konditionen'],
                  ['Persönliche Beratung', 'Wir nehmen uns Zeit für Sie'],
                  ['Service nach dem Kauf', 'Wir sind weiter für Sie da'],
                ].map(([t,s],i)=>(
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 size={20} style={{ color: C.red }} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm" style={{ color: C.ink }}>{t}</div>
                      <div className="text-xs mt-0.5" style={{ color: C.ink2 }}>{s}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: C.line }}>
                <div className="w-14 h-14 rounded-full grid place-items-center font-display text-xl text-white" style={{ background: C.ink }}>DP</div>
                <div>
                  <div className="font-display text-lg" style={{ color: C.ink }}>Danijel Pajkovic</div>
                  <div className="text-xs tracking-wide uppercase" style={{ color: C.ink3 }}>Inhaber & Geschäftsführer</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] grid place-items-center" style={{ background: `linear-gradient(135deg, ${C.line2}, ${C.line})` }}>
                <div className="text-center">
                  <Users size={56} strokeWidth={1.2} style={{ color: C.ink3 }} />
                  <div className="mt-3 text-xs tracking-[0.2em] uppercase" style={{ color: C.ink3 }}>Team-Foto</div>
                </div>
              </div>
              <div className="absolute bottom-8 -left-8 bg-white p-6 shadow-xl border max-w-xs" style={{ borderColor: C.line }}>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_,i)=><Star key={i} size={14} fill={C.gold} stroke="none" />)}
                </div>
                <p className="text-sm italic leading-relaxed" style={{ color: C.ink2 }}>
                  „Ehrliche Beratung, faires Geschäft. Mein nächstes Auto kaufe ich wieder hier."
                </p>
                <div className="text-xs mt-3" style={{ color: C.ink3 }}>— Markus K., Wien</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-20" style={{ background: C.ink }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="text-xs tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: C.red }}>Besuchen Sie uns</div>
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-5">
            Persönlich. Vor Ort. <span className="italic" style={{ color: C.gold }}>In Gerasdorf.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: '#B8BAC2' }}>
            Wir freuen uns auf Ihren Besuch. Vereinbaren Sie gerne einen Termin – oder schauen Sie spontan vorbei.
          </p>
          <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              { icon: MapPin, t: 'Adresse', s: 'Brünner Straße 71-73\n2201 Gerasdorf' },
              { icon: Clock, t: 'Öffnungszeiten', s: 'Mo–Sa 09:00–18:00\nSonntag geschlossen' },
              { icon: Phone, t: 'Anruf & WhatsApp', s: '+43 660 123 45 67' },
            ].map((c,i)=>(
              <div key={i} className="p-6 border" style={{ borderColor: '#2A2D39' }}>
                <c.icon size={22} style={{ color: C.red }} className="mx-auto mb-3" />
                <div className="text-white font-semibold mb-2 text-sm tracking-wide">{c.t}</div>
                <div className="text-sm whitespace-pre-line" style={{ color: '#B8BAC2' }}>{c.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// CAR CARD
// ────────────────────────────────────────────────────────────────────────────
const CarCard = ({ car, onClick, delay = 0 }) => (
  <div onClick={onClick}
       className="group cursor-pointer bg-white border hover:shadow-2xl transition-all duration-300 anim-in"
       style={{ borderColor: C.line, animationDelay: `${delay * 0.08}s` }}>
    <div className="relative overflow-hidden">
      <CarPhoto car={car} size="md" className="group-hover:scale-105 transition-transform duration-700" />
      <button className="absolute top-3 right-3 w-9 h-9 grid place-items-center bg-white/90 backdrop-blur hover:bg-white">
        <Heart size={15} />
      </button>
    </div>
    <div className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] tracking-[0.15em] uppercase font-semibold" style={{ color: C.ink3 }}>{car.brand}</div>
          <h3 className="font-display text-lg mt-0.5 leading-tight truncate" style={{ color: C.ink }}>{car.model}</h3>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-3 text-xs" style={{ color: C.ink2 }}>
        <div className="flex items-center gap-1.5"><Calendar size={12} />{car.year}</div>
        <div className="flex items-center gap-1.5"><Gauge size={12} />{fmtNum(car.km)} km</div>
        <div className="flex items-center gap-1.5"><Fuel size={12} />{car.fuel}</div>
        <div className="flex items-center gap-1.5"><Settings size={12} />{car.transmission}</div>
      </div>
      <div className="mt-5 pt-4 border-t flex items-end justify-between" style={{ borderColor: C.line2 }}>
        <div>
          <div className="text-[10px] tracking-wider uppercase" style={{ color: C.ink3 }}>Preis</div>
          <div className="font-display text-2xl leading-none mt-1" style={{ color: C.red }}>{fmtPrice(car.price)}</div>
        </div>
        <div className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: C.ink }}>
          Details <ArrowRight size={13} />
        </div>
      </div>
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// LISTINGS PAGE
// ────────────────────────────────────────────────────────────────────────────
const ListingsPage = ({ openCar }) => {
  const [filters, setFilters] = useState({ brand: 'Alle', fuel: 'Alle', body: 'Alle', maxPrice: 50000 });
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(true);

  let cars = SAMPLE_CARS.filter(c => c.status !== 'verkauft');
  if (filters.brand !== 'Alle') cars = cars.filter(c => c.brand === filters.brand);
  if (filters.fuel !== 'Alle') cars = cars.filter(c => c.fuel === filters.fuel);
  if (filters.body !== 'Alle') cars = cars.filter(c => c.body === filters.body);
  cars = cars.filter(c => c.price <= filters.maxPrice);
  if (sort === 'price-asc') cars.sort((a,b)=>a.price-b.price);
  if (sort === 'price-desc') cars.sort((a,b)=>b.price-a.price);
  if (sort === 'km-asc') cars.sort((a,b)=>a.km-b.km);
  if (sort === 'newest') cars.sort((a,b)=>b.year-a.year);

  const brands = ['Alle', ...new Set(SAMPLE_CARS.map(c => c.brand))];
  const fuels = ['Alle', ...new Set(SAMPLE_CARS.map(c => c.fuel))];
  const bodies = ['Alle', ...new Set(SAMPLE_CARS.map(c => c.body))];

  return (
    <div style={{ background: C.bg }}>
      {/* Page header */}
      <div className="border-b" style={{ background: C.surface, borderColor: C.line }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-xs tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: C.red }}>Unser Bestand</div>
          <h1 className="font-display text-5xl" style={{ color: C.ink }}>Aktuelle Fahrzeuge</h1>
          <p className="mt-4 text-lg max-w-2xl" style={{ color: C.ink2 }}>
            {cars.length} Fahrzeuge geprüft und sofort verfügbar. Persönliche Besichtigung jederzeit nach Terminvereinbarung möglich.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* FILTERS */}
          <aside className="space-y-6">
            <div className="bg-white border p-6" style={{ borderColor: C.line }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg flex items-center gap-2" style={{ color: C.ink }}>
                  <Filter size={16} /> Filter
                </h3>
                <button onClick={() => setFilters({ brand: 'Alle', fuel: 'Alle', body: 'Alle', maxPrice: 50000 })}
                        className="text-xs underline" style={{ color: C.red }}>Zurücksetzen</button>
              </div>
              {[
                { key: 'brand', label: 'Marke', opts: brands },
                { key: 'body', label: 'Karosserie', opts: bodies },
                { key: 'fuel', label: 'Kraftstoff', opts: fuels },
              ].map(f => (
                <div key={f.key} className="mb-5">
                  <label className="text-[11px] tracking-[0.15em] uppercase font-semibold block mb-2" style={{ color: C.ink3 }}>{f.label}</label>
                  <div className="space-y-1.5">
                    {f.opts.map(o => (
                      <label key={o} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input type="radio" checked={filters[f.key] === o}
                               onChange={() => setFilters({ ...filters, [f.key]: o })}
                               style={{ accentColor: C.red }} />
                        <span style={{ color: C.ink2 }}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <label className="text-[11px] tracking-[0.15em] uppercase font-semibold block mb-2" style={{ color: C.ink3 }}>Preis bis {fmtPrice(filters.maxPrice)}</label>
                <input type="range" min="5000" max="50000" step="1000" value={filters.maxPrice}
                       onChange={e => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                       className="w-full" style={{ accentColor: C.red }} />
              </div>
            </div>
            <div className="bg-white border p-6" style={{ borderColor: C.line }}>
              <Award size={20} style={{ color: C.gold }} className="mb-2" />
              <h4 className="font-display text-lg mb-2" style={{ color: C.ink }}>Nicht gefunden?</h4>
              <p className="text-sm mb-4" style={{ color: C.ink2 }}>Wir suchen Ihr Wunschauto auf Anfrage – kostenfrei.</p>
              <button className="w-full py-2.5 text-sm font-semibold text-white" style={{ background: C.ink }}>Anfrage stellen</button>
            </div>
          </aside>

          {/* RESULTS */}
          <main>
            <div className="bg-white border p-4 mb-6 flex items-center justify-between flex-wrap gap-3" style={{ borderColor: C.line }}>
              <div className="text-sm" style={{ color: C.ink2 }}><strong style={{ color: C.ink }}>{cars.length}</strong> Fahrzeuge gefunden</div>
              <div className="flex items-center gap-2">
                <span className="text-xs tracking-wider uppercase" style={{ color: C.ink3 }}>Sortieren:</span>
                <select value={sort} onChange={e => setSort(e.target.value)} className="text-sm px-3 py-1.5 border" style={{ borderColor: C.line }}>
                  <option value="newest">Neueste zuerst</option>
                  <option value="price-asc">Preis aufsteigend</option>
                  <option value="price-desc">Preis absteigend</option>
                  <option value="km-asc">Kilometerstand</option>
                </select>
              </div>
            </div>
            {cars.length === 0 ? (
              <div className="bg-white border p-12 text-center" style={{ borderColor: C.line }}>
                <AlertCircle size={32} className="mx-auto mb-3" style={{ color: C.ink3 }} />
                <p style={{ color: C.ink2 }}>Keine Fahrzeuge mit diesen Filtern gefunden.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {cars.map((car, i) => <CarCard key={car.id} car={car} onClick={() => openCar(car)} delay={i} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// CAR DETAIL PAGE
// ────────────────────────────────────────────────────────────────────────────
const CarDetailPage = ({ car, setView, openCar }) => {
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = useCarPhotos(car.folder);
  const similar = SAMPLE_CARS.filter(c => c.id !== car.id && c.status === 'aktiv').slice(0, 3);

  useEffect(() => { setActivePhoto(0); }, [car.id]);
  const safeActive = activePhoto < photos.length ? activePhoto : 0;

  return (
    <div style={{ background: C.bg }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button onClick={() => setView('listings')} className="text-sm font-medium flex items-center gap-1.5 mb-6 hover:gap-2 transition-all" style={{ color: C.ink2 }}>
          <ChevronLeft size={16} /> Zurück zur Übersicht
        </button>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
          {/* GALLERY */}
          <div>
            {photos.length > 0 ? (
              <div className="relative border h-96 lg:h-[500px] bg-white" style={{ borderColor: C.line }}>
                <img
                  src={photos[safeActive]}
                  alt={`${car.brand} ${car.model}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {car.status === 'verkauft' && (
                  <div className="absolute top-3 left-3 px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-bold text-white" style={{ background: C.ink }}>
                    Verkauft
                  </div>
                )}
                {car.status === 'reserviert' && (
                  <div className="absolute top-3 left-3 px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-bold text-white" style={{ background: C.gold }}>
                    Reserviert
                  </div>
                )}
                {photos.length > 1 && (
                  <>
                    <button onClick={() => setActivePhoto((safeActive - 1 + photos.length) % photos.length)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center bg-white/90 hover:bg-white shadow border" style={{ borderColor: C.line, color: C.ink }}>
                      <ChevronLeft size={18} />
                    </button>
                    <button onClick={() => setActivePhoto((safeActive + 1) % photos.length)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center bg-white/90 hover:bg-white shadow border" style={{ borderColor: C.line, color: C.ink }}>
                      <ChevronRight size={18} />
                    </button>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 text-[11px] font-semibold bg-white/90 border" style={{ borderColor: C.line, color: C.ink }}>
                      {safeActive + 1} / {photos.length}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <CarPhoto car={car} size="lg" className="border" />
            )}
            {photos.length > 1 && (
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-8 gap-2 mt-3">
                {photos.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`relative aspect-[4/3] border-2 overflow-hidden ${safeActive === i ? '' : 'opacity-60 hover:opacity-100'} transition-opacity`}
                    style={{ borderColor: safeActive === i ? C.red : C.line }}
                  >
                    <img src={url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            <div className="bg-white border p-7" style={{ borderColor: C.line }}>
              <div className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: C.red }}>{car.brand} · {car.body}</div>
              <h1 className="font-display text-3xl mt-2 leading-tight" style={{ color: C.ink }}>{car.model}</h1>
              <div className="mt-5 pb-5 border-b" style={{ borderColor: C.line }}>
                <div className="text-xs tracking-wider uppercase" style={{ color: C.ink3 }}>Preis</div>
                <div className="font-display text-4xl mt-1" style={{ color: C.red }}>{fmtPrice(car.price)}</div>
                <div className="text-xs mt-1" style={{ color: C.ink3 }}>inkl. 20% MwSt. · ausweisbar</div>
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-5 text-sm">
                {[
                  ['Erstzulassung', `${car.year}`],
                  ['Kilometerstand', `${fmtNum(car.km)} km`],
                  ['Kraftstoff', car.fuel],
                  ['Getriebe', car.transmission],
                  ['Leistung', `${car.power} kW (${Math.round(car.power*1.36)} PS)`],
                  ['Karosserie', car.body],
                  ['Farbe', car.color],
                  ['Sitze/Türen', `${car.seats}/${car.doors}`],
                ].map(([l,v],i)=>(
                  <div key={i}>
                    <div className="text-xs" style={{ color: C.ink3 }}>{l}</div>
                    <div className="font-semibold" style={{ color: C.ink }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-7 space-y-2.5">
                <button className="w-full py-3.5 text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:gap-3" style={{ background: C.red }}>
                  <Phone size={16} /> Probefahrt vereinbaren
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-3 text-sm font-semibold flex items-center justify-center gap-1.5 border-2" style={{ borderColor: C.ink, color: C.ink }}>
                    <Mail size={14} /> Nachricht
                  </button>
                  <button className="py-3 text-sm font-semibold flex items-center justify-center gap-1.5 border-2" style={{ borderColor: C.ink, color: C.ink }}>
                    <Phone size={14} /> Anrufen
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border p-6 mt-4" style={{ borderColor: C.line }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full grid place-items-center font-display text-white" style={{ background: C.ink }}>DP</div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: C.ink }}>Danijel Pajkovic</div>
                  <div className="text-xs" style={{ color: C.ink3 }}>Ihr Ansprechpartner</div>
                </div>
              </div>
              <div className="text-xs space-y-1.5" style={{ color: C.ink2 }}>
                <div className="flex items-center gap-2"><Phone size={12} />+43 660 123 45 67</div>
                <div className="flex items-center gap-2"><Mail size={12} />office@autopark-gerasdorf.at</div>
                <div className="flex items-center gap-2"><MapPin size={12} />Brünner Straße 71-73, Gerasdorf</div>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION + FEATURES */}
        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          <div className="bg-white border p-7" style={{ borderColor: C.line }}>
            <h3 className="font-display text-2xl mb-4" style={{ color: C.ink }}>Beschreibung</h3>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: C.ink2 }}>
              <p>Willkommen bei Auto-Park-Gerasdorf! Wir freuen uns, Ihnen ein weiteres Top-Fahrzeug aus unserem Bestand vorstellen zu dürfen.</p>
              <p>Dieser <strong style={{ color: C.ink }}>{car.brand} {car.model}</strong> aus dem Baujahr {car.year} präsentiert sich in einem hervorragenden Zustand. Mit {fmtNum(car.km)} km und durchgehender Servicehistorie ist er bereit für seinen neuen Besitzer.</p>
              <p className="font-semibold pt-2" style={{ color: C.ink }}>Unsere Leistungen für Sie:</p>
              <ul className="space-y-1.5">
                {['Professionelle Innenraum-Aufbereitung inklusive','Finanzierung aller Art – auch ohne Anzahlung möglich','Garantie-Pakete wählbar (12 bis 36 Monate)','Österreichweite Auslieferung bequem bis vor Ihre Haustür','§57a Pickerl neu','Inzahlungnahme zu Top-Konditionen'].map((t,i)=>(
                  <li key={i} className="flex gap-2"><CheckCircle2 size={14} style={{ color: C.red }} className="mt-0.5 flex-shrink-0" /><span>{t}</span></li>
                ))}
              </ul>
              <p className="pt-2 text-xs italic" style={{ color: C.ink3 }}>Irrtümer, Zwischenverkauf und Eingabefehler vorbehalten.</p>
            </div>
          </div>
          <div className="bg-white border p-7" style={{ borderColor: C.line }}>
            <h3 className="font-display text-2xl mb-4" style={{ color: C.ink }}>Ausstattung</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {car.features.map((f,i)=>(
                <div key={i} className="flex items-center gap-2 text-sm" style={{ color: C.ink2 }}>
                  <CheckCircle2 size={14} style={{ color: C.red }} className="flex-shrink-0" />{f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIMILAR */}
        <div className="mt-16">
          <h3 className="font-display text-3xl mb-6" style={{ color: C.ink }}>Ähnliche Fahrzeuge</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {similar.map((c,i) => <CarCard key={c.id} car={c} onClick={() => openCar(c)} delay={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// ADMIN PANEL
// ────────────────────────────────────────────────────────────────────────────
const AdminPanel = ({ exitAdmin }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [section, setSection] = useState('dashboard');
  const [editingCar, setEditingCar] = useState(null);

  if (!loggedIn) {
    return (
      <div className="min-h-screen grid place-items-center px-6" style={{ background: C.ink }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, ${C.red} 0%, transparent 50%)`
        }} />
        <div className="relative bg-white shadow-2xl w-full max-w-md p-10 border" style={{ borderColor: C.line }}>
          <div className="flex flex-col items-center mb-8">
            <Logo size="md" />
            <div className="mt-3 text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: C.red }}>Händlerbereich</div>
          </div>
          <h2 className="font-display text-2xl mb-1" style={{ color: C.ink }}>Anmeldung</h2>
          <p className="text-sm mb-6" style={{ color: C.ink2 }}>Bitte melden Sie sich an, um Inserate zu verwalten.</p>
          <div className="space-y-3">
            <div>
              <label className="text-xs tracking-wide uppercase font-semibold" style={{ color: C.ink3 }}>E-Mail</label>
              <input className="w-full mt-1 px-3 py-2.5 border text-sm" style={{ borderColor: C.line }} defaultValue="danijel@autopark-gerasdorf.at" />
            </div>
            <div>
              <label className="text-xs tracking-wide uppercase font-semibold" style={{ color: C.ink3 }}>Passwort</label>
              <input type="password" className="w-full mt-1 px-3 py-2.5 border text-sm" style={{ borderColor: C.line }} defaultValue="••••••••••" />
            </div>
            <button onClick={() => setLoggedIn(true)} className="w-full py-3 text-sm font-semibold text-white mt-2" style={{ background: C.red }}>
              Anmelden
            </button>
            <button onClick={exitAdmin} className="w-full py-2 text-xs underline" style={{ color: C.ink3 }}>← Zurück zur Website</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: C.bg }}>
      {/* SIDEBAR */}
      <aside className="w-64 flex-shrink-0 flex flex-col" style={{ background: C.ink }}>
        <div className="p-4 border-b" style={{ borderColor: '#2A2D39' }}>
          <div className="bg-white px-3 py-2.5 flex items-center justify-center">
            <Logo size="sm" />
          </div>
          <div className="text-[10px] tracking-[0.2em] uppercase font-semibold mt-3 px-2" style={{ color: C.red }}>Admin-Panel</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'inventory', icon: List, label: 'Inserate' },
            { id: 'new', icon: Plus, label: 'Neues Inserat' },
            { id: 'inquiries', icon: Mail, label: 'Anfragen' },
            { id: 'settings', icon: Settings, label: 'Einstellungen' },
          ].map(item => (
            <button key={item.id} onClick={() => { setSection(item.id); setEditingCar(null); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors"
                    style={{ background: section === item.id ? C.red : 'transparent', color: '#D8D6D0' }}>
              <item.icon size={16} />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t" style={{ borderColor: '#2A2D39' }}>
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-full grid place-items-center text-white text-sm font-display" style={{ background: C.red }}>DP</div>
            <div className="text-xs">
              <div className="text-white font-semibold">Danijel Pajkovic</div>
              <div style={{ color: '#8A8E9A' }}>Inhaber</div>
            </div>
          </div>
          <button onClick={exitAdmin} className="w-full flex items-center justify-center gap-2 py-2 text-xs border" style={{ color: '#D8D6D0', borderColor: '#2A2D39' }}>
            <LogOut size={13} /> Zur Website
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-auto">
        <div className="px-10 py-8">
          {section === 'dashboard' && <AdminDashboard setSection={setSection} />}
          {section === 'inventory' && <AdminInventory setSection={setSection} setEditingCar={setEditingCar} />}
          {section === 'new' && <AdminCarForm car={null} setSection={setSection} />}
          {section === 'edit' && <AdminCarForm car={editingCar} setSection={setSection} />}
          {section === 'inquiries' && <AdminInquiries />}
          {section === 'settings' && <AdminSettings />}
        </div>
      </main>
    </div>
  );
};

const AdminDashboard = ({ setSection }) => (
  <div>
    <div className="flex items-end justify-between mb-8">
      <div>
        <h1 className="font-display text-3xl" style={{ color: C.ink }}>Willkommen zurück, Danijel</h1>
        <p className="text-sm mt-1" style={{ color: C.ink2 }}>Hier ist Ihre Übersicht für heute, 16. Mai 2026.</p>
      </div>
      <button onClick={() => setSection('new')} className="px-5 py-2.5 text-sm font-semibold text-white flex items-center gap-2" style={{ background: C.red }}>
        <Plus size={15} /> Neues Inserat
      </button>
    </div>

    <div className="grid md:grid-cols-4 gap-5 mb-8">
      {[
        { icon: Car, label: 'Aktive Inserate', value: '12', change: '+2 diese Woche', color: C.ink },
        { icon: Eye, label: 'Aufrufe (30 Tage)', value: '8.426', change: '+24%', color: C.red },
        { icon: Mail, label: 'Neue Anfragen', value: '17', change: '5 unbeantwortet', color: C.gold },
        { icon: TrendingUp, label: 'Verkäufe (Monat)', value: '4', change: '€ 112.300', color: '#2D7A3E' },
      ].map((s, i) => (
        <div key={i} className="bg-white border p-5" style={{ borderColor: C.line }}>
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 grid place-items-center" style={{ background: s.color }}>
              <s.icon size={18} className="text-white" />
            </div>
          </div>
          <div className="text-xs tracking-wide uppercase font-semibold" style={{ color: C.ink3 }}>{s.label}</div>
          <div className="font-display text-3xl mt-1" style={{ color: C.ink }}>{s.value}</div>
          <div className="text-xs mt-1" style={{ color: C.ink2 }}>{s.change}</div>
        </div>
      ))}
    </div>

    <div className="grid lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 bg-white border p-6" style={{ borderColor: C.line }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-xl" style={{ color: C.ink }}>Beliebteste Inserate</h3>
          <button onClick={() => setSection('inventory')} className="text-xs font-semibold" style={{ color: C.red }}>Alle ansehen →</button>
        </div>
        <div className="space-y-3">
          {SAMPLE_CARS.slice(0, 4).sort((a,b)=>b.views-a.views).map(car => (
            <div key={car.id} className="flex items-center gap-4 pb-3 border-b last:border-0" style={{ borderColor: C.line2 }}>
              <div className="w-16 h-12 flex-shrink-0">
                <CarPhoto car={car} size="sm" className="h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate" style={{ color: C.ink }}>{car.brand} {car.model}</div>
                <div className="text-xs" style={{ color: C.ink3 }}>{car.year} · {fmtNum(car.km)} km</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm" style={{ color: C.red }}>{fmtPrice(car.price)}</div>
                <div className="text-xs flex items-center gap-1 justify-end" style={{ color: C.ink3 }}>
                  <Eye size={11} /> {fmtNum(car.views)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border p-6" style={{ borderColor: C.line }}>
        <h3 className="font-display text-xl mb-5" style={{ color: C.ink }}>Letzte Anfragen</h3>
        <div className="space-y-4">
          {[
            { name: 'Stefan H.', car: 'VW Golf 8 GTI', time: 'vor 12 Min.', unread: true },
            { name: 'Maria L.', car: 'BMW 320d', time: 'vor 2 Std.', unread: true },
            { name: 'Thomas K.', car: 'Audi A4 Avant', time: 'gestern', unread: false },
            { name: 'Petra W.', car: 'Mercedes C 220 d', time: 'gestern', unread: false },
          ].map((inq, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-9 h-9 rounded-full flex-shrink-0 grid place-items-center text-white text-xs font-semibold" style={{ background: inq.unread ? C.red : C.ink3 }}>
                {inq.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm" style={{ color: C.ink }}>{inq.name}</span>
                  {inq.unread && <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.red }} />}
                </div>
                <div className="text-xs" style={{ color: C.ink2 }}>Interesse: {inq.car}</div>
                <div className="text-xs mt-0.5" style={{ color: C.ink3 }}>{inq.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AdminInventory = ({ setSection, setEditingCar }) => {
  const [filter, setFilter] = useState('alle');
  const filtered = filter === 'alle' ? SAMPLE_CARS : SAMPLE_CARS.filter(c => c.status === filter);

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl" style={{ color: C.ink }}>Inserate verwalten</h1>
          <p className="text-sm mt-1" style={{ color: C.ink2 }}>{SAMPLE_CARS.length} Fahrzeuge insgesamt im System</p>
        </div>
        <button onClick={() => setSection('new')} className="px-5 py-2.5 text-sm font-semibold text-white flex items-center gap-2" style={{ background: C.red }}>
          <Plus size={15} /> Neues Inserat
        </button>
      </div>

      <div className="bg-white border" style={{ borderColor: C.line }}>
        <div className="p-4 border-b flex flex-wrap items-center justify-between gap-3" style={{ borderColor: C.line }}>
          <div className="flex gap-1">
            {[['alle','Alle'],['aktiv','Aktiv'],['reserviert','Reserviert'],['verkauft','Verkauft']].map(([id,l]) => (
              <button key={id} onClick={() => setFilter(id)}
                      className="px-4 py-1.5 text-xs font-semibold tracking-wide"
                      style={{ background: filter === id ? C.ink : 'transparent', color: filter === id ? 'white' : C.ink2 }}>
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Search size={14} style={{ color: C.ink3 }} />
            <input placeholder="Suchen..." className="text-sm px-3 py-1.5 border" style={{ borderColor: C.line }} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[11px] tracking-[0.12em] uppercase font-semibold" style={{ background: C.line2, color: C.ink3 }}>
                <th className="px-4 py-3">Fahrzeug</th>
                <th className="px-4 py-3">Bj.</th>
                <th className="px-4 py-3">KM</th>
                <th className="px-4 py-3">Preis</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aufrufe</th>
                <th className="px-4 py-3 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(car => (
                <tr key={car.id} className="border-t text-sm hover:bg-gray-50" style={{ borderColor: C.line2 }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 flex-shrink-0"><CarPhoto car={car} size="sm" className="h-full" /></div>
                      <div>
                        <div className="font-semibold" style={{ color: C.ink }}>{car.brand} {car.model}</div>
                        <div className="text-xs" style={{ color: C.ink3 }}>ID: AP-{String(car.id).padStart(4,'0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: C.ink2 }}>{car.year}</td>
                  <td className="px-4 py-3" style={{ color: C.ink2 }}>{fmtNum(car.km)}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: C.ink }}>{fmtPrice(car.price)}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 text-[10px] tracking-wide uppercase font-bold" style={{
                      background: car.status === 'aktiv' ? '#E8F3EC' : car.status === 'reserviert' ? '#FFF6E5' : '#F5F5F5',
                      color: car.status === 'aktiv' ? '#2D7A3E' : car.status === 'reserviert' ? C.gold : C.ink3
                    }}>{car.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: C.ink2 }}>
                    <div className="flex items-center gap-1"><Eye size={12} />{fmtNum(car.views)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { setEditingCar(car); setSection('edit'); }} className="p-1.5 hover:bg-gray-100" title="Bearbeiten">
                        <Edit size={14} style={{ color: C.ink2 }} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100" title="Vorschau">
                        <Eye size={14} style={{ color: C.ink2 }} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100" title="Löschen">
                        <Trash2 size={14} style={{ color: C.red }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminCarForm = ({ car, setSection }) => {
  const isEdit = !!car;
  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <button onClick={() => setSection('inventory')} className="text-xs flex items-center gap-1 mb-2" style={{ color: C.ink2 }}>
            <ChevronLeft size={14} /> Zurück zur Übersicht
          </button>
          <h1 className="font-display text-3xl" style={{ color: C.ink }}>
            {isEdit ? `${car.brand} ${car.model} bearbeiten` : 'Neues Inserat erstellen'}
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 text-sm font-semibold border-2 flex items-center gap-2" style={{ borderColor: C.ink, color: C.ink }}>
            Als Entwurf speichern
          </button>
          <button onClick={() => setSection('inventory')} className="px-5 py-2.5 text-sm font-semibold text-white flex items-center gap-2" style={{ background: C.red }}>
            <Save size={15} /> {isEdit ? 'Änderungen speichern' : 'Inserat veröffentlichen'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          {/* PHOTOS */}
          <div className="bg-white border p-6" style={{ borderColor: C.line }}>
            <h3 className="font-display text-xl mb-1" style={{ color: C.ink }}>Fotos</h3>
            <p className="text-xs mb-4" style={{ color: C.ink3 }}>Bis zu 30 Fotos · Erste Aufnahme erscheint als Titelbild</p>
            <div className="grid grid-cols-5 gap-3">
              <button className="aspect-[4/3] border-2 border-dashed grid place-items-center hover:bg-gray-50" style={{ borderColor: C.line }}>
                <div className="text-center">
                  <Upload size={20} className="mx-auto mb-1" style={{ color: C.ink3 }} />
                  <div className="text-xs" style={{ color: C.ink2 }}>Hochladen</div>
                </div>
              </button>
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-[4/3] relative group">
                  {isEdit ? <CarPhoto car={car} size="sm" className="h-full" /> : (
                    <div className="h-full grid place-items-center" style={{ background: C.line2 }}>
                      <ImageIcon size={20} style={{ color: C.ink3 }} />
                    </div>
                  )}
                  <button className="absolute top-1 right-1 w-6 h-6 bg-white/90 grid place-items-center opacity-0 group-hover:opacity-100">
                    <X size={12} />
                  </button>
                  {i === 1 && <div className="absolute bottom-1 left-1 px-1.5 py-0.5 text-[9px] font-bold text-white tracking-wide" style={{ background: C.red }}>HAUPTBILD</div>}
                </div>
              ))}
            </div>
          </div>

          {/* GRUNDDATEN */}
          <div className="bg-white border p-6" style={{ borderColor: C.line }}>
            <h3 className="font-display text-xl mb-4" style={{ color: C.ink }}>Fahrzeugdaten</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Marke" defaultValue={car?.brand || ''} placeholder="z. B. BMW" />
              <Field label="Modell" defaultValue={car?.model || ''} placeholder="z. B. 320d xDrive M-Sport" />
              <Field label="Erstzulassung" type="month" defaultValue="" />
              <Field label="Kilometerstand" defaultValue={car?.km || ''} placeholder="z. B. 68500" suffix="km" />
              <Field label="Leistung (kW)" defaultValue={car?.power || ''} suffix="kW" />
              <Field label="Hubraum" placeholder="z. B. 1995" suffix="cm³" />
              <Select label="Kraftstoff" options={['Benzin','Diesel','Elektro','Hybrid','Plug-in-Hybrid','LPG','CNG']} defaultValue={car?.fuel} />
              <Select label="Getriebe" options={['Manuell','Automatik','DSG','Halbautomatik']} defaultValue={car?.transmission} />
              <Select label="Karosserie" options={['Limousine','Kombi','SUV','Schrägheck','Cabrio','Coupé','Van','Pickup']} defaultValue={car?.body} />
              <Field label="Farbe" defaultValue={car?.color || ''} placeholder="z. B. Mineralgrau" />
              <Field label="Türen" defaultValue={car?.doors || ''} />
              <Field label="Sitze" defaultValue={car?.seats || ''} />
            </div>
          </div>

          {/* AUSSTATTUNG */}
          <div className="bg-white border p-6" style={{ borderColor: C.line }}>
            <h3 className="font-display text-xl mb-1" style={{ color: C.ink }}>Ausstattung</h3>
            <p className="text-xs mb-4" style={{ color: C.ink3 }}>Wählen Sie alle zutreffenden Optionen</p>
            <div className="grid sm:grid-cols-3 gap-2">
              {['Navigationssystem','LED-Scheinwerfer','Ledersitze','Sitzheizung','Tempomat','PDC vorne','PDC hinten','Rückfahrkamera','Klimaautomatik','Apple CarPlay','Android Auto','Bluetooth','Panoramadach','Anhängerkupplung','Standheizung','Alarmanlage','Allwetterreifen','Sportsitze','Spurhalteassistent','Totwinkelwarner','Head-up-Display'].map(f => (
                <label key={f} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" defaultChecked={car?.features?.includes(f)} style={{ accentColor: C.red }} />
                  <span style={{ color: C.ink2 }}>{f}</span>
                </label>
              ))}
            </div>
          </div>

          {/* BESCHREIBUNG */}
          <div className="bg-white border p-6" style={{ borderColor: C.line }}>
            <h3 className="font-display text-xl mb-4" style={{ color: C.ink }}>Beschreibung</h3>
            <textarea rows={6} className="w-full px-3 py-2.5 border text-sm" style={{ borderColor: C.line }}
                      defaultValue="Willkommen bei Auto-Park-Gerasdorf! Wir freuen uns, Ihnen ein weiteres Top-Fahrzeug aus unserem Bestand vorstellen zu dürfen..." />
            <div className="text-xs mt-2" style={{ color: C.ink3 }}>Tipp: Eine ausführliche Beschreibung erhöht die Anzahl der Anfragen um bis zu 40%.</div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-5">
          <div className="bg-white border p-5" style={{ borderColor: C.line }}>
            <h4 className="font-display text-lg mb-4" style={{ color: C.ink }}>Preis & Status</h4>
            <Field label="Preis (€)" defaultValue={car?.price || ''} placeholder="z. B. 32900" suffix="€" />
            <div className="mt-3 space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked style={{ accentColor: C.red }} />
                <span style={{ color: C.ink2 }}>MwSt. ausweisbar</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" style={{ accentColor: C.red }} />
                <span style={{ color: C.ink2 }}>Verhandelbar</span>
              </label>
            </div>
            <div className="mt-4">
              <Select label="Status" options={['aktiv','reserviert','verkauft','entwurf']} defaultValue={car?.status || 'aktiv'} />
            </div>
            <div className="mt-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked={car?.featured} style={{ accentColor: C.red }} />
                <span className="font-semibold" style={{ color: C.ink }}>Auf Startseite hervorheben</span>
              </label>
            </div>
          </div>

          <div className="bg-white border p-5" style={{ borderColor: C.line }}>
            <h4 className="font-display text-lg mb-4" style={{ color: C.ink }}>Veröffentlichung</h4>
            <div className="space-y-2">
              {[['Website autopark-gerasdorf.at', true],['willhaben.at', true],['AutoScout24', false],['Facebook Marketplace', false]].map(([l, on], i) => (
                <label key={i} className="flex items-center justify-between text-sm">
                  <span style={{ color: C.ink2 }}>{l}</span>
                  <input type="checkbox" defaultChecked={on} style={{ accentColor: C.red }} />
                </label>
              ))}
            </div>
            <div className="text-xs mt-4 pt-3 border-t" style={{ borderColor: C.line2, color: C.ink3 }}>
              Synchronisierung erfolgt automatisch alle 15 Minuten.
            </div>
          </div>

          <div className="bg-white border p-5" style={{ borderColor: C.line }}>
            <h4 className="font-display text-lg mb-3" style={{ color: C.ink }}>SEO & Sichtbarkeit</h4>
            <Field label="URL-Slug" defaultValue={car ? `${car.brand}-${car.model}`.toLowerCase().replace(/\s+/g,'-') : ''} />
            <div className="text-xs mt-3" style={{ color: C.ink3 }}>
              Vorschau in Suchergebnissen:<br />
              <span className="font-medium" style={{ color: '#1a73e8' }}>{car ? `${car.brand} ${car.model}` : 'Neues Inserat'} | Auto Park Gerasdorf</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, defaultValue = '', placeholder = '', suffix, type = 'text' }) => (
  <div>
    <label className="text-[11px] tracking-[0.12em] uppercase font-semibold block mb-1.5" style={{ color: C.ink3 }}>{label}</label>
    <div className="relative">
      <input type={type} defaultValue={defaultValue} placeholder={placeholder}
             className={`w-full px-3 py-2 border text-sm ${suffix ? 'pr-12' : ''}`}
             style={{ borderColor: C.line }} />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: C.ink3 }}>{suffix}</span>}
    </div>
  </div>
);

const Select = ({ label, options, defaultValue }) => (
  <div>
    <label className="text-[11px] tracking-[0.12em] uppercase font-semibold block mb-1.5" style={{ color: C.ink3 }}>{label}</label>
    <select defaultValue={defaultValue} className="w-full px-3 py-2 border text-sm bg-white" style={{ borderColor: C.line }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

const AdminInquiries = () => (
  <div>
    <h1 className="font-display text-3xl mb-1" style={{ color: C.ink }}>Anfragen</h1>
    <p className="text-sm mb-8" style={{ color: C.ink2 }}>17 Anfragen · 5 unbeantwortet</p>
    <div className="bg-white border" style={{ borderColor: C.line }}>
      {[
        { name: 'Stefan Huber', email: 's.huber@example.at', phone: '+43 660 ...', car: 'VW Golf 8 GTI', msg: 'Hallo, ist das Fahrzeug noch verfügbar? Wäre an einer Probefahrt am Samstag interessiert.', time: 'vor 12 Min.', unread: true },
        { name: 'Maria Leitner', email: 'maria.l@example.at', phone: '+43 699 ...', car: 'BMW 320d xDrive', msg: 'Können Sie mir noch Bilder vom Innenraum zukommen lassen? Vor allem von den Sitzen.', time: 'vor 2 Std.', unread: true },
        { name: 'Thomas Krieger', email: 't.krieger@example.at', phone: '+43 676 ...', car: 'Audi A4 Avant', msg: 'Wäre eine Finanzierung über 60 Monate möglich? Anzahlung wären 5.000 €.', time: 'gestern, 16:42', unread: false },
        { name: 'Petra Weber', email: 'pweber@example.at', phone: '+43 664 ...', car: 'Mercedes C 220 d', msg: 'Würde mein Auto in Zahlung geben (Skoda Octavia 2017). Können wir einen Termin ausmachen?', time: 'gestern, 11:30', unread: false },
      ].map((inq, i) => (
        <div key={i} className="p-5 border-b last:border-0" style={{ borderColor: C.line2 }}>
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full flex-shrink-0 grid place-items-center text-white font-semibold" style={{ background: inq.unread ? C.red : C.ink3 }}>
              {inq.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3 mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold" style={{ color: C.ink }}>{inq.name}</span>
                  {inq.unread && <span className="px-2 py-0.5 text-[10px] tracking-wide uppercase font-bold text-white" style={{ background: C.red }}>Neu</span>}
                </div>
                <span className="text-xs" style={{ color: C.ink3 }}>{inq.time}</span>
              </div>
              <div className="text-xs mb-2" style={{ color: C.ink3 }}>
                <span>{inq.email}</span> · <span>{inq.phone}</span> · <span>Fahrzeug: <strong style={{ color: C.ink2 }}>{inq.car}</strong></span>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: C.ink2 }}>{inq.msg}</p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-semibold text-white" style={{ background: C.red }}>Antworten</button>
                <button className="px-3 py-1.5 text-xs font-semibold border" style={{ borderColor: C.line, color: C.ink2 }}>Als gelesen markieren</button>
                <button className="px-3 py-1.5 text-xs font-semibold border" style={{ borderColor: C.line, color: C.ink2 }}>Probefahrt-Termin</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AdminSettings = () => (
  <div className="max-w-3xl">
    <h1 className="font-display text-3xl mb-1" style={{ color: C.ink }}>Einstellungen</h1>
    <p className="text-sm mb-8" style={{ color: C.ink2 }}>Verwalten Sie Ihre Händler- und Kontaktdaten</p>
    <div className="space-y-5">
      <div className="bg-white border p-6" style={{ borderColor: C.line }}>
        <h3 className="font-display text-xl mb-4" style={{ color: C.ink }}>Unternehmensdaten</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Firmenname" defaultValue="Auto Park Gerasdorf" />
          <Field label="Inhaber" defaultValue="Danijel Pajkovic" />
          <Field label="Straße & Hausnummer" defaultValue="Brünner Straße 71-73 / Box 9" />
          <Field label="PLZ & Ort" defaultValue="2201 Gerasdorf" />
          <Field label="Telefon" defaultValue="+43 660 123 45 67" />
          <Field label="E-Mail (geschäftlich)" defaultValue="office@autopark-gerasdorf.at" />
        </div>
      </div>
      <div className="bg-white border p-6" style={{ borderColor: C.line }}>
        <h3 className="font-display text-xl mb-4" style={{ color: C.ink }}>Öffnungszeiten</h3>
        <div className="space-y-2">
          {[['Montag','09:00 – 15:00 | 16:00 – 18:00'],['Dienstag','09:00 – 15:00 | 16:00 – 18:00'],['Mittwoch','09:00 – 15:00 | 16:00 – 18:00'],['Donnerstag','09:00 – 15:00 | 16:00 – 18:00'],['Freitag','09:00 – 12:30 | 13:30 – 18:00'],['Samstag','09:00 – 18:00'],['Sonntag','Geschlossen']].map(([d, h]) => (
            <div key={d} className="flex items-center gap-4">
              <span className="w-28 text-sm font-semibold" style={{ color: C.ink }}>{d}</span>
              <input defaultValue={h} className="flex-1 px-3 py-2 border text-sm" style={{ borderColor: C.line }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// CONTACT / ABOUT / SERVICES (lightweight)
// ────────────────────────────────────────────────────────────────────────────
const ContactPage = () => (
  <div style={{ background: C.bg }}>
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-xs tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: C.red }}>Kontakt</div>
      <h1 className="font-display text-5xl mb-3" style={{ color: C.ink }}>Wir freuen uns auf Sie</h1>
      <p className="text-lg max-w-2xl mb-12" style={{ color: C.ink2 }}>
        Persönlich vor Ort, am Telefon oder per E-Mail – wir sind für Sie da.
      </p>
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8">
        <div className="space-y-5">
          <div className="bg-white border p-6" style={{ borderColor: C.line }}>
            <h3 className="font-display text-xl mb-4" style={{ color: C.ink }}>Kontaktdaten</h3>
            <div className="space-y-4">
              <div className="flex gap-3"><MapPin size={18} style={{ color: C.red }} className="mt-0.5" />
                <div><div className="font-semibold text-sm" style={{ color: C.ink }}>Adresse</div><div className="text-sm" style={{ color: C.ink2 }}>Brünner Straße 71-73 / Box 9<br />2201 Gerasdorf</div></div></div>
              <div className="flex gap-3"><Phone size={18} style={{ color: C.red }} className="mt-0.5" />
                <div><div className="font-semibold text-sm" style={{ color: C.ink }}>Telefon</div><div className="text-sm" style={{ color: C.ink2 }}>+43 660 123 45 67</div></div></div>
              <div className="flex gap-3"><Mail size={18} style={{ color: C.red }} className="mt-0.5" />
                <div><div className="font-semibold text-sm" style={{ color: C.ink }}>E-Mail</div><div className="text-sm" style={{ color: C.ink2 }}>office@autopark-gerasdorf.at</div></div></div>
            </div>
          </div>
          <div className="bg-white border p-6" style={{ borderColor: C.line }}>
            <h3 className="font-display text-xl mb-4" style={{ color: C.ink }}>Öffnungszeiten</h3>
            <div className="space-y-2 text-sm">
              {[['Mo','09:00 – 15:00  ·  16:00 – 18:00'],['Di','09:00 – 15:00  ·  16:00 – 18:00'],['Mi','09:00 – 15:00  ·  16:00 – 18:00'],['Do','09:00 – 15:00  ·  16:00 – 18:00'],['Fr','09:00 – 12:30  ·  13:30 – 18:00'],['Sa','09:00 – 18:00 (durchgehend)']].map(([d,h])=>(
                <div key={d} className="flex justify-between py-1.5 border-b" style={{ borderColor: C.line2 }}>
                  <span className="font-semibold" style={{ color: C.ink }}>{d}</span><span style={{ color: C.ink2 }}>{h}</span>
                </div>
              ))}
              <div className="flex justify-between py-1.5"><span className="font-semibold" style={{ color: C.ink3 }}>So</span><span style={{ color: C.ink3 }}>Geschlossen</span></div>
            </div>
          </div>
        </div>
        <div>
          <div className="aspect-[4/3] border relative overflow-hidden" style={{ borderColor: C.line, background: '#E6E2D8' }}>
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent 0 40px, ${C.ink3}40 40px 41px), repeating-linear-gradient(0deg, transparent 0 40px, ${C.ink3}40 40px 41px)`
            }} />
            <div className="absolute inset-0 grid place-items-center">
              <div className="bg-white px-5 py-4 shadow-lg border" style={{ borderColor: C.line }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ background: C.red }} />
                  <strong className="text-sm" style={{ color: C.ink }}>Auto Park Gerasdorf</strong>
                </div>
                <div className="text-xs" style={{ color: C.ink2 }}>Brünner Straße 71-73, 2201 Gerasdorf</div>
              </div>
            </div>
          </div>
          <div className="bg-white border p-6 mt-5" style={{ borderColor: C.line }}>
            <h3 className="font-display text-xl mb-4" style={{ color: C.ink }}>Nachricht senden</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Name" />
              <Field label="Telefon" />
            </div>
            <div className="mt-3"><Field label="E-Mail" /></div>
            <div className="mt-3">
              <label className="text-[11px] tracking-[0.12em] uppercase font-semibold block mb-1.5" style={{ color: C.ink3 }}>Nachricht</label>
              <textarea rows={4} className="w-full px-3 py-2 border text-sm" style={{ borderColor: C.line }} />
            </div>
            <button className="mt-4 px-5 py-2.5 text-sm font-semibold text-white" style={{ background: C.red }}>Absenden</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ServicesPage = () => (
  <div style={{ background: C.bg }}>
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-xs tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: C.red }}>Leistungen</div>
      <h1 className="font-display text-5xl mb-12" style={{ color: C.ink }}>Was wir für Sie tun</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { icon: Car, t: 'Gebrauchtwagenverkauf', d: 'Geprüfte Fahrzeuge mit Servicehistorie. §57a-Pickerl inklusive.' },
          { icon: Truck, t: 'Nutzfahrzeugverkauf', d: 'Transporter und Kleintransporter für Gewerbe und Selbständige.' },
          { icon: Camera, t: 'Innenraum-Aufbereitung', d: 'Polsterreinigung, Lederpflege und Tiefenreinigung des Innenraums – Ihr Auto fühlt sich an wie neu.' },
          { icon: Wrench, t: 'Außen-Aufbereitung', d: 'Lackpolitur, Felgenreinigung und Versiegelung. Sichtbar gepflegtes Ergebnis.' },
          { icon: Banknote, t: 'Finanzierung', d: 'Maßgeschneiderte Finanzierungen – auch ohne Anzahlung möglich.' },
          { icon: CreditCard, t: 'Zahlung & Abwicklung', d: 'Bar, Kartenzahlung oder Banküberweisung – wie es Ihnen am liebsten ist.' },
          { icon: Shield, t: 'Garantie-Pakete', d: '12 bis 36 Monate Garantie – wählbar nach Fahrzeug und Wunsch.' },
        ].map((s,i)=>(
          <div key={i} className="bg-white border p-7 flex gap-5" style={{ borderColor: C.line }}>
            <div className="w-12 h-12 grid place-items-center flex-shrink-0" style={{ background: C.ink }}>
              <s.icon size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-display text-xl mb-2" style={{ color: C.ink }}>{s.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.ink2 }}>{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div style={{ background: C.bg }}>
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-xs tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: C.red }}>Über uns</div>
      <h1 className="font-display text-5xl mb-8" style={{ color: C.ink }}>Eine Geschichte aus Gerasdorf</h1>
      <div className="space-y-5 text-lg leading-relaxed" style={{ color: C.ink2 }}>
        <p>Wer ein Auto kauft, kauft mehr als ein Fahrzeug. Er kauft ein Stück Vertrauen – in das Auto, in den Verkäufer, in das, was nach dem Handschlag kommt.</p>
        <p><strong style={{ color: C.ink }}>Auto Park Gerasdorf</strong> wurde mit genau diesem Gedanken gegründet: ein Autohändler, bei dem das Gespräch nicht endet, wenn der Schlüssel übergeben wird.</p>
        <p>Schon kurz nach der Gründung im Mai 2023 kannten unsere Stammkunden Danijel Pajkovic, den Inhaber, beim Namen. Sie kommen wieder, weil sie wissen: hier wird nicht verkauft, hier wird beraten.</p>
        <p>Unsere Fahrzeuge wählen wir mit Bedacht. Jedes wird begutachtet, gepflegt, und nur dann zum Verkauf freigegeben, wenn es unseren eigenen Maßstäben standhält. Was wir nicht selbst fahren würden, verkaufen wir auch nicht.</p>
      </div>
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {[['Mai 2023','Gegründet'],['§57a','Pickerl neu inklusive']].map(([n,l],i)=>(
          <div key={i} className="bg-white border p-6 text-center" style={{ borderColor: C.line }}>
            <div className="font-display text-4xl" style={{ color: C.red }}>{n}</div>
            <div className="text-sm mt-2 tracking-wide uppercase" style={{ color: C.ink2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// DEMO SWITCHER
// ────────────────────────────────────────────────────────────────────────────
const DemoSwitcher = ({ view, setView, isAdmin, setIsAdmin }) => {
  const views = [
    { id: 'home', label: 'Startseite' },
    { id: 'listings', label: 'Fahrzeuge' },
    { id: 'detail', label: 'Detail' },
    { id: 'about', label: 'Über uns' },
    { id: 'services', label: 'Leistungen' },
    { id: 'contact', label: 'Kontakt' },
  ];
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-white shadow-2xl border flex items-center gap-1 p-1.5 max-w-[95vw] overflow-x-auto scrollbar-thin" style={{ borderColor: C.line }}>
      <div className="px-2.5 text-[10px] tracking-[0.2em] uppercase font-bold whitespace-nowrap" style={{ color: C.red }}>Demo-Ansichten</div>
      <div className="w-px h-5" style={{ background: C.line }} />
      {!isAdmin && views.map(v => (
        <button key={v.id} onClick={() => setView(v.id)}
                className="px-3 py-1.5 text-xs font-semibold tracking-wide whitespace-nowrap transition-colors"
                style={{ background: view === v.id ? C.ink : 'transparent', color: view === v.id ? 'white' : C.ink2 }}>
          {v.label}
        </button>
      ))}
      <div className="w-px h-5" style={{ background: C.line }} />
      <button onClick={() => setIsAdmin(!isAdmin)}
              className="px-3 py-1.5 text-xs font-semibold tracking-wide flex items-center gap-1.5 whitespace-nowrap"
              style={{ background: isAdmin ? C.red : C.line2, color: isAdmin ? 'white' : C.ink }}>
        <LayoutDashboard size={12} /> {isAdmin ? 'Admin-Panel ✓' : 'Admin-Panel'}
      </button>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// APP
// ────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState('home');
  const [selectedCar, setSelectedCar] = useState(SAMPLE_CARS[2]);
  const [isAdmin, setIsAdmin] = useState(false);

  const openCar = (car) => { setSelectedCar(car); setView('detail'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [view, isAdmin]);

  return (
    <div className="font-body" style={{ background: C.bg, color: C.ink, minHeight: '100vh' }}>
      <style>{fontStyles}</style>

      {isAdmin ? (
        <AdminPanel exitAdmin={() => setIsAdmin(false)} />
      ) : (
        <>
          <Header view={view} setView={setView} />
          {view === 'home' && <HomePage setView={setView} openCar={openCar} />}
          {view === 'listings' && <ListingsPage openCar={openCar} />}
          {view === 'detail' && <CarDetailPage car={selectedCar} setView={setView} openCar={openCar} />}
          {view === 'about' && <AboutPage />}
          {view === 'services' && <ServicesPage />}
          {view === 'contact' && <ContactPage />}
          <Footer setView={setView} />
        </>
      )}

      <DemoSwitcher view={view} setView={setView} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
    </div>
  );
}
