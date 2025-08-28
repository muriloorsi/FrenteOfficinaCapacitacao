// Oque fazer:
// 7) Maior número
// Dado um array de números, escreva uma função que retorne o maior número do array.
// Exemplo: [3, 7, 2, 9] → retorna 9.

function encontrarMaiorNumero(array) {
  let maiorNumero = array[0];
  
  for (let i = 1; i < array.length; i++) {
    if (array[i] > maiorNumero) {
      maiorNumero = array[i];
    }
  }
  
  return maiorNumero;
}

let numeros = [3, 7, 2, 9, 5];
console.log(encontrarMaiorNumero(numeros));