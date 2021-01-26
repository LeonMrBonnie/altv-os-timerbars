export class TextBar extends BaseBar {
  constructor(id, title, text) {
    super(id, title);

    this._text = text;
    this._textDrawParams = {
      font: 0,
      color: [240, 240, 240, 255],
      scale: Helpers.coordsAndSize.textScale,
      justification: 2,
      wrap: Helpers.coordsAndSize.textWrap,
    };
  }

  // Properties
  get text() {
    return this._text;
  }
  get textColor() {
    return this._textDrawParams.color;
  }
  set text(value) {
    this._text = value;
  }
  set textColor(value) {
    this._textDrawParams.color = Helpers.getColor(value);
  }
  set color(value) {
    this.titleColor = value;
    this.textColor = value;
  }

  // Functions
  draw(y) {
    super.draw(y);
    y += Helpers.coordsAndSize.textOffset;
    Helpers.drawText(
      this._text,
      [Helpers.coordsAndSize.initialX, y],
      this._textDrawParams.font,
      this._textDrawParams.scale,
      this._textDrawParams.color,
      this._textDrawParams.justification,
      this._textDrawParams.wrap
    );
  }
}
