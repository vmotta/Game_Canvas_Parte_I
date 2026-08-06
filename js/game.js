/**
 * Game Canvas — Parte I
 *
 * Conceitos demonstrados:
 * - criação dinâmica de um elemento <canvas>;
 * - objeto JavaScript com propriedades e métodos;
 * - contexto de renderização 2D;
 * - classe para representar um componente;
 * - laço de animação com requestAnimationFrame().
 */

const GAME_CONFIG = Object.freeze({
    width: 480,
    height: 270,
    backgroundColor: "#f1f1f1",
    player: Object.freeze({
        width: 30,
        height: 30,
        color: "#d00000",
        startX: 10,
        startY: 120,
        speed: 90
    })
});

/**
 * Objeto responsável por criar e administrar a área gráfica do jogo.
 */
const gameArea = {
    canvas: document.createElement("canvas"),
    context: null,

    /**
     * Configura o Canvas e o insere no documento.
     */
    start() {
        this.canvas.id = "game-canvas";
        this.canvas.width = GAME_CONFIG.width;
        this.canvas.height = GAME_CONFIG.height;
        this.canvas.tabIndex = 0;

        this.canvas.setAttribute(
            "aria-label",
            "Área do jogo com um quadrado vermelho em movimento."
        );

        const context = this.canvas.getContext("2d");

        if (context === null) {
            throw new Error(
                "O navegador não conseguiu criar o contexto gráfico 2D."
            );
        }

        this.context = context;

        const canvasHost = document.querySelector("#canvas-host");

        if (canvasHost === null) {
            throw new Error(
                "O elemento #canvas-host não foi encontrado no HTML."
            );
        }

        /*
         * prepend() insere o Canvas no início do contêiner reservado a ele.
         * É uma alternativa moderna ao uso de insertBefore().
         */
        canvasHost.prepend(this.canvas);

        this.clear();
    },

    /**
     * Limpa o quadro anterior e redesenha o fundo da área do jogo.
     */
    clear() {
        this.assertContext();

        this.context.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.context.fillStyle = GAME_CONFIG.backgroundColor;
        this.context.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    },

    /**
     * Garante que o contexto 2D já tenha sido inicializado.
     */
    assertContext() {
        if (this.context === null) {
            throw new Error(
                "A área do jogo precisa ser iniciada antes de ser usada."
            );
        }
    }
};

/**
 * Representa um elemento retangular desenhado no Canvas.
 */
class GameComponent {
    constructor({ width, height, color, x, y, speed = 0 }) {
        this.validateDimensions(width, height);
        this.validatePosition(x, y);

        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    /**
     * Atualiza a posição horizontal usando o tempo decorrido.
     */
    move(deltaTimeInSeconds) {
        this.x += this.speed * deltaTimeInSeconds;

        if (this.x > GAME_CONFIG.width) {
            this.x = -this.width;
        }
    }

    /**
     * Desenha o componente no contexto 2D recebido.
     */
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    validateDimensions(width, height) {
        if (
            !Number.isFinite(width) ||
            !Number.isFinite(height) ||
            width <= 0 ||
            height <= 0
        ) {
            throw new TypeError(
                "A largura e a altura devem ser números positivos."
            );
        }
    }

    validatePosition(x, y) {
        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            throw new TypeError(
                "As coordenadas x e y devem ser números válidos."
            );
        }
    }
}

let player;
let previousTimestamp = null;

/**
 * Ponto de entrada da aplicação.
 */
function startGame() {
    gameArea.start();

    player = new GameComponent({
        width: GAME_CONFIG.player.width,
        height: GAME_CONFIG.player.height,
        color: GAME_CONFIG.player.color,
        x: GAME_CONFIG.player.startX,
        y: GAME_CONFIG.player.startY,
        speed: GAME_CONFIG.player.speed
    });

    requestAnimationFrame(updateGameArea);
}

/**
 * Executa um quadro da animação e agenda o próximo.
 */
function updateGameArea(timestamp) {
    const deltaTimeInSeconds =
        previousTimestamp === null
            ? 0
            : (timestamp - previousTimestamp) / 1000;

    previousTimestamp = timestamp;

    gameArea.clear();
    player.move(deltaTimeInSeconds);
    player.draw(gameArea.context);

    requestAnimationFrame(updateGameArea);
}

/*
 * Um script do tipo "module" é executado depois que o HTML foi analisado.
 * Por isso, não é necessário usar onload no <body>.
 */
startGame();
