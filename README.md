# Quadratum Library (for TypeScript)

An open source library for the game "Quadratum".

The library currently includes:
- game logic
- bot logic

## What is Quadratum?

Quadratum is an Android game. The game takes place on a 8x8 board. The object of the game is to form squares using the arrangement of these pieces. The larger the square, the more points the player gets. 

In order to win the game you must satisfy the following conditions:

1. You must have at least 150 points.
1. And you must at least be 15 points ahead of your opponent.

## Usage

The usage of the library is very simple. Start with the following example:

```TypeScript
// Initialize the game:

let player1 = new Player('player1');
let player2 = new Player('player2');

let gameBoard = new GameBoard(player1, player2);
gameBoard.addGameBoardListener(boardListener);

let playerLogic1 = new HumanPlayerLogic(player1);
let playerLogic2 = new HumanPlayerLogic(player2);

let gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);
gameLogic.addGameLogicListener(logicListener);

// Start the game:

gameLogic.startGame(player1);

// Play the game:

playerLogic1.placePiece(1);

playerLogic2.placePiece(40);
```

## Write your own bot logic

If you want to write your own bot logic, you can implement the interface `IPlayerLogic`.

```TypeScript
interface PlayerLogic {

  getPlayer(): Player;

  requestMove(IReadOnlyGameBoard gameBoard, ILogicCallback callback): void;

}
```

If you want to learn how to do that, take a look at the class `BotPlayerLogic`.
