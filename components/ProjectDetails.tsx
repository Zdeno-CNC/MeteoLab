import React from 'react';
import { Calendar, Target, BookOpen, ShieldCheck, Cpu, Sprout } from 'lucide-react';
import { ProjectPhase } from '../types';

const timeline: ProjectPhase[] = [
  { date: 'Okt 2025', title: 'Pilotná fáza', description: 'Úvodná motivácia, SWOT analýza, tvorba hypotéz, workshop BOZP.', completed: true },
  { date: 'Nov 2025', title: 'Hardvér & Softvér', description: 'Zostavenie Arduino stanice, programovanie senzorov, testovanie v dielni.', completed: true },
  { date: 'Jan 2026', title: 'Inštalácia', description: 'Umiestnenie do skleníka, začiatok zberu dát, výsadba plodín.', completed: false },
  { date: 'Máj 2026', title: 'Vegetačné obdobie', description: 'Intenzívne pozorovanie, korelácia rastu s dátami, úprava hypotéz.', completed: false },
  { date: 'Sep 2026', title: 'Analýza & Záver', description: 'Vyhodnotenie grafov, reflexia, video-dokumentácia, exkurzia.', completed: false },
];

export const ProjectDetails: React.FC = () => {
  return (
    <div className="space-y-12">
      
      {/* Introduction */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">O Projekte MeteoLab</h2>
        <div className="prose prose-slate max-w-none text-slate-700">
          <p className="text-lg leading-relaxed">
            Projekt <strong>"Strojárstvo v praxi: Online meteorologická stanica v školskom skleníku"</strong> je bádateľský projekt 
            študentov krúžku MeteoLab. Prepájame moderné technológie (IoT, Arduino) s tradičným poľnohospodárstvom 
            a environmentálnou výchovou.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <DetailCard 
              icon={<Target className="w-6 h-6 text-leaf-600" />}
              title="Cieľ Projektu"
              text="Rozvinúť prírodovednú gramotnosť a technické zručnosti prostredníctvom monitorovania environmentálnych faktorov v reálnom čase."
            />
            <DetailCard 
              icon={<Cpu className="w-6 h-6 text-blue-600" />}
              title="Použité Technológie"
              text="Arduino Uno/Nano, ESP8266 WiFi, senzory DHT22 (teplota/vlhkosť) a LDR (svetlo). Vizualizácia cez React a Recharts."
            />
            <DetailCard 
              icon={<Sprout className="w-6 h-6 text-green-600" />}
              title="Predmety"
              text="Elektrotechnika, Automatizácia, Fyzika, Informatika, Agropodnikanie."
            />
            <DetailCard 
              icon={<ShieldCheck className="w-6 h-6 text-red-600" />}
              title="Kompetencie"
              text="Digitálna gramotnosť, tímová spolupráca, kritické myslenie, BOZP, environmentálna zodpovednosť."
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <Calendar className="w-6 h-6 text-slate-600" />
          Harmonogram Projektu (2025 - 2026)
        </h3>
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-slate-200 hidden md:block"></div>
        <div className="space-y-8">
          {timeline.map((phase, idx) => (
            <div key={idx} className="relative flex flex-col md:flex-row gap-6 md:items-start group">
              <div className={`hidden md:flex items-center justify-center w-16 h-16 rounded-full shrink-0 z-10 border-4 transition
                ${phase.completed ? 'bg-leaf-500 border-leaf-100 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                {phase.completed ? <ShieldCheck className="w-8 h-8" /> : <BookOpen className="w-8 h-8" />}
              </div>
              <div className="flex-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition ml-0 md:ml-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h4 className="text-xl font-bold text-slate-800">{phase.title}</h4>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full w-fit ${phase.completed ? 'bg-leaf-100 text-leaf-700' : 'bg-slate-100 text-slate-600'}`}>
                    {phase.date}
                  </span>
                </div>
                <p className="text-slate-600">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

const DetailCard: React.FC<{ icon: React.ReactNode, title: string, text: string }> = ({ icon, title, text }) => (
  <div className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
    <div className="shrink-0 mt-1">{icon}</div>
    <div>
      <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
    </div>
  </div>
);