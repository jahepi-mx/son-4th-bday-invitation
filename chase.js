class Chase {
    constructor(camera) {
        this.camera = camera;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance(); 
        this.position = new Vector();
        this.velocity = new Vector();
        this.direction = new Vector();
        this.direction.x = 1;
        this.friction = 0.98;
        this.size = new Vector();
        this.size.x = 80;
        this.size.y = 80;
        this.position.x = this.size.x;
        this.position.y = 100;

        this.runAnimation = new Animation(6, 2);
        this.stillAnimation = new Animation(4, 2);
        this.walkAnimation = new Animation(4, 2);
    }

    update(dt) {
        var newPos = this.position.add(this.velocity.mul(dt));
        if (newPos.x >= this.size.x * 0.5 
            && newPos.x <= this.camera.worldWidth - this.size.x * 0.5) {
            this.position.x = newPos.x;
            this.position.y = newPos.y;
        }
        this.camera.update(this.position);
        this.runAnimation.update(dt);
        this.stillAnimation.update(dt);
        this.walkAnimation.update(dt);
        this.velocity.mulSelf(this.friction);
    }

    render(context) {
        var image = "";
        if (Math.abs(this.velocity.x) < 10) {
            image = (this.direction.x > 0 ? "" : "left_") + "still_" + (this.stillAnimation.getFrame() + 1);
        } else if (Math.abs(this.velocity.x) < 40) {
            image = (this.direction.x > 0 ? "" : "left_") + "walk_" + (this.walkAnimation.getFrame() + 1);
        } else {
            image = (this.direction.x > 0 ? "" : "left_") + "run_" + (this.runAnimation.getFrame() + 1);
        }

        //context.fillStyle = "#00ff00";
        //context.fillRect(this.position.x - this.camera.offset.x - this.size.x * 0.5,  this.camera.offset.y - this.position.y - this.size.y * 0.5, this.size.x, this.size.y);

        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, 
            this.position.x - this.camera.offset.x - this.size.x * 0.5,  this.camera.offset.y - this.position.y - this.size.y * 0.5, this.size.x, this.size.y);
    }

    left() {
        this.direction.x = -1;
        this.velocity.x = -200;
    }

    right() {
        this.direction.x = 1;
        this.velocity.x = 200;
    }
}