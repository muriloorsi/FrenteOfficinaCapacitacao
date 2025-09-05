# Resolução do CTF — Mini CTF em Node.js

## Visão geral

O objetivo do CTF é encontrar **duas flags** escondidas pelo servidor:

* **Flag 1**: escondida no código-fonte HTML de `/source` (comentário HTML).
* **Flag 2**: enviada no header HTTP da resposta quando a rota `/admin` é acessada com a chave correta (`?key=...`).

---

Após executar, o servidor estará rodando por padrão em `http://localhost:3000` 

---

## Resolução passo a passo

### 1️⃣ Abrir o CTF no navegador

Abra o navegador e acesse:

```
http://localhost:3000
```

Você verá a página inicial com instruções: *"Bem-vindo ao mini CTF em Node.js! Sua missão é encontrar 2 flags…"* — isso indica que deve explorar rotas.

### 2️⃣ Encontrar a primeira flag

1. Acesse a rota de dica:

```
http://localhost:3000/hint
```

2. A dica sugere acessar `/source`:

```
http://localhost:3000/source
```

3. A flag não aparece na página exibida, mas está presente no **código-fonte HTML**. No navegador pressione **Ctrl+U** (ou use "Exibir código-fonte da página").

Dentro do código-fonte você encontrará um comentário HTML contendo a flag:

```html
<!-- FLAG{primeira_flag_encontrada} -->
```

✅ **Primeira flag encontrada**: `FLAG{primeira_flag_encontrada}`

### 3️⃣ Encontrar a segunda flag

1. Acesse a rota `/admin` sem parâmetros:

```
http://localhost:3000/admin
```

A página responderá com uma mensagem de *Acesso negado* e instruirá a passar um parâmetro `?key=...`.

2. Teste a rota com a chave correta (no código padrão a chave é `segredo`):

```
http://localhost:3000/admin?key=segredo
```

3. A resposta exibirá uma mensagem indicando que você desbloqueou o modo admin. **A flag, entretanto, está no header HTTP da resposta**. Para ver o header:

* No navegador: abra DevTools (F12) → aba **Network** → recarregue `/admin?key=segredo` → clique na requisição → veja **Response Headers**.
* Usando `curl` (mais rápido):

```bash
curl -i "http://localhost:3000/admin?key=segredo"
```

Você verá algo semelhante a:

```
X-Flag: FLAG{segunda_flag_encontrada}
```

✅ **Segunda flag encontrada**: `FLAG{segunda_flag_encontrada}`

