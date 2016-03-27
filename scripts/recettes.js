$(document).ready(function(){

  var recettes = new browserdb("recettes");

  $('#addIngredient').click(function(){
    $('#ingredients').append(addingredient);
  });

  $('#addRecipe').click(function(){
    var nom = $('#titre').val();
    var trouve = false;

    if (nom == "") {
      window.alert("Vous n'avez pas donné de nom à votre recette");
    }

    else if (trouve) {
      window.alert("Une recette porte déjà ce nom ! Merci de bien vouloir la modifier directement ou de changer le nom que vous voulez donner à celle-la");
    }

    else {

    }
  });

});
