class Block {
    constructor(camera, x, y) {
        this.position = new Vector();
        this.velocity = new Vector();
        this.friction = new Vector();
        this.size = new Vector();
        this.size.x = 10;
        this.size.y = 10;
        this.position.x = x;
        this.position.y = y;
        this.camera = camera;
    }

    update(dt) {
    }

    render(context) {
        context.fillStyle = "#0000ff";
        context.fillRect(this.position.x - this.camera.offset.x - this.size.x * 0.5,  this.camera.offset.y - this.position.y - this.size.y * 0.5, this.size.x, this.size.y);
    }

    left() {
        this.velocity.x = -10;
    }

    right() {
        this.velocity.x = 10;
    }
}