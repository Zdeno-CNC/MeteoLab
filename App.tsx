import React, { useState } from 'react';
import { LayoutDashboard, FlaskConical, Info, Leaf, Menu, X, Github, GraduationCap, Share2, Link as LinkIcon } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { StudentZone } from './components/StudentZone';
import { ProjectDetails } from './components/ProjectDetails';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'research' | 'info'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'research': return <StudentZone />;
      case 'info': return <ProjectDetails />;
      default: return <Dashboard />;
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopyFeedback(true);
    setTimeout(() => setShowCopyFeedback(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-leaf-600 p-2 rounded-lg text-white">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="leading-tight">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">MeteoLab</h1>
                <p className="text-xs text-slate-500 font-medium hidden sm:block">SOŠ - Strojárstvo v praxi</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1 mr-4 border-r border-slate-200 pr-4">
                <NavButton 
                  active={activeTab === 'dashboard'} 
                  onClick={() => setActiveTab('dashboard')} 
                  icon={<LayoutDashboard className="w-4 h-4" />}
                  label="Meteo Stanica" 
                />
                <NavButton 
                  active={activeTab === 'research'} 
                  onClick={() => setActiveTab('research')} 
                  icon={<FlaskConical className="w-4 h-4" />}
                  label="Bádateľská Zóna" 
                />
                <NavButton 
                  active={activeTab === 'info'} 
                  onClick={() => setActiveTab('info')} 
                  icon={<Info className="w-4 h-4" />}
                  label="O Projekte" 
                />
              </div>
              
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-leaf-700 bg-leaf-50 hover:bg-leaf-100 transition relative group"
                title="Skopírovať odkaz na stránku"
              >
                {showCopyFeedback ? <LinkIcon className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span>{showCopyFeedback ? 'Skopírované!' : 'Zdieľať'}</span>
                
                {/* Tooltip feedback */}
                {showCopyFeedback && (
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap animate-fade-in z-50">
                    Odkaz v schránke
                  </div>
                )}
              </button>
            </div>

            <div className="flex items-center md:hidden gap-4">
              <button 
                onClick={handleShare}
                className="text-leaf-600 hover:text-leaf-700 p-2"
              >
                <Share2 className="w-6 h-6" />
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 hover:text-slate-900">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-lg">
            <MobileNavButton active={activeTab === 'dashboard'} onClick={() => {setActiveTab('dashboard'); setMobileMenuOpen(false)}} label="Meteo Stanica" />
            <MobileNavButton active={activeTab === 'research'} onClick={() => {setActiveTab('research'); setMobileMenuOpen(false)}} label="Bádateľská Zóna" />
            <MobileNavButton active={activeTab === 'info'} onClick={() => {setActiveTab('info'); setMobileMenuOpen(false)}} label="O Projekte" />
            <div className="border-t border-slate-100 pt-2 mt-2">
               <button 
                onClick={() => {handleShare(); setMobileMenuOpen(false)}}
                className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-leaf-700 flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Zdieľať stránku
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Header (Conditional) */}
      {activeTab === 'dashboard' && (
        <header className="bg-gradient-to-r from-leaf-900 to-leaf-700 text-white py-12 px-4 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-leaf-500/30 border border-leaf-400/30 text-leaf-50 text-xs font-bold uppercase tracking-wider mb-4">
                Projekt III.S & III.A
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Online monitorovanie <br/>školského skleníka
              </h2>
              <p className="text-leaf-100 text-lg md:text-xl max-w-2xl mb-6">
                Zber dát v reálnom čase pomocou Arduino IoT. Analýza vplyvu teploty, vlhkosti a svetla na rast rastlín.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveTab('info')}
                  className="bg-white text-leaf-900 hover:bg-leaf-50 px-6 py-2.5 rounded-lg font-semibold transition shadow-md"
                >
                  Viac o projekte
                </button>
                <div className="flex items-center gap-2 text-leaf-200 text-sm px-4 py-2 border border-leaf-500/50 rounded-lg bg-leaf-800/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Stanica Online
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-leaf-500" /> MeteoLab
            </h3>
            <p className="text-sm leading-relaxed">
              Bádateľský projekt integrujúci elektrotechniku, informatiku a ekológiu.
              Vytvorené pre študentov SOŠ.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Kontakt</h4>
            <div className="flex flex-col gap-2 text-sm">
              <span className="flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Ing. Zdeno Morávek</span>
              <span>Vedúci krúžku "MeteoLab"</span>
              <span>SOŠ - Mechanik strojov a zariadení</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Odkazy</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition"><Github className="w-5 h-5" /></a>
              <span className="text-xs border border-slate-700 px-2 py-1 rounded">Verzia 1.0.0 (Pilot)</span>
            </div>
            <p className="mt-4 text-xs text-slate-600">
              © 2025 MeteoLab. Všetky práva vyhradené.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const NavButton: React.FC<{ active: boolean, onClick: () => void, label: string, icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
      ${active ? 'bg-leaf-50 text-leaf-700 ring-1 ring-leaf-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}
    `}
  >
    {icon}
    {label}
  </button>
);

const MobileNavButton: React.FC<{ active: boolean, onClick: () => void, label: string }> = ({ active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium
      ${active ? 'bg-leaf-50 text-leaf-700' : 'text-slate-600'}
    `}
  >
    {label}
  </button>
);

export default App;