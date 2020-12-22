# rose

Parametric MakerJS and OpenSCAD Penrose P3 tile generator.

Adjust `line1` and `line2` variables in `src/main.ts` to generate custom tiles. The lines should start at `[0,0]` and end at `[l, 0]`.

Before opening `prose/thick.scad` or `prose/thin.scad` in OpenSCAD you need to generate the svg files with `npm start`.

You can adjust the allowance using the `allowance` varialbe in `main.ts`. A debug object is included in the OpenSCAD to check the allowance visually. 

The `first-rose` folder contains an older version, generated manually with a mix of paper.js and Inkscape.

![Tiles](img/puzzle.png)