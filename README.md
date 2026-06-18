# TODOLIST RPG 🎮⚔️

**TODOLIST RPG** adalah aplikasi produktivitas gamifikasi 8-bit yang menggabungkan manajemen tugas harian (todolist) dengan elemen permainan RPG retro serta simulasi peliharaan virtual (virtual pet). Aplikasi ini dirancang agar setiap tugas yang Anda selesaikan di kehidupan nyata terasa seperti quest yang memberikan imbalan berharga bagi pahlawan Anda!

---

## ✨ Fitur Utama

### 1. ⚔️ Quest Log (Daftar Tugas Gamifikasi)
- Tambahkan tugas/quest harian dengan 3 tingkat kesulitan: **Easy**, **Medium**, dan **Hard**.
- Selesaikan tugas untuk mendapatkan **koin emas** dan **Experience Points (XP)**.
- Setiap tingkat kesulitan memiliki penyesuaian jumlah XP dan koin yang selaras.

### 2. 👾 Sistem Peliharaan Virtual (Virtual Pet Companion)
- **Karakter Unik**: Pilih pendamping Anda dari ras klasik seperti Slime, Kucing, Naga, Anjing, Panda, atau Ayam!
- **Status Real-time**: Rawat pet Anda yang memiliki indikator rasa lapar (Hunger) dan kebahagiaan (Happiness).
- **Animasi Pixel Art Dinamis**: Pet berkedip serta bernapas lembut pada mode *idle*, melompat girang saat bermain, atau terengah-engah lembut saat makan dan tidur.
- **Sistem Level & Evolusi**: Tingkatkan level pet Anda dengan menyalurkan XP dari penyelesaian tugas harian.

### 3. 🛒 Toko Piksel (Pixel Shop)
- Gunakan koin yang dikumpulkan dari keberhasilan kerja Anda untuk membeli makanan dan mainan:
  - **Apel Piksel 🍎**: Memulihkan rasa lapar (+15).
  - **Daging Panggang 🍖**: Memulihkan rasa lapar (+35) dan kebahagiaan (+10).
  - **Kristal Energi 💎**: Memulihkan lapar (+15) dan kebahagiaan (+45).
  - **Gameboy Piksel 🎮**: Meningkatkan kegembiraan pet (+25).
  - **Ramuan Hidup 🧪**: Menghidupkan kembali pet yang mati demi kesempatan kedua.

### 4. ⏱️ Pomodoro Timer Retro
- Gunakan timer fokus Pomodoro terintegrasi dengan gaya panel konsol retro.
- Dilengkapi efek suara orisinal bergaya game 8-bit untuk menandai dimulainya waktu belajar atau istirahat Anda.

### 5. 📊 Dasbor Statistik & Heatmap Kontribusi
- Lacak performa harian Anda dengan visualisasi peta kontribusi (heatmap) selayaknya Github.
- Pertahankan **Runtutan Harian (Streak)** untuk memicu semangat produktivitas tanpa henti.

---

## 🛠️ Arsitektur & Teknologi

Aplikasi ini dikembangkan menggunakan tumpukan teknologi modern berkinerja tinggi:
- **React 18** & **TypeScript**: Menjamin keandalan dan keamanan tipe data kognitif aplikasi.
- **Vite**: Sebagai pengemas & server pengembangan super cepat.
- **Tailwind CSS**: Untuk merancang kerangka gaya piksel retro retro modern yang sepenuhnya responsif.
- **Motion (Framer Motion)**: Untuk menangani micro-animations bernapas, melompat, makan, dan tidur dari pet piksel.
- **Lucide React**: Sebagai penyedia pustaka ikon minimalis modern beresolusi tajam.
- **LocalStorage API**: Untuk mempertahankan data pahlawan, pet, toko, logs, dan quest secara lokal tanpa membutuhkan koneksi internet.

---

## 🚀 Cara Menjalankan secara Lokal

1. **Instalasi Dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan Server Pengembang (Development Server)**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan secara otomatis di port 3000. Buka tautan `http://localhost:3000` di peramban Anda.

3. **Kompilasi Produksi**:
   ```bash
   npm run build
   ```

---

*Selamat berpetualang dan jadilah versi terbaik diri Anda bersama TODOLIST RPG!* 🌟
