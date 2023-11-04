class Background {
    constructor(camera, player, image, ratio, y, height) {
        this.camera = camera;
        this.player = player;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance(); 
        this.image = image;

        this.positionA = new Vector();
        this.sizeA = new Vector();
        this.sizeA.x = this.camera.viewPortWidth;
        this.sizeA.y = height;
        this.positionA.x = camera.viewPortWidth * 0.5;
        this.positionA.y = y;

        this.positionB = new Vector();
        this.sizeB = new Vector();
        this.sizeB.x = this.camera.viewPortWidth;
        this.sizeB.y = height;
        this.positionB.x = camera.viewPortWidth + camera.viewPortWidth * 0.5;
        this.positionB.y = y;
        this.ratio = ratio;
    }

    update(dt) {
        var diffA = this.positionA.x - this.camera.offset.x * this.ratio;
        var diffB = this.positionB.x - this.camera.offset.x * this.ratio;
        var fix = this.camera.offset.x * (1 - this.ratio);
        if (diffA < -this.camera.viewPortWidth * 0.5) {
            this.positionA.x = this.player.position.x + this.camera.viewPortWidth - fix;
            this.positionB.x = this.player.position.x - fix; 
        }
        if (diffB < -this.camera.viewPortWidth * 0.5) {
            this.positionB.x = this.player.position.x + this.camera.viewPortWidth - fix;
            this.positionA.x = this.player.position.x - fix; 
        }
        if (diffA > this.camera.viewPortWidth + this.camera.viewPortWidth * 0.5) {
            this.positionA.x = this.player.position.x - this.camera.viewPortWidth - fix;
            this.positionB.x = this.player.position.x - fix; 
        }
        if (diffB > this.camera.viewPortWidth + this.camera.viewPortWidth * 0.5) {
            this.positionB.x = this.player.position.x - this.camera.viewPortWidth - fix;
            this.positionA.x = this.player.position.x - fix; 
        }
    }

    render(context) {
        //context.fillStyle = "#88bbff";
        //context.fillRect(this.positionA.x - this.camera.offset.x * this.ratio - this.sizeA.x * 0.5,  this.camera.offset.y - this.positionA.y - this.sizeA.y * 0.5, this.sizeA.x, this.sizeA.y);
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.image].x, this.atlas.sprites[this.image].y, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height, 
            this.positionA.x - this.camera.offset.x * this.ratio - this.sizeA.x * 0.5,  this.camera.offset.y - this.positionA.y - this.sizeA.y * 0.5, this.sizeA.x, this.sizeA.y);

        //context.fillStyle = "#ff99bb";
        //context.fillRect(this.positionB.x - this.camera.offset.x * this.ratio - this.sizeB.x * 0.5,  this.camera.offset.y - this.positionB.y - this.sizeB.y * 0.5, this.sizeB.x, this.sizeB.y);
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.image].x, this.atlas.sprites[this.image].y, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height, 
            this.positionB.x - this.camera.offset.x * this.ratio - this.sizeB.x * 0.5,  this.camera.offset.y - this.positionB.y - this.sizeB.y * 0.5, this.sizeB.x, this.sizeB.y);
    }
}