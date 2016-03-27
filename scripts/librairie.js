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
            <p>` + e + `</p>
            <button type="button" class="edit" id="` + n + `"> Modifier la recette </button>
            <button type="button" class="delete" id="` + n + `"> Supprimer la recette</button>
          </div>`
};

var afficherIngredients = function(e,db,elem) {
  var ingredients = db.get(e.id).ingredients;
  elem.append(`<button type="button" class="addIngredient" id="` + e.id  + `"> Ajouter un ingrédient </button>`)
  for (var i = 0 ; i <ingredients.length ; i ++) {
    elem.append(`<div class="ingredient" id= "` + i + `">
                  <p>` + ingredients[i].ingredient + " " + ingredients[i].quantite + " " + ingredients[i].unite + `</p>
                  <button type="button" class="editIngredient" id="` + i + `">Modfier l'ingrédient </button>
                  <button type="button" class="deleteIngredient" id="` + i + `">Supprimer l'ingrédient</button>
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
