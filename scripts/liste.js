$(document).ready(function(){

  var liste = new browserdb("liste");
  var recettes  = new browserdb("recettes");
  var recherche = new browserdb("recherche");

  var update = function() {
    $('.liste').empty();
    var tmp = liste.all();
    for (var i = 0 ; i< tmp.length; i++) {
      $('.liste').append(listeCourse(tmp[i],i));
    }

    $('.check').click(function(){
      var elem = $('div#' + this.id + '>p');
      elem.replaceWith('<span style="text-decoration:line-through;">'+ elem.text() +'</span></br>');
      this.remove();

    });

    $('.delete').click(function(){
      suppr(this,liste);
      update();
    });
  }

  $('#deleteList').click(function(){
    liste.removeAll();
    update();
  });

  $('button.add').click(function(){

    var r = $('#titre').val();
    var recherche = function (e) {
        return e.titre == r;
    };

    if (r == "") {
      var article = {
        nom: $('#article').val(),
        quantite: "",
        unite : ""
      }
      liste.post(article);
    }
    else {

      var recette = (recettes.all()).find(recherche);
      if (recette == undefined) {
        window.alert("Cette recette n'est pas dans votre liste !");
      }
      else {

        var nb = $('#nombre').val();
        if (nb == "") {
          nb = recette.personnes;
        }

        if (recette.personnes == nb) {
          var coef = 1;
        }
        else {
          var coef = nb/recette.personnes;
        }

        var tab = recette.ingredients;
        for (var i = 0 ; i < tab.length; i++ ) {
          var q = tab[i].quantite * coef
          var article = {
            nom : tab[i].ingredient,
            quantite : q,
            unite: tab[i].unite
          }
          liste.post(article);
        }
      }
    }


    $('#titre').val("");
    $('#nombre').val("");
    $('#article').val("");
    update();
  });

  update();

});
