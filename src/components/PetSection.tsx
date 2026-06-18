import React, { useState } from 'react';
import { Pet, ShopItem, PetSpecies } from '../types';
import { PixelSprite } from './PixelSprite';
import { Sparkles, ShoppingBag, Pencil, Check, Heart, Trophy, RefreshCw } from 'lucide-react';

interface PetSectionProps {
  pet: Pet;
  coins: number;
  onBuyItem: (item: ShopItem) => void;
  onRenamePet: (newName: string) => void;
  onSelectSpecies: (species: PetSpecies) => void;
  onInteract: (action: 'feed' | 'play' | 'revive' | 'sleep' | 'wake') => void;
  shopItems: ShopItem[];
}

export const PetSection: React.FC<PetSectionProps> = ({
  pet,
  coins,
  onBuyItem,
  onRenamePet,
  onSelectSpecies,
  onInteract,
  shopItems,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(pet.name);
  const [activeTab, setActiveTab] = useState<'status' | 'shop' | 'habitat'>('status');

  const handleRename = () => {
    if (tempName.trim()) {
      onRenamePet(tempName.trim());
      setIsEditingName(false);
    }
  };

  // Convert stats to segmented visual blocks [||||||||..]
  const getSegmentedBar = (val: number, max: number = 100, color: string = 'bg-[#4caf50]') => {
    const totalSegments = 10;
    const filledSegments = Math.round((val / max) * totalSegments);
    return (
      <div className="flex gap-1.5 w-full bg-retro-inner border-2 border-retro-border p-1">
        {Array.from({ length: totalSegments }).map((_, idx) => (
          <div
            key={idx}
            className={`h-5 flex-1 transition-all duration-300 ${
              idx < filledSegments ? color : 'bg-[#333333]'
            }`}
            style={{ imageRendering: 'pixelated' }}
          />
        ))}
      </div>
    );
  };

  // Dialog dialogues depending on status
  const getPetDialogue = () => {
    if (pet.status === 'dead') {
      return "URGENT: Aku butuh Ramuan Hidup (Potion) dari toko!";
    }
    if (pet.hunger < 30) {
      return `Lapar berat... Kasih aku makan, ${pet.name}! `;
    }
    if (pet.happiness < 30) {
      return "Bosan sekali... Bermain denganku yuk!";
    }
    switch (pet.status) {
      case 'eating':
        return "Nyam nyam! Enak banget!";
      case 'playing':
        return "Horee! Ini serukan?! ";
      case 'sleeping':
        return "Zzz... Sedang bermimpi makan koin... Zzz...";
      default:
        return "Berikan aku tugas agar kita bisa naik level bersama! ";
    }
  };

  return (
    <div className="bg-retro-panel pixel-border p-5 text-retro-text flex flex-col justify-between h-full">
      {/* SECTION HEADER */}
      <div>
        <div className="flex justify-between items-center bg-retro-sub border-4 border-retro-border p-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-press-start text-xs tracking-tight">PET CORNER</span>
          </div>
          <div className="font-press-start text-xs text-[#ffeb3b]">
            🪙 {coins} G
          </div>
        </div>

        {/* TAB NAVIGATION (8-bit style) */}
        <div className="flex mb-4 gap-1">
          {(['status', 'shop', 'habitat'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 font-press-start text-[10px] py-2 border-2 ${
                activeTab === tab
                  ? 'bg-[#4caf50] text-black border-white shadow-none'
                  : 'bg-retro-inner text-retro-muted border-retro-border hover:text-retro-text'
              } transition-colors uppercase`}
              style={{ imageRendering: 'pixelated' }}
            >
              {tab === 'status' ? 'Status' : tab === 'shop' ? 'Toko' : 'Pet'}
            </button>
          ))}
        </div>

        {/* TAB: STATUS */}
        {activeTab === 'status' && (
          <div className="flex flex-col gap-4">
            {/* NAME EDIT */}
            <div className="flex justify-between items-center gap-2 border-b-2 border-retro-border pb-2">
              {isEditingName ? (
                <div className="flex gap-1 w-full">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    maxLength={14}
                    className="flex-1 bg-retro-inner border-2 border-retro-border font-press-start text-xs p-1 text-retro-text focus:outline-none"
                  />
                  <button onClick={handleRename} className="bg-[#4caf50] border-2 border-retro-border p-1 text-black">
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <span className="font-press-start text-sm uppercase text-[#ffeb3b]">{pet.name}</span>
                    <span className="font-vt323 text-lg text-retro-muted">Lv.{pet.level}</span>
                  </div>
                  <button onClick={() => setIsEditingName(true)} className="text-retro-muted hover:text-retro-text">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* ART & DIALOGUE CONTEXT */}
            <div className="flex bg-retro-inner border-4 border-retro-border p-4 items-center justify-center relative min-h-[170px]">
              {/* Sprite renderer */}
              <div className="w-32 h-32 flex items-center justify-center">
                <PixelSprite species={pet.species} status={pet.status} className="w-24 h-24" />
              </div>
            </div>

            {/* EXP BAR */}
            <div>
              <div className="flex justify-between text-[11px] font-press-start text-retro-muted mb-1">
                <span>XP PROGRESS</span>
                <span>{pet.exp}/{pet.maxExp}</span>
              </div>
              <div className="h-6 w-full bg-retro-inner border-2 border-retro-border p-0.5">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, (pet.exp / pet.maxExp) * 100)}%` }}
                />
              </div>
            </div>

            {/* HUNGER STATE BAR */}
            <div>
              <div className="flex justify-between text-[11px] font-press-start text-yellow-400 mb-1">
                <span>RASA LAPAR</span>
                <span>{pet.hunger}/100</span>
              </div>
              {getSegmentedBar(pet.hunger, 100, pet.hunger < 30 ? 'bg-[#f44336]' : 'bg-[#e67e22]')}
            </div>

            {/* HAPPINESS STATE BAR */}
            <div>
              <div className="flex justify-between text-[11px] font-press-start text-pink-400 mb-1">
                <span>KEBAHAGIAAN</span>
                <span>{pet.happiness}/100</span>
              </div>
              {getSegmentedBar(pet.happiness, 100, pet.happiness < 30 ? 'bg-[#f44336]' : 'bg-[#e84393]')}
            </div>
          </div>
        )}

        {/* TAB: SHOP */}
        {activeTab === 'shop' && (
          <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
            <p className="font-vt323 text-sm text-retro-muted mb-1">Gunakan Koin Emas (G) hasil menyelesaikan tugas untuk merawat peliharaanmu!</p>
            {shopItems.map((item) => {
              const isPotion = item.id === 'potion';
              const isAffordable = coins >= item.price;
              const petIsDead = pet.status === 'dead';
              const disabled = (!isPotion && petIsDead) || !isAffordable;

              return (
                <div key={item.id} className="bg-retro-sub border-2 border-retro-border p-2 flex justify-between items-center gap-2">
                  <div className="text-2xl">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-press-start text-[10px] text-[#ffeb3b] truncate uppercase">{item.name}</span>
                    </div>
                    <span className="font-vt323 text-xs text-retro-muted block leading-tight">{item.description}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="font-press-start text-[9px] text-[#ffeb3b]">{item.price} G</span>
                    <button
                      onClick={() => onBuyItem(item)}
                      disabled={disabled}
                      className={`font-press-start text-[9px] py-1 px-2 border-2 ${
                        disabled
                          ? 'bg-retro-inner border-retro-muted text-retro-muted cursor-not-allowed'
                          : 'bg-[#4caf50] border-retro-border text-black hover:bg-[#81c784]'
                      }`}
                      style={{ imageRendering: 'pixelated' }}
                    >
                      BELI
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB: HABITAT / SPECIES SELECTOR */}
        {activeTab === 'habitat' && (
          <div className="flex flex-col gap-4">
            <p className="font-vt323 text-sm text-retro-muted">Pilih spesies peliharaan favoritmu, atau ubah spesies peliharaan saat ini.</p>
            
            <div className="grid grid-cols-3 gap-2">
              {(['slime', 'cat', 'dragon', 'dog', 'panda', 'chicken'] as PetSpecies[]).map((sp) => {
                const isActive = pet.species === sp;
                return (
                  <button
                    key={sp}
                    onClick={() => onSelectSpecies(sp)}
                    className={`bg-retro-inner border-4 p-2 flex flex-col items-center gap-2 transition-transform cursor-pointer ${
                      isActive ? 'border-[#ffeb3b] scale-105' : 'border-retro-border hover:border-retro-muted'
                    }`}
                  >
                    <PixelSprite species={sp} status="idle" className="w-12 h-12" />
                    <span className="font-press-start text-[8px] tracking-tight uppercase">{sp === 'dog' ? 'anjing' : sp === 'chicken' ? 'ayam' : sp}</span>
                  </button>
                );
              })}
            </div>

            <div className="bg-retro-sub border-2 border-dashed border-retro-border p-3 rounded-none text-center mt-2">
              <span className="font-press-start text-[9px] text-[#ffeb3b] uppercase block mb-1">INFO KELAS</span>
              <p className="font-vt323 text-xs text-retro-muted">
                Setiap pet berkembang pesat bersama produktivitas Anda. Masuk ke status mati jika lapar / sedih mencapai 0!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* QUICK QUICKINTERACT ACTION FOOTER */}
      {activeTab === 'status' && pet.status !== 'dead' && (
        <div className="flex gap-2 mt-4 pt-4 border-t-2 border-retro-border">
          <button
            onClick={() => onInteract('play')}
            disabled={pet.happiness >= 100}
            className="flex-1 bg-pink-500 hover:bg-pink-400 font-press-start text-[10px] text-white py-2 border-4 border-retro-border shadow-[4px_4px_0px_var(--retro-border)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
          >
            MAIN
          </button>
          <button
            onClick={() => onInteract(pet.status === 'sleeping' ? 'wake' : 'sleep')}
            className="flex-1 bg-indigo-600 hover:bg-indigo-505 font-press-start text-[10px] text-white py-2 border-4 border-retro-border shadow-[4px_4px_0px_var(--retro-border)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            {pet.status === 'sleeping' ? 'BANGUN' : 'TIDUR'}
          </button>
        </div>
      )}

      {/* DEATH ACTION BAR */}
      {pet.status === 'dead' && (
        <div className="mt-4 p-3 bg-red-900 border-4 border-retro-border text-center animate-pulse">
          <span className="font-press-start text-xs block text-white mb-2">RIP {pet.name.toUpperCase()}</span>
          <button
            onClick={() => onInteract('revive')}
            disabled={coins < 100}
            className="w-full bg-[#ffeb3b] text-black border-2 border-retro-border p-1 font-press-start text-[9px] hover:bg-yellow-400 disabled:opacity-50"
          >
             REVIVE POTION (100 G)
          </button>
        </div>
      )}
    </div>
  );
};
