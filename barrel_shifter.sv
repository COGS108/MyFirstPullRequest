// Barrel Shifter RTL Model
`include "mux_2x1_behavioral.sv"
module barrel_shifter (
  input logic select,  // select=0 shift operation, select=1 rotate operation
  input logic direction, // direction=0 right move, direction=1 left move
  input logic[1:0] shift_value, // number of bits to be shifted (0, 1, 2 or 3)
  input logic[3:0] din,
  output logic[3:0] dout
);

// Students to add code for barrel shifter


endmodule: barrel_shifter


