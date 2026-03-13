import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
  surahs,
  verses,
  prophets,
  prophetDetails,
  verseProphets,
  topics,
  verseTopics,
  historicalContexts,
  tafsirs,
} from "../../src/lib/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// ─── Surah Metadata (all 114) ────────────────────────────
// Sourced from quran.com public data

const surahData = [
  { number: 1, nameArabic: "الفاتحة", nameEnglish: "The Opening", nameTransliteration: "Al-Fatihah", revelationType: "Meccan", verseCount: 7, revelationOrder: 5 },
  { number: 2, nameArabic: "البقرة", nameEnglish: "The Cow", nameTransliteration: "Al-Baqarah", revelationType: "Medinan", verseCount: 286, revelationOrder: 87 },
  { number: 3, nameArabic: "آل عمران", nameEnglish: "The Family of Imran", nameTransliteration: "Ali 'Imran", revelationType: "Medinan", verseCount: 200, revelationOrder: 89 },
  { number: 4, nameArabic: "النساء", nameEnglish: "The Women", nameTransliteration: "An-Nisa", revelationType: "Medinan", verseCount: 176, revelationOrder: 92 },
  { number: 5, nameArabic: "المائدة", nameEnglish: "The Table Spread", nameTransliteration: "Al-Ma'idah", revelationType: "Medinan", verseCount: 120, revelationOrder: 112 },
  { number: 6, nameArabic: "الأنعام", nameEnglish: "The Cattle", nameTransliteration: "Al-An'am", revelationType: "Meccan", verseCount: 165, revelationOrder: 55 },
  { number: 7, nameArabic: "الأعراف", nameEnglish: "The Heights", nameTransliteration: "Al-A'raf", revelationType: "Meccan", verseCount: 206, revelationOrder: 39 },
  { number: 8, nameArabic: "الأنفال", nameEnglish: "The Spoils of War", nameTransliteration: "Al-Anfal", revelationType: "Medinan", verseCount: 75, revelationOrder: 88 },
  { number: 9, nameArabic: "التوبة", nameEnglish: "The Repentance", nameTransliteration: "At-Tawbah", revelationType: "Medinan", verseCount: 129, revelationOrder: 113 },
  { number: 10, nameArabic: "يونس", nameEnglish: "Jonah", nameTransliteration: "Yunus", revelationType: "Meccan", verseCount: 109, revelationOrder: 51 },
  { number: 11, nameArabic: "هود", nameEnglish: "Hud", nameTransliteration: "Hud", revelationType: "Meccan", verseCount: 123, revelationOrder: 52 },
  { number: 12, nameArabic: "يوسف", nameEnglish: "Joseph", nameTransliteration: "Yusuf", revelationType: "Meccan", verseCount: 111, revelationOrder: 53 },
  { number: 13, nameArabic: "الرعد", nameEnglish: "The Thunder", nameTransliteration: "Ar-Ra'd", revelationType: "Medinan", verseCount: 43, revelationOrder: 96 },
  { number: 14, nameArabic: "إبراهيم", nameEnglish: "Abraham", nameTransliteration: "Ibrahim", revelationType: "Meccan", verseCount: 52, revelationOrder: 72 },
  { number: 15, nameArabic: "الحجر", nameEnglish: "The Rocky Tract", nameTransliteration: "Al-Hijr", revelationType: "Meccan", verseCount: 99, revelationOrder: 54 },
  { number: 16, nameArabic: "النحل", nameEnglish: "The Bee", nameTransliteration: "An-Nahl", revelationType: "Meccan", verseCount: 128, revelationOrder: 70 },
  { number: 17, nameArabic: "الإسراء", nameEnglish: "The Night Journey", nameTransliteration: "Al-Isra", revelationType: "Meccan", verseCount: 111, revelationOrder: 50 },
  { number: 18, nameArabic: "الكهف", nameEnglish: "The Cave", nameTransliteration: "Al-Kahf", revelationType: "Meccan", verseCount: 110, revelationOrder: 69 },
  { number: 19, nameArabic: "مريم", nameEnglish: "Mary", nameTransliteration: "Maryam", revelationType: "Meccan", verseCount: 98, revelationOrder: 44 },
  { number: 20, nameArabic: "طه", nameEnglish: "Ta-Ha", nameTransliteration: "Taha", revelationType: "Meccan", verseCount: 135, revelationOrder: 45 },
  { number: 21, nameArabic: "الأنبياء", nameEnglish: "The Prophets", nameTransliteration: "Al-Anbiya", revelationType: "Meccan", verseCount: 112, revelationOrder: 73 },
  { number: 22, nameArabic: "الحج", nameEnglish: "The Pilgrimage", nameTransliteration: "Al-Hajj", revelationType: "Medinan", verseCount: 78, revelationOrder: 103 },
  { number: 23, nameArabic: "المؤمنون", nameEnglish: "The Believers", nameTransliteration: "Al-Mu'minun", revelationType: "Meccan", verseCount: 118, revelationOrder: 74 },
  { number: 24, nameArabic: "النور", nameEnglish: "The Light", nameTransliteration: "An-Nur", revelationType: "Medinan", verseCount: 64, revelationOrder: 102 },
  { number: 25, nameArabic: "الفرقان", nameEnglish: "The Criterion", nameTransliteration: "Al-Furqan", revelationType: "Meccan", verseCount: 77, revelationOrder: 42 },
  { number: 26, nameArabic: "الشعراء", nameEnglish: "The Poets", nameTransliteration: "Ash-Shu'ara", revelationType: "Meccan", verseCount: 227, revelationOrder: 47 },
  { number: 27, nameArabic: "النمل", nameEnglish: "The Ant", nameTransliteration: "An-Naml", revelationType: "Meccan", verseCount: 93, revelationOrder: 48 },
  { number: 28, nameArabic: "القصص", nameEnglish: "The Stories", nameTransliteration: "Al-Qasas", revelationType: "Meccan", verseCount: 88, revelationOrder: 49 },
  { number: 29, nameArabic: "العنكبوت", nameEnglish: "The Spider", nameTransliteration: "Al-'Ankabut", revelationType: "Meccan", verseCount: 69, revelationOrder: 85 },
  { number: 30, nameArabic: "الروم", nameEnglish: "The Romans", nameTransliteration: "Ar-Rum", revelationType: "Meccan", verseCount: 60, revelationOrder: 84 },
  { number: 31, nameArabic: "لقمان", nameEnglish: "Luqman", nameTransliteration: "Luqman", revelationType: "Meccan", verseCount: 34, revelationOrder: 57 },
  { number: 32, nameArabic: "السجدة", nameEnglish: "The Prostration", nameTransliteration: "As-Sajdah", revelationType: "Meccan", verseCount: 30, revelationOrder: 75 },
  { number: 33, nameArabic: "الأحزاب", nameEnglish: "The Combined Forces", nameTransliteration: "Al-Ahzab", revelationType: "Medinan", verseCount: 73, revelationOrder: 90 },
  { number: 34, nameArabic: "سبأ", nameEnglish: "Sheba", nameTransliteration: "Saba", revelationType: "Meccan", verseCount: 54, revelationOrder: 58 },
  { number: 35, nameArabic: "فاطر", nameEnglish: "Originator", nameTransliteration: "Fatir", revelationType: "Meccan", verseCount: 45, revelationOrder: 43 },
  { number: 36, nameArabic: "يس", nameEnglish: "Ya-Sin", nameTransliteration: "Ya-Sin", revelationType: "Meccan", verseCount: 83, revelationOrder: 41 },
  { number: 37, nameArabic: "الصافات", nameEnglish: "Those Who Set The Ranks", nameTransliteration: "As-Saffat", revelationType: "Meccan", verseCount: 182, revelationOrder: 56 },
  { number: 38, nameArabic: "ص", nameEnglish: "Sad", nameTransliteration: "Sad", revelationType: "Meccan", verseCount: 88, revelationOrder: 38 },
  { number: 39, nameArabic: "الزمر", nameEnglish: "The Troops", nameTransliteration: "Az-Zumar", revelationType: "Meccan", verseCount: 75, revelationOrder: 59 },
  { number: 40, nameArabic: "غافر", nameEnglish: "The Forgiver", nameTransliteration: "Ghafir", revelationType: "Meccan", verseCount: 85, revelationOrder: 60 },
  { number: 41, nameArabic: "فصلت", nameEnglish: "Explained in Detail", nameTransliteration: "Fussilat", revelationType: "Meccan", verseCount: 54, revelationOrder: 61 },
  { number: 42, nameArabic: "الشورى", nameEnglish: "The Consultation", nameTransliteration: "Ash-Shura", revelationType: "Meccan", verseCount: 53, revelationOrder: 62 },
  { number: 43, nameArabic: "الزخرف", nameEnglish: "The Ornaments of Gold", nameTransliteration: "Az-Zukhruf", revelationType: "Meccan", verseCount: 89, revelationOrder: 63 },
  { number: 44, nameArabic: "الدخان", nameEnglish: "The Smoke", nameTransliteration: "Ad-Dukhan", revelationType: "Meccan", verseCount: 59, revelationOrder: 64 },
  { number: 45, nameArabic: "الجاثية", nameEnglish: "The Crouching", nameTransliteration: "Al-Jathiyah", revelationType: "Meccan", verseCount: 37, revelationOrder: 65 },
  { number: 46, nameArabic: "الأحقاف", nameEnglish: "The Wind-Curved Sandhills", nameTransliteration: "Al-Ahqaf", revelationType: "Meccan", verseCount: 35, revelationOrder: 66 },
  { number: 47, nameArabic: "محمد", nameEnglish: "Muhammad", nameTransliteration: "Muhammad", revelationType: "Medinan", verseCount: 38, revelationOrder: 95 },
  { number: 48, nameArabic: "الفتح", nameEnglish: "The Victory", nameTransliteration: "Al-Fath", revelationType: "Medinan", verseCount: 29, revelationOrder: 111 },
  { number: 49, nameArabic: "الحجرات", nameEnglish: "The Rooms", nameTransliteration: "Al-Hujurat", revelationType: "Medinan", verseCount: 18, revelationOrder: 106 },
  { number: 50, nameArabic: "ق", nameEnglish: "Qaf", nameTransliteration: "Qaf", revelationType: "Meccan", verseCount: 45, revelationOrder: 34 },
  { number: 51, nameArabic: "الذاريات", nameEnglish: "The Winnowing Winds", nameTransliteration: "Adh-Dhariyat", revelationType: "Meccan", verseCount: 60, revelationOrder: 67 },
  { number: 52, nameArabic: "الطور", nameEnglish: "The Mount", nameTransliteration: "At-Tur", revelationType: "Meccan", verseCount: 49, revelationOrder: 76 },
  { number: 53, nameArabic: "النجم", nameEnglish: "The Star", nameTransliteration: "An-Najm", revelationType: "Meccan", verseCount: 62, revelationOrder: 23 },
  { number: 54, nameArabic: "القمر", nameEnglish: "The Moon", nameTransliteration: "Al-Qamar", revelationType: "Meccan", verseCount: 55, revelationOrder: 37 },
  { number: 55, nameArabic: "الرحمن", nameEnglish: "The Beneficent", nameTransliteration: "Ar-Rahman", revelationType: "Medinan", verseCount: 78, revelationOrder: 97 },
  { number: 56, nameArabic: "الواقعة", nameEnglish: "The Inevitable", nameTransliteration: "Al-Waqi'ah", revelationType: "Meccan", verseCount: 96, revelationOrder: 46 },
  { number: 57, nameArabic: "الحديد", nameEnglish: "The Iron", nameTransliteration: "Al-Hadid", revelationType: "Medinan", verseCount: 29, revelationOrder: 94 },
  { number: 58, nameArabic: "المجادلة", nameEnglish: "The Pleading Woman", nameTransliteration: "Al-Mujadila", revelationType: "Medinan", verseCount: 22, revelationOrder: 105 },
  { number: 59, nameArabic: "الحشر", nameEnglish: "The Exile", nameTransliteration: "Al-Hashr", revelationType: "Medinan", verseCount: 24, revelationOrder: 101 },
  { number: 60, nameArabic: "الممتحنة", nameEnglish: "She That is to be Examined", nameTransliteration: "Al-Mumtahanah", revelationType: "Medinan", verseCount: 13, revelationOrder: 91 },
  { number: 61, nameArabic: "الصف", nameEnglish: "The Ranks", nameTransliteration: "As-Saf", revelationType: "Medinan", verseCount: 14, revelationOrder: 109 },
  { number: 62, nameArabic: "الجمعة", nameEnglish: "The Congregation", nameTransliteration: "Al-Jumu'ah", revelationType: "Medinan", verseCount: 11, revelationOrder: 110 },
  { number: 63, nameArabic: "المنافقون", nameEnglish: "The Hypocrites", nameTransliteration: "Al-Munafiqun", revelationType: "Medinan", verseCount: 11, revelationOrder: 104 },
  { number: 64, nameArabic: "التغابن", nameEnglish: "The Mutual Disillusion", nameTransliteration: "At-Taghabun", revelationType: "Medinan", verseCount: 18, revelationOrder: 108 },
  { number: 65, nameArabic: "الطلاق", nameEnglish: "The Divorce", nameTransliteration: "At-Talaq", revelationType: "Medinan", verseCount: 12, revelationOrder: 99 },
  { number: 66, nameArabic: "التحريم", nameEnglish: "The Prohibition", nameTransliteration: "At-Tahrim", revelationType: "Medinan", verseCount: 12, revelationOrder: 107 },
  { number: 67, nameArabic: "الملك", nameEnglish: "The Sovereignty", nameTransliteration: "Al-Mulk", revelationType: "Meccan", verseCount: 30, revelationOrder: 77 },
  { number: 68, nameArabic: "القلم", nameEnglish: "The Pen", nameTransliteration: "Al-Qalam", revelationType: "Meccan", verseCount: 52, revelationOrder: 2 },
  { number: 69, nameArabic: "الحاقة", nameEnglish: "The Reality", nameTransliteration: "Al-Haqqah", revelationType: "Meccan", verseCount: 52, revelationOrder: 78 },
  { number: 70, nameArabic: "المعارج", nameEnglish: "The Ascending Stairways", nameTransliteration: "Al-Ma'arij", revelationType: "Meccan", verseCount: 44, revelationOrder: 79 },
  { number: 71, nameArabic: "نوح", nameEnglish: "Noah", nameTransliteration: "Nuh", revelationType: "Meccan", verseCount: 28, revelationOrder: 71 },
  { number: 72, nameArabic: "الجن", nameEnglish: "The Jinn", nameTransliteration: "Al-Jinn", revelationType: "Meccan", verseCount: 28, revelationOrder: 40 },
  { number: 73, nameArabic: "المزمل", nameEnglish: "The Enshrouded One", nameTransliteration: "Al-Muzzammil", revelationType: "Meccan", verseCount: 20, revelationOrder: 3 },
  { number: 74, nameArabic: "المدثر", nameEnglish: "The Cloaked One", nameTransliteration: "Al-Muddathir", revelationType: "Meccan", verseCount: 56, revelationOrder: 4 },
  { number: 75, nameArabic: "القيامة", nameEnglish: "The Resurrection", nameTransliteration: "Al-Qiyamah", revelationType: "Meccan", verseCount: 40, revelationOrder: 31 },
  { number: 76, nameArabic: "الإنسان", nameEnglish: "The Human", nameTransliteration: "Al-Insan", revelationType: "Medinan", verseCount: 31, revelationOrder: 98 },
  { number: 77, nameArabic: "المرسلات", nameEnglish: "The Emissaries", nameTransliteration: "Al-Mursalat", revelationType: "Meccan", verseCount: 50, revelationOrder: 33 },
  { number: 78, nameArabic: "النبأ", nameEnglish: "The Tidings", nameTransliteration: "An-Naba", revelationType: "Meccan", verseCount: 40, revelationOrder: 80 },
  { number: 79, nameArabic: "النازعات", nameEnglish: "Those Who Drag Forth", nameTransliteration: "An-Nazi'at", revelationType: "Meccan", verseCount: 46, revelationOrder: 81 },
  { number: 80, nameArabic: "عبس", nameEnglish: "He Frowned", nameTransliteration: "'Abasa", revelationType: "Meccan", verseCount: 42, revelationOrder: 24 },
  { number: 81, nameArabic: "التكوير", nameEnglish: "The Overthrowing", nameTransliteration: "At-Takwir", revelationType: "Meccan", verseCount: 29, revelationOrder: 7 },
  { number: 82, nameArabic: "الانفطار", nameEnglish: "The Cleaving", nameTransliteration: "Al-Infitar", revelationType: "Meccan", verseCount: 19, revelationOrder: 82 },
  { number: 83, nameArabic: "المطففين", nameEnglish: "The Defrauding", nameTransliteration: "Al-Mutaffifin", revelationType: "Meccan", verseCount: 36, revelationOrder: 86 },
  { number: 84, nameArabic: "الانشقاق", nameEnglish: "The Sundering", nameTransliteration: "Al-Inshiqaq", revelationType: "Meccan", verseCount: 25, revelationOrder: 83 },
  { number: 85, nameArabic: "البروج", nameEnglish: "The Mansions of the Stars", nameTransliteration: "Al-Buruj", revelationType: "Meccan", verseCount: 22, revelationOrder: 27 },
  { number: 86, nameArabic: "الطارق", nameEnglish: "The Morning Star", nameTransliteration: "At-Tariq", revelationType: "Meccan", verseCount: 17, revelationOrder: 36 },
  { number: 87, nameArabic: "الأعلى", nameEnglish: "The Most High", nameTransliteration: "Al-A'la", revelationType: "Meccan", verseCount: 19, revelationOrder: 8 },
  { number: 88, nameArabic: "الغاشية", nameEnglish: "The Overwhelming", nameTransliteration: "Al-Ghashiyah", revelationType: "Meccan", verseCount: 26, revelationOrder: 68 },
  { number: 89, nameArabic: "الفجر", nameEnglish: "The Dawn", nameTransliteration: "Al-Fajr", revelationType: "Meccan", verseCount: 30, revelationOrder: 10 },
  { number: 90, nameArabic: "البلد", nameEnglish: "The City", nameTransliteration: "Al-Balad", revelationType: "Meccan", verseCount: 20, revelationOrder: 35 },
  { number: 91, nameArabic: "الشمس", nameEnglish: "The Sun", nameTransliteration: "Ash-Shams", revelationType: "Meccan", verseCount: 15, revelationOrder: 26 },
  { number: 92, nameArabic: "الليل", nameEnglish: "The Night", nameTransliteration: "Al-Layl", revelationType: "Meccan", verseCount: 21, revelationOrder: 9 },
  { number: 93, nameArabic: "الضحى", nameEnglish: "The Morning Hours", nameTransliteration: "Ad-Duhaa", revelationType: "Meccan", verseCount: 11, revelationOrder: 11 },
  { number: 94, nameArabic: "الشرح", nameEnglish: "The Relief", nameTransliteration: "Ash-Sharh", revelationType: "Meccan", verseCount: 8, revelationOrder: 12 },
  { number: 95, nameArabic: "التين", nameEnglish: "The Fig", nameTransliteration: "At-Tin", revelationType: "Meccan", verseCount: 8, revelationOrder: 28 },
  { number: 96, nameArabic: "العلق", nameEnglish: "The Clot", nameTransliteration: "Al-'Alaq", revelationType: "Meccan", verseCount: 19, revelationOrder: 1 },
  { number: 97, nameArabic: "القدر", nameEnglish: "The Power", nameTransliteration: "Al-Qadr", revelationType: "Meccan", verseCount: 5, revelationOrder: 25 },
  { number: 98, nameArabic: "البينة", nameEnglish: "The Clear Proof", nameTransliteration: "Al-Bayyinah", revelationType: "Medinan", verseCount: 8, revelationOrder: 100 },
  { number: 99, nameArabic: "الزلزلة", nameEnglish: "The Earthquake", nameTransliteration: "Az-Zalzalah", revelationType: "Medinan", verseCount: 8, revelationOrder: 93 },
  { number: 100, nameArabic: "العاديات", nameEnglish: "The Courser", nameTransliteration: "Al-'Adiyat", revelationType: "Meccan", verseCount: 11, revelationOrder: 14 },
  { number: 101, nameArabic: "القارعة", nameEnglish: "The Calamity", nameTransliteration: "Al-Qari'ah", revelationType: "Meccan", verseCount: 11, revelationOrder: 30 },
  { number: 102, nameArabic: "التكاثر", nameEnglish: "The Rivalry in World Increase", nameTransliteration: "At-Takathur", revelationType: "Meccan", verseCount: 8, revelationOrder: 16 },
  { number: 103, nameArabic: "العصر", nameEnglish: "The Declining Day", nameTransliteration: "Al-'Asr", revelationType: "Meccan", verseCount: 3, revelationOrder: 13 },
  { number: 104, nameArabic: "الهمزة", nameEnglish: "The Traducer", nameTransliteration: "Al-Humazah", revelationType: "Meccan", verseCount: 9, revelationOrder: 32 },
  { number: 105, nameArabic: "الفيل", nameEnglish: "The Elephant", nameTransliteration: "Al-Fil", revelationType: "Meccan", verseCount: 5, revelationOrder: 19 },
  { number: 106, nameArabic: "قريش", nameEnglish: "Quraysh", nameTransliteration: "Quraysh", revelationType: "Meccan", verseCount: 4, revelationOrder: 29 },
  { number: 107, nameArabic: "الماعون", nameEnglish: "The Small Kindnesses", nameTransliteration: "Al-Ma'un", revelationType: "Meccan", verseCount: 7, revelationOrder: 17 },
  { number: 108, nameArabic: "الكوثر", nameEnglish: "The Abundance", nameTransliteration: "Al-Kawthar", revelationType: "Meccan", verseCount: 3, revelationOrder: 15 },
  { number: 109, nameArabic: "الكافرون", nameEnglish: "The Disbelievers", nameTransliteration: "Al-Kafirun", revelationType: "Meccan", verseCount: 6, revelationOrder: 18 },
  { number: 110, nameArabic: "النصر", nameEnglish: "The Divine Support", nameTransliteration: "An-Nasr", revelationType: "Medinan", verseCount: 3, revelationOrder: 114 },
  { number: 111, nameArabic: "المسد", nameEnglish: "The Palm Fiber", nameTransliteration: "Al-Masad", revelationType: "Meccan", verseCount: 5, revelationOrder: 6 },
  { number: 112, nameArabic: "الإخلاص", nameEnglish: "The Sincerity", nameTransliteration: "Al-Ikhlas", revelationType: "Meccan", verseCount: 4, revelationOrder: 22 },
  { number: 113, nameArabic: "الفلق", nameEnglish: "The Daybreak", nameTransliteration: "Al-Falaq", revelationType: "Meccan", verseCount: 5, revelationOrder: 20 },
  { number: 114, nameArabic: "الناس", nameEnglish: "Mankind", nameTransliteration: "An-Nas", revelationType: "Meccan", verseCount: 6, revelationOrder: 21 },
];

