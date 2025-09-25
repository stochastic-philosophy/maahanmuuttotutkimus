# Ei-työperäisen maahanmuuton taloudelliset vaikutukset

Tämä repositorio sisältää kattavia taloudellisia analyyseja ei-työperäisen maahanmuuton vaikutuksista eri maissa. Tutkimukset perustuvat empiiriseen dataan, virallisiin tilastoihin ja tieteellisesti perusteltuihin laskentamenetelmiin.

## 🌍 Käytettävissä olevat analyysit

### 🇫🇮 Suomi
- **Status**: ✅ Valmis
- **Aikaväli**: 20 vuoden NPV-analyysi
- **Keskeiset tulokset**: 187,000-386,000€ nettohyöty per henkilö
- **Takaisinmaksuaika**: 2.1-4.2 vuotta
- **[Tutustu analyysiin →](https://stochastic-philosophy.github.io/maahanmuutto-analyysi/suomi/)**

### 🇺🇸 Yhdysvallat  
- **Status**: 🚧 Tulossa pian
- **Keskittää**: Liittovaltion vs. osavaltioiden kustannukset
- **Vertailu**: Eurooppalaisten mallien kanssa

## 📊 Tutkimusmenetelmät

### Nettonykyarvo-analyysi (NPV)
- **Aikaväli**: 20 vuotta
- **Diskonttokorko**: 3%
- **Huomioi**: Kotoutumiskustannukset, verotulot, multiplikaattorivaikutukset

### Multiplikaattorivaikutukset
- **Hoivapalvelut**: 3.4-4.3x kerroin
- **Perustuu**: Kansainväliseen tutkimukseen (Reeves et al. 2013, World Bank 2024)
- **Kriittinen tekijä**: 30% osuus kokonaistuloista

### Aineisto
- **Viralliset lähteet**: KEHA-keskus, Tilastokeskus, Verohallinto
- **Tutkimusdata**: VATT, kansainvälinen kirjallisuus
- **Ajantasainen**: 2024-2025 tiedot

## 🎯 Keskeiset havainnot

### Suomi-analyysin tulokset

| Skenaario | Multiplikaattori | 20v NPV | Takaisinmaksu |
|-----------|------------------|---------|---------------|
| Pessimistinen | 2.5 | 187,350€ | 4.2v |
| Realistinen | 3.4 | 298,750€ | 2.8v |
| Optimistinen | 4.3 | 385,900€ | 2.1v |

### Vuosittaiset vaikutukset (täystyöllistynyt)
- **Suorat verotulot**: 10,692€ (49.3%)
- **Kulutusverot**: 4,504€ (20.8%) 
- **Välilliset verotulot**: 6,481€ (29.9%)
- **Yhteensä**: 21,677€/vuosi

## 🔧 Sivuston rakenne

```
docs/
├── index.html              # Pääsivu kaikille maille
├── css/
│   └── styles.css          # Yhteinen tyylitiedosto
├── js/
│   └── main.js             # Toiminnallisuudet ja laskuri
├── suomi/
│   ├── index.html          # Suomi-analyysin pääsivu
│   ├── pages/              # Yksityiskohtaiset alasivut
│   │   ├── taustaa.html
│   │   ├── menetelmat.html
│   │   ├── tulokset.html
│   │   ├── johtopäätökset.html
│   │   └── lähteet.html
│   └── downloads/          # PDF-raportit
└── usa/                    # Tulossa pian
```

## ⚙️ Sivuston ominaisuudet

### Tekninen toteutus
- **Responsiivinen design**: Toimii mobiilissa, tabletissa ja työpöydällä
- **Tumma/vaalea teema**: Käyttäjä voi vaihtaa teemojen välillä
- **GDPR-yhteensopiva**: Cookie consent EU-säädösten mukaan
- **Semantic HTML**: Saavutettava ja hakukoneoptimoitu

### Interaktiivisuus
- **📱 Kannattavuuslaskuri**: Säädä parametreja ja katso vaikutukset
- **📊 Skenaariosimulkaatiot**: Pessimistinen, realistinen, optimistinen
- **📈 Dynaaminen päivitys**: Reaaliaikainen laskenta
- **🎛️ Herkkyysanalyysi**: Testaa eri oletuksia

### Saavutettavuus
- **Sticky navigation**: Yläpalkki pysyy näkyvissä
- **Smooth scrolling**: Sujuva siirtyminen osioiden välillä  
- **Selkeä hierarkia**: Looginen rakenne ja navigaatio
- **Tietoturva**: Vain localStorage teemavalintaa varten

## 🚀 Käyttöönotto GitHub Pages:ssa

### Pikaloitus
1. **Forkkaa** tämä repositorio
2. **Mene Settings** > Pages
3. **Valitse Source**: "Deploy from a branch"
4. **Valitse branch**: `main` ja folder: `/ (docs)`
5. **Sivusto valmis** osoitteessa: `https://stochastic-philosophy.github.io/maahanmuutto-analyysi/`

### Mukautus
- **Päivitä tiedot**: Korvaa maakohtaiset tiedot omilla analyyseillä
- **Lisää maita**: Kopioi `suomi/`-kansion rakenne
- **Muokkaa ulkoasua**: Säädä `css/styles.css` tiedostoa
- **Laajenna toiminnallisuutta**: Kehitä `js/main.js` tiedostoa

## 📋 Vaatimukset

### Tekniset vaatimukset
- **Selaimet**: Moderni selaintuki (Chrome, Firefox, Safari, Edge)
- **JavaScript**: Toimii myös ilman JavaScriptiä (progressiivinen parantaminen)
- **Ei palvelinpuolen koodia**: Staattinen sivusto

### Sisältövaatimukset
- **Läpinäkyvyys**: Kaikki laskelmat ja oletukset avoimesti
- **Lähdeviitteet**: Jokainen väite perusteltava luotettavaan lähteeseen  
- **Tasapuolisuus**: Myös rajoitukset ja epävarmuudet esitettävä
- **Ajantasaisuus**: Tietojen päivittäminen säännöllisen epäsäännöllisesti

## 🔍 Laatu ja validointi

### Tietojen luotettavuus
- **A-taso lähteet**: Viralliset tilastot (KEHA, Tilastokeskus, Verohallinto)  
- **B-taso lähteet**: Vertaisarvioitu tutkimuskirjallisuus
- **C-taso lähteet**: Kansainväliset organisaatiot (World Bank, OECD)

### Metodologinen syvyys
- **Herkkyysanalyysi**: Testattu parametrien vaikutus tuloksiin
- **Skenaarioiden vertailu**: Pessimistinen, realistinen, optimistinen
- **Kriittinen arviointi**: Myös tutkimuksen rajoitukset tunnustettu

## 🤝 Yhteistyö ja kontribuutiot

### Toivotut kontribuutiot
- **🔢 Uusia maanalyyseee**: Saman metodologian soveltaminen muihin maihin
- **📊 Datan päivitykset**: Uusimmat tilastot ja tutkimukset  
- **🌍 Käännökset**: Sivuston kääntäminen muille kielille
- **🔧 Teknisiä parannuksia**: UX, saavutettavuus, suorituskyky

### Kontribuutioprosessi
1. **Forkkaa** repositorio
2. **Luo feature branch** (`git checkout -b uusi-ominaisuus`)
3. **Commitoi muutokset** (`git commit -am 'Lisää uusi ominaisuus'`)
4. **Push branchiin** (`git push origin uusi-ominaisuus`)
5. **Luo Pull Request**

## 📄 Lisenssi ja käyttöoikeudet

### Sisältö
- **Tutkimusanalyysit**: Vapaasti käytettävissä akateemisiin ja ei-kaupallisiin tarkoituksiin
- **Lähdeviittaus**: Mainitse lähde käyttäessä analyysejä
- **Muokkaukset sallittu**: Edellyttää alkuperäisen lähteen mainitsemista

### Koodi
- **MIT License**: Koodi vapaasti käytettävissä
- **Sivupohjat**: Vapaasti mukautettavissa omiin projekteihin
- **Komponentit**: JavaScript ja CSS komponentit uudelleenkäytettävissä

## 🔬 Tieteen ja politiikan risteyskohdassa

### Tavoite
Tuoda **evidenssipohjaista tietoa** maahanmuuttokeskustelun tueksi. Politiikka hyötyy parhaiten tosiasioihin perustuvista analyyseistä, ei ideologisista kannanotoista.

### Lähtökohtea
- **Tieteellinen objektiivisuus**: Tulokset johtavat argumentteja, eivät toisinpäin  
- **Metodologinen läpinäkyvyys**: Kaikki laskelmat tarkistettavissa
- **Poliittinen neutraaliuus**: Ei kannateta mitään puoluetta tai ideologiaa
- **Inhimillinen ulottuvuus**: Taloudellisten lukujen takana ovat ihmisten elämät

## 🛠️ Tekninen toteutus

### Käytetyt teknologiat
- **HTML5**: Semanttinen markup, saavutettavuus
- **CSS3**: Custom properties, flexbox, grid, responsiivisuus
- **Vanilla JavaScript**: Ei ulkoisia riippuvuuksia
- **GitHub Pages**: Staattinen hosting

### Suorituskyvyn optimointi
- **Minimaalinen JavaScript**: Vain tarvittavat toiminnallisuudet
- **Optimoidut kuvat**: Compressoidut ja responsiiviset
- **CSS optimointi**: Kriittinen CSS inlined
- **Lazy loading**: Sisällön lataus tarpeen mukaan

## 📞 Yhteydenotto ja palaute

### Palaute ja kysymykset
- **GitHub Issues**: Raportoi bugit tai ehdota parannuksia
- **Keskustelu**: GitHub Discussions väittelylle ja kysymyksille
- **Sähköposti**: stochasticphilosophy(at)gmail(dot)com

### Median yhteydenotot
Tutkimustulosten journalistinen käsittely on tervetullutta. Pyydämme vain huolellisuutta monimutkaisten metodologioiden selittämisessä ja kontekstin säilyttämisessä.

---

## 🤖 Tekoälyn rooli projektissa

**Tärkeä huomautus**: Tämä sivusto ja sen sisältöön analyysit on luotu **yhteistyössä Claude Sonnet 4 -tekoälyn kanssa**. Tekoäly on auttanut:

- **Datan analysoinnissa** ja laskentamallien rakentamisessa
- **Sivuston teknisessä toteutuksessa** (HTML, CSS, JavaScript)
- **Tutkimustulosten havainnollistamisessa** ja selkeyttämisessä
- **Interaktiivisten elementtien** kehittämisessä

Käyttäjät voivat itse arvioida, onko tekoälyn osallistuminen heille este sivustoon tutustumisessa. Kaikki esitetyt laskelmat, lähteet ja metodologia ovat kuitenkin tarkistettavissa riippumattomasti.

---

**📊 Evidenssipohjaiset päätökset, parempi yhteiskunta**

*"Kun politiikka perustuu tosiasioihin tiivaltteiden, tunnuksiltaan tai ideologioiden sijaan, voimme rakentaa inhimillisemmän ja taloudellisesti järkevämmän tulevaisuuden."*
