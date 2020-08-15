export class CheckpointBar extends BaseBar {
  static state = {
    inProgress: 0,
    completed: 1,
    failed: 2,
  };

  constructor(id, title, numCheckpoints) {
    super(id, title);

    this._thin = true;
    this._color = [114, 204, 114, 255];
    this._inProgressColor = [255, 255, 255, 51];
    this._failedColor = [224, 50, 50, 255];
    this._checkpointStates = {};
    this._numCheckpoints = Helpers.clampNumber(numCheckpoints, 0, 16);
  }

  // Properties
  get numCheckpoints() {
    return this._numCheckpoints;
  }
  get color() {
    return this._color;
  }
  get inProgressColor() {
    return this._inProgressColor;
  }
  get failedColor() {
    return this._failedColor;
  }
  set color(value) {
    this._color = Helpers.getColor(value);
  }
  set inProgressColor(value) {
    this._inProgressColor = Helpers.getColor(value);
  }
  set failedColor(value) {
    this._failedColor = Helpers.getColor(value);
  }

  // Functions
  setCheckpointState(index, newState) {
    if (index < 0 || index >= this._numCheckpoints) return;
    this._checkpointStates[index] = newState;
  }

  setAllCheckpointsState(newState) {
    for (let i = 0; i < this._numCheckpoints; i++) {
      this._checkpointStates[i] = newState;
    }
  }

  draw(y) {
    super.draw(y);
    y += Helpers.coordsAndSize.checkpointOffsetY;

    for (
      let i = 0, cpX = Helpers.coordsAndSize.checkpointBaseX;
      i < this._numCheckpoints;
      i++
    ) {
      const drawColor =
        this._checkpointStates[i] !== 0
          ? this._checkpointStates[i] === CheckpointBar.state.failed
            ? this._failedColor
            : this._color
          : this._inProgressColor;
      native.drawSprite(
        "timerbars",
        "circle_checkpoints",
        cpX,
        y,
        Helpers.coordsAndSize.checkpointWidth,
        Helpers.coordsAndSize.checkpointHeight,
        0.0,
        drawColor[0],
        drawColor[1],
        drawColor[2],
        drawColor[3],
        true
      );

      cpX -= Helpers.coordsAndSize.checkpointOffsetX;
    }
  }
}
