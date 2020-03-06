let filaArray = [];
let currentId;

// Sorteia N numeros e coloca valores nos botoes de processos
function sortN(){
	$( ".btnNumber" ).each(function( index ) {
	  $( this ).attr("value", Math.floor(Math.random() * (100 - 0)) + 0);
	});
}
// coloca o valor do botao e o html do ícone no array
function pushN(number, html){
	  // se o tamanho do array for até 6 (0-5)
	  if (filaArray.length <= 5) {
	  	// coloca um item no final do array
	  	filaArray.push({number: number, html: html});
	  } 
	  else {
		  // Caso o array esteja cheio, não adiciona mais itens e da um alerta
		$.confirm({
			useBootstrap: false,
			title: 'Não foi possível executar esta ação',
			content: 'Não há mais memória disponível para novos processos, aguarde a execução do processo atual ou retire um dos processos da fila.',
			type: 'red',
			typeAnimated: true,
			buttons: {
				fechar: function () {
				}
			}
		});
	  }
	  // Atualiza o dom
	  showN();
}

// coloca n numeros em fila no DOM
function showN(){
	// verifica se o array existe
	if (filaArray) {
		// itera por i indices com each
		$( ".filaNumber" ).each(function( i ) {
			if (filaArray[i]) {
				$( this ).html(filaArray[i].html+'<span>'+filaArray[i].number+'</span>');
				$( ".core" ).html(filaArray[0].html+'<span>'+filaArray[0].number+'</span>');
				progresso();
			} 
			else {
				$( this ).html('<i class="fas fa-memory"></i>');
			}
			
		});
	}
}
// tira um numero da fila de processamento
function removeN(posN){
	// splice(pos, 1)
	var pos = posN;
	pos = pos.split("pos", 2)
	// console.log("this is pos: " + pos);
	filaArray.splice(pos[1], 1);
	
	
	// atualiza exibição
	showN();
}

// Barra de progresso
// criar um método para parar o carregamento quando remover o processo em execução
var i = 0;

function progresso() {
  if (i == 0) {
    i = 1;
    var elem = document.querySelector(".processamento");
    var width = 1;
    currentId = setInterval(frame, filaArray[0].number);
    function frame() {
    // ao final do processamento remove o item processado	
      if (width >= 100) {
		clearInterval(currentId);
		removeN('pos0');
		i = 0;
	// se o array tiver mais de uma posicao reinicia a funcao
	// com o primeiro elemento
		if(filaArray.length >= 1){
			i = 0;
			progresso();
		}
      } else {
        width++;
        elem.style.width = width + "%";
      }
	}
  }
}

// AQUI EXECUTA NA HORA
// funcoes do ready
$(function() {
	sortN();
    
    $( ".btnNumber" ).click(function() {
	  pushN($(this).attr('value'), $(this).html());
	  // console.log(filaArray);
	});

	$( ".filaNumber" ).click(function() {
	 
	  if ( ($(this).attr('id') == 'pos0') && ( !$("#pos0 i").hasClass('fa-memory') ) ) {
		    $.confirm({
				useBootstrap: false,
				title: 'Não foi possível executar esta ação',
				content: 'Não é possível remover um processo em execução.',
				type: 'red',
				typeAnimated: true,
				buttons: {
					fechar: function () {
					}
				}
			});
		}else{
		  removeN($(this).attr('id'));
		}
	  // console.log($(this));
	  // console.log(filaArray);
	});

});