import { holyAdd } from './utils/HolyMath';

console.log("--- THE TRIBUNAL OF MATH ---");

const test1 = holyAdd("0.1", "0.2");
console.log(`Trial 1 (0.1 + 0.2): ${test1} [Expected: 0.3]`);
console.log(`Verdict: ${test1 === "0.3" ? "SANCTIFIED" : "HERESY"}`);

const test2 = holyAdd("1.5", "0.05");
console.log(`Trial 2 (1.5 + 0.05): ${test2} [Expected: 1.55]`);

const test3 = holyAdd("100", "0.0001");
console.log(`Trial 3 (100 + 0.0001): ${test3} [Expected: 100.0001]`);

import { holySubtract } from './utils/HolyMath';

const test4 = holySubtract("1.0", "0.3");
console.log(`Trial 4 (1.0 - 0.3): ${test4} [Expected: 0.7]`);
console.log(`Verdict: ${test4 === "0.7" ? "SANCTIFIED" : "HERESY"}`);

const test5 = holySubtract("0.1", "0.5");
console.log(`Trial 5 (0.1 - 0.5): ${test5} [Expected: -0.4]`);