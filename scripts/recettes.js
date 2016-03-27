$(document).ready(function(){

  var recettes = new browserdb("recettes");

  var update = function() {
    $('.recettes').empty();
    var tmp = recettes.all();
    for (var i = 0; i <tmp.length ; i ++) {
      $('.recettes').append(titreRecette(tmp[i].titre,i));
    }

    $('.edit').click(function(){
      afficherIngredients(this,recettes,$('div#' + this.id));
      this.remove();
    });

    $('.delete').click(function(){
      supprRecette(this,recettes);
      update();
    });
  }

  $('#addIngredient').click(function(){
    $('#ingredients').append(addingredient);

  });

  $('#addRecipe').click(function(){
    var nom = $('#titre').val();
    var trouve = false;
    var tab = [];

    var recherche = function (e) {
        return e.titre == nom;
    };

    if (nom == "") {
      window.alert("Vous n'avez pas donné de nom à votre recette");
    }
    else {
        var rs = recettes.all();
        var e = rs.find(recherche);
        if (e != undefined ) {
          trouve = true;
        }
    }

    if (trouve) {
      window.alert("Une recette porte déjà ce nom ! Merci de bien vouloir la modifier directement ou de changer le nom que vous voulez donner à celle-la");
    }

    else {
      var ingredients = $('.nom');
      var quantite = $('.quantite');
      var unite = $('.unite');

      for (var i=0 ; i <ingredients.length ; i++) {
        tab[i] = {
          ingredient: $(ingredients[i]).val(),
          quantite: $(quantite[i]).val(),
          unite: $(unite[i]).val()
        }
      }

      var recette = {
        titre: nom,
        personnes:$('#nombre').val(),
        ingredients: tab
      }

      recettes.post(recette);
      $('#titre').val("");
      $('#ingredients').empty();
    }


    update();
  });

  update();

});
