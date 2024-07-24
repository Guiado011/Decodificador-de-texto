let botaoCriado = false;

function pegarDados() {
  let text = document.querySelector('.text');
  let texto = text.value;
  text.value = '';
  return texto;
}

function tratarDados(texto) {
  let textoTratado = texto.toLowerCase().replace(/[^a-z\s]/g, '');
  let resultado = '';

  for (let i = 0; i < textoTratado.length; i++) {
    switch (textoTratado[i]) {
      case "a":
        resultado += "ai";
        break;
      case "e":
        resultado += "enter";
        break;
      case "i":
        resultado += "imes";
        break;
      case "o":
        resultado += "ober";
        break;
      case "u":
        resultado += "ufat";
        break;
      case " ":
        resultado += " ";
        break;
      default:
        resultado += textoTratado[i];
    }
  }
  return resultado;
}

function visualizarTextoTratado(textoTratado) {
  let campo = document.querySelector('.box-two');
  let imagem = document.querySelector('.box-two img');
  if (imagem) {
    imagem.style.display = 'none';
  }
  let textoDescriptografado = document.querySelector('.box-two h2');
  if (textoDescriptografado) {
    textoDescriptografado.style.display = 'none';
  }
  let paragrafo = document.querySelector('.msg');
  paragrafo.style.display = 'block';
  paragrafo.textContent = textoTratado;
  if (!botaoCriado) {
    let btn = document.createElement('button');
    btn.textContent = 'Copiar';
    btn.classList.add('new-btn');
    campo.appendChild(btn);
    botaoCriado = true;

    // Adiciona o ouvinte de evento aqui para evitar múltiplas adições
    btn.addEventListener('click', copiarTexto);
  }
  paragrafo.style.color = '#0A3871';
  campo.style.justifyContent = 'space-between';
}

function copiarTexto() {
  let texto = document.querySelector('.msg').textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(texto)
      .then(() => {
        console.log('Texto copiado para a área de transferência');
        document.querySelector('.msg').style.display = 'none';
        let msg = document.querySelector('.textoCriptografado');
        if (msg) {
          msg.style.display = 'block';
          msg.textContent = 'nenhuma mensagem encontrada';
        }
      })
      .catch(error => {
        console.error('Erro ao copiar texto: ', error);
      });
  } else {
    console.warn('A API Clipboard não é suportada por este navegador');
  }
}

function criptografar() {
  let dado = pegarDados();
  let textoCriptografado = tratarDados(dado);
  visualizarTextoTratado(textoCriptografado);
}

function descriptografarDados(texto) {
  let textoDescriptografado = texto.toLowerCase();
  // Substituir as strings criptografadas por letras
  textoDescriptografado = textoDescriptografado.replace(/ai/g, 'a')
    .replace(/enter/g, 'e')
    .replace(/imes/g, 'i')
    .replace(/ober/g, 'o')
    .replace(/ufat/g, 'u');

  return textoDescriptografado;
}

function descriptografar() {
  let dado = pegarDados();
  let textoDescriptografado = descriptografarDados(dado);
  visualizarTextoTratado(textoDescriptografado);
}
