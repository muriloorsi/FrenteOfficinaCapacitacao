// Oque fazer:
// 10) Decodificando JSON
// Dada a string JSON:
// let dados = '{"user":"alice","flag":"GUARDIAN{JS0N_L3AK3D}"}';
// Transforme em objeto JavaScript e mostre no console apenas o valor da flag.

let dados = '{"user":"alice","flag":"GUARDIAN{JS0N_L3AK3D}"}';

let objetoDados = JSON.parse(dados);

let flag = objetoDados.flag;

console.log(flag);