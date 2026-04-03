# PályaPartner — Üzleti Validáció Összefoglaló

## A Null Hipotézis

> **H₀:** A magyar piacon nincs elég potenciális felhasználó ahhoz, hogy egy sportpartner-kereső app hirdetés-alapú (illetve vegyes) modellel fenntartható bevételt termeljen.

---

## 1. A teljes piac mérete (H₀ vizsgálat)

| Lépés | Szám | Forrás |
|-------|------|--------|
| Magyarország lakossága | 9,900,000 | Worldometer |
| Rendszeresen sportol (33%) | ~2,500,000 | Magyar Nemzet / KSH |
| Társasan sportol (~50%) | ~1,250,000 | Oeconomus/Ipsos 2021 |
| Partner-igényes sportot űz (~15-20%) | **375,000–500,000** | Becsült |

### Sportágak népszerűsége

| Sportág | Az aktívan sportolók %-a | Partner kell? |
|---------|-------------------------|---------------|
| Kerékpározás | 30% | Nem igazán |
| Futás | 18% | Részben |
| Fitnesz | 13% | Nem |
| Úszás | 8% | Részben |
| Labdarúgás/foci | 5% | **Igen** |
| Ütős sportok (tenisz, padel, squash, tollaslabda, asztalitenisz) | ~2-4% becsült | **Igen** |
| Csapatsportok (kosár, röpi, kézi) | ~2-3% becsült | **Igen** |

### A legerősebb célcsoport: 30–45 évesek

| Korcsoport | Miért releváns? |
|------------|----------------|
| 18–30 | Aktívak, de van szervezett közegük (egyetem, csapatok) |
| **30–45** | **Aktívan sportolnak, de a régi partnerek szétszóródtak (család, munka) — ők keresnek leginkább** |
| 45–55 | Stabil, főleg ütős sportok |
| 55+ | Alacsony részvétel |

### Az elérhető piac összesen

| Szegmens | Potenciális user |
|----------|-----------------|
| Budapest (30–45, partner-igényes sport) | ~21,000 |
| Budapest (összes korcsoport) | ~52,000 |
| Debrecen, Szeged, Miskolc, Pécs, Győr összesen | ~15,000 |
| Többi város (18 db az appban) | ~10,000 |
| **Összes elérhető piac** | **~77,000** |

---

## 2. A bevételi modell

### Tisztán hirdetésből NEM éri meg

Kelet-európai eCPM ráták (= bevétel 1000 hirdetés-megjelenésenként):

| Típus | Android | iOS |
|-------|---------|-----|
| Banner | $0.09 | $0.15 |
| Interstitial (teljes képernyős) | $1.77 | $2.03 |
| Rewarded video | $1.49 | $2.55 |

| MAU | Havi hirdetési bevétel | Forintban |
|-----|----------------------|-----------|
| 1,500 | ~$46 | ~18,000 Ft |
| 5,000 | ~$117 | ~45,000 Ft |
| 10,000 | ~$234 | ~90,000 Ft |
| 50,000 | ~$1,170 | ~450,000 Ft |

**10,000 MAU-ból ~90,000 Ft/hó — ez semmire nem elég.**

### Vegyes modell — az egyetlen reális út

| Bevételi forrás | 5,000 MAU-nál | Leírás |
|----------------|---------------|--------|
| Hirdetés (eCPM) | ~45,000 Ft | Alap, de önmagában kevés |
| Prémium előfizetés (2% fizet × 1,500 Ft) | ~150,000 Ft | Kiemelt profil, korlátlan üzenet |
| Sportlétesítmény partneri díjak | ~100,000 Ft | Teniszpályák, padel klubok fizetnek megjelenésért |
| Pályafoglalás jutalék (5-10%) | ~50,000 Ft | Közvetítői díj foglalásonként |
| **Összesen** | **~345,000 Ft/hó** | |

Havi fix költségek (Vercel + Neon + domain + email): **~16,000–24,000 Ft**

---

## 3. Benchmark — magyar niche oldalak

A társkereső piac a legjobb analógia (emberek keresnek egymást egy specifikus céllal):

| Oldal | Típus | Havi forgalom | Tanulság |
|-------|-------|--------------|----------|
| Randivonal.hu | Társkereső, piacvezető | ~1.4M látogatás | Évek kellettek, de hálózati hatás bejött |
| Párom.hu | Társkereső, #2 | ~552K | Második is tud élni |
| Cupydo.hu | Társkereső, niche | ~74K | **Ez a reális méretkategória niche-ben** |
| Eliezer | Keresztény társkereső | ~1,000 regisztrált | Túl szűk niche — figyelmeztetés |
| Programturizmus.hu | Szabadidő portál | ~600K/hó | Szélesebb célcsoport |
| Használtautó.hu | Kereskedelmi piactér | ~1.65M egyedi | Domináns szegmensben |

