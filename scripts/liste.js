$(document).ready(function(){

  var liste = new browserdb("liste");
  var recettes  = new browserdb("recettes");

  var update = function() {
    $('.liste').empty();
    var tmp = liste.all();
    for (var i = 0 ; i< tmp.length; i++) {
      $('.liste').append(listeCourse(tmp[i].nom,i));
    }

    $('.check').click(function(){
      var elem = $('div#' + this.id + '>p');
      elem.replaceWith('<span style="text-decoration:line-through;">'+ elem.text() +'</span></br>');
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
        nom: $('#article').val()
      }
      liste.post(article);
    }
    else {

      var recette = (recettes.all()).find(recherche);
      if (recette == undefined) {
        window.alert("Cette recette n'est pas dans votre liste !");
      }
      else {
        var tab = recette.ingredients;
        for (var i = 0 ; i < tab.length; i++ ) {
          console.log(tab[i]);
          var article = {
            nom : tab[i].ingredient
          }
          liste.post(article);
        }
      }
    }


    $('#titre').val("");
    $('#article').val("");
    update();
  });

  update();

});
