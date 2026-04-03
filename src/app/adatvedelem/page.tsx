export const metadata = {
  title: 'Adatvédelmi szabályzat',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#003d1a' }}>
        Adatvédelmi szabályzat
      </h1>

      <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
        <p className="text-sm text-gray-400">Hatályos: 2026. április 3.</p>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">1. Adatkezelő</h2>
          <p>
            A PályaPartner alkalmazás (palyapartner.hu) üzemeltetője: PályaPartner
            (továbbiakban: Szolgáltató). E-mail: laszlo.virtualtryon@gmail.com
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">2. Gyűjtött adatok</h2>
          <p>Az alkalmazás az alábbi személyes adatokat kezeli:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Felhasználónév (becenév)</li>
            <li>E-mail cím (regisztrációhoz és bejelentkezéshez)</li>
            <li>Város és kerület (sportpartner kereséshez)</li>
            <li>Sportágak és szintek (párosításhoz)</li>
            <li>Profilkép (opcionális, Cloudinary-n tárolva)</li>
            <li>Üzenetek tartalma (felhasználók közötti kommunikáció)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">3. Adatkezelés célja</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Felhasználói fiók létrehozása és kezelése</li>
            <li>Sportpartnerek keresése és párosítása</li>
            <li>Meccsek szervezése</li>
            <li>Felhasználók közötti üzenetváltás biztosítása</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">4. Adatkezelés jogalapja</h2>
          <p>
            Az adatkezelés a felhasználó önkéntes hozzájárulásán alapul (GDPR 6. cikk (1) bekezdés a) pont).
            A regisztrációval a felhasználó hozzájárul adatai kezeléséhez.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">5. Adatok tárolása</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Adatbázis: Neon PostgreSQL (EU régió)</li>
            <li>Alkalmazás hosting: Vercel (globális CDN)</li>
            <li>Profilképek: Cloudinary</li>
          </ul>
          <p className="mt-2">
            Az adatokat a fiók törléséig vagy a felhasználó kéréséig tároljuk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">6. Adatok megosztása</h2>
          <p>
            Személyes adatokat harmadik félnek nem adunk el és nem adjuk ki,
            kivéve a fent említett technikai szolgáltatókat (Vercel, Neon, Cloudinary),
            amelyek az alkalmazás működéséhez szükségesek.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">7. Felhasználói jogok</h2>
          <p>A felhasználónak joga van:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Hozzáférni a tárolt adataihoz</li>
            <li>Adatai módosítását kérni</li>
            <li>Adatai törlését kérni</li>
            <li>Adathordozhatóságot kérni</li>
            <li>Hozzájárulását bármikor visszavonni</li>
          </ul>
          <p className="mt-2">
            Kérését a laszlo.virtualtryon@gmail.com címre küldheti.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">8. Sütik (cookie-k)</h2>
          <p>
            Az alkalmazás kizárólag a működéshez szükséges munkamenet-sütiket használ
            (bejelentkezés fenntartása). Analitikai vagy marketing sütiket nem alkalmazunk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">9. Gyermekek védelme</h2>
          <p>
            Az alkalmazás nem gyűjt tudatosan 13 év alatti gyermekek adatait.
            A regisztráció 18 éven felülieknek szól.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">10. Kapcsolat</h2>
          <p>
            Adatvédelmi kérdésekkel forduljon hozzánk: laszlo.virtualtryon@gmail.com
          </p>
        </section>
      </div>
    </div>
  )
}
