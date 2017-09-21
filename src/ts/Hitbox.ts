export class Hitbox {
    constructor() {}

    public hitTestPoint(object1X, object1Y, object1W, object1H, object2X, object2Y, object2W, object2H) {
        if((object1X + object1W) >= object2X && object1X <= object2X + object2W && (object1Y + object1H) >= object2Y && object1Y <= object2Y + object2H) {
            return true;
        }
    }
}