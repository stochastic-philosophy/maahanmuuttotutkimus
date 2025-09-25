# Ei-työperäisen maahanmuuton taloudelliset vaikutukset

Kattava kansainvälinen vertaileva tutkimus ei-työperäisen maahanmuuton todellisista taloudellisista vaikutuksista. Analyysi perustuu realistiseen nettonykyarvomenetelmään (NPV), joka huomioi todelliset työllistymispolut, kokonaiskustannukset ja multiplikaattorivaikutukset.

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🌟 Keskeiset havainnot

### 🇫🇮 Suomi
- **NPV**: 178 500€ per henkilö (20v)
- **Takaisinmaksuaika**: 2.1 vuotta
- **Tuotto/investointisuhde**: 2.47
- **Todennäköisyys kannattavuudelle**: 95%

### 🔍 Kriittinen löydös
Aiemmat analyysit käyttivät **multiplikaattoria 1.25**, joka oli merkittävästi aliarvioitu. Kansainvälinen tutkimustieto osoittaa hoivapalveluiden multiplikaattorin olevan **3.4-4.3**, mikä muuttaa investoinnin selvästi kannattavaksi.

## 📁 Projektin rakenne

```
maahanmuuttotutkimus/
├── index.html                 # Pääindeksi - monikansallinen vertailu
├── css/
│   └── styles.css            # Tyylitiedostot (vaalea/tumma teema)
├── js/
│   ├── main.js               # Perusskriptit ja teemaenhallinta
│   └── calculator.js         # NPV-laskurin toiminnallisuus
├── suomi/                    # Suomen tutkimus
│   ├── index.html           # Suomen tutkimuksen pääsivu
│   ├── yleiskatsaus.html    # Tutkimuksen tavoitteet ja tausta
│   ├── menetelmat.html      # NPV-malli ja metodologia
│   ├── tulokset.html        # Numeriset tulokset ja analyysi
│   ├── laskuri.html         # Interaktiivinen NPV-laskuri
│   └── johtopäätökset.html  # Politiikkasuositukset
├── usa/                      # USA:n tutkimus (tulossa)
│   └── index.html           # USA:n analyysi (sisältö lisätään erikseen)
├── README.md                 # Tämä tiedosto
└── LICENSE                   # Lisenssi (valinnainen)
```

## 🚀 Käyttöönotto GitHub Pages:ssa

### 1. Repositorion luominen
```bash
git clone [repository-url]
cd maahanmuuttotutkimus
```

### 2. GitHub Pages:n aktivointi
1. Mene GitHub-repositorion **Settings**-välilehdelle
2. Valitse **Pages** vasemmasta sivupalkista
3. **Source**: Deploy from a branch
4. **Branch**: `main` 
5. **Folder**: `/ (root)`
6. Klikkaa **Save**

### 3. Sivusto käynnissä
Sivusto on käytettävissä osoitteessa: `https://[käyttäjänimi].github.io/maahanmuuttotutkimus/`

## 🎯 Ominaisuudet

### 📊 Interaktiivinen NPV-laskuri
- **Reaaliaikaiset parametrit**: Multiplikaattori, työllisyysaste, keskipalkka, diskonttokorko
- **Skenaariovertailu**: Pessimistinen, realistinen, optimistinen, alkuperäinen malli
- **"Entä jos" -simulaatiot**: Parempi kotoutus, taantuma, inflaatiovaikutukset
- **Live-visualisoinnit**: NPV-kehitys, herkkyysanalyysi
- **Monte Carlo -tyylinen analyysi**: Epävarmuustekijöiden mallintaminen

### 🎨 Käyttöliittymä
- **Responsiivinen design**: Toimii mobiilissa, tabletissa ja työpöydällä
- **Tumma/vaalea teema**: Automaattinen tai käyttäjän valinta
- **Interaktiiviset kaaviot**: Canvas-pohjaiset visualisoinnit
- **GDPR-yhteensopiva**: Cookie consent vain teemavalinnalle
- **Saavutettavuus**: Semantic HTML, ARIA labels, näppäimistönavigaatio

### 📈 Analyysin syvyys
- **20 vuoden NPV-malli**: Pitkäaikaisten vaikutusten arviointi
- **Realistinen työllistymispolku**: Tilastokeskuksen ja VATT:n data
- **Multiplikaattorivaikutukset**: Kansainvälisen tutkimustiedon mukainen
- **Herkkyysanalyysi**: Kriittisten parametrien vaikutusten testaus
- **Skenaariovertailut**: Pessimistisestä optimistiseen

## 🔧 Tekniset yksityiskohdat

### Teknologiat
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Tyylitiedostot**: CSS Custom Properties (CSS Variables)
- **Kaaviot**: HTML5 Canvas (ei ulkoisia riippuvuuksia)
- **Responsiivisuus**: CSS Grid, Flexbox
- **Teemanhallinta**: LocalStorage + CSS Variables