// ─── Prophet Data ────────────────────────────────────────

const prophetData = [
  { nameArabic: "آدم", nameEnglish: "Adam", slug: "adam", briefDescription: "The first human being and prophet, created by Allah from clay.", mentionCount: 25 },
  { nameArabic: "إدريس", nameEnglish: "Idris", slug: "idris", briefDescription: "Known for his wisdom and patience, raised to a high station.", mentionCount: 2 },
  { nameArabic: "نوح", nameEnglish: "Noah", slug: "noah", briefDescription: "Built the Ark on Allah's command and preached for 950 years.", mentionCount: 43 },
  { nameArabic: "هود", nameEnglish: "Hud", slug: "hud", briefDescription: "Sent to the people of 'Ad, who were destroyed for their arrogance.", mentionCount: 7 },
  { nameArabic: "صالح", nameEnglish: "Salih", slug: "salih", briefDescription: "Sent to the people of Thamud with the miracle of the she-camel.", mentionCount: 9 },
  { nameArabic: "إبراهيم", nameEnglish: "Abraham", slug: "abraham", briefDescription: "The friend of Allah, father of prophets, builder of the Kaaba.", mentionCount: 69 },
  { nameArabic: "لوط", nameEnglish: "Lot", slug: "lot", briefDescription: "Nephew of Abraham, sent to the sinful people of Sodom.", mentionCount: 27 },
  { nameArabic: "إسماعيل", nameEnglish: "Ishmael", slug: "ishmael", briefDescription: "Son of Abraham, helped build the Kaaba, ancestor of Prophet Muhammad.", mentionCount: 12 },
  { nameArabic: "إسحاق", nameEnglish: "Isaac", slug: "isaac", briefDescription: "Son of Abraham and Sarah, father of Jacob.", mentionCount: 17 },
  { nameArabic: "يعقوب", nameEnglish: "Jacob", slug: "jacob", briefDescription: "Also known as Israel, father of the twelve tribes.", mentionCount: 16 },
  { nameArabic: "يوسف", nameEnglish: "Joseph", slug: "joseph", briefDescription: "Known for his beauty and patience, his story fills an entire Surah.", mentionCount: 27 },
  { nameArabic: "شعيب", nameEnglish: "Shu'ayb", slug: "shuayb", briefDescription: "Sent to the people of Madyan, warned against fraud in trade.", mentionCount: 11 },
  { nameArabic: "أيوب", nameEnglish: "Job", slug: "job", briefDescription: "Model of patience through severe illness and loss.", mentionCount: 4 },
  { nameArabic: "ذو الكفل", nameEnglish: "Dhul-Kifl", slug: "dhul-kifl", briefDescription: "Praised for his patience and righteousness.", mentionCount: 2 },
  { nameArabic: "موسى", nameEnglish: "Moses", slug: "moses", briefDescription: "Spoke directly with Allah, led the Israelites out of Egypt.", mentionCount: 136 },
  { nameArabic: "هارون", nameEnglish: "Aaron", slug: "aaron", briefDescription: "Brother and helper of Moses, eloquent speaker.", mentionCount: 20 },
  { nameArabic: "داود", nameEnglish: "David", slug: "david", briefDescription: "King and prophet, given the Psalms (Zabur), slew Goliath.", mentionCount: 16 },
  { nameArabic: "سليمان", nameEnglish: "Solomon", slug: "solomon", briefDescription: "King with power over jinn, wind, and animals.", mentionCount: 17 },
  { nameArabic: "إلياس", nameEnglish: "Elias", slug: "elias", briefDescription: "Warned his people against worshipping the idol Baal.", mentionCount: 2 },
  { nameArabic: "اليسع", nameEnglish: "Elisha", slug: "elisha", briefDescription: "Successor of Elias, praised among the chosen.", mentionCount: 2 },
  { nameArabic: "يونس", nameEnglish: "Jonah", slug: "jonah", briefDescription: "Swallowed by a whale, repented inside it, and was forgiven.", mentionCount: 4 },
  { nameArabic: "زكريا", nameEnglish: "Zechariah", slug: "zechariah", briefDescription: "Guardian of Mary, father of John, prayed for a son in old age.", mentionCount: 7 },
  { nameArabic: "يحيى", nameEnglish: "John", slug: "john", briefDescription: "Son of Zechariah, given wisdom as a child.", mentionCount: 5 },
  { nameArabic: "عيسى", nameEnglish: "Jesus", slug: "jesus", briefDescription: "Born miraculously to Mary, performed miracles by Allah's permission.", mentionCount: 25 },
  { nameArabic: "محمد", nameEnglish: "Muhammad", slug: "muhammad", briefDescription: "The final prophet and messenger, the seal of prophethood.", mentionCount: 4 },
];

