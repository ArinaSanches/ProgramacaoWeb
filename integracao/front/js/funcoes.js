function criarLinha(aluno){
	var row = document.createElement('tr');
	var cell = document.createElement('td');
	cell.appendChild(document.createTextNode(aluno.matricula));
	cell.setAttribute('onclick', 'atualzarAluno('+aluno.matricula+')');

	row.appendChild(cell);
	document.getElementById('tt').appendChild(row);

	cell = document.createElement('td');
	cell.appendChild(document.createTextNode(aluno.nome));
	cell.setAttribute('onclick', 'atualzarAluno('+aluno.matricula+')');

	row.appendChild(cell);
	document.getElementById('tt').appendChild(row);

	cell = document.createElement('td');
	var g = document.createElement("button");
	g.setAttribute("class","btn-danger")
	g.innerHTML = 'Remover';
	g.setAttribute('onclick',"removerAluno("+aluno.matricula+")"); 
	cell.appendChild(g);
	row.appendChild(cell);
	document.getElementById('tt').appendChild(row);
}

function ordenarPorMatricula(aluno1, aluno2){
	return aluno1.matricula - aluno2.matricula;
}

function exibirInfoMatricula(){

	var modal = document.getElementById('modalMatricula');
	modal.style.display = "block";	
	
	document.getElementById("inputMatricula").focus();

	window.onclick = function(event) {
		if (event.target == modal) {
			document.getElementById('inputMatricula').value='';
			modal.style.display = "none";
		}
	}	

	var cancelar = document.getElementById('btnFechar');
	cancelar.onclick = function() {
		document.getElementById('inputMatricula').value='';
		modal.style.display = "none";
	}

	var cancelar = document.getElementById("closeMat");
	cancelar.onclick = function() {
		document.getElementById('inputMatricula').value='';
		modal.style.display = "none";
	}

}

function validarMatricula(){
	var matricula = document.getElementById('inputMatricula').value;
	console.log(matricula)

	var i;
	var controle = "valido";

	for(i = 0; i < alunos.length; i++){
		if (alunos[i].matricula == matricula){
			exibirInfoMatricula();
			controle = "invalido";
		}
	}
	return controle;
}

function InserirAluno(){
	
	//var validacao = validarMatricula();

	if(document.getElementById('formulario').checkValidity()){
     	if(validarMatricula() == "valido"){
	     	if(alunos.length == 0){
				document.getElementById('tt').deleteRow(0);
			}
			
			var tableBody = document.getElementById('tt')
			
			var aluno = new Object();

			var matricula = document.getElementById('inputMatricula').value;
			var nome = document.getElementById('inputNome').value;
			var nascimento = document.getElementById('inputDataNascimento').value;
			var email = document.getElementById('inputEmail').value;
			var ddd = document.getElementById('inputDDD').value;
			var telefone = document.getElementById('inputTelefone').value;
			var operadora = document.getElementById('inputOperadora').value;
			var campus = document.getElementById('inputCampus').value;
			var curso = document.getElementById('inputCursos').value;

			var send_data = {"matricula":matricula, "nome":nome, "campi":campus, "curso":curso, "nascimento":nascimento, "email":email, "ddd":ddd, "telefone":telefone, "operadora":operadora};

			$.ajax({
				headers: { "Accept": "application/json" },
				type: "POST",
				async: false,
				crossDomain: true,
				url: "http://localhost:3001/api/alunos",
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify(send_data),
				beforeSend: function(xhr) {
					xhr.withCredentials = true;
				},
				success: function(msg) {
					console.log("okey")
				}

			})

			//alunos.push(aluno);

			/*alunos.sort(ordenarPorMatricula);

			var linhas = document.querySelectorAll("tbody tr");			

			linhas.forEach(linha => linha.parentNode.removeChild(linha));

			alunos.forEach(aluno => criarLinha(aluno));
			limparDados();*/

		}

		console.log("oi");
		return false;	
	}			
}


function removerAluno(matricula){
	var modal = document.getElementById('modalConfirmacao');
	modal.style.display = "block";

	window.onclick = function(event) {
			if (event.target == modal) {
			modal.style.display = "none";
			}
	}	

	var cancelar = document.getElementById('removerCancelar');
	cancelar.onclick = function() {
			modal.style.display = "none";
	}

	var cancelar = document.getElementById('closeConf');
	cancelar.onclick = function() {
			modal.style.display = "none";
	}

	var remover = document.getElementById('removerOk');
	remover.onclick = function() {

		var index;

		var i;
		for(i = 0; i < alunos.length; i++){
			if (alunos[i].matricula == matricula){
				index = i;
				i = alunos.length;
			}
		}

		alunos.splice(index, 1);
		
		alunos.sort(ordenarPorMatricula);

		var linhas = document.querySelectorAll("tbody tr");			

		linhas.forEach(linha => linha.parentNode.removeChild(linha));

		alunos.forEach(criarLinha);

		modal.style.display = "none";

		if(alunos.length == 0){
			var row = document.createElement('tr');
			var cell = document.createElement('td');
			cell.appendChild(document.createTextNode("Sem registros de alunos"));
			row.appendChild(cell);
			document.getElementById('tt').appendChild(row);
		}
	} 			

}

