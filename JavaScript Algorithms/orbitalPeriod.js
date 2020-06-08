let sat = new Object()
sat.avgAlt = 35873.5553;
var earthRadius = 6367.4447;
let GM = 398600.4418
let T = Math.round(2 * Math.PI * Math.sqrt((sat.avgAlt + earthRadius) ** 3 / GM))
console.log(T);