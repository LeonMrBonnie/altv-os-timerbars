import * as alt from "alt-client";
import * as native from "natives";
import * as Helpers from "./helpers";
import * as Bars from "./bars";

native.requestStreamedTextureDict("timerbars", true);

alt.everyTick(() => {
    if(!Object.keys(Bars.allBars)) return;

    native.hideHudComponentThisFrame(6);
    native.hideHudComponentThisFrame(7);
    native.hideHudComponentThisFrame(8);
    native.hideHudComponentThisFrame(9);

    native.setScriptGfxAlign(82, 66);
    native.setScriptGfxAlignParams(0.0, 0.0, Helpers.coordsAndSize.gfxAlignWidth, Helpers.coordsAndSize.gfxAlignHeight);

    let drawY = native.busyspinnerIsOn() ? Helpers.coordsAndSize.initialBusySpinnerY : Helpers.coordsAndSize.initialY;
    for(const barId in Bars.allBars) {
        let bar = Bars.allBars[barId];
        bar.draw(drawY);
        drawY -= bar._thin ? Helpers.coordsAndSize.timerBarThinMargin : Helpers.coordsAndSize.timerBarMargin;
    }

    native.resetScriptGfxAlign();
});

alt.on("timerbars:create", createBar);
alt.onServer("timerbars:create", createBar);
function createBar(id, type, title, options = {}) {
    if(Bars.allBars[id]) return;
    switch(type) {
        case "text": {
            new Bars.TextBar(id, title, options.text || "");
            break;
        }
        case "player": {
            new Bars.PlayerBar(id, title, options.text || "");
            break;
        }
        case "checkpoint": {
            new Bars.CheckpointBar(id, title, options.checkpoints || 1);
            break;
        }
        case "progress": {
            new Bars.ProgressBar(id, title, options.progress || 0);
            break;
        }
    }
}

alt.on("timerbars:remove", removeBar);
alt.onServer("timerbars:remove", removeBar);
function removeBar(id) {
    let bar = Bars.allBars[id];
    if(!bar) return;
    bar.destroy();
}

alt.on("timerbars:removeAll", removeAllBars);
alt.onServer("timerbars:removeAll", removeAllBars);
function removeAllBars() {
    for(const barId in Bars.allBars) {
        Bars.allBars[barId].destroy();
    }
}

// Edit bars
alt.on("timerbars:setTitle", setBarTitle);
alt.onServer("timerbars:setTitle", setBarTitle);
function setBarTitle(id, title) {
    let bar = Bars.allBars[id];
    if(!bar) return;
    bar.title = title;
}

alt.on("timerbars:setText", setBarText);
alt.onServer("timerbars:setText", setBarText);
function setBarText(id, text) {
    let bar = Bars.allBars[id];
    if(!bar) return;
    bar.text = text;
}

alt.on("timerbars:setColor", setBarColor);
alt.onServer("timerbars:setColor", setBarColor);
function setBarColor(id, color) {
    let bar = Bars.allBars[id];
    if(!bar) return;
    bar.color = color;
}

alt.on("timerbars:setTextColor", setBarTextColor);
alt.onServer("timerbars:setTextColor", setBarTextColor);
function setBarTextColor(id, color) {
    let bar = Bars.allBars[id];
    if(!bar) return;
    bar.textColor = color;
}

alt.on("timerbars:setHighlightColor", setBarHighlightColor);
alt.onServer("timerbars:setHighlightColor", setBarHighlightColor);
function setBarHighlightColor(id, color) {
    let bar = Bars.allBars[id];
    if(!bar) return;
    bar.highlightColor = color;
}

// Checkpoint Bar Only
alt.on("timerbars:setCheckpointState", setBarCheckpointState);
alt.onServer("timerbars:setCheckpointState", setBarCheckpointState);
function setBarCheckpointState(id, checkpointIndex, state) {
    let bar = Bars.allBars[id];
    if(!bar || !bar instanceof Bars.CheckpointBar) return;
    if(checkpointIndex !== -1) bar.setCheckpointState(checkpointIndex, state);
    else bar.setAllCheckpointsState(state);
}

// Progress Bar Only
alt.on("timerbars:setProgress", setBarProgress);
alt.onServer("timerbars:setProgress", setBarProgress);
function setBarProgress(id, progress) {
    let bar = Bars.allBars[id];
    if(!bar || !bar instanceof Bars.ProgressBar) return;
    bar.progress = progress / 100;
}