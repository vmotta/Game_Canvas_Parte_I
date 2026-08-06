# Guia didático — Game Canvas Parte I

## 1. Visão geral

O projeto introduz a criação de jogos 2D no navegador. A proposta inicial é
simples: construir um palco gráfico, desenhar um componente vermelho e
atualizar sua posição.

Essa simplicidade permite estudar os fundamentos antes de introduzir controles,
colisões e regras de jogo.

---

## 2. O elemento Canvas

O `<canvas>` é renderizado como uma região retangular. Ele pode ser declarado
diretamente no HTML ou criado por JavaScript.

Neste projeto, ele é criado dinamicamente:

```javascript
canvas: document.createElement("canvas")
```

`document.createElement()` cria o elemento na memória. Para ele aparecer, ainda
é necessário inseri-lo no DOM.

---

## 3. Contexto de renderização

```javascript
const context = canvas.getContext("2d");
```

O método `getContext("2d")` devolve o objeto usado para desenhar.

Exemplos de operações disponíveis:

```javascript
context.fillRect(x, y, width, height);
context.clearRect(x, y, width, height);
context.fillText("Texto", x, y);
context.drawImage(image, x, y);
```

A obtenção pode falhar. Por isso, a implementação verifica se o resultado é
`null`.

---

## 4. Funções

Uma função agrupa instruções relacionadas e pode ser executada várias vezes.

```javascript
function startGame() {
    gameArea.start();
}
```

No projeto, as funções principais são:

- `startGame()`: inicia a aplicação;
- `updateGameArea()`: atualiza e redesenha cada quadro.

---

## 5. Objetos, propriedades e métodos

O objeto `gameArea` centraliza elementos da área do jogo.

```javascript
const gameArea = {
    canvas: document.createElement("canvas"),
    context: null,

    start() {
        // Inicialização
    },

    clear() {
        // Limpeza do quadro
    }
};
```

### Propriedades

Armazenam dados:

- `canvas`;
- `context`.

### Métodos

Representam comportamentos:

- `start()`;
- `clear()`;
- `assertContext()`.

A notação de ponto permite acessar os membros:

```javascript
gameArea.canvas;
gameArea.start();
```

---

## 6. A palavra-chave `this`

Dentro dos métodos de `gameArea`, `this` representa o próprio objeto:

```javascript
this.canvas.width = 480;
```

Nesse contexto, a instrução equivale a:

```javascript
gameArea.canvas.width = 480;
```

O uso de `this` facilita a referência às propriedades do objeto atual.

---

## 7. Inserção do Canvas no DOM

No exemplo introdutório, é possível utilizar:

```javascript
document.body.insertBefore(
    this.canvas,
    document.body.childNodes[0]
);
```

A leitura é:

> Dentro do `body`, insira `this.canvas` antes do primeiro nó existente.

A versão principal usa:

```javascript
canvasHost.prepend(this.canvas);
```

A intenção é a mesma, mas a inserção acontece apenas dentro do contêiner
reservado ao Canvas.

---

## 8. Sistema de coordenadas

O ponto `(0, 0)` fica no canto superior esquerdo.

```text
(0,0) ─────────────────────────→ x
  |
  |
  |
  ↓
  y
```

- `x` aumenta para a direita;
- `y` aumenta para baixo.

O componente inicial é criado em `(10, 120)`.

---

## 9. Componente do jogo

A classe `GameComponent` funciona como um modelo para os objetos gráficos.

```javascript
const player = new GameComponent({
    width: 30,
    height: 30,
    color: "#d00000",
    x: 10,
    y: 120,
    speed: 90
});
```

Cada objeto possui seu próprio estado.

### Método `draw()`

```javascript
draw(context) {
    context.fillStyle = this.color;
    context.fillRect(
        this.x,
        this.y,
        this.width,
        this.height
    );
}
```

`fillStyle` escolhe a cor e `fillRect()` desenha o retângulo.

---

## 10. Atualização e movimento

Mover um componente significa alterar suas coordenadas antes de desenhá-lo
novamente.

```javascript
this.x += this.speed * deltaTimeInSeconds;
```

A multiplicação pelo tempo decorrido mantém uma velocidade mais estável,
mesmo quando a quantidade de quadros varia entre dispositivos.

---

## 11. Laço principal

```javascript
function updateGameArea(timestamp) {
    gameArea.clear();
    player.move(deltaTimeInSeconds);
    player.draw(gameArea.context);

    requestAnimationFrame(updateGameArea);
}
```

Cada quadro segue a ordem:

1. limpar;
2. atualizar;
3. desenhar;
4. solicitar o próximo quadro.

Sem a limpeza, os desenhos anteriores permaneceriam no Canvas e formariam um
rastro.

---

## 12. `requestAnimationFrame()` e `setInterval()`

O exemplo introdutório pode utilizar:

```javascript
setInterval(updateGameArea, 20);
```

A versão principal utiliza:

```javascript
requestAnimationFrame(updateGameArea);
```

`requestAnimationFrame()` é mais adequado para animações porque:

- acompanha o ciclo de pintura do navegador;
- pausa ou reduz atividade em abas não visíveis;
- fornece o horário do quadro;
- evita depender de um intervalo fixo.

---

## 13. Sequência de aula sugerida

### Etapa 1 — Canvas vazio

Executar `exemplos/01-canvas-vazio.html`.

Questões:

- Onde o Canvas foi criado?
- Quando ele foi inserido no documento?
- Qual a diferença entre largura interna e largura visual?

### Etapa 2 — Componente estático

Executar `exemplos/02-componente-vermelho.html`.

Questões:

- O que cada argumento representa?
- Por que largura e altura iguais formam um quadrado?
- Onde está o ponto `(10, 120)`?

### Etapa 3 — Animação

Executar `exemplos/03-animacao.html`.

Questões:

- Por que limpar a tela?
- O que acontece quando `x` aumenta?
- Qual é o papel do próximo quadro?

### Etapa 4 — Organização

Comparar os exemplos de arquivo único com a estrutura final separada.

Questões:

- O que pertence ao HTML?
- O que pertence ao CSS?
- O que pertence ao JavaScript?

---

## 14. Exercício de consolidação

Crie dois componentes:

- um quadrado azul, movendo-se horizontalmente;
- um retângulo verde, movendo-se verticalmente.

Requisitos:

1. cada componente deve possuir posição própria;
2. o Canvas deve ser limpo a cada quadro;
3. os componentes devem ser redesenhados;
4. os elementos devem retornar ao lado oposto ao sair da tela;
5. não devem existir variáveis criadas sem `const` ou `let`.

---

## 15. Checklist de compreensão

O estudante consegue explicar:

- [ ] o que é o Canvas;
- [ ] o que faz `getContext("2d")`;
- [ ] a diferença entre propriedade e método;
- [ ] o significado de `this`;
- [ ] como inserir um elemento no DOM;
- [ ] os quatro parâmetros de `fillRect()`;
- [ ] o sistema de coordenadas;
- [ ] o ciclo limpar–atualizar–desenhar;
- [ ] a finalidade de `requestAnimationFrame()`.
