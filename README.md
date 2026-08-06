# Game Canvas — Parte I

Projeto didático de introdução ao **HTML Canvas**, baseado no material
**Game Canvas — Parte I**, do professor **Vinícius da Rocha Motta**.

O projeto apresenta, em uma sequência progressiva, os conceitos de Canvas,
contexto 2D, funções, objetos, propriedades, métodos, componentes e animação.

## Objetivos de aprendizagem

Ao concluir esta parte, o estudante deverá ser capaz de:

1. explicar a finalidade do elemento `<canvas>`;
2. obter um contexto gráfico com `getContext("2d")`;
3. diferenciar propriedades e métodos de um objeto;
4. criar e inserir um Canvas dinamicamente no DOM;
5. representar um elemento do jogo como um componente;
6. desenhar um retângulo com `fillRect()`;
7. compreender o papel de um laço de atualização;
8. organizar HTML, CSS e JavaScript em arquivos separados.

## Resultado

Ao abrir o projeto, o navegador exibe uma área de **480 × 270 pixels**.
Um quadrado vermelho de **30 × 30 pixels** começa na posição `(10, 120)` e
se movimenta horizontalmente.

## Estrutura do repositório

```text
Game_Canvas_Parte_I/
├── css/
│   └── styles.css
├── docs/
│   └── GUIA_DIDATICO.md
├── exemplos/
│   ├── 01-canvas-vazio.html
│   ├── 02-componente-vermelho.html
│   └── 03-animacao.html
├── js/
│   └── game.js
├── .gitignore
├── index.html
└── README.md
```

## Como executar

### Opção 1 — Extensão Live Server

1. Abra a pasta no Visual Studio Code.
2. Instale a extensão **Live Server**.
3. Clique com o botão direito em `index.html`.
4. Selecione **Open with Live Server**.

### Opção 2 — Servidor local do Python

No terminal, dentro da pasta do projeto, execute:

```bash
python -m http.server 8000
```

Depois, acesse no navegador:

```text
http://localhost:8000
```

## Conceitos principais

### Canvas

O Canvas é uma superfície retangular usada para renderizar gráficos por
JavaScript. O elemento sozinho não desenha nada: ele apenas oferece a área.

### Contexto 2D

```javascript
const context = canvas.getContext("2d");
```

O contexto disponibiliza métodos e propriedades para desenhar formas, textos
e imagens.

### Objeto da área do jogo

O objeto `gameArea` reúne:

- o Canvas;
- o contexto 2D;
- o método `start()`;
- o método `clear()`.

Isso aproxima dados e comportamentos relacionados.

### Componente

A classe `GameComponent` representa um elemento retangular do jogo. Cada
instância possui dimensões, cor, posição e velocidade.

### Laço de atualização

A função `updateGameArea()`:

1. calcula o tempo decorrido;
2. limpa o quadro anterior;
3. atualiza a posição;
4. redesenha o componente;
5. solicita o próximo quadro.

## Boas práticas aplicadas

O código do material foi reorganizado sem perder sua finalidade didática.

| Prática | Aplicação |
|---|---|
| Separação de responsabilidades | HTML, CSS e JavaScript estão separados |
| Nomes descritivos | `gameArea`, `GameComponent`, `updateGameArea` |
| Constantes imutáveis | Configurações armazenadas em `GAME_CONFIG` |
| Escopo controlado | Uso de `const` e `let`, sem variáveis implícitas |
| Verificação de erros | Validação do Canvas, contexto e parâmetros |
| JavaScript modular | Uso de `<script type="module">` |
| Animação adequada | Uso de `requestAnimationFrame()` |
| Responsividade | Canvas se adapta visualmente à largura disponível |
| Acessibilidade | Títulos, descrição, foco e texto alternativo |

## Diferenças em relação à versão introdutória

### Inicialização

Versão introdutória:

```html
<body onload="startGame()">
```

Versão organizada:

```html
<script type="module" src="js/game.js"></script>
```

O módulo é executado depois que o HTML é analisado, evitando JavaScript
misturado ao HTML.

### Inserção no DOM

Versão introdutória:

```javascript
document.body.insertBefore(
    this.canvas,
    document.body.childNodes[0]
);
```

Versão organizada:

```javascript
canvasHost.prepend(this.canvas);
```

As duas inserem um elemento antes do conteúdo existente. `prepend()` torna a
intenção mais direta e limita a inserção ao contêiner reservado ao Canvas.

### Animação

Em vez de `setInterval(..., 20)`, o projeto usa
`requestAnimationFrame()`, que sincroniza a atualização com a renderização do
navegador.

## Exemplos progressivos

- `01-canvas-vazio.html`: cria apenas a área gráfica;
- `02-componente-vermelho.html`: desenha um quadrado;
- `03-animacao.html`: movimenta o quadrado;
- `index.html`: versão final organizada em arquivos separados.

## Atividades sugeridas

1. Troque a cor do componente.
2. Altere largura e altura.
3. Modifique a posição inicial.
4. Crie um segundo componente.
5. Faça o componente mover-se verticalmente.
6. Impeça o componente de sair do Canvas.
7. Mostre as coordenadas atuais na página.
8. Compare `setInterval()` com `requestAnimationFrame()`.

## Próxima parte

A continuação pode incluir controle pelo teclado, colisões, múltiplos
componentes e pontuação.
