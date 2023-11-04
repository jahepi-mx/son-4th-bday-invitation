class Ball {
    constructor(camera, x, y, direction) {
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance(); 
        this.position = new Vector();
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.friction = 0.97;
        this.size = new Vector();
        this.size.x = 10;
        this.size.y = 10;
        this.position.x = x;
        this.position.y = y;
        this.camera = camera;
        this.direction = direction;
        this.acceleration.y = -10;
        this.velocity.x = 400;
        this.velocity.y = 100;
    }

    update(dt) {
        var tmp = this.position.add(this.velocity.mul(dt));
        if (tmp.y < 65) {
            this.velocity.y *= -1;
        } else {
            this.position.x = tmp.x;
            this.position.y = tmp.y;
        }
        this.velocity.mulSelf(this.friction);
        this.velocity.addSelf(this.acceleration);
    }

    render(context) {
        //context.fillStyle = "#0000ff";
        //context.fillRect(this.position.x - this.camera.offset.x - this.size.x * 0.5,  this.camera.offset.y - this.position.y - this.size.y * 0.5, this.size.x, this.size.y);
        var image = "ball_1";
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, 
            this.position.x - this.camera.offset.x - this.size.x * 0.5,  this.camera.offset.y - this.position.y - this.size.y * 0.5, this.size.x, this.size.y);
    }
}