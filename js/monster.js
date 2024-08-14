'use strict'
/*

Vie et mort d'un monstre - Partie 1
Prénom : Costa 
Nom : Tran 
Formation : Ing Info Apprentissage 1

*/

const DELAI = 7000;

var name;
var life;
var money;
var awake = true;

var DOM_run = document.getElementById("run");
var DOM_fight = document.getElementById("fight");
var DOM_work = document.getElementById("work");
var DOM_sleep = document.getElementById("sleep");
var DOM_eat = document.getElementById("eat");
var DOM_show = document.getElementById("show");
var DOM_new_life = document.getElementById("new");
var DOM_kill = document.getElementById("kill");

var DOM_box = document.getElementById("actionbox");

var DOM_statut = document.getElementById("statut");

var tabAction = [courir, sebattre, travailler, manger, dormir];

var DOM_monster = document.getElementById("monster");

function initMonstre(nom, vie, argent){
    name = nom;
    life = vie;
    money = argent
}

function afficheMonstre(){
    console.log("nom : " + name + ", vie : " + life + ", argent : " + money + ", éveillé : " + awake);
    logBoite("nom : " + name + ", vie : " + life + ", argent : " + money + ", éveillé : " + awake);
}

function go(){
    initMonstre("Momo", 20, 20);
    DOM_run.addEventListener("click", courir);
    DOM_fight.addEventListener("click", sebattre);
    DOM_work.addEventListener("click", travailler);
    DOM_sleep.addEventListener("click", dormir);
    DOM_eat.addEventListener("click", manger);
    DOM_show.addEventListener("click", afficheMonstre);
    DOM_new_life.addEventListener("click", resurrection);
    DOM_kill.addEventListener("click", tuer);
    afficheMonstre();
    setInterval(actionauhasard, DELAI);
    updateStatus();
}

function logBoite(message){
    let element = document.createElement("p");
    let texte = document.createTextNode(message);
    element.appendChild(texte);
    let p = document.querySelector("#actionbox > p")
    DOM_box.insertBefore(element, p);
}

function updateStatus(){
    let vie = DOM_statut.querySelector("li:nth-child(1)");
    vie.textContent = "Vie : " + life;
    let argent = DOM_statut.querySelector("li:nth-child(2)");
    argent.textContent = "Argent : " + money;
    let eveil = DOM_statut.querySelector("li:nth-child(3)");
    if(awake){
        eveil.textContent = "Éveillé";
    }
    else if(life === 0){
        eveil.textContent = "Mort";
    }
    else {
        eveil.textContent = "Endormi";
    }

    if(life >= 20){
        DOM_monster.style.backgroundColor = "rgb(" + 0 + ", " + 0 + ", " + 255 + ")";
    }
    else if(life >= 10){
        DOM_monster.style.backgroundColor = "rgb(" + 0 + ", " + (Math.abs(life-20)/10) * 255 + ", " + (Math.abs(life-10)/10) * 255 + ")";
    }
    else{
        DOM_monster.style.backgroundColor = "rgb(" + ((10-life)*255)/10 + ", " + life/10 * 255 + ", " + 0 + ")";
    }

    DOM_monster.style.border = "solid " + money + "px black";
}

function courir(){
    if(life === 0){
        logBoite(name + " est mort... R.I.P.");
    }
    else if(life === 1){
        logBoite(name + " va mourir s'il court encore !");
    }
    else if(awake === false){
        logBoite(name + " est en train de dormir.");
    }
    else {
        life--;
        updateStatus();
        logBoite(name + " court ! -1 point de vie");
    }
}

function sebattre(){
    if(life === 0){
        logBoite(name + " est mort... R.I.P.");
    }
    else if(life <= 3){
        logBoite(name + " va mourir s'il se bat encore !");
    }
    else if(awake === false){
        logBoite(name + " est en train de dormir.");
    }
    else {
        life-=3;
        updateStatus();
        logBoite(name + " se bat ! -3 points de vie");
    }
}

function travailler(){
    if(life === 0){
        logBoite(name + " est mort... R.I.P.");
    }
    else if(life === 1){
        logBoite(name + " va mourir s'il travaille encore !");
    }
    else if(awake === false){
        logBoite(name + " est en train de dormir.");
    }
    else {
        life--;
        money+=2;
        updateStatus();
        logBoite(name + " travaille ! -1 point de vie et +2 d'argent");
    }
}

function manger(){
    if(life === 0){
        logBoite(name + " est mort... R.I.P.");
    }
    else if(money < 3){
        logBoite(name + " n'a pas assez d'argent...");
    }
    else if(awake === false){
        logBoite(name + " est en train de dormir.");
    }
    else {
        money-=3;
        life+=2;
        updateStatus();
        logBoite(name + " a mangé ! +2 points de vie et -3 d'argent");
    }
}

function dormir(){
    if(life === 0){
        logBoite(name + " est mort... R.I.P.");
    }
    else if(awake === false){
        logBoite(name + " dort déjà.");
    }
    else{
        awake = false;
        updateStatus();
        logBoite(name + " s'endort... Bonne nuit " + name + " :)");
        setTimeout(() => {
            if(life > 0 && awake === false){
                logBoite(name + " se réveille");
                awake = true;
            }
            updateStatus();
          }, "5000");          
    }
}

function actionauhasard(){
    if(life > 0){
        tabAction[Math.floor(Math.random() * tabAction.length)]();
    }
}

function resurrection(){
    if(life > 0){
        logBoite(name + " est déjà en vie");
    }
    else{
        life = 20;
        money = 20;
        awake = true;
        updateStatus()
        logBoite(name + " a ressuscité ! Longue vie au monstre !");
    }
}

function tuer(){
    if(life === 0){
        logBoite(name + " est déjà mort... R.I.P.");
    }
    else {
        life = 0;
        awake = false;
        updateStatus();
        logBoite("Vous avez tué " + name + "... R.I.P.");
    }
}

window.addEventListener("load", go);