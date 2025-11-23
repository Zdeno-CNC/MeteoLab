import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  ScatterChart, Scatter, BarChart, Bar 
} from 'recharts';
import { Thermometer, Droplets, Sun, Ruler } from 'lucide-react';
import { SensorReading } from '../types';

// Mock data generation for demonstration
const generateHistoryData = (): SensorReading[] => {
  const data: SensorReading[] = [];
  const now = new Date();
  for (let i = 20; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000); // Daily points for last 20 days
    data.push({
      timestamp: time.toLocaleDateString('sk-SK'),
      temperature: 20 + Math.random() * 10 - 2, // 18-28 range
      humidity: 60 + Math.random() * 20 - 5, // 55-75 range
      light: 800 + Math.random() * 1200, // 800-2000 range
      plantHeight: 5 + (20 - i) * 0.8 + Math.random() * 0.5 // Growth trend
    });
  }
  return data;
};

const monthlyLightData = [
  { name: 'Okt', value: 900 },
  { name: 'Nov', value: 600 },
  { name: 'Dec', value: 450 },
  { name: 'Jan', value: 500 },
  { name: 'Feb', value: 750 },
  { name: 'Mar', value: 1200 },
];

export const Dashboard: React.FC = () => {
  const [historyData, setHistoryData] = useState<SensorReading[]>([]);
  const [currentReadings, setCurrentReadings] = useState<SensorReading | null>(null);

  useEffect(() => {
    const data = generateHistoryData();
    setHistoryData(data);
    setCurrentReadings(data[data.length - 1]);

    // Simulate "Live" updates
    const interval = setInterval(() => {
      setCurrentReadings(prev => {
        if (!prev) return null;
        return {
          ...prev,
          temperature: prev.temperature + (Math.random() - 0.5),
          humidity: prev.humidity + (Math.random() - 0.5),
          light: prev.light + (Math.random() * 10 - 5),
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!currentReadings) return <div>Načítavam dáta zo senzorov...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Live Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard 
          icon={<Thermometer className="w-8 h-8 text-red-500" />}
          label="Teplota"
          value={`${currentReadings.temperature.toFixed(1)} °C`}
          subtext="Optimálna: 22-26°C"
          bgColor="bg-red-50"
          borderColor="border-red-200"
        />
        <StatusCard 
          icon={<Droplets className="w-8 h-8 text-blue-500" />}
          label="Vlhkosť"
          value={`${currentReadings.humidity.toFixed(1)} %`}
          subtext="Optimálna: 60-80%"
          bgColor="bg-blue-50"
          borderColor="border-blue-200"
        />
        <StatusCard 
          icon={<Sun className="w-8 h-8 text-yellow-500" />}
          label="Intenzita svetla"
          value={`${Math.round(currentReadings.light)} lux`}
          subtext="Denný priemer"
          bgColor="bg-yellow-50"
          borderColor="border-yellow-200"
        />
        <StatusCard 
          icon={<Ruler className="w-8 h-8 text-leaf-600" />}
          label="Priem. Výška Rastlín"
          value={`${currentReadings.plantHeight?.toFixed(1)} cm`}
          subtext="+0.8cm za 24h"
          bgColor="bg-green-50"
          borderColor="border-green-200"
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Trend Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-slate-500" />
            Trend Teploty a Vlhkosti (20 Dní)
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="timestamp" fontSize={12} tickMargin={10} />
                <YAxis yAxisId="left" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="temperature" name="Teplota (°C)" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="humidity" name="Vlhkosť (%)" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Correlation Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-slate-500" />
            Korelácia: Teplota vs. Výška Rastlín
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="temperature" name="Teplota" unit="°C" domain={['auto', 'auto']} />
                <YAxis type="number" dataKey="plantHeight" name="Výška" unit="cm" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Merania" data={historyData} fill="#16a34a" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Seasonal Light Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
           <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-slate-500" />
            Priemerná intenzita svetla (Sezónne zmeny)
          </h3>
          <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyLightData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" name="Svetlo (lux)" fill="#eab308" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

const StatusCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  bgColor: string;
  borderColor: string;
}> = ({ icon, label, value, subtext, bgColor, borderColor }) => (
  <div className={`p-6 rounded-xl border ${borderColor} ${bgColor} flex flex-col justify-between transition hover:shadow-md`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{label}</p>
        <h4 className="text-3xl font-bold text-slate-800 mt-1">{value}</h4>
      </div>
      <div className="p-2 bg-white rounded-lg shadow-sm">
        {icon}
      </div>
    </div>
    <p className="text-sm text-slate-600 font-medium bg-white/50 px-2 py-1 rounded w-fit">
      {subtext}
    </p>
  </div>
);
