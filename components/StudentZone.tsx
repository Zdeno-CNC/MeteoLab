import React from 'react';
import { CheckCircle2, XCircle, Clock, FileText, User } from 'lucide-react';
import { Hypothesis } from '../types';

const hypothesesData: Hypothesis[] = [
  {
    id: 1,
    studentName: "Skupina Alpha (III.S)",
    statement: "Vyššia teplota nad 25 °C urýchľuje rast paradajok, ale zvyšuje riziko vysychania pôdy.",
    status: "verified",
    notes: "Potvrdené meraniami v Januári. Pri T=26°C bol rast o 15% rýchlejší, ale vlhkosť pôdy klesala 2x rýchlejšie."
  },
  {
    id: 2,
    studentName: "Skupina Beta (III.A)",
    statement: "Optimálna vlhkosť 60-80 % podporuje klíčenie semien bez vzniku plesní.",
    status: "verified",
    notes: "Udržiavali sme vlhkosť 70%. Klíčivosť bola 95%, vizuálna kontrola nepotvrdila žiadne plesne."
  },
  {
    id: 3,
    studentName: "Ján Novák",
    statement: "Intenzita svetla pod 500 lux zastaví rast papriky.",
    status: "refuted",
    notes: "Rast sa nezastavil úplne, ale spomalil sa o 80%. Rastlina sa začala ťahať za svetlom (etiolizácia)."
  }
];

export const StudentZone: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Hypotheses Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Bádateľský Denník: Hypotézy</h2>
            <button className="bg-leaf-600 hover:bg-leaf-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              + Pridať novú hypotézu
            </button>
          </div>
          
          <div className="space-y-4">
            {hypothesesData.map((hypo) => (
              <div key={hypo.id} className="border border-slate-100 rounded-lg p-5 hover:bg-slate-50 transition">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {hypo.studentName}
                      </span>
                      <StatusBadge status={hypo.status} />
                    </div>
                    <p className="text-lg font-medium text-slate-800">
                      "{hypo.statement}"
                    </p>
                  </div>
                </div>
                {hypo.notes && (
                  <div className="mt-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-sm text-slate-700">
                    <span className="font-semibold text-blue-800">Reflexia:</span> {hypo.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation/Feedback Section */}
         <div className="bg-gradient-to-br from-leaf-50 to-white p-6 rounded-xl shadow-sm border border-leaf-100">
          <h3 className="text-xl font-bold text-leaf-900 mb-4">Zhodnotenie účinnosti projektu</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Pilotná fáza (október–november 2025) preukázala vysokú účinnosť bádateľského prístupu (IBSE). 
            <strong> 85 % študentov</strong> potvrdilo hypotézy dátami. Prepojenie s praxou ukázalo reálne uplatnenie – traja študenti prejavili záujem o štúdium automatizácie.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
             <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-leaf-600">4.7/5</div>
                <div className="text-xs text-slate-500 font-medium uppercase mt-1">Praktické uplatnenie</div>
             </div>
             <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-leaf-600">4.5/5</div>
                <div className="text-xs text-slate-500 font-medium uppercase mt-1">Motivácia bádaním</div>
             </div>
          </div>
        </div>
      </div>

      {/* Sidebar / Blog Stream */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-500" />
            Posledné príspevky
          </h3>
          <div className="space-y-6">
            <BlogEntry 
              date="15. Jan 2026"
              author="Marek (III.S)"
              title="Kalibrácia senzorov DHT22"
              preview="Dnes sme porovnávali hodnoty z našej Arduino stanice s certifikovaným teplomerom. Odchýlka bola len 0.3°C..."
            />
            <BlogEntry 
              date="20. Jan 2026"
              author="Petra (III.A)"
              title="Prvé klíčenie"
              preview="Paradajky pri teplote 24°C vyklíčili o 2 dni skôr ako kontrolná vzorka v chladnejšej časti skleníka."
            />
            <div className="pt-4 border-t border-slate-100">
              <button className="w-full py-2 text-sm text-leaf-600 font-medium hover:bg-leaf-50 rounded-lg transition">
                Zobraziť archív
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

const StatusBadge: React.FC<{ status: Hypothesis['status'] }> = ({ status }) => {
  if (status === 'verified') {
    return <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3" /> OVERENÉ</span>;
  }
  if (status === 'refuted') {
    return <span className="flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full"><XCircle className="w-3 h-3" /> VYVRÁTENÉ</span>;
  }
  return <span className="flex items-center gap-1 text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full"><Clock className="w-3 h-3" /> PREBIEHA</span>;
};

const BlogEntry: React.FC<{ date: string, author: string, title: string, preview: string }> = ({ date, author, title, preview }) => (
  <article>
    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
      <span>{date}</span> • <span className="flex items-center gap-1"><User className="w-3 h-3" /> {author}</span>
    </div>
    <h4 className="font-bold text-slate-800 hover:text-leaf-600 cursor-pointer transition">{title}</h4>
    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{preview}</p>
  </article>
);