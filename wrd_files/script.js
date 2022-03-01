$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);

$(".zaFormu").validate({

    rules:{
        Ime:{
         required:true,
         regex:/^[A-Z][a-zA-Z ]+[A-Z][a-zA-Z]+$/

        },
        Grad:{
            required:true,
         regex:/^[a-zA-Z]+$/
        },
        LicniBrojKupca:{
            required:true,
            regex:/^[I][D]\/[0-9]{3}-[0-9]{3}-[A-Z]{3}$/
            
        }
       
    },
    messages:{

        Ime:{
            required:"Ovo polje je obavezno",
            regex:"Unesite dvije rijeci s velikim pocetnim slovima"
            },
           Grad:{
               required:"Ovo polje je obavezno",
            regex:"Unesite tekstualni podatak"
           },
           LicniBrojKupca:{
            required:"Ovo polje je obavezno",
            regex:"Unesite Id u formatu ID/111-111-ABC"
           }

    }


});

function getPoziv(funk, url)
    {
                
        var zahtjev = new XMLHttpRequest();
       
        zahtjev.onload  = function() { 
                if (zahtjev.status === 200) {  
                    funk(JSON.parse(zahtjev.responseText))
                }
                else {  
                    alert("Server javlja grešku: " + zahtjev.statusText);  
                }  
        }

        zahtjev.onerror = function() {
            alert("Greška u komunikaciji sa serverom.");  
        };

        zahtjev.open("GET", url, true);
        zahtjev.send(null);
    }

urlGetAllProizvodi='http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll';

function napraviRedove(obj)
{
return `<tr>
<td>${obj.proizvodID}</td>
<td>${obj.naziv}</td>
<td>${obj.cijenaPoKvadratu}</td>
<img src="${obj.slikaUrl}"s/>
<td>${obj.likeCounter}</td>
<td><button onclick="Proizvodi(${obj.proizvodID})">Proizvodi</button></td>


</tr>`

}

function ocistiRedove()
{
    $("#tabelaProizvodi tbody").empty();
}

function ucitajPodatke(obj)
{
ocistiRedove();
for(var i=0;i<obj.length;i++)
{
    document.querySelector("#tabelaProizvodi tbody").innerHTML+=napraviRedove(obj[i]);
}

}

function pozovi()
{
    getPoziv(ucitajPodatke,urlGetAllProizvodi);
}


function ucitajPodatke(obj) {
ocistiRedove();
var najveci= 0;

for (var j = 0; j < obj.length; j++) { 
 if (obj[j].likeCounter > najveci){ 
   najveci= obj[j].likeCounter;
 }
}



for (var i = 0; i < obj.length; i++) {
 document.querySelector("#tabelaProizvodi tbody").innerHTML += napraviRedove(obj[i]);
}


document.getElementById("IzbornikStavka").onclick = function () {  
 for (var k = 0; k < obj.length; k++) {
   if (obj[k].likeCounter === najveci) {
     alert("Naziv: " + obj[k].naziv + " Cijena: " + obj[k].cijenaPoKvadratu); 
   }
 }
 
};

}







