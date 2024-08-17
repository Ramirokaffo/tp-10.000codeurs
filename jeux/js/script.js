// Declaration des variables

var convasWidth = 600;
var canvasHeight = 600;
var blockSize = 30;
var ctx;
var delay = 200;
var snakee;
var applee;
var widthInBlock = convasWidth / blockSize;
var heightInBlock = canvasHeight / blockSize;
var score;
var timeOut;

window.onload = function () {

    init();

    function init() {
        // Fonction d'entrée qui dessine l'espace de jeux et lance le jeux
        var canvas = document.createElement("canvas");
        canvas.width = convasWidth;
        canvas.height = canvasHeight;
        // canvas.style.border = "30px solid purple";
        // canvas.style.boxShadow = "10px 10px 15px blue"
        canvas.style.boxShadow = "9.91px 9.91px 15px #CED0D3, -9.91px -9.91px 15px #FFFFFF"
        // canvas.style.
        // canvas.style.border = "30px solid gray";
        // canvas.style.backgroundColor = "purple";
        // canvas.style.backgroundColor = "lightGray";
        canvas.style.backgroundColor = "#EEF0F4";
        canvas.style.margin = "50px auto"
        canvas.style.display = "block"
        canvas.style.borderRadius = "20px";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4], [1, 4]], "right");
        applee = new Apple([10, 10]);
        score = 0;
        refreshCanvas();
    }


    function refreshCanvas() {
        snakee.advance();
        if (snakee.checkCollision()) {
            gameOver();
        } else {
            if (snakee.isEatingApple(applee)) {
                score++;
                snakee.eateApple = true;
                do {
                    applee.setNewPosition();
                } while (applee.isOnSnake(snakee));
            }
            ctx.clearRect(0, 0, convasWidth, canvasHeight);
            drowScore();
            snakee.draw();
            applee.draw();
            timeOut = setTimeout(refreshCanvas, delay);

        }

    }

    function gameOver() {
        // Cette fonction s'execute lorsque l'utilisateur perd le jeux
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 5;
        var centerX = convasWidth / 2;
        var centerY = canvasHeight / 2;
        ctx.strokeText("Game Over", centerX, centerY - 180);
        ctx.fillText("Game Over", centerX, centerY - 180);
        ctx.font = "bold 25px sans-serif";
        ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centerX, centerY - 120);
        ctx.fillText("Appuyer sur la touche Espace pour rejouer", centerX, centerY - 120);
        ctx.restore();
    }

    function restart() {
        // Permet de redemarer le jeux
        snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4]], "right");
        applee = new Apple([10, 10]);
        score = 0;
        clearTimeout(timeOut);
        refreshCanvas();
    }

    function drowScore() {
        // Affiche le score du jeux
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var centerX = convasWidth / 2;
        var centerY = canvasHeight / 2;
        ctx.fillText(score.toString(), centerX, centerY);
        ctx.restore();
    }

    function drawBlock(ctx, position) {
        //  Dessine un point (qui constitue le corps du serpent)
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);

    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.eateApple = false;

        this.draw = function () {
            // Permet de dessiner le serpent
            ctx.save();
            ctx.fillStyle = "blue";
            // ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        };

        this.advance = function () {
            // Fait avancer le serpent
            var nextPosition = this.body[0].slice();
            switch (this.direction) {
                case "left":
                    nextPosition[0]--;
                    break;
                case "right":
                    nextPosition[0]++;
                    break;
                case "up":
                    nextPosition[1]--;
                    break;
                case "down":
                    nextPosition[1]++;
                    break;
                default:
                    throw ("Invalid direction");

            }
            this.body.unshift(nextPosition);
            if (this.eateApple) {
                this.eateApple = false;
            } else {
                this.body.pop();
            }
        };

        this.setDirection = function (newDirection) {
            // Determine la direction du serpent
            var alowwDirection;
            switch (this.direction) {
                case "left":
                case "right":
                    alowwDirection = ["up", "down"];
                    break;
                case "down":
                case "up":
                    alowwDirection = ["left", "right"];
                    break;
                default:
                    throw ("Invalid direction");

            };
            if (alowwDirection.indexOf(newDirection) > -1) {
                this.direction = newDirection;
            }
        };

        this.checkCollision = function () {
            // Cette determine s'il y a collision ou pas et retourne un booleen
            var wallColision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlock - 1;
            var maxY = heightInBlock - 1;
            var isNotBetweenHorizontalWall = snakeX < minX || snakeX > maxX;
            var isNotBetweenVericalWall = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWall || isNotBetweenVericalWall) {
                wallColision = true;
            }
            for (var i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                    break;
                }
            }
            return snakeCollision || wallColision;
        }

        this.isEatingApple = function (appleToEat) {
            // Determine si le serpent intercepte la pomme
            var head = this.body[0];
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]) {
                return true;
            } else {
                return false;
            }
        };



    }


    function Apple(position) {
        this.position = position;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize / 2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        }
        this.setNewPosition = function () {
            // Determine la nouvelle position de laa pomme de maniere aleatoire
            var newX = Math.round(Math.random() * (widthInBlock - 1));
            var newY = Math.round(Math.random() * (heightInBlock - 1));
            this.position = [newX, newY];
        };

        this.isOnSnake = function (snakeToCheck) {
            // Verifie si la nouvelle pomme se trouve ou pas sur le corps du serpent
            var isNoOnSnake = false;

            for (var i = 0; i < snakeToCheck.body.length; i++) {
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
                    isNoOnSnake = true;
                }
            }
            return isNoOnSnake;

        }
    }


    document.onkeydown = function handleDown(e) {
        // Evenement qui intercepte les touches ddu clavier
        var key = e.key;
        if (key == " ") {
            // Lorsque l'utilisateur appuie sur Espace, on redemare la jeux
            restart();
            return;
        }
        var newDirection;
        switch (key) {
            case "ArrowDown":
                newDirection = "down";
                break;
            case "ArrowUp":
                newDirection = "up";
                break;
            case "ArrowLeft":
                newDirection = "left";
                break;
            case "ArrowRight":
                newDirection = "right";
                break;
            default:
                return;
        }

        snakee.setDirection(newDirection);
    }
};




