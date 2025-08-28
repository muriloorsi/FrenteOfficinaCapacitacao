// Oque fazer:
// 9) Manipulação de string
// Dada a string "FLAG{aprendendo_js}", escreva um programa que:
// Imprima a string toda em maiúsculas.
// Verifique se contém "js".
// Mostre apenas a palavra "aprendendo".

let str = "FLAG{aprendendo_js}";

console.log("String toda em maiúsculas:");
console.log(str.toUpperCase());

console.log("\nVerificando se contém 'js':");
if (str.includes("js")) {
  console.log("A string contém 'js'.");
} else {
  console.log("A string não contém 'js'.");
}

console.log("\nMostrando apenas a palavra 'aprendendo':");
let inicio = str.indexOf("aprendendo");
let fim = inicio + "aprendendo".length;
console.log(str.slice(inicio, fim));