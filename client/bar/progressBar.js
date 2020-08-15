export class ProgressBar extends BaseBar {
  constructor(id, title, progress) {
    super(id, title);

    this._thin = true;
    this._bgColor = [155, 155, 155, 255];
    this._fgColor = [240, 240, 240, 255];
    this._fgWidth = 0.0;
    this._fgX = 0.0;

    this.progress = progress / 100;
  }

  // Properties
  get progress() {
    return this._progress;
  }
  get backgroundColor() {
    return this._bgColor;
  }
  get foregroundColor() {
    return this._fgColor;
  }
  set progress(value) {
    this._progress = Helpers.clampNumber(value, 0.0, 1.0);
    this._fgWidth = Helpers.coordsAndSize.progressWidth * this._progress;
    this._fgX =
      Helpers.coordsAndSize.progressBaseX -
      Helpers.coordsAndSize.progressWidth * 0.5 +
      this._fgWidth * 0.5;
  }
  set backgroundColor(value) {
    this._bgColor = Helpers.getColor(value);
  }
  set foregroundColor(value) {
    this._fgColor = Helpers.getColor(value);
  }

  // Functions
  draw(y) {
    super.draw(y);

    y += Helpers.coordsAndSize.barOffset;
    native.drawRect(
      Helpers.coordsAndSize.progressBaseX,
      y,
      Helpers.coordsAndSize.progressWidth,
      Helpers.coordsAndSize.progressHeight,
      this._bgColor[0],
      this._bgColor[1],
      this._bgColor[2],
      this._bgColor[3]
    );
    native.drawRect(
      this._fgX,
      y,
      this._fgWidth,
      Helpers.coordsAndSize.progressHeight,
      this._fgColor[0],
      this._fgColor[1],
      this._fgColor[2],
      this._fgColor[3]
    );
  }
}
