import blinnCosineApproximation from "./shapingFunctions/blinnCosineApproximation.frag";
import blinnvs from "./blinn.vert";
import doubleCubicSeat from "./shapingFunctions/doubleCubicSeat.frag";
import doubleCubicSeatLinearBlend from "./shapingFunctions/doubleCubicSeatLinearBlend.frag";
import doubleOddPolynomialSeat from "./shapingFunctions/doubleOddPolynomialSeat.frag";
import doublePolynomialSigmoid from "./shapingFunctions/doublePolynomialSigmoid.frag";
import quadraticThroughPoint from "./shapingFunctions/quadraticThroughPoint.frag";
import exponentialEasing from "./shapingFunctions/exponentialEasing.frag";
import doubleExponentialSeat from "./shapingFunctions/doubleExponentialSeat.frag";
import doubleExponentialSigmoid from "./shapingFunctions/doubleExponentialSigmoid.frag";
import logisticSigmoid from "./shapingFunctions/logisticSigmoid.frag";
import quadraticBezier from "./shapingFunctions/quadraticBeizer.frag";
import cubicBezier from "./shapingFunctions/cubicBezier.frag";

import blob from "./practice/blob.frag";
import lines from "./practice/lines.frag";

let shaders = {
  blinnCosineApproximation: {
    fragment: blinnCosineApproximation,
    vertex: blinnvs
  },
  doubleCubicSeat: {
    fragment: doubleCubicSeat,
    vertex: blinnvs
  },
  doubleCubicSeatLinearBlend: {
    fragment: doubleCubicSeatLinearBlend,
    vertex: blinnvs
  },
  doubleOddPolynomialSeat: {
    fragment: doubleOddPolynomialSeat,
    vertex: blinnvs
  },
  doublePolynomialSigmoid: {
    fragment: doublePolynomialSigmoid,
    vertex: blinnvs
  },
  quadraticThroughPoint: {
    fragment: quadraticThroughPoint,
    vertex: blinnvs
  },
  exponentialEasing: {
    fragment: exponentialEasing,
    vertex: blinnvs
  },
  doubleExponentialSeat: {
    fragment: doubleExponentialSeat,
    vertex: blinnvs
  },
  doubleExponentialSigmoid: {
    fragment: doubleExponentialSigmoid,
    vertex: blinnvs
  },
  logisticSigmoid: {
    fragment: logisticSigmoid,
    vertex: blinnvs
  },
  quadraticBezier: {
    fragment: quadraticBezier,
    vertex: blinnvs
  },
  cubicBezier: {
    fragment: cubicBezier,
    vertex: blinnvs
  },
  blob: {
    fragment: blob,
    vertex: blinnvs
  },
  lines: {
    fragment: lines,
    vertex: blinnvs
  }
};

export default shaders;