// ─── Topic Data ──────────────────────────────────────────

const topicData = [
  { name: "Tawhid (Oneness of God)", slug: "tawhid", description: "The central concept of Islamic monotheism — the oneness and uniqueness of Allah." },
  { name: "Prayer (Salah)", slug: "prayer", description: "The five daily prayers and the importance of establishing worship." },
  { name: "Charity (Zakat)", slug: "charity", description: "Obligatory charity and its role in purifying wealth and aiding the needy." },
  { name: "Fasting (Sawm)", slug: "fasting", description: "Fasting during Ramadan and its spiritual significance." },
  { name: "Pilgrimage (Hajj)", slug: "pilgrimage", description: "The annual pilgrimage to Makkah and its rituals." },
  { name: "Day of Judgment", slug: "day-of-judgment", description: "The final reckoning when all deeds will be accounted for." },
  { name: "Paradise (Jannah)", slug: "paradise", description: "The eternal reward for the righteous believers." },
  { name: "Hellfire (Jahannam)", slug: "hellfire", description: "The punishment awaiting those who reject faith and do evil." },
  { name: "Patience (Sabr)", slug: "patience", description: "Endurance through hardship and steadfastness in faith." },
  { name: "Gratitude (Shukr)", slug: "gratitude", description: "Thankfulness to Allah for His countless blessings." },
  { name: "Justice ('Adl)", slug: "justice", description: "Establishing fairness and equity in all dealings." },
  { name: "Mercy (Rahmah)", slug: "mercy", description: "Allah's boundless mercy and the call to show mercy to others." },
  { name: "Knowledge ('Ilm)", slug: "knowledge", description: "The pursuit of knowledge and understanding as an act of worship." },
  { name: "Family & Marriage", slug: "family-marriage", description: "Guidelines for family life, marriage, and raising children." },
  { name: "Stories of Past Nations", slug: "past-nations", description: "Accounts of ancient peoples and the lessons from their fate." },
];

