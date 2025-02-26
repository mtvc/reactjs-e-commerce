import { useState } from "react";

import "./UsloviKoriscenja.scss";

function UsloviKoriscenja() {
  const [isClosed, setIsClosed] = useState(false);

  const closeHandler = (e) => {
    setIsClosed(true);
    e.stopPropagation();
  };

  if (isClosed) {
    return null;
  }

  return (
    <>
      <div className="close-wraper">
        <i className="bi bi-x-circle-fill close-btn" onClick={closeHandler} />
      </div>
      <div>
        <h4>OPŠTI USLOVI POSLOVANJA</h4>
        <p>
          Opšti uslovi poslovanja internet prodavnice Kanibal d.o.o. sastavljeni
          su u skladu sa Zakonom o zaštiti potrošaca i medunarodnim kodeksima
          e-poslovanja. Pri registraciji u sistem internet prodavnice, posetilac
          sajta www.kanibal.co.rs je u obavezi da popuni tražene podatke Nakon
          što se registruje, posetilac postaje korisnik i stice pravo na
          kupovinu. Minimalan iznos porudzbine nije uslovljen.
        </p>
        <h4>DOSTUPNOST INFORMACIJA</h4>
        <p>
          (sažetak Zakonodavstva) Ponudac se obavezuje, da ce kupcu uvek
          osigurati sledece informacije: podatke o preduzecu (ime i sedište
          preduzeca, PIB i maticni broj) kontakt adrese, koje omogucavaju brzu i
          efikasnu komunikaciju (e-mail, telefon) bitne karakteristike robe tj.
          usluge (ukljucujuci post-prodajne usluge i garancije) dostupnost
          proizvoda (svaki proizvod ili usluga, koja je u ponudi na internet
          stranici, trebalo bi da bude dobavljiva u razumnom roku) uslove
          dostave proizvoda ili izvršenje usluga (nacin, mesto i rok dostave)
          sve cene moraju biti jasno i nedvosmisleno odredene i vidljivo
          prikazane, sa informacijama o tome da li su ukljuceni porezi i
          troškovi prevoza nacin placanja i dostave vremensko ogranicenje ponude
          rok, u kojem je moguce odustati od ugovora i uslovi za odustajanje,
          pored toga i to, koliko kupca košta vracanje proizvoda
        </p>
        <h4>PONUDA ARTIKALA</h4>
        <p>
          Zbog prirode poslovanja preko interneta, ponuda internet prodavnice
          www.kanibal.co.rs se ažurira I menja na dnevnom nivou. Cene su
          prikazane kao redovne cene i akcijske cene. Redovne cene su
          maloprodajne cene (sa uračunatim PDV-om), nisu uračunati nikakvi
          naknadni troškovi kao što su cene dostave I eventualnog povraćaja)
          Internet cena je ona, koja vredi pri kupovini preko interneta u datom
          momentu poručivanja.{" "}
        </p>
        <h4>NAČIN PLAĆANJA</h4>
        <p>
          U Internet shopu ponuđač omogućava sledeće načine plaćanja: po
          preuzimanju (pri isporuci dostavne službe) gotovinom , po ugovorenoj
          ceni pri poručivanju robe nalogom za plaćanje na račun (po
          ponudi-predračunu) (vredi cena prikazana u Internet shopu). Plaćanje
          platnom tj. kreditnom karticom trenutno nije moguće. Kupoprodajni
          ugovor (narudžbina) je u elektronskom obliku spremljena na računaru
          ponuđača i kupcu dostupna 24 sata na dan u njegovom korisničkom
          profilu (Moj račun).{" "}
        </p>
        <h4>CENE</h4>
        <p>
          Cene prikazane na sajtu, su sa PDV-om. Cene vrede u trenutku predaje
          narudžbine i u slučaju plaćanja gore navedenim načinima plaćanja, pod
          gore navedenim uslovima.Kanibal d.o.o. garantuje da će cena proizvoda
          koja je važila u trenutku zaključivanja porudžbine ostati nepromenjena
          do trenutka preuzimanja pošiljke. Troškovi dostave na adresu nisu
          uračunati u cenu proizvoda.
        </p>
        <h4>GARANCIJA KVALITETA</h4>
        <p>
          Artikli imaju garanciju, ako je tako navedeno u garantnom listu.
          Rokovi važenja garancije su navedeni na garantnom listu ili na računu.
          Informacija o garanciji je takođe istaknuta na strani gdje je artikal
          predstavljen. Ako nema informacije o garanciji, artikal nema garanciju
          ili taj podatak u tom trenutku nije poznat. U krajnjem slučaju, kupac
          može obavestiti ponuđača, koji će osigurati ažurnu informaciju.
        </p>
        <h4>POSTUPAK KUPOVINE</h4>
        <p>
          Nakon predaje narudžbine, kupac prima obaveštenje elektronskom poštom,
          potvrdu o uspešnoj porudžbini sa sadržajom porudžbine a potom prima
          telefonski poziv u roku od 24 sata u skladu sa radnim vremenom Kanibal
          d.o.o. Kupcu su detaljni podaci o sadržaju narudžbine uvek dostupni na
          internet stranici ponuđača.
        </p>
        <h4>PRAVO O TAJNOSTI PODATAKA </h4>
        <p>
          Ponuđač se obvezuje da će čuvati sve lične podatke. Oni će biti
          korišćeni isključivo za slanje informativnog sadržaja, ponude, računa
          i eventualnih promena. Podaci korisnika ni u jednom slučaju neće biti
          predati trećoj osobi.
        </p>
        <h4>IZUZIMANJE ODGOVORNOSTI</h4>
        <p>
          Ponuđač se po svojim najboljim mogućnostima trudi da osigura ažurnost
          i pravilnost podataka, objavljenih na njegovim stranama. Usprkos tome
          može se dogoditi da se svojstva proizvoda, njihova dobavljivost
          promeni tako brzo, da ponuđač ne uspe ispraviti podatke na internet
          stranicama. U tom slučaju ponuđač je dužan da obavesti kupca o
          promenama i omogući mu odustajanje od narudžbine ili zamenu
          narudžbine. Ponuđač ne odgovara za sadržaj mišljenja o artiklima, koje
          napišu posetioci. Ponuđač mišljenja pre objave pregleda i odbije ona,
          koja sadrže očigledne neistine, uvrede ili navode na pogrešne
          zaključke. Ponuđač ne odgovara za informacije u mišljenjima i ne
          preuzima nikakvu odgovornost, koja proizlazi iz informacija o
          mišljenjima. Sve fotografije proizvoda su simbolične i zbog toga
          postoji mogućnost da se slika razlikuje od samog proizvoda.
        </p>
        <h4>PRAVO NA ODUSTAJANJE OD KUPOVINE, VRAĆANJE ROBE</h4>
        <p>
          Kupac ima pravo, da u roku od sedam (7) dana po prijemu robe, kupljenu
          robu vrati bez odštete. Kupac je dužan da snosi troškove, koji nastaju
          pri vraćanju robe (troškovi dostave). Robu je potrebno u odgovarajućoj
          ambalaži poslati na adresu: Kanibal d.o.o., Jurija Gagarina 149a/61a
          (T.C. Piramida), 11070 Novi Beograd. Proizvodi moraju biti
          nekorišćeni, neoštećeni, u originalnoj ambalaži. Mora biti priložen
          originalni revers/ račun s dopisom o količini vraćene robe i
          transakcijski račun pošiljaoca (broj bankovnog računa, i naziv banke)
          da se može izvršiti povraćaj sredstava. Ponuđač vraća ukupan iznos bez
          troškova dostave najkasnije u roku od 7 dana od primanja robe. Ponuđač
          nije dužan primiti pošiljku s otkupninom ili pošiljke, koje ne
          odgovaraju njegovim opštim uslovima poslovanja.
        </p>
        <h4>VEZE KA DRUGIM WEB LOKACIJAMA</h4>
        <p>
          Veze na ovoj lokaciji ka lokacijama samostalnih proizvođača su
          obezbeđene isključivo da bi vam olakšale rad. Ako budete koristili ove
          veze, napustićete ovu lokaciju. Kanibal d.o.o. nije pregledao sve ove
          lokacije samostalnih proizvođača i ne kontroliše ih i nije odgovoran
          za bilo koju od ovih lokacija ili njihov sadržaj. Samim tim, ne
          podržavamo i ne dajemo nikakve izjave o njima, kao ni o bilo kojim
          informacijama, softveru ili drugim proizvodima ili materijalima koji
          se tamo nalaze, ili bilo kojim rezultatima koji se mogu dobiti
          njihovim korišćenjem.
        </p>
        <h4>PRITUŽBE I SPOROVI</h4>
        <p>
          Ponuđač poštuje važeće zakonodavstvo o zaštiti potrošača. Ponuđač je
          dužan da uspostavi efikasan sistem obrade pritužbi. Kupac se može u
          slučaju pritužbe obratiti ponuđaču telefonom ili preko elektronske
          pošte. Postupak za predaju pritužbi moguć je preko elektronske pošte
          contact@kanibal.co.rs ili pismeno na adresu preduzeća. Ponuđač će u
          roku od pet radnih dana potvrditi, da je primio pritužbu i obavestiti
          kupca o toku obrade iste. Ponuđač je svestan, da je bitna
          karakteristika potrošačkog spora, barem, što se tiče sudskog postupka,
          njegov odnos između ekonomske vrednosti zahteva i troškova, koji
          nastaju kod rešavanja samog spora. To je takođe glavna prepreka, da
          potrošač ne pokrene spor kod suda. Zato se ponuđač trudi, da po svojim
          najboljim mogućnostima, sve sporove reši sporazumno.
        </p>
        <h4>KOMUNIKACIJA</h4>
        <p>
          Ponuđač sme s korisnikom stupiti u kontakt preko sredstava
          komunikacija na daljinu osim, ako se korisnik o tome izričito ne
          suprotstavi. Reklamne elektronske poruke moraju sadržati sledeće:
          moraju biti jasno i nedvosmisleno označene kao reklamne poruke
          pošiljalac mora biti jasno vidljiv različite akcije, promocije i druge
          tržišne tehnike, moraju biti označene kao takve. Upravo tako moraju
          biti jasno određeni uslovi učestvovanja u njima želju korisnika, da ne
          primaju reklamne poruke, potrebno je poštovati
        </p>
      </div>
    </>
  );
}

export default UsloviKoriscenja;
