const path = require('path');

module.exports = {
    mode: 'production',
    entry: [
        './src/logic/players/AbstractPlayerLogic.ts',
        './src/logic/players/BotPlayerLogic.ts',
        './src/logic/players/HumanPlayerLogic.ts',
        './src/logic/GameLogic.ts',
        './src/logic/GameLogicListener.ts',
        './src/logic/GameOverVerifier.ts',
        './src/logic/LogicCallback.ts',
        './src/logic/PlayerLogic.ts',
        './src/logic/SquareCollector.ts',
        './src/model/GameBoard.ts',
        './src/model/GameBoardListener.ts',
        './src/model/Player.ts',
        './src/model/Square.ts',
        './src/utils/GameBoardUtils.ts',
        './src/utils/HashSet.ts',
        './src/utils/SquareUtils.ts'
    ],
    // devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts' ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'quardratum-library.js',
    }
};