function exibirInfoAutor(){
	console.log(cursosCampus);
	var modal = document.getElementById('modalAjuda');
	modal.style.display = "block";

	window.onclick = function(event) {
		if (event.target == modal) {
		modal.style.display = "none";
		}
	}	

	var cancelar = document.getElementById('fechar');
	cancelar.onclick = function() {
		modal.style.display = "none";
	}

	var cancelar = document.getElementById('closeAjuda');
	cancelar.onclick = function() {
		modal.style.display = "none";
	}
}

function atualizarOpc(){
	var campus = document.getElementById('inputCampus').value

	var cursos = document.querySelectorAll("#inputCursos option");
	var i;
	for(i = 0; i < 3; i++){
		cursos[i].innerHTML = cursosCampus[campus][i];
	} 	
}

function limparDados(){

	document.getElementById('inputMatricula').value = "";
	document.getElementById('inputNome').value = "";
	document.getElementById('inputDataNascimento').value = "";
	document.getElementById('inputEmail').value = "";
	document.getElementById('inputDDD').value = "";
	document.getElementById('inputTelefone').value = "";
}

function carregarDados(matricula, index){
	var inputMatricula = document.getElementById('inputMatricula');
	inputMatricula.value = matricula;
	inputMatricula.setAttribute('readonly','true')

	document.getElementById('inputNome').value = alunos[index].nome;
	document.getElementById('inputDataNascimento').value = alunos[index].nascimento;
	document.getElementById('inputEmail').value = alunos[index].email;
	document.getElementById('inputDDD').value = alunos[index].ddd;
	document.getElementById('inputTelefone').value = alunos[index].telefone;
	document.getElementById('inputOperadora').value = alunos[index].operadora;
	document.getElementById('inputCampus').value = alunos[index].campus;
	atualizarOpc();
	document.getElementById('inputCursos').value = alunos[index].curso;

}

function atualzarAluno(matricula){
	var index;
	var i;
	for(i = 0; i < alunos.length; i++){
		if (alunos[i].matricula == matricula){
			index = i;
			i = alunos.length;
		}
	}

	carregarDados(matricula, index);

	var botao = document.getElementById('btnInserir'); 
	botao.innerHTML = "Alterar";

	botao.onclick = function(){
		alunos[index].nome = document.getElementById('inputNome').value;
		alunos[index].nascimento = document.getElementById('inputDataNascimento').value;
		alunos[index].email = document.getElementById('inputEmail').value;
		alunos[index].ddd = document.getElementById('inputDDD').value;
		alunos[index].telefone = document.getElementById('inputTelefone').value;
		alunos[index].operadora = document.getElementById('inputOperadora').value;
		alunos[index].campus = document.getElementById('inputCampus').value;
		alunos[index].curso = document.getElementById('inputCursos').value;

		console.log(alunos[index].curso)

		var linhas = document.querySelectorAll("tbody tr");			

		linhas.forEach(linha => linha.parentNode.removeChild(linha));

		alunos.forEach(criarLinha);

		limparDados();

		inputMatricula.removeAttribute('readonly');

		botao.onclick = InserirAluno;

		botao.innerHTML = "Inserir";

		return false;
	}

	var botaoLimpar = document.getElementById('btnLimpar');

	botaoLimpar.onclick = function(){

		limparDados();

		inputMatricula.removeAttribute('readonly');

		botao.onclick = InserirAluno;

		botao.innerHTML = "Inserir";

		return false;

	}
}	


	
function mascara(){ 

	var telefone = document.getElementById('inputTelefone');

    if(telefone.value.length == 5)
        telefone.value = telefone.value + '-'; 
}

var alunos = new Array();

var cursosCampus = {
	"Pici" : ["Computação", "Matemática", "Geologia"],
	"Benfica": ["Letras", "Filosofia", "Direito"],
	"Porangabusso" : ["Medicina", "Odontologia", "Farmácia"]
}

var campus = document.getElementById('inputCampus');
campus.addEventListener("change", atualizarOpc);

var ajuda = document.getElementById('ajuda');
ajuda.onclick = exibirInfoAutor;

var inserir = document.getElementById('btnInserir');
inserir.onclick = InserirAluno;

var limpar = document.getElementById('btnLimpar');
limpar.onclick = limparDados;

var telefone = document.getElementById('inputTelefone');
telefone.addEventListener("keyup",mascara);






