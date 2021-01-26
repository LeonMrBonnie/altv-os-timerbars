export const allBars = {};

class BaseBar {
  constructor(id, title) {
    this._id = id;
    this._thin = false;
    this._title = title;
    this._highlightColor = null;

    this._titleDrawParams = {
      font: 0,
      color: [240, 240, 240, 255],
      scale: Helpers.coordsAndSize.titleScale + 0.1,
      justification: 2,
      wrap: Helpers.coordsAndSize.titleWrap,
    };

    allBars[id] = this;
  }

  get title() {
    return this._title;
  }
  get titleColor() {
    return this._titleDrawParams.color;
  }
  get highlightColor() {
    return this._highlightColor;
  }
  set title(value) {
    this._title = value;
  }
  set titleColor(value) {
    this._titleDrawParams.color = Helpers.getColor(value);
  }

  set highlightColor(value) {
    this._highlightColor = value ? Helpers.getColor(value) : null;
  }

  // Functions
  drawBackground(y) {
    y += this._thin
      ? Helpers.coordsAndSize.bgThinOffset
      : Helpers.coordsAndSize.bgOffset;

    if (this._highlightColor)
      native.drawSprite(
        "timerbars",
        "all_white_bg",
        Helpers.coordsAndSize.bgBaseX,
        y,
        Helpers.coordsAndSize.timerBarWidth,
        this._thin
          ? Helpers.coordsAndSize.timerBarThinHeight
          : Helpers.coordsAndSize.timerBarHeight,
        0.0,
        this._highlightColor[0],
        this._highlightColor[1],
        this._highlightColor[2],
        this._highlightColor[3]
      );
    native.drawSprite(
      "timerbars",
      "all_black_bg",
      Helpers.coordsAndSize.bgBaseX,
      y,
      Helpers.coordsAndSize.timerBarWidth,
      this._thin
        ? Helpers.coordsAndSize.timerBarThinHeight
        : Helpers.coordsAndSize.timerBarHeight,
      0.0,
      255,
      255,
      255,
      140
    );
  }
  drawTitle(y) {
    Helpers.drawText(
      this._title,
      [Helpers.coordsAndSize.initialX, y - 0.004],
      this._titleDrawParams.font,
      this._titleDrawParams.scale,
      this._titleDrawParams.color,
      this._titleDrawParams.justification,
      this._titleDrawParams.wrap
    );
  }
  draw(y) {
    this.drawBackground(y);
    this.drawTitle(y);
  }

  destroy() {
    delete allBars[this._id];
  }
}
