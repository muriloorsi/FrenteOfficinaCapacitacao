// Oque fazer:
// 6) Usuário admin
// Crie um objeto usuario com as propriedades: nome, idade, admin.
// Se admin for true, imprima "Bem-vindo, administrador".
// Caso contrário, imprima "Bem-vindo, usuário comum".


let usuario = {
  nome: "João",
  idade: 30,
  admin: true,
};

if (usuario.admin === true) {
  console.log("Bem-vindo, administrador");
} else {
  console.log("Bem-vindo, usuário comum");
}