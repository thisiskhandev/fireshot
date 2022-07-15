import React, { useEffect } from "react";
import "./privacy.css";

export const PrivacyPolicy = () => {
  useEffect(() => {
    try {
      // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="my-5 pb-5">
      <div className="about">
        <div style={{ fontSize: "16px", fontWeight: "400" }}>
          <p
            className="mt-3 mb-4"
            style={{ fontSize: "36px", fontWeight: "700" }}
          >
            <h1
              className="mb-3"
              style={{ fontSize: "36px", fontWeight: "700" }}
            >
              "MasterFix" privatumo politika
            </h1>
          </p>
          <p
            className="paragraphs para1"
            style={{ fontSize: "14px", fontWeight: "400" }}
          >
            "MasterFix" svetainėje, pasiekiamoje iš www.masterfix.lt, vienas iš
            pagrindinių mūsų prioritetų yra lankytojų privatumas. Šiame
            privatumo politikos dokumente pateikiami "MasterFix" renkamos ir
            įrašomos informacijos tipai ir kaip ją naudojame.
          </p>
          <p>
            Jei turite papildomų klausimų arba norite gauti daugiau informacijos
            apie mūsų privatumo politiką, nedvejodami susisiekite su mumis.
          </p>
          <p>
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in MasterFix. This policy is not
            applicable to any information collected offline or via channels
            other than this website.
          </p>
        </div>
        <h2 className="heading">Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>
        <h2 className="heading">Renkama informacija</h2>
        <p>
          Asmeninė informacija, kurią prašoma pateikti, ir priežastys, dėl kurių
          prašoma ją pateikti, jums bus paaiškintos tuo metu, kai prašysime
          pateikti asmeninę informaciją.
        </p>
        <p>
          Jei su mumis susisieksite tiesiogiai, galime gauti papildomos
          informacijos apie jus, pavyzdžiui, jūsų vardą ir pavardę, el. pašto
          adresą, telefono numerį, žinutės turinį ir (arba) priedus, kuriuos
          galite mums siųsti, ir bet kokią kitą informaciją, kurią galite
          nuspręsti pateikti.
        </p>
        <p>
          Kai registruojatės paskyroje, galime paprašyti jūsų kontaktinės
          informacijos, įskaitant tokius elementus kaip vardas, pavardė, įmonės
          pavadinimas, adresas, el. pašto adresas ir telefono numeris.
        </p>
        <h2 className="heading">Kaip naudojame jūsų informaciją</h2>
        <p>We use the information we collect in various ways, including to:</p>
        <p>
          <ul>
            <li>teikti, valdyti ir prižiūrėti mūsų svetainę.</li>
            <li>tobulinti, personalizuoti ir plėsti mūsų svetainę.</li>
            <li>suprasti ir analizuoti, kaip naudojatės mūsų svetaine.</li>
            <li>Naujų produktų, paslaugų, funkcijų ir funkcionalumo kūrimas</li>
            <li>
              bendrauti su jumis tiesiogiai arba per vieną iš mūsų partnerių,
              įskaitant klientų aptarnavimo, atnaujinimų ir kitos su svetaine
              susijusios informacijos teikimo, rinkodaros ir reklamos tikslais.
            </li>
            <li>Siųsti jums el. laiškus</li>
            <li>Ieškoti sukčiavimo atvejų ir užkirsti jiems kelią</li>
          </ul>
        </p>
        <h2 className="heading">Žurnalo failai</h2>
        <p>
          "MasterFix" laikosi standartinės žurnalo failų naudojimo procedūros.
          Šie failai registruoja lankytojus, kai jie lankosi svetainėse. Tai
          daro visos prieglobos paslaugas teikiančios bendrovės ir tai yra
          prieglobos paslaugų analizės dalis. Žurnalo failuose renkama
          informacija apima interneto protokolo (IP) adresus, naršyklės tipą,
          interneto paslaugų teikėją (IPT), datos ir laiko žymą,
          nukreipiamuosius / išeinamuosius puslapius ir galbūt paspaudimų
          skaičių. Šie duomenys nesusiję su jokia asmeniškai identifikuojama
          informacija. Šios informacijos paskirtis - analizuoti tendencijas,
          administruoti svetainę, sekti naudotojų judėjimą svetainėje ir rinkti
          demografinę informaciją. Translated with www.DeepL.com/Translator
          (free version)
        </p>
        <h2 className="heading">Slapukai ir žiniatinklio švyturiai</h2>
        <p>
          Kaip ir bet kuri kita svetainė, "MasterFix" naudoja slapukus. Šie
          slapukai naudojami informacijai, įskaitant lankytojų nuostatas ir
          svetainės puslapius, kuriuos lankytojas aplankė. Ši informacija
          naudojama siekiant optimizuoti naudotojų patirtį, pritaikant mūsų
          tinklalapio turinį pagal lankytojų naršyklės tipą ir (arba) kitą
          informaciją.
        </p>
        <h2 className="heading">"Google DoubleClick" DART slapukas</h2>
        <p>
          "Google" yra viena iš mūsų svetainės trečiųjų šalių pardavėjų. Ji taip
          pat naudoja slapukus, vadinamus DART slapukais, kad mūsų svetainės
          lankytojams rodytų skelbimus pagal jų apsilankymą www.website.com ir
          kitose interneto svetainėse. Tačiau lankytojai gali atsisakyti naudoti
          DART slapukus apsilankę "Google" skelbimų ir turinio tinklo privatumo
          politikoje šiuo adresu -{" "}
          <p> https://policies.google.com/technologies/ads</p>
        </p>
        <h2 className="heading">Mūsų reklamos partneriai</h2>
        <p>
          Some of advertisers on our site may use cookies and web beacons. Our
          advertising partners are listed below. Each of our advertising
          partners has their own Privacy Policy for their policies on user data.
          For easier access, we hyperlinked to their Privacy Policies below.
        </p>
        <p>https://policies.google.com/technologies/ads</p>
        <h2 className="heading">Reklamos partneriai Privatumo politika</h2>
        <p>
          Šiame sąraše galite rasti kiekvieno "MasterFix" reklamos partnerio
          privatumo politiką.
        </p>
        <p>
          Trečiųjų šalių skelbimų serveriai arba skelbimų tinklai naudoja tokias
          technologijas kaip slapukai, JavaScript arba žiniatinklio švyturiai,
          kurie yra naudojami atitinkamuose jų skelbimuose ir nuorodose,
          rodomose "MasterFix", kurie yra siunčiami tiesiai į naudotojų
          naršyklę. Tokiu atveju jie automatiškai gauna jūsų IP adresą. Šios
          technologijos naudojamos jų reklamos kampanijų veiksmingumui matuoti
          ir (arba) reklamos turiniui, kurį matote lankomose svetainėse,
          pritaikyti.
        </p>
        <p>
          Note that MasterFix has no access to or control over these cookies
          that are used by third-party advertisers.
        </p>
        <h2 className="heading">Trečiųjų šalių privatumo politika</h2>
        <p>
          MasterFix's Privacy Policy does not apply to other advertisers or
          websites. Thus, we are advising you to consult the respective Privacy
          Policies of these third-party ad servers for more detailed
          information. It may include their practices and instructions about how
          to opt-out of certain options.
        </p>
        <p>
          You can choose to disable cookies through your individual browser
          options. To know more detailed information about cookie management
          with specific web browsers, it can be found at the browsers'
          respective websites.
        </p>
        <h2 className="heading">
          CCPA privatumo teisės (neparduokite mano asmeninės informacijos)
        </h2>
        <p>Pagal CCPA, be kitų teisių, Kalifornijos vartotojai turi teisę:</p>
        <p>
          reikalauti, kad vartotojo asmens duomenis renkanti įmonė atskleistų,
          kokių kategorijų ir kokius konkrečius asmens duomenis apie vartotojus
          ji surinko.
        </p>
        <p>
          reikalauti, kad įmonė ištrintų visus įmonės surinktus vartotojo asmens
          duomenis.
        </p>
        <p>
          reikalauti, kad įmonė, kuri parduoda vartotojo asmens duomenis,
          neparduotų vartotojo asmens duomenų.
        </p>
        <p>
          Jei pateikiate užklausą, atsakymą turime pateikti per mėnesį. Jei
          norite pasinaudoti bet kuria iš šių teisių, susisiekite su mumis.
        </p>
        <h2 className="heading">BDAR duomenų apsaugos teisės</h2>
        <p>
          Norėtume įsitikinti, kad žinote visas savo teises, susijusias su
          duomenų apsauga. Kiekvienas naudotojas turi šias teises:
        </p>
        <p>
          Teisė susipažinti - turite teisę prašyti savo asmens duomenų kopijų.
          Už šią paslaugą galime imti nedidelį mokestį.
        </p>
        <p>
          Teisė į ištaisymą - turite teisę prašyti, kad ištaisytume bet kokią
          informaciją, kuri, jūsų manymu, yra netiksli. Taip pat turite teisę
          prašyti papildyti, jūsų manymu, neišsamią informaciją.
        </p>
        <p>
          Teisė ištrinti - tam tikromis sąlygomis turite teisę prašyti, kad
          ištrintume jūsų asmens duomenis.
        </p>
        <p>
          Teisė apriboti duomenų tvarkymą - tam tikromis sąlygomis turite teisę
          prašyti, kad apribotume jūsų asmens duomenų tvarkymą.
        </p>
        <p>
          Teisė nesutikti su duomenų tvarkymu - tam tikromis sąlygomis turite
          teisę nesutikti, kad tvarkytume jūsų asmens duomenis.
        </p>
        <p>
          Teisė į duomenų perkėlimą - tam tikromis sąlygomis turite teisę
          prašyti, kad surinktus duomenis perduotume kitai organizacijai arba
          tiesiogiai jums.
        </p>
        <p>
          Jei pateikiate užklausą, atsakymą turime pateikti per mėnesį. Jei
          norite pasinaudoti bet kuria iš šių teisių, susisiekite su mumis.
        </p>
        <h2 className="heading">Informacija vaikams</h2>
        <p>
          Kitas mūsų prioritetas - užtikrinti vaikų apsaugą naudojantis
          internetu. Raginame tėvus ir globėjus stebėti, dalyvauti ir (arba)
          stebėti bei vadovauti jų veiklai internete.
        </p>
        <p>
          "MasterFix" sąmoningai nerenka jokios asmenį identifikuojančios
          informacijos iš jaunesnių nei 13 metų amžiaus vaikų. Jei manote, kad
          jūsų vaikas pateikė tokią informaciją mūsų svetainėje, primygtinai
          raginame nedelsdami susisiekti su mumis ir mes padarysime viską, ką
          galime, kad nedelsiant pašalintume tokią informaciją iš savo įrašų.
        </p>
      </div>
    </div>
  );
};
