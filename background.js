class Background {
    constructor(camera, player) {
        this.camera = camera;
        this.player = player;

        this.positionA = new Vector();
        this.sizeA = new Vector();
        this.sizeA.x = camera.viewPortWidth;
        this.sizeA.y = 30;
        this.positionA.x = camera.viewPortWidth * 0.5;
        this.positionA.y = 100;

        this.positionB = new Vector();
        this.sizeB = new Vector();
        this.sizeB.x = camera.viewPortWidth;
        this.sizeB.y = 30;
        this.positionB.x = camera.viewPortWidth + camera.viewPortWidth * 0.5;
        this.positionB.y = 100;
        
    }

    update(dt) {
        var diffA = this.player.position.x - this.positionA.x;
        var diffB = this.player.position.x - this.positionB.x;
        var diffAA = this.positionA.x - this.player.position.x;
        var diffBB = this.positionB.x - this.player.position.x;
        if (diffA >= this.camera.viewPortWidth) {
            this.positionA.x = this.player.position.x + this.camera.viewPortWidth;
            this.positionB.x = this.player.position.x; 
        }
        if (diffB >= this.camera.viewPortWidth) {
            this.positionB.x = this.player.position.x + this.camera.viewPortWidth;
            this.positionA.x = this.player.position.x; 
        }
        if (diffAA > this.camera.viewPortWidth) {
            this.positionA.x = this.player.position.x - this.camera.viewPortWidth;
            this.positionB.x = this.player.position.x; 
        }
        if (diffBB > this.camera.viewPortWidth) {
            this.positionB.x = this.player.position.x - this.camera.viewPortWidth;
            this.positionA.x = this.player.position.x; 
        }
    }

    render(context) {
        context.fillStyle = "#88bbff";
        context.fillRect(this.positionA.x - this.camera.offset.x - this.sizeA.x * 0.5,  this.camera.offset.y - this.positionA.y - this.sizeA.y * 0.5, this.sizeA.x, this.sizeA.y);

        context.fillStyle = "#ff99bb";
        context.fillRect(this.positionB.x - this.camera.offset.x - this.sizeB.x * 0.5,  this.camera.offset.y - this.positionB.y - this.sizeB.y * 0.5, this.sizeB.x, this.sizeB.y);
    }
}