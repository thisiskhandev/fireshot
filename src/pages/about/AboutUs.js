import React, { useEffect } from "react";
import "./about.css";

export const AboutUs = () => {
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
    <div>
      <div className="about">
        <div className="about-first-row  ">
          <div style={{ fontSize: "16px", fontWeight: "400" }}>
            <div className="about-masterfix" style={{ display: "flex" }}>
              <div
                style={{
                  borderBottom: "4px solid #00334E",
                  width: "36px",
                  height: "2px",
                }}
              ></div>
              <div
                className="ml-3"
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  marginTop: "-10px",
                  letterSpacing: "2.8px",
                }}
              >
                APIE MASTERFIX
              </div>
            </div>
            <p
              className="mt-3 mb-4"
              style={{ fontSize: "36px", fontWeight: "700" }}
            >
              <p
                className="mb-3"
                style={{ fontSize: "36px", fontWeight: "700" }}
              >
                Kas mes esame
              </p>
              ir ką veikiame?
            </p>
            <p
              className="paragraphs para1"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              masterfix.lt – platforma, kurioje susitinka namų savininkai,
              ieškantys statybininkų ar namų remontininkų ir
              statybininkai-remontininkai. Mes siekiame padėti žmonėms surasti
              tinkamiausius paslaugų teikėjus, o šiems rasti darbų.
            </p>
          </div>
          <div className="img-wrapper">
            <img
              src="/assets/images/About/Pic.png"
              className="img-fluid"
              alt="pic"
            />
          </div>
        </div>

        <div className="about-second-row">
          <h1 className="heading">
            Mes padedame tiems, kurie nori būti patys sau bosais
          </h1>
          <div class="about-second-row-flex">
            <div class="flex-shrink-0">
              <img
                src="/assets/images/About/Image.png"
                className="img-fluid "
                alt="pic"
              />
            </div>
            <div class="flex-grow-1 ms-3  card-desc">
              <p
                className="mt-5 mb-0 card-desc"
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                }}
              >
                Man ši platforma labai patiko! <br /> Užsiregistravęs čia gavau
                daugybę darbo pasiūlymų ir mano veiklos apimtys iškilo iki
                aukštumų. Kuo dažniau lankausi šiame tinklalapyje, tuo daugiau
                darbo pasiūlymų gaunu.
              </p>
              <p
                className="mb-0"
                style={{ fontSize: "16px", fontWeight: "500" }}
              >
                Džonatanas Jozefas
              </p>
              <p style={{ fontSize: "16px", fontWeight: "400" }}>
                Master Builder grupės JoJo įkūrėjas
              </p>
            </div>
          </div>
        </div>
        <p
          className=" mt-3 paragraphs"
          style={{
            fontSize: "16px",
            fontWeight: "400",
            textAlign: "justify",
          }}
        >
          Mes žinome, kaip sunku rasti patikimą namų meistrą, todėl sukūrėme
          palengvinančią darbą platformą
          <p className="mt-4 ">
            Daugybė gerų specialistų ieško darbų, skelbia apie savo atliekamas
            paslaugas interneto platybėse, tačiau skelbimai dažnai pasimeta tarp
            gausybės informacijos. Mes siekiame, kad taip nenutiktų ir abu, tiek
            norintis remonto ar statybų paslaugų, tiek jas teikiantis lengvai
            galėtų vienas kitą surasti. Tam, kad būtų kuo greičiau sureaguota į
            siūlomą darbą mes, vis tik jūs paskelbiate jį, išsiunčiame
            pranešimus visiems tinkamiems darbą atlikti žmonėms. Susidomėję
            pasiūlymu darbuotojai gali su jumis susisiekti ir pateikti jums savo
            pasiūlymą, iš kurių galėsite pasirinkti labiausiai lūkesčius
            atitinkantį sprendimą.
          </p>
        </p>
        <div className="text-center pb-5 last">
          <img
            src="/assets/images/About/Rectangle-5.png"
            alt="pic"
            className="img-fluid"
          />

          <div
            className="mt-4"
            style={{
              fontSize: "16px",
              fontWeight: "400",
              textAlign: "left",
            }}
          >
            <p className="mb-5  ">
              Tie, kurie mąsto, kad statybininkams ir remontininkas nėra
              sudėtinga rasti užsakymų – klysta. Kartais ieškoti klientų yra
              išties sunku. Darbuotojai turi ne tik gerai dirbti, domėtis
              naujovėmis, tobulinti savo įgūdžius, bet dar ir patys ieškotis
              darbo. Masterfix pasirūpins, kad klientų paieška būtų kur kas
              lengvesnė ir paprastesnė, o klientų atsiliepimai didintų
              susidomėjimą specialistu. Tai puiki alternatyva įvairiems skelbimų
              portalams, socialiniems tinklam ar krūvoms paslaugų svetainių.
              Masterfix – viskas vienoje vietoje.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
