import { $, paths, models, exporter, IModel, unitType} from 'makerjs';
import { writeFileSync } from 'fs';

const allowance = 1; // 1/10 of mm (scaled in openscad)
const l = 300.0; // piece side length: 1/10 of mm (scaled in openscad)
const center = [l/2.0, 0.0];

const line1: IModel = {
    paths: { 
        start: new paths.Line([0.0, 0.0], [l/3.0, 0.0]), 
        end:   new paths.Line([l*2.0/3.0, 0], [l, 0.0])
    },
    models: {
        up:   new models.BezierCurve([l/3.0, 0.0], [l*11.0/24.0, 0.0], [l*11.0/24.0, l/48.0], [l*5.0/12.0, l/12.0]), 
        cap:  new models.BezierCurve([l*5.0/12.0, l/12.0], [ l/3.0, l*5.0/24.0], [2.0*l/3.0, l*5.0/24.0], [l*7.0/12.0, l/12.0]),
        down: new models.BezierCurve([l*7.0/12.0, l/12.0], [l*13.0/24.0, l/48.0], [l*13.0/24.0, 0], [l*2.0/3.0, 0]),
    },
    units: unitType.Millimeter
};

const line2 = $(line1).clone().$result

const thick: IModel = {
    models: {
        a: $(line1).clone().rotate(-36, center).$result,
        b: $(line1).clone().rotate(36, center).move([0, l * Math.sin(Math.PI/5)]).$result,
        c: $(line2).clone().rotate(-36, center).move([l * Math.cos(Math.PI/5), l * Math.sin(Math.PI/5)]).$result,
        d: $(line2).clone().rotate(36, center).move([l * Math.cos(Math.PI/5), 0]).$result,
    },
    units: unitType.Millimeter
};

const thin: IModel = {
    models: {
        a: $(line1).clone().rotate(-18 + 180, center).$result,
        b: $(line2).clone().rotate(18 + 180, center).move([0, l * Math.sin(Math.PI/10)]).$result,
        c: $(line2).clone().rotate(-18, center).move([l * Math.cos(Math.PI/10), l * Math.sin(Math.PI/10)]).$result,
        d: $(line1).clone().rotate(18, center).move([l * Math.cos(Math.PI/10), 0]).$result
    },
    units: unitType.Millimeter
};

const thickWithAllowance = $(thick).outline(allowance, 0, true).$result
const thinWithAllowance = $(thin).outline(allowance, 0, true).$result

const svgThick = exporter.toSVG(thickWithAllowance, { units: unitType.Millimeter });
writeFileSync("./prose/thick.svg", svgThick);

const svgThin = exporter.toSVG(thinWithAllowance, { units: unitType.Millimeter });
writeFileSync("./prose/thin.svg", svgThin);
