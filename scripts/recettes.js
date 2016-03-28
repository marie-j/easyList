$(document).ready(function(){

  var liste = new browserdb("liste");
  var recettes = new browserdb("recettes");
  var recherche = new browserdb("recherche");

  var update = function(db) {
    $('.recettes').empty();
    var tmp = db.all();
    for (var i = 0; i <tmp.length ; i ++) {
      $('.recettes').append(titreRecette(tmp[i].titre,i));
    };

    $('.show').click(function(){
      show(this,db,$('div#' + this.id));
      $('div#' + this.id).append(retourAuMenu);
      this.remove();

      $('.back').click(function(){
        update(db);
      });
    });

    $('.edit').click(function(){
      var nb = this.id;
      var elem = $('div#' + nb)
      $('div#' + nb + '.ingredient').empty();

      afficherIngredients(this,db,elem);
      elem.append(enregistrer);
      elem.append(annuler);
      var recette = db.get(this.id);
      this.remove();


      var titre = recette.titre;
      var quantite = recette.personnes;
      var ingredients = recette.ingredients;

      $('.cancel').click(function(){
        var ok = window.confirm("Vous n'avez pas enregistré vos modifications ! Etes-vous sûr de vouloir quitter cette recette ?");
        if (ok) {
          update();
        }
      });

      $('.addIngredient').click(function(){
        $('div#' + this.id + '>section').append(addingredient);
      })

      $('.deleteIngredient').click(function(){
        ingredients.splice(this.id,1);
        $('div#' + this.id + '.ingredient').remove();
      });

      $('.editIngredient').click(function(){
        $('div#' + this.id + '.ingredient >p').replaceWith(modifIngredient(ingredients,this.id));
        this.remove();

        $('.valid').click(function(){
          var recherche = function(e) {
            e.ingredient == $('#nom');
          }

          var ind = ingredients.findIndex(recherche);

          ingredients.splice(ind,1);

          var i = $('#nom').val();
          var q = $('#quantite').val();
          var u = $('#unite').val();

          var newIngredient = {
            ingredient:i,
            quantite:q,
            unite:u,
          };

          ingredients.push(newIngredient);
          $('div#' + this.id + '>form').replaceWith(afficheModif(i,q,u));
          $('div#' + this.id + '>p').append(modifier(this.id));
          this.remove();

        });
      });

      $('.save').click(function(){
        var i = $('.nom');
        var q = $('.quantite');
        var u = $('.unite');
        ajouterAuTableau(ingredients,i,q,u)

        var tmp = {
          titre:recette.titre,
          personnes:recette.personnes,
          ingredients:ingredients
        }
        db.remove(nb);
        db.post(tmp);
        update(db);

      });
    });

    $('.delete').click(function(){
      suppr(this,db);
      update(db);
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

      ajouterAuTableau(tab,ingredients,quantite,unite);

      var recette = {
        titre: nom,
        personnes:$('#nombre').val(),
        ingredients: tab
      }

      recettes.post(recette);
      $('#titre').val("");
      $('#ingredients').empty();
    }


    update(recettes);
  });

  $('#lancerRecherche').click(function(){

    recherche.removeAll();
    var rs = recettes.all();
    var rcp = $('#recherche').val();
    for (var i = 0; i< rs.length ; i ++) {
      if (rs[i].titre.substring(0,rcp.length) == rcp) {
        recherche.post(rs[i]);
      }
    }
    update(recherche);
    $('.recettes').append(retourAuMenu);

    $('.back').click(function(){
      recherche.removeAll();
      $('#recherche').val("");
      update(recettes);
    });

  });

  update(recettes);

});
