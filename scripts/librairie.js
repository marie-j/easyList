var addingredient = `<form>
                    <input type="text" placeholder="Ingredient" class="nom">
                    <input type="number" placeholder="Quantite" class="quantite">
                    <select class="unite">
                      <option selected> Unite(s) </option>
                      <option>Cuillère(s) à soupe</option>
                      <option>Cuillère(s) à café</option>
                      <option>Litre(s)</option>
                      <option>Gramme(s)</option>
                    </select>
                    </form>`;

var titreRecette = function(e,n) {
  return `<div id="` + n + `">
          <section>
            <p>` + e + `</p>
            <button type="button" class="show" id="` + n + `"> Voir la recette </button>
            <button type="button" class="edit" id="` + n + `"> Modifier la recette </button>
            <button type="button" class="delete" id="` + n + `"> Supprimer la recette</button>
          </section>
          </div>`
};

var enregistrer = `<button type="button" class="save">Enregister</button>`;

var annuler = `<button type="button" class="cancel">Annuler</button>`;

var retourAuMenu = `<button type="button" class="back">Retour au menu</button>`;

var modifier = function(i) {
  return `<button type="button" class="deleteIngredient" id="` + i + `"> Modifier l'ingrédient</button>`;
}

var afficherIngredients = function(e,db,elem) {
  var ingredients = db.get(e.id).ingredients;
  elem.append(`<button type="button" class="addIngredient" id="` + e.id  + `"> Ajouter un ingrédient </button>`);
  for (var i = 0 ; i <ingredients.length ; i ++) {
    elem.append(`<div class="ingredient" id= "` + i + `">
                  <p>` + ingredients[i].ingredient + " " + ingredients[i].quantite + " " + ingredients[i].unite + `</p>
                  <button type="button" class="editIngredient" id="` + i + `">Modfier l'ingrédient </button>
                  <button type="button" class="deleteIngredient" id="` + i + `">Supprimer l'ingrédient</button>
                  </div>`);
  }
};

var show = function(e,db,elem) {
  var ingredients = db.get(e.id).ingredients;
  elem.append(`<button type="button" class="addIngredient" id="` + e.id  + `"> Ajouter un ingrédient </button>`);
  for (var i = 0 ; i <ingredients.length ; i ++) {
    elem.append(`<div class="ingredient" id= "` + i + `">
                  <p>` + ingredients[i].ingredient + " " + ingredients[i].quantite + " " + ingredients[i].unite + `</p>
                  </div>`);
}
};

var suppr = function(e, db) {
  db.remove(e.id);
};

var listeCourse = function(e,n) {
  return `<div id="` + n + `">
          <p>` + e + `</p>
          <button type="button" class="check" id="` + n + `">OK</button>
          <button type="button" class="delete" id="` + n + `">Supprimer</button>
          </div>`
};

var ajouterAuTableau= function(tab,ingredients,quantite,unite) {
  for (var i = 0; i< ingredients.length ; i ++) {
    var ingred = {
      ingredient : $(ingredients[i]).val(),
      quantite: $(quantite[i]).val(),
      unite : $(unite[i]).val()
    }
    tab.push(ingred);
  }
  return tab;

}

var modifIngredient = function(tab,indice) {
  var ingredient = tab[indice];
  var nom = ingredient.ingredient;
  var quantite = ingredient.quantite;
  var unite = ingredient.unite;
  return `<form>
          <input type="text" value ="` + nom + `" id="nom">
          <input type="number" value ="` + quantite +`" id = "quantite">
          <select value="` + unite + `" id="unite">
            <option> Unite(s) </option>
            <option>Cuillère(s) à soupe</option>
            <option>Cuillère(s) à café</option>
            <option>Litre(s)</option>
            <option>Gramme(s)</option>
          </select>
          </form>
          <button type="button" class="valid" id="` + indice + `"> Valider </button>`
          ;
};

var afficheModif = function(ingred,qtte,unite) {
  return `<p>` + ingred + " " + qtte + " " + unite + `</p>`;
}
