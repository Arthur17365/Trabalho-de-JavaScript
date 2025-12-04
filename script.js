let dados = {};

// Carrega o JSON
fetch("catalogo.json")
  .then(r => r.json())
  .then(j => dados = j);

// MOSTRAR CATEGORIA
function mostrarCategoria(cat) {
  let resp = document.getElementById("resp");

  // Se a categoria não existir
  if (!(cat in dados)) {
    resp.innerHTML = "<p>Categoria não encontrada.</p>";
    return;
  }

  let item = dados[cat]; // facilita: guarda os dados da categoria

  // Monta o texto inicial
  let html = "<h2>" + cat.toUpperCase() + "</h2>";
  html += "<p>" + item.descricao + "</p>";

  html += "<ul class='lista-videos'>";

  // Adiciona cada vídeo
  for (let i = 0; i < item.videos.length; i++) {
    let v = item.videos[i];
    html += "<li>";
    html += "<span>" + v.nome + "</span>";
    html += "<iframe width='250' height='150' src='" + v.url + "' allowfullscreen></iframe>";
    html += "</li>";
  }

  html += "</ul>";

  resp.innerHTML = html;
}

// BUSCA
document.getElementById("campoBusca").addEventListener("keyup", function () {
  let termo = this.value.toLowerCase();
  let resp = document.getElementById("resp");
  let html = "";
  
  // Passa por cada categoria
  for (let cat in dados) {

    // Passa pelos vídeos da categoria
    for (let i = 0; i < dados[cat].videos.length; i++) {
      let v = dados[cat].videos[i];

      if (v.nome.toLowerCase().includes(termo)) {
        html += "<p><strong>" + cat.toUpperCase() + "</strong> — " + v.nome + "</p>";
        html += "<iframe width='250' height='150' src='" + v.url + "' allowfullscreen></iframe>";
        html += "<hr>";
      }
    }
  }

  // Se nada foi encontrado
  if (html === "") {
    html = "<p>Nada encontrado.</p>";
  }

  resp.innerHTML = html;
});