**A PályaPartner reális célszintje: Cupydo és Párom.hu között**, azaz havi 50,000–500,000 látogatás, amiből 5,000–20,000 MAU.

---

## 4. A hálózati hatás problémája — területi bontás

A H₀-t az **összpiacra** vizsgáljuk (minden user generál bevételt), de a **felhasználói élmény** területenként működik: ha valaki Debrecenben keres teniszpartnert és nincs ott senki, akkor lelép — és soha nem tér vissza.

### Minimum kritikus tömeg területenként

Ahhoz, hogy egy user reálisan partnert találjon, becsült minimum:

| | Minimum aktív user | Indoklás |
|--|-------------------|----------|
| Ütős sport (1-on-1) | ~50–100/város | Elég, ha van 3-5 kompatibilis személy |
| Csapatsport (5v5 foci) | ~200–500/város | 10 ember kell egy meccshez |

### Területi elemzés

| Terület | Potenciális user | 5% konverzió | Elég a hálózati hatáshoz? |
|---------|-----------------|-------------|--------------------------|
| **Budapest** | ~52,000 | ~2,600 | ✅ **Igen, bőven** |
| Debrecen | ~2,500 | ~125 | ⚠️ Ütős sportokhoz elég, csapathoz kevés |
| Szeged | ~2,000 | ~100 | ⚠️ Határeset |
| Miskolc | ~1,800 | ~90 | ⚠️ Határeset |
| Pécs | ~1,750 | ~88 | ⚠️ Határeset |
| Győr | ~1,600 | ~80 | ⚠️ Határeset |
| Kisebb városok egyenként | ~500–1,000 | ~25–50 | ❌ Nem elég |

### Stratégiai következmény

**Budapest-first stratégia** szükséges:
1. **Fázis 1:** Csak Budapestre fókuszálni, ott elérni a kritikus tömeget
2. **Fázis 2:** A 4-5 legnagyobb vidéki várost bekapcsolni, ha Budapesten működik
3. **Fázis 3:** Kisebb városokat csak akkor, ha organikusan jön a kereslet

A vidéki userek bevételt generálnak, de **élményt csak akkor kapnak, ha elég sokan vannak** — ezért nem szabad az erőforrásokat szétszórni.

---

## 5. A H₀ elvetésének feltételei

| Kérdés | Válasz |
|--------|--------|
| Van elég potenciális user országosan? | **Igen (~77,000)** |
| Elérhető a break-even? | **Igen, vegyes modellel ~2,000 MAU-nál** |
| Működik a hálózati hatás mindenhol? | **Nem — Budapesten igen, vidéken kérdéses** |
| Tisztán hirdetésből megéri? | **Nem** |
| Vegyes modellel megéri? | **Feltételesen igen** |

### Végső ítélet

> **A H₀ feltételesen elvethető:** A piac elég nagy ahhoz, hogy a PályaPartner Budapesten működőképes legyen vegyes bevételi modellel. De három feltétel kell egyszerre teljesüljön:
>
> 1. **Budapest-first** — ott kell először kritikus tömeget elérni
> 2. **Vegyes modell** — hirdetés + prémium + partneri díjak együtt
> 3. **~2,000 MAU** elérése Budapesten — ehhez ~8,000 regisztráció kell (a 52,000-es bázis ~15%-a)

A 15%-os konverzió ambiciózus, de a társkereső piaci benchmarkok azt mutatják, hogy **jó terméknél elérhető** — a Randivonal.hu bizonyítja, hogy Magyarországon is lehet erős niche közösségi platformot építeni.

---

## Források

- [Worldometer - Hungary Population](https://www.worldometers.info/world-population/hungary-population/)
- [Oeconomus - Így sportolunk mi](https://www.oeconomus.hu/irasok/igy-sportolunk-mi-a-nagysportagvalaszto/)
- [Nemzeti Sport - Sportolási szokások felmérés 2024](https://www.nemzetisport.hu/egyeb-egyeni/2024/04/az-elmult-evtized-legnagyobb-felmerese-zajlik-a-magyarok-sportolasi-szokasairol)
- [Magyar Nemzet - 33% sportol rendszeresen](https://magyarnemzet.hu/sport/2019/02/a-magyarok-33-szazaleka-sportol-rendszeresen)
- [KSH - Testmozgás 2019](https://www.ksh.hu/docs/hun/xftp/idoszaki/elef/testmozgas_2019/index.html)
- [Udonis - eCPM adatok](https://www.blog.udonis.co/mobile-marketing/mobile-apps/ecpms)
- [Business of Apps - Mobile CPM Rates](https://www.businessofapps.com/ads/research/mobile-app-advertising-cpm-rates/)
- [Similarweb - Randivonal.hu](https://www.similarweb.com/website/randivonal.hu/)
- [World Population Review - Hungary Cities](https://worldpopulationreview.com/cities/hungary)

---

*Készült: 2026-03-30*
