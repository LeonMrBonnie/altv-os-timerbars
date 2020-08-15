import * as native from "natives";

/**
 * Clamps a number
 *
 * @author LeonMrBonnie
 * @export
 * @param {Number} number
 * @param {Number} min
 * @param {Number} max
 */
export function clampNumber(number, min, max) {
    return Math.max(min, Math.min(max, number));
}

/**
 * Gets hud color from color index
 *
 * @author LeonMrBonnie
 * @export
 * @param {String} color
 * @returns {Array<number, number, number, number>}
 */
export function getColor(color) {
    if(Array.isArray(color)) return color;
    let [_, r, g, b, a] = native.getHudColour(color, 0, 0, 0);
    return [r, g, b, a];
}

/**
 * Draws a text
 *
 * @export
 * @param {String} text
 * @param {Array<number, number>} position
 * @param {Number} font
 * @param {Number} scale
 * @param {Array<number, number, number, number>} color
 * @param {Number} justification
 * @param {Number} wrap
 * @param {Boolean} shadow
 * @param {Boolean} outline
 */
export function drawText(text, position, font, scale, color, justification, wrap, shadow = false, outline = false) {
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.setTextJustification(justification);
    native.setTextWrap(0.0, wrap);
    native.setTextFont(font);
    native.setTextScale(0.0, scale || 0.5);
    native.setTextColour(color[0], color[1], color[2], color[3]);
    if(outline) native.setTextOutline();
    if(shadow) native.setTextDropShadow();
    native.endTextCommandDisplayText(position[0], position[1], 0);
}

/*
 Data from Alex Guirre
 https://github.com/alexguirre
*/
export const coordsAndSize = {
    gfxAlignWidth: 0.952,
    gfxAlignHeight: 0.949,

    initialX: 0.795,
    initialY: 0.923,
    initialBusySpinnerY: 0.887,

    bgBaseX: 0.874,
    progressBaseX: 0.913,
    checkpointBaseX: 0.9445,

    bgOffset: 0.008,
    bgThinOffset: 0.012,
    textOffset: -0.011,
    playerTitleOffset: -0.005,
    barOffset: 0.012,
    checkpointOffsetX: 0.0094,
    checkpointOffsetY: 0.012,

    timerBarWidth: 0.165,
    timerBarHeight: 0.035,
    timerBarThinHeight: 0.028,
    timerBarMargin: 0.0399,
    timerBarThinMargin: 0.0319,

    progressWidth: 0.069,
    progressHeight: 0.011,

    checkpointWidth: 0.012,
    checkpointHeight: 0.023,

    titleScale: 0.288,
    titleWrap: 0.867,
    textScale: 0.494,
    textWrap: 0.95,
    playerTitleScale: 0.447
};