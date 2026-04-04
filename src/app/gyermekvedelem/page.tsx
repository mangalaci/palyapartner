export const metadata = {
  title: 'Gyermekvédelmi szabályzat – Child Safety Standards',
}

export default function ChildSafetyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#003d1a' }}>
        Gyermekvédelmi szabályzat / Child Safety Standards
      </h1>

      <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
        <p className="text-sm text-gray-400">Effective: April 4, 2026 / Hatályos: 2026. április 4.</p>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">1. Overview / Áttekintés</h2>
          <p>
            PályaPartner is a sports partner finding application. We are committed to protecting children
            and maintaining a safe environment for all users. This document outlines our standards and
            practices to prevent child sexual abuse and exploitation (CSAE) on our platform.
          </p>
          <p>
            A PályaPartner egy sportpartner-kereső alkalmazás. Elkötelezettek vagyunk a gyermekek védelme
            és a biztonságos környezet fenntartása mellett minden felhasználónk számára.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">2. Age Requirement / Korhatár</h2>
          <p>
            PályaPartner is intended for users aged 16 and older. We do not knowingly allow users under
            the age of 16 to create accounts or use our services.
          </p>
          <p>
            A PályaPartner 16 éves és annál idősebb felhasználók számára készült. Nem engedélyezzük
            tudatosan, hogy 16 év alatti felhasználók fiókot hozzanak létre vagy igénybe vegyék szolgáltatásainkat.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">3. Zero Tolerance Policy / Zéró tolerancia</h2>
          <p>
            We have a zero-tolerance policy for child sexual abuse material (CSAM) and any form of child
            exploitation. Any content or behavior that exploits or endangers children will result in
            immediate account termination and reporting to the relevant authorities.
          </p>
          <p>
            Zéró toleranciát alkalmazunk a gyermekek szexuális kizsákmányolásával kapcsolatos anyagokkal (CSAM)
            és a gyermekek bármilyen kizsákmányolásával szemben. Az ilyen tartalom vagy viselkedés azonnali
            fiókfelfüggesztést és hatósági bejelentést von maga után.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">4. Reporting / Bejelentés</h2>
          <p>
            Users can report child safety concerns directly within the app or by contacting us at:{' '}
            <a href="mailto:laszlo.virtualtryon@gmail.com" className="text-green-400 underline">
              laszlo.virtualtryon@gmail.com
            </a>
          </p>
          <p>
            All reports are reviewed promptly. We cooperate with law enforcement and report to the
            National Center for Missing &amp; Exploited Children (NCMEC) and relevant regional and national
            authorities as required by law.
          </p>
          <p>
            A felhasználók az alkalmazáson belül vagy a fenti e-mail címen jelezhetik a gyermekvédelmi
            aggályaikat. Minden bejelentést haladéktalanul kivizsgálunk, és a vonatkozó jogszabályoknak
            megfelelően együttműködünk a hatóságokkal.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">5. Prevention Measures / Megelőző intézkedések</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Age restriction: minimum age of 16 to register</li>
            <li>User reporting system for inappropriate content and behavior</li>
            <li>Content moderation and review of reported accounts</li>
            <li>Immediate removal of any content violating child safety policies</li>
            <li>Cooperation with law enforcement agencies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">6. Contact / Kapcsolat</h2>
          <p>
            Designated point of contact for child safety matters:
          </p>
          <p>
            Email:{' '}
            <a href="mailto:laszlo.virtualtryon@gmail.com" className="text-green-400 underline">
              laszlo.virtualtryon@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
