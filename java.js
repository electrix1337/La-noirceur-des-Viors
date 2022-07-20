let joueurs = {
    'copy': {
        info: {
            nom: "",
            age: "",
            race: "",
            description: "",
        },
        stats: {
            PV: "",
            PM: "",
        },
        chance: {
            physique: "",
            mental: "",
            social: "",
        },
        inventaire: {
            normal: [],
            magique: [],
        }
    },


    'W': {//William
        info: {
            nom: "Elanor Vall",
            age: "150",
            race: "elf",
            description: "",
            image: "https://cdn.discordapp.com/attachments/827288153273401384/998778982075994142/unknown.png",
            imageDimention: "1.17",
        },
        stats: {
            PV: "60/60",
            PM: "100/100",
        },
        chance: {
            physique: "25",
            mental: "70",
            social: "60",
        },

        inventaire: {
            normal: ["dague;arme;1d6"],
            magique: [],
        }
    },


    'LP': {//loui-philipe
        info: {
            nom: "Balor' Godviir",
            age: "",
            race: "",
            description: "",
            image: "https://cdn.discordapp.com/attachments/827288153273401384/999349448276713492/unknown.png",
            imageDimention: "1.37",
        },
        stats: {
            PV: "",
            PM: "",
        },
        chance: {
            physique: "",
            mental: "",
            social: "",
        },
        inventaire: {
            normal: [],
            magique: [],
        }
    },


    'M': {//mathis
        info: {
            nom: "Eviis Maltiia",
            age: "",
            race: "elf",
            description: "",
            image: "",
        },
        stats: {
            PV: "60/60",
            PM: "85/85",
        },
        chance: {
            physique: "60/100",
            mental: "70/100",
            social: "25/100",
        },
        inventaire: {
            base: {
                argent: "",
                nourriture: ""
            },
            normal: ["Arc à double décochement;arme;2d6"],
            magique: [],
        }
    },
}

let team = {
    argent: {
        bronze: "",
        argent: "",
        or: "",
    },
    nouriture: {
        normal: "100",
    },
}

let regNombre = new RegExp("^(-|-[0-9]+|[0-9]+)$");
//constantes
let longeur = 200;

let PersoActuel = 'W';
let startLoopValue = -1;

let listeJoueurs = $('#ListeJoueurs');

//loop dans le dictionaire
function loopDic(dic, inc, backKey) {
    inc += 1;
    let imagePartiel  = "";
    for (let [key, value] of Object.entries(dic)) {

        //trouve le personnage selectioné dans la liste
        if (inc == 0 && key == PersoActuel) {
            loopDic(dic[key], inc, key);

        //trouve les autre information a propos de ce personage
        } else if (inc != 0) {
            if (typeof(value) == 'object') {
                loopDic(dic[key], inc, key);
            } else {
                let id = "#" + key;
                if (key == "image") {
                    $(id).attr("src", value);
                    imagePartiel = id;
                } else if (key == "imageDimention") {
                    let hauteur = longeur * key;
                    var dimention = $(imagePartiel).css("width", longeur);
                    dimention[1] = longeur;
                    dimention[2] = hauteur;
                    console.log("test");
                } else {
                    $(id).html(key + ": " + value);
                }
            }
        }
    }
}

//créer la liste de joueurs
function CreateListe(dic) {
    let options = "";
    //créer les options
    for (let [key, value] of Object.entries(dic)) {
        if(key != 'copy') {
            options += "<option value=\"" + key + "\">" + dic[key].info.nom + "</option>\n";
        }
    }
    listeJoueurs.html(options);
    listeJoueurs.change(function(e) {
        PersoActuel = e.target.value;
        loopDic(joueurs, startLoopValue, "");
    });
}

function SetTeamGui() {
    $("#nourritureNormal").html("nourriture: " + team.nouriture.normal + " jours");
}

function PasseTemp(e) {
    team.nourriture.normal = team.nourriture.normal - $("#jourText").html()
}

function CheckNumber(e, text) {
    console.log(text.val() + e.key);
    if (!(regNombre.test(text.val() + e.key))) {
        e.preventDefault()
    }
}

$(document).ready(function(event) {
    //configure les informations
    CreateListe(joueurs);
    loopDic(joueurs, startLoopValue, "");
    SetTeamGui();

    //event
    console.log("first");
    $("#jourText").keypress(function(e) {
        CheckNumber(e, $("#jourText"));
    });
    
    $("#passeTemp").click(function(e) {
        PasseTemp(e);
    });
});