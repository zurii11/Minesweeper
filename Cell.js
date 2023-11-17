class Cell {
    constructor(pos, width, hasBomb) {
        this.content;
        this.pos = pos;
        this.width = width;
        this.hasBomb = hasBomb;
        this.state = State.Unopened;
    }

    show() {
        switch(this.state) {
            case State.Unopened:
                fill(242, 251, 255);
                break;
            case State.Opened:
                if(this.hasBomb) {
                    fill(230, 0, 0)
                } else {
                    fill(158, 255, 219);
                }
                break;
            case State.Flagged:
                fill(181, 255, 179);
                break;
        }
        rect(this.pos.x, this.pos.y, this.width);
        if(this.state === State.Opened && !this.hasBomb) {
            fill(0);
            text(this.content, this.pos.x + 6, this.pos.y + 15);
        }

    }

    checkPress(x, y) {
        return (x > this.pos.x && x < this.pos.x + cellW && y > this.pos.y && y < this.pos.y + cellW);
    }

    reveal() {
        this.state = State.Opened;
    }

    flag() {
        this.state = State.Flagged;
    }
}