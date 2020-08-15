import * as native from "natives";
import * as Helpers from "./helpers";

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
            wrap: Helpers.coordsAndSize.titleWrap
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
        y += this._thin ? Helpers.coordsAndSize.bgThinOffset : Helpers.coordsAndSize.bgOffset;

        if (this._highlightColor) native.drawSprite("timerbars", "all_white_bg", Helpers.coordsAndSize.bgBaseX, y, Helpers.coordsAndSize.timerBarWidth, 
            this._thin ? Helpers.coordsAndSize.timerBarThinHeight : Helpers.coordsAndSize.timerBarHeight, 0.0, this._highlightColor[0], this._highlightColor[1], this._highlightColor[2], this._highlightColor[3]);
        native.drawSprite("timerbars", "all_black_bg", Helpers.coordsAndSize.bgBaseX, y, Helpers.coordsAndSize.timerBarWidth, 
            this._thin ? Helpers.coordsAndSize.timerBarThinHeight : Helpers.coordsAndSize.timerBarHeight, 0.0, 255, 255, 255, 140);
    }
    drawTitle(y) {
        Helpers.drawText(this._title, [Helpers.coordsAndSize.initialX, y - 0.004], this._titleDrawParams.font, this._titleDrawParams.scale, this._titleDrawParams.color, this._titleDrawParams.justification,
            this._titleDrawParams.wrap);
    }
    draw(y) {
        this.drawBackground(y);
        this.drawTitle(y);
    }

    destroy() {
        delete allBars[this._id];
    }
}

export class TextBar extends BaseBar {
    constructor(id, title, text) {
        super(id, title);

        this._text = text;
        this._textDrawParams = {
            font: 0,
            color: [240, 240, 240, 255],
            scale: Helpers.coordsAndSize.textScale,
            justification: 2,
            wrap: Helpers.coordsAndSize.textWrap
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
        Helpers.drawText(this._text, [Helpers.coordsAndSize.initialX, y], this._textDrawParams.font, this._textDrawParams.scale, this._textDrawParams.color, this._textDrawParams.justification,
            this._textDrawParams.wrap);
    }
}

export class PlayerBar extends TextBar {
    constructor(id, title, text) {
        super(id, title, text);

        this._titleDrawParams = {
            font: 4,
            color: [240, 240, 240, 255],
            scale: Helpers.coordsAndSize.playerTitleScale,
            justification: 2,
            wrap: Helpers.coordsAndSize.titleWrap,
            shadow: true
        };
    }

    // Functions
    draw(y) {
        super.drawBackground(y);
        Helpers.drawText(this._title, [Helpers.coordsAndSize.initialX, y + Helpers.coordsAndSize.playerTitleOffset], this._titleDrawParams.font, this._titleDrawParams.scale, 
            this._titleDrawParams.color, this._titleDrawParams.justification, this._titleDrawParams.wrap);
        Helpers.drawText(this._text, [Helpers.coordsAndSize.initialX, y + Helpers.coordsAndSize.textOffset], this._textDrawParams.font, this._textDrawParams.scale, this._textDrawParams.color, 
            this._textDrawParams.justification, this._textDrawParams.wrap);
    }
}

export class CheckpointBar extends BaseBar {
    static state = {
        inProgress: 0,
        completed: 1,
        failed: 2
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

        for (let i = 0, cpX = Helpers.coordsAndSize.checkpointBaseX; i < this._numCheckpoints; i++) {
            const drawColor = this._checkpointStates[i] !== 0 ? (this._checkpointStates[i] === CheckpointBar.state.failed ? this._failedColor : this._color) : this._inProgressColor;
            native.drawSprite("timerbars", "circle_checkpoints", cpX, y, Helpers.coordsAndSize.checkpointWidth, Helpers.coordsAndSize.checkpointHeight, 0.0, drawColor[0], drawColor[1], 
                drawColor[2], drawColor[3], true);

            cpX -= Helpers.coordsAndSize.checkpointOffsetX;
        }
    }
}

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
        this._fgX = (Helpers.coordsAndSize.progressBaseX - Helpers.coordsAndSize.progressWidth * 0.5) + (this._fgWidth * 0.5);
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
        native.drawRect(Helpers.coordsAndSize.progressBaseX, y, Helpers.coordsAndSize.progressWidth, Helpers.coordsAndSize.progressHeight, this._bgColor[0], this._bgColor[1], this._bgColor[2], this._bgColor[3]);
        native.drawRect(this._fgX, y, this._fgWidth, Helpers.coordsAndSize.progressHeight, this._fgColor[0], this._fgColor[1], this._fgColor[2], this._fgColor[3]);
    }
}