class Chase {
    constructor(camera) {
        this.camera = camera;
        this.position = new Vector();
        this.velocity = new Vector();
        this.friction = 0.98;
        this.size = new Vector();
        this.size.x = 30;
        this.size.y = 30;
        this.position.x = this.size.x;
        this.position.y = this.size.y;
    }

    update(dt) {
        var newPos = this.position.add(this.velocity.mul(dt));
        if (newPos.x >= this.size.x * 0.5 
            && newPos.x <= this.camera.worldWidth - this.size.x * 0.5) {
            this.position.x = newPos.x;
            this.position.y = newPos.y;
        }
        this.camera.update(this.position);
        this.velocity.mulSelf(this.friction);
    }

    render(context) {
        
        context.fillStyle = "#00ff00";
        context.fillRect(this.position.x - this.camera.offset.x - this.size.x * 0.5,  this.camera.offset.y - this.position.y - this.size.y * 0.5, this.size.x, this.size.y);
    }

    left() {
        this.velocity.x = -100;
    }

    right() {
        this.velocity.x = 100;
    }
}