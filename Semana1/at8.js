// Oque fazer:
// 8) Contagem regressiva
// Faça uma função que receba um número n e mostre no console uma contagem regressiva até 0.
// Exemplo:
// 5
// 4
// 3
// 2
// 1
// 0

function contagemRegressiva(n) {
  for (let i = n; i >= 0; i--) {
    console.log(i);
  }
}

contagemRegressiva(10);