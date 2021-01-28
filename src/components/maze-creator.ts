export default class MazeCreator {
    context: CanvasRenderingContext2D;
    width = 1000;
    height = 1000;
    data: Array<Array<number>> = [];
    solutions: Array<Array<number>> = [];
    public isAnswerShown = false;

    constructor(context) {
        this.context = context;
    }

    setup(width: number, height: number) {
        this.width = width;
        this.height = height;

        for (let i = 0; i < height; i++) {
            const wx = [];

            for (let w = 0; w < width; w++) {
                wx.push(0);
            }

            this.data.push(wx);
        }
    }

    public getData(): Array<Array<number>> {
        return this.data;
    }

    public render() {
        let wSize = (10 / this.width) * 100;
        let hSize = (10 / this.height) * 100;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.data[x][y] === 0 || (this.data[x][y] === 3 && !this.isAnswerShown)) {
                    this.context.fillStyle = '#e0d989';
                    this.context.fillRect(x * wSize, y * hSize, wSize, hSize);
                }

                if (this.data[x][y] === 1) {
                    this.context.fillStyle = '#450073';
                    this.context.fillRect(x * wSize, y * hSize, wSize, hSize);
                }

                if (this.data[x][y] === 3 && this.isAnswerShown) {
                    this.context.fillStyle = 'red';
                    this.context.fillRect(x * wSize, y * hSize, wSize, hSize);
                }


            }
        }
    }

    getRandomNumber(max): number {
        return Math.floor(Math.random() * Math.floor(max));
    }

    /**
     * @dataValue {Number('0'|'1'|'3')} Value for the solution.
     * @fromEnd Stop creating solution once certain amount from end.
     */
    createSolution(dataValue, fromEnd) {
        // 3 = solution, 0 = empty s.
        let cursor = { x: -1, y: this.getRandomNumber(this.height) };

        let end = this.getRandomNumber(this.width - fromEnd);

        if (fromEnd === 0) {
            end = this.width - 1;
        }

        while (cursor.x < end) {
            cursor = this.findNext(cursor.x, cursor.y);

            if (cursor.x > this.height - 1) {
                cursor.x = this.height - 1;
            }

            if (cursor.y > this.width - 1) {
                cursor.y = this.width - 1;
            }

            if (cursor.x < 0) {
                cursor.x = 0;
            }

            if (cursor.y < 0) {
                cursor.y = 0;
            }

            this.data[cursor.x][cursor.y] = dataValue;
        }
    }

    createSolution1() {
        let cursor = { x: -1, y: this.getRandomNumber(this.height) };

        while (cursor.x < this.width - 1) {
            cursor = this.findNext(cursor.x, cursor.y);

            if (cursor.x > this.height - 1) {
                cursor.x = this.height - 1;
            }

            if (cursor.y > this.width - 1) {
                cursor.y = this.width - 1;
            }

            if (cursor.x < 0) {
                cursor.x = 0;
            }

            if (cursor.y < 0) {
                cursor.y = 0;
            }

            try {
                this.data[cursor.x][cursor.y] = 3;

            } catch (error) {
                debugger;
            }
        }
    }

    findNext(x, y) {
        let h = this.getRandomNumber(2);
        let v = this.getRandomNumber(2);

        if (h) {
            h = this.getRandomNumber(2);
            if (h) {
                x++; // Right
            }
        } else {
            if (v) {
                y++; // Down
            } else {
                y--; // Up
            }
        }

        return { x, y };
    }

    generate() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.data[x][y] = Math.floor(Math.random() * Math.floor(2));
            }
        }

        for (let i = 0; i < 100; i++) {
            this.createSolution(0, 10);
        }

        this.createSolution(3, 0);
    }
}