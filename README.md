# LexiFlow

Portal para revisar os nomes de processos, formulários e campos em inglês, português e espanhol, e gerar o SQL de atualização das traduções.

Roda inteiro no navegador, sem backend: os arquivos `.mjs` usam Web Workers e SheetJS (`vendor/xlsx.mjs`) para ler as planilhas. As revisões ficam salvas no navegador de quem usa (IndexedDB); use "Cópia de segurança" para levar para outra máquina.

Baseado no protótipo LexiFlow publicado em lexiflow-prototipo.thiagoohh.chatgpt.site.

## Mudanças em relação ao original

- A aba Formulários mostra uma linha por ID de formulário, com todos os processos ligados listados embaixo do ID.
- Textos divergentes do mesmo formulário ficam marcados como "Versões divergentes", e o SQL aceita qualquer uma delas como valor atual esperado.

## Rodar localmente

Sirva a pasta com qualquer servidor estático (por exemplo `python -m http.server`) e abra `http://localhost:8000`. Abrir o `index.html` direto do disco não funciona, porque os módulos e os workers precisam de HTTP.

## Ao rodar o SQL gerado

Rode o script dentro de uma transação, confira as linhas afetadas e só então dê COMMIT. 
