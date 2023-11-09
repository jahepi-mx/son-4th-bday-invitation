class Rubble {
    constructor(camera) {
        this.yLimit = 100;
        this.camera = camera;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance(); 
        this.position = new Vector();
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.acceleration.y = -230;
        this.direction = new Vector();
        this.direction.x = 1;
        this.friction = 0.98;
        this.size = new Vector();
        this.size.x = 80;
        this.size.y = 80;
        this.position.x = this.size.x + ((this.camera.worldWidth - this.size.x) - this.size.x) * Math.random();
        this.position.y = this.yLimit;

        this.runAnimation = new Animation(7, 2);
        this.stillAnimation = new Animation(13, 1);
        this.shotAnimation = new Animation(21, 1);
        this.jumpAnimation = new Animation(7, 2);
        this.barkAnimation = new Animation(11, 1);
        this.punchAnimation = new Animation(17, 1);
        this.jumpAnimation.stopAtSequenceNumber(1, this.onStopJump.bind(this));
        this.barkAnimation.stopAtSequenceNumber(1, this.onStopBark.bind(this));
        this.punchAnimation.stopAtSequenceNumber(1, this.onStopPunch.bind(this));

        this.eventTime = 0;
        this.eventTypes = ["run", "still", "shot", "jump", "bark", "run", "punch", "jump"];
        //this.eventTypes = ["run", "jump"];
        this.eventType = this.eventTypes[0];
        this.balls = [];
        this.shotTime = 0;

    }

    onStopJump() {
        this.eventTime = 0;
        this.jumpAnimation.stop();
    }

    onStopBark() {
        this.eventTime = 0;
        this.barkAnimation.stop();
    }

    onStopPunch() {
        this.eventTime = 0;
        this.punchAnimation.stop();
    }

    update(dt) {
        
        this.eventTime -= dt;
        if (this.eventTime <= 0) {
            this.eventType = this.eventTypes[parseInt(this.eventTypes.length * Math.random())];
            this.eventTime = 5 + Math.random() * 3;
            this.direction.x = Math.random() < 0.5 ? 1 : -1;
            this.velocity.x = Math.abs(this.velocity.x) * this.direction.x;
            this.shotTime = 0;
            if (this.eventType == "jump") {
                this.velocity.y = this.position.y < this.yLimit + this.size.y * 0.5 ? 250 : this.velocity.y;
                this.jumpAnimation.reset();
            }
            if (this.eventType == "bark") {
                this.barkAnimation.reset();
            }
            if (this.eventType == "punch") {
                this.punchAnimation.reset();
            }
        }

        var newPos = this.position.add(this.velocity.mul(dt));
        this.velocity.addSelf(this.acceleration.mul(dt));

        if (newPos.x < this.size.x * 0.5) {
            this.direction.x = 1;
            this.velocity.x = Math.abs(this.velocity.x);
        }
        if (newPos.x > this.camera.worldWidth - this.size.x * 0.5) {
            this.direction.x = -1;
            this.velocity.x = -Math.abs(this.velocity.x);
        }

        if (newPos.x >= this.size.x * 0.5 
            && newPos.x <= this.camera.worldWidth - this.size.x * 0.5) {
            this.position.x = newPos.x;
        }

        this.position.y = newPos.y < this.yLimit ? this.yLimit : newPos.y;

        if (this.eventType == "run" && Math.abs(this.velocity.x) <= 250) {
            this.velocity.x += (250 * this.direction.x - this.velocity.x) * dt;
        }
        if (this.eventType == "still" && Math.abs(this.velocity.x) <= 5) {
            this.velocity.x += (-this.velocity.x) * dt;
        }
        if (this.eventType == "shot" && Math.abs(this.velocity.x) <= 5) {
            this.velocity.x = 0;
            this.shotTime -= dt;
            if (this.shotTime < 0) {
                this.shotTime = 0.5;
                this.balls.push(new Ball(this.camera, this.position.x, this.position.y, this.direction.x, "rock_1"));
            }
        }

        this.runAnimation.update(dt);
        this.stillAnimation.update(dt);
        this.shotAnimation.update(dt);
        this.jumpAnimation.update(dt);
        this.barkAnimation.update(dt);
        this.punchAnimation.update(dt);

        this.velocity.mulSelf(this.friction);

        for (var a = 0; a < this.balls.length; a++) {
            this.balls[a].update(dt);
            if (this.balls[a].dispose) {
                this.balls.splice(a--, 1);
            }
        }
    }

    render(context) {
        var image = null;
        if (this.eventType == "jump") {
            image = (this.direction.x > 0 ? "" : "left_") + "rubble_jump_" + (this.jumpAnimation.getFrame() + 1);
        } else if (this.eventType == "shot" && Math.abs(this.velocity.x) <= 5) {
            image = (this.direction.x > 0 ? "" : "left_") + "rubble_shoot_" + (this.shotAnimation.getFrame() + 1);
        } else if (this.eventType == "bark" && Math.abs(this.velocity.x) <= 5) {
            image = (this.direction.x > 0 ? "" : "left_") + "rubble_bark_" + (this.barkAnimation.getFrame() + 1);
        } else if (this.eventType == "punch" && Math.abs(this.velocity.x) <= 5) {
            image = (this.direction.x > 0 ? "" : "left_") + "rubble_punch_" + (this.punchAnimation.getFrame() + 1);
        } else if (Math.abs(this.velocity.x) <= 5) {
            image = (this.direction.x > 0 ? "" : "left_") + "rubble_still_" + (this.stillAnimation.getFrame() + 1);
        } else if (Math.abs(this.velocity.x) <= 250) {
            image = (this.direction.x > 0 ? "" : "left_") + "rubble_run_" + (this.runAnimation.getFrame() + 1);
        }

        if (image != null) {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, 
                this.position.x - this.camera.offset.x - this.size.x * 0.5,  this.camera.offset.y - this.position.y - this.size.y * 0.5, this.size.x, this.size.y);
        }
        for (let ball of this.balls) {
            ball.render(context);
        }
    }
}