// ─── Main Seed Function ─────────────────────────────────

async function seed() {
  console.log("🌱 Starting seed...\n");

  // 1. Seed Surahs
  console.log("📖 Seeding surahs...");
  await db.insert(surahs).values(surahData);
  console.log(`   ✅ ${surahData.length} surahs inserted\n`);

  // 2. Seed Prophets
  console.log("👤 Seeding prophets...");
  await db.insert(prophets).values(prophetData);
  console.log(`   ✅ ${prophetData.length} prophets inserted\n`);

  // 3. Seed Topics
  console.log("📚 Seeding topics...");
  await db.insert(topics).values(topicData);
  console.log(`   ✅ ${topicData.length} topics inserted\n`);

  // 4. Seed sample verses for Surah Al-Fatihah (to have working data)
  console.log("📝 Seeding Al-Fatihah verses...");
  const fatihahVerses = [
    { surahId: 1, verseNumber: 1, arabicText: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", englishTranslation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.", juzNumber: 1, pageNumber: 1 },
    { surahId: 1, verseNumber: 2, arabicText: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ", englishTranslation: "All praise is due to Allah, Lord of the worlds.", juzNumber: 1, pageNumber: 1 },
    { surahId: 1, verseNumber: 3, arabicText: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", englishTranslation: "The Entirely Merciful, the Especially Merciful.", juzNumber: 1, pageNumber: 1 },
    { surahId: 1, verseNumber: 4, arabicText: "مَـٰلِكِ يَوْمِ ٱلدِّينِ", englishTranslation: "Sovereign of the Day of Recompense.", juzNumber: 1, pageNumber: 1 },
    { surahId: 1, verseNumber: 5, arabicText: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", englishTranslation: "It is You we worship and You we ask for help.", juzNumber: 1, pageNumber: 1 },
    { surahId: 1, verseNumber: 6, arabicText: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ", englishTranslation: "Guide us to the straight path.", juzNumber: 1, pageNumber: 1 },
    { surahId: 1, verseNumber: 7, arabicText: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ", englishTranslation: "The path of those upon whom You have bestowed favor, not of those who have earned anger or of those who are astray.", juzNumber: 1, pageNumber: 1 },
  ];
  await db.insert(verses).values(fatihahVerses);
  console.log(`   ✅ ${fatihahVerses.length} verses inserted\n`);

  // 5. Seed sample tafsir for verse 1
  console.log("💬 Seeding sample tafsir...");
  await db.insert(tafsirs).values([
    {
      verseId: 1,
      sourceName: "Ibn Kathir",
      content: "The Basmalah (Bismillah) is the phrase that opens all but one Surah of the Quran. It means seeking blessing by mentioning the Name of Allah. Ar-Rahman and Ar-Rahim are two Names of Allah derived from Ar-Rahmah (mercy). Ar-Rahman carries a broader scope of mercy, while Ar-Rahim refers to the mercy that specifically reaches the believers.",
      language: "en",
    },
    {
      verseId: 2,
      sourceName: "Ibn Kathir",
      content: "Al-Hamd means praise coupled with love, submission, and acknowledgment that the One being praised has no shortcoming. Allah praises Himself, teaching His servants to praise Him as well. Rabb means the One who nurtures, sustains, and brings all creation to completion stage by stage. Al-'Alamin includes everything that exists besides Allah.",
      language: "en",
    },
  ]);
  console.log("   ✅ Sample tafsir inserted\n");

  console.log("🎉 Seed complete!");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
