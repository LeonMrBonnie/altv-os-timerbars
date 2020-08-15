export class PlayerBar extends TextBar {
  constructor(id, title, text) {
    super(id, title, text);

    this._titleDrawParams = {
      font: 4,
      color: [240, 240, 240, 255],
      scale: Helpers.coordsAndSize.playerTitleScale,
      justification: 2,
      wrap: Helpers.coordsAndSize.titleWrap,
      shadow: true,
    };
  }

  // Functions
  draw(y) {
    super.drawBackground(y);
    Helpers.drawText(
      this._title,
      [
        Helpers.coordsAndSize.initialX,
        y + Helpers.coordsAndSize.playerTitleOffset,
      ],
      this._titleDrawParams.font,
      this._titleDrawParams.scale,
      this._titleDrawParams.color,
      this._titleDrawParams.justification,
      this._titleDrawParams.wrap
    );
    Helpers.drawText(
      this._text,
      [Helpers.coordsAndSize.initialX, y + Helpers.coordsAndSize.textOffset],
      this._textDrawParams.font,
      this._textDrawParams.scale,
      this._textDrawParams.color,
      this._textDrawParams.justification,
      this._textDrawParams.wrap
    );
  }
}
