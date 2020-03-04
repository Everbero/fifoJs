let filaArray = [];

// Sorteia N numeros
function sortN(){
	$( ".btnNumber" ).each(function( index ) {
	  // console.log( index + ": " + $( this ).text() );
	  $( this ).text(Math.floor(Math.random() * (999 - 0)) + 0);
	});
}
// coloca n numeros no array até 6 numeros
function pushN(number){
	  // se o tamanho do array for até 6 (0-5)
	  if (filaArray.length <= 5) {
	  	// coloca um item no final do array
	  	filaArray.push(number);	

	  } else{
	  	// tira o primeiro item e adiciona um item no final
	  	filaArray.shift();
	  	filaArray.push(number);	

	  }
	  showN();

}
// coloca n numeros em fila no DOM
function showN(){
	if (filaArray) {
		$( ".filaNumber" ).each(function( i ) {

			if (filaArray[i]) {
				$( this ).text(filaArray[i]);
			} 
			else {
				$( this ).text("XX");
			}


		});
	}
}

function removeN(posN){
	// splice(pos, 1)
	var pos = posN;
	pos = pos.split("pos", 2)
	// console.log("this is pos: " + pos);
	filaArray.splice(pos[1], 1);
	
	// atualiza exibição
	showN();

}

// AQUI EXECUTA NA HORA
// funcoes do ready
$(function() {
	sortN();
	$( "#sort" ).click(function() {
	  sortN();
	});
    
    $( ".btnNumber" ).click(function() {
	  pushN($(this).text());
	  console.log(filaArray);
	});

	$( ".filaNumber" ).click(function() {

	  removeN($(this).attr('id'));
	  // console.log($(this));
	  console.log(filaArray);
	});

	$( "#reset" ).click(function() {
	  location.reload()
	});

});