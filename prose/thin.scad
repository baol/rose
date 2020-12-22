linear_extrude(3) scale(0.1) import("thin.svg", center=true);
%translate([30 * cos(18) * cos(36) , 30 * cos(18) * sin(36), 0]) rotate([0,0,18]) linear_extrude(3) scale(0.1) import("thick.svg", center=true);
