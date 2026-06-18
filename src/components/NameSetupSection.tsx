import React, { useState } from 'react';
import { PetSpecies, Pet } from '../types';
import { PixelSprite } from './PixelSprite';
import { Sparkles, Gamepad2, Heart, Award, ArrowRight } from 'lucide-react';
import { playRetroSound } from './PomodoroSection';

interface NameSetupSectionProps {
  onComplete: (playerName: string, initialPet: Pet) => void;
}

export const NameSetupSection: React.FC<NameSetupSectionProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [petName, setPetName] = useState('Piko');
  const [selectedPet, setSelectedPet] = useState<PetSpecies>('slime');
  const [error, setError] = useState('');

  const petSpeciesList: { id: PetSpecies; label: string; desc: string; icon: string }[] = [
    { id: 'slime', label: 'Slime', desc: 'Sangat lentur dan setia menemani pahlawan harian.', icon: '💧' },
    { id: 'cat', label: 'Kucing', desc: 'Tenang, suka tidur, namun sangat menghibur di sela belajar.', icon: '🐱' },
    { id: 'dragon', label: 'Naga', desc: 'Makhluk legenda perkasa penghibur jiwa produktif.', icon: '🐲' },
    { id: 'dog', label: 'Anjing', desc: 'Teman setia yang lincah dan selalu menjaga fokusmu.', icon: '🐶' },
    { id: 'panda', label: 'Panda', desc: 'Pemakan bambu santai yang mahir meditasi harian.', icon: '🐼' },
    { id: 'chicken', label: 'Ayam', desc: 'Pembangun tidur pagi yang selalu aktif berkokok keras.', icon: '🐔' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Masukkan nama Pahlawanmu terlebih dahulu!');
      playRetroSound('buzz');
      return;
    }
    if (!petName.trim()) {
      setError('Berikan nama untuk pendamping petualanganmu!');
      playRetroSound('buzz');
      return;
    }

    playRetroSound('levelUp');

    // Create initial pet structure
    const initialPet: Pet = {
      name: petName.trim(),
      species: selectedPet,
      level: 1,
      exp: 0,
      maxExp: 100,
      hunger: 90,
      happiness: 90,
      status: 'idle',
      lastUpdate: String(Date.now()),
    };

    onComplete(name.trim(), initialPet);
  };

  const handleSelectSpecies = (species: PetSpecies) => {
    setSelectedPet(species);
    playRetroSound('click');
    
    // Auto default cool names for chosen species
    if (species === 'slime') setPetName('Piko');
    else if (species === 'cat') setPetName('Milo');
    else if (species === 'dragon') setPetName('Drago');
    else if (species === 'dog') setPetName('Riko');
    else if (species === 'panda') setPetName('Po');
    else if (species === 'chicken') setPetName('Koko');
  };

  return (
    <div className="max-w-xl mx-auto my-12 bg-retro-panel border-4 border-retro-border p-6 md:p-8 relative shadow-[8px_8px_0px_var(--retro-border)] text-retro-text">
      {/* HEADER BANNER */}
      <div className="text-center mb-8 border-b-4 border-retro-border pb-6">
        <h1 className="font-press-start text-base md:text-lg text-[#ffeb3b] tracking-wider uppercase mb-2">
          PEMBUATAN KARAKTER
        </h1>
        <p className="font-vt323 text-lg md:text-xl text-retro-muted tracking-wide">
          pendaftaran todolist
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INPUT: HERO NAME */}
        <div>
          <label className="block font-press-start text-[10px] text-[#4caf50] uppercase mb-2 tracking-wider">
            NAMA
          </label>
          <input
            type="text"
            maxLength={18}
            placeholder="Masukkan nama Anda..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            className="w-full bg-retro-inner border-4 border-retro-border p-3 text-retro-text font-mono tracking-wider text-sm focus:border-[#ffeb3b] focus:outline-none"
          />
        </div>

        {/* SELECT: STARTING PET SPECIES */}
        <div>
          <label className="block font-press-start text-[10px] text-[#4caf50] uppercase mb-4 tracking-wider">
            PILIH PET
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {petSpeciesList.map((sp) => {
              const isSelected = selectedPet === sp.id;
              return (
                <button
                  key={sp.id}
                  type="button"
                  onClick={() => handleSelectSpecies(sp.id)}
                  className={`border-4 p-3 flex flex-col items-center justify-center gap-2 group transition-all text-center ${
                    isSelected
                      ? 'border-[#ffeb3b] bg-[#ffeb3b]/10 shadow-[4px_4px_0px_#000]'
                      : 'border-retro-border bg-retro-bg hover:border-retro-muted'
                  }`}
                >
                  <PixelSprite species={sp.id} status="idle" className="w-12 h-12" />
                  <span className="font-press-start text-[8px] uppercase tracking-tighter text-[#eaeaea]">
                    {sp.label}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* PET DETAILS */}
          <div className="mt-4 bg-retro-inner border-2 border-retro-border p-3 font-vt323 text-base text-retro-muted tracking-wide">
            <span className="text-[#ffeb3b] font-press-start text-[9px] block mb-1">
              INFO {selectedPet.toUpperCase()}:
            </span>
            {petSpeciesList.find((p) => p.id === selectedPet)?.desc}
          </div>
        </div>

        {/* INPUT: PET NAME */}
        <div>
          <label className="block font-press-start text-[10px] text-[#4caf50] uppercase mb-2 tracking-wider">
            BERI NAMA UNTUK PETMU
          </label>
          <input
            type="text"
            maxLength={15}
            placeholder="Beri nama untuk pet..."
            value={petName}
            onChange={(e) => {
              setPetName(e.target.value);
              if (error) setError('');
            }}
            className="w-full bg-retro-inner border-4 border-retro-border p-3 text-retro-text font-mono tracking-wider text-sm focus:border-[#ffeb3b] focus:outline-none"
          />
        </div>

        {/* ERROR BOX */}
        {error && (
          <div className="bg-red-950/40 border-2 border-[#f44336] p-3 text-red-400 font-vt323 text-base text-center">
            ⚠️ {error}
          </div>
        )}

        {/* SUBMIT ACTION BUTTON */}
        <button
          type="submit"
          className="w-full bg-[#4caf50] hover:bg-[#66bb6a] text-black font-press-start text-xs py-4 px-6 border-4 border-retro-border shadow-[4px_4px_0px_var(--retro-border)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          MULAI<ArrowRight className="w-4 h-4 text-black" />
        </button>
      </form>
    </div>
  );
};
