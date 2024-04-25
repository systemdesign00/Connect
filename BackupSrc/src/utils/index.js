export const roundTo2DecimalPoint = value => Math.round((value + Number.EPSILON) * 100) / 100;
export const roundTo2DecimalPoints = value => Math.round((value + Number.EPSILON) * 1000) / 1000;