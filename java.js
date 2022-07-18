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


    'M': {//mathis
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
            base: {
                argent: "",
                nourriture: ""
            },
            normal: [],
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
        normal: "",
    },
}

let PersoActuel = 'W'
let startLoopValue = -1;

let listeJoueurs = $('#ListeJoueurs');

//loop dans le dictionaire
function loopDic(dic, inc, backKey) {
    inc += 1;
    for (let [key, value] of Object.entries(dic)) {
        if (inc == 0 && key == PersoActuel) {
            console.log(key);
            loopDic(dic[key], inc, key);
        } else if (inc != 0) {
            console.log(key)
            if (typeof(value) == 'object') {
                loopDic(dic[key], inc, key);
            } else {
                let id = "#" + key
                console.log(id);
                $(id).html(key + ": " + value)
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

$(document).ready(function(event) {
    //configure les informations
    CreateListe(joueurs);
    loopDic(joueurs, startLoopValue, "");
    SetGui();
});