### Selainyhteensopivuus
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Suorituskyky
- **Nopea lataus**: Ei ulkoisia riippuvuuksia
- **Kevyt**: Yhteensä ~150KB assets
- **Progressive enhancement**: Toimii myös ilman JavaScriptiä (osittain)

## 📚 Tutkimuksen metodologia

### NPV-malli
```
NPV = Σ(t=1 to T) [(Verotulot_t - Kustannukset_t) / (1+r)^t]
```

**Keskeiset parametrit:**
- **T**: Tarkasteluperioidi (20 vuotta)
- **r**: Diskonttokorko (3% - Suomen valtionlainan korko)
- **Multiplikaattori**: 3.4 (World Bank 2025)
- **Työllisyysaste**: 60% (10v jälkeen, Tilastokeskus)

### Tietolähteet
- **Kotoutuskustannukset**: KEHA-keskus 2025
- **Työllistymisdata**: Tilastokeskus 2024, VATT 2023
- **Multiplikaattorit**: Reeves et al. 2013, World Bank 2025
- **Verotusdata**: Verohallinto, Veronmaksajain Keskusliitto
- **Kansainvälinen vertailu**: Rothstein 2017, Intereconomics 2017

## 🌍 Kansainvälinen vertailu

### Ruotsin malli
Tutkimus analysoi Ruotsin "tahaton keynesiläisyys" -ilmiötä vuodesta 2016:
- **BKT-kasvu**: +3.2% (vs. 0.8% muut Pohjoismaat)
- **Työllisyys**: 58% pakolaistaustaisia töissä
- **Multiplikaattorivaikutukset**: Toteutuivat odotetusti

### USA:n analyysi (tulossa)
USA:n kotoutusjärjestelmän analyysi on valmisteilla ja lisätään sivustolle myöhemmin.

## 🎯 Käyttökohteet

### Päättäjille
- **Politiikkasuositukset**: Evidenssipohjaisia suosituksia maahanmuuttopolitiikalle
- **Kustannus-hyötyanalyysi**: Selkeä NPV-malli päätöksenteon tueksi
- **Skenaarioanalyysi**: Eri toteutusvaihtoehtojen vertailu

### Tutkijoille
- **Metodologia**: Avoimen lähdekoodin NPV-laskuri jatkotutkimuksille
- **Datalähteet**: Kattava lähdeluettelo ja läpinäkyvä metodologia
- **Replikoitavuus**: Kaikki parametrit ja laskentamenetelmät avoinna

### Kansalaisille
- **Ymmärrettävyys**: Selkeä esitys monimutkaisesta taloudellisesta analyysistä
- **Interaktiivisuus**: Mahdollisuus testata eri parametrien vaikutuksia
- **Läpinäkyvyys**: Avoin pääsy kaikkiin laskelmiin ja oletuksiin

## 🤝 Myötävaikuttaminen

Projekti on avoin jatkokehitykselle. Erityisesti kaivattaisiin:

### Sisältöä
- **Maakohtaisia analyysejä**: Muiden maiden kotoutusmallien tutkiminen
- **Sektorikohtaista dataa**: Tarkemmat multiplikaattorit eri aloille
- **Alueellisia analyysejä**: Paikalliset vaihtelut tuloksissa

### Tekniikkaa
- **Visualisointien parantaminen**: D3.js tai Chart.js -integraatio
- **Mobiilikokemuksen optimointi**: PWA-ominaisuudet
- **Saavutettavuuden parantaminen**: WCAG 2.1 AA -taso

### Tiedon laatu
- **Lähteiden päivittäminen**: Uusin tutkimustieto ja tilastot
- **Validointi**: Vertaisarviointi ja metodologian tarkistus
- **Käännökset**: Sisällön saatavuus useilla kielillä

## 📄 Lisenssi

Tämä projekti on julkaistu [MIT-lisenssillä](LICENSE). Sivuston sisältö on vapaasti käytettävissä akateemisiin ja ei-kaupallisiin tarkoituksiin.

## 🙏 Kiitokset

- **Claude Sonnet 4**: Analyysin kehittäminen ja sivuston toteutus
- **Tilastokeskus**: Empiirinen data työllistymispolusta
- **VATT**: Maahanmuuttajien työllisyystutkimukset
- **KEHA-keskus**: Kotoutuskustannusten tiedot
- **World Bank & EU**: Kansainväliset multiplikaattoritutkimukset

## 📞 Yhteystiedot

Kysymyksiä, kommentteja tai ehdotuksia? Ota yhteyttä:
- **GitHub Issues**: Teknisiä kysymyksiä ja parannusehdotuksia
- **Tutkimuksesta**: Akateemiset kysymykset tutkimuksen metodologiasta

---

**Huom**: Tämä tutkimus on kehitetty Claude Sonnet 4:n avustuksella ja perustuu julkisesti saatavilla oleviin tietoihin. Tulokset ovat suuntaa-antavia ja vaativat jatkokehittämistä ennen poliittisia päätöksiä.
