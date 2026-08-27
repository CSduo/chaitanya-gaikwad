/**
 * XIYÀTO E2E Test Framework
 * Lightweight, zero-dependency BDD assertion and reporting harness.
 */

// ANSI Color codes for rich terminal output
export const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  white: "\x1b[37m",
  bgGreen: "\x1b[42m\x1b[30m",
  bgRed: "\x1b[41m\x1b[37m",
  bgCyan: "\x1b[46m\x1b[30m",
  bgBlue: "\x1b[44m\x1b[37m",
};

export class AssertionError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.name = "AssertionError";
    this.actual = actual;
    this.expected = expected;
  }
}

export function expect(actual) {
  function createMatchers(isNegated = false) {
    return {
      toBe(expected) {
        const passed = actual === expected;
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated
              ? `Expected value NOT to be ${colors.cyan}${JSON.stringify(expected)}${colors.reset}`
              : `Expected ${colors.cyan}${JSON.stringify(expected)}${colors.reset} but got ${colors.red}${JSON.stringify(actual)}${colors.reset}`,
            actual,
            expected
          );
        }
      },
      toEqual(expected) {
        const a = JSON.stringify(actual);
        const e = JSON.stringify(expected);
        const passed = a === e;
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated
              ? `Expected values NOT to be deeply equal`
              : `Deep equality mismatch.\nExpected: ${colors.cyan}${e}${colors.reset}\nReceived: ${colors.red}${a}${colors.reset}`,
            actual,
            expected
          );
        }
      },
      toBeGreaterThan(expected) {
        const passed = actual > expected;
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated
              ? `Expected ${actual} NOT to be greater than ${expected}`
              : `Expected ${actual} to be greater than ${expected}`,
            actual,
            expected
          );
        }
      },
      toBeGreaterThanOrEqual(expected) {
        const passed = actual >= expected;
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated
              ? `Expected ${actual} NOT to be >= ${expected}`
              : `Expected ${actual} to be >= ${expected}`,
            actual,
            expected
          );
        }
      },
      toBeLessThan(expected) {
        const passed = actual < expected;
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated
              ? `Expected ${actual} NOT to be less than ${expected}`
              : `Expected ${actual} to be less than ${expected}`,
            actual,
            expected
          );
        }
      },
      toBeLessThanOrEqual(expected) {
        const passed = actual <= expected;
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated
              ? `Expected ${actual} NOT to be <= ${expected}`
              : `Expected ${actual} to be <= ${expected}`,
            actual,
            expected
          );
        }
      },
      toBeCloseTo(expected, delta = 0.05) {
        const passed = Math.abs(actual - expected) <= delta;
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated
              ? `Expected ${actual} NOT to be close to ${expected} (within ±${delta})`
              : `Expected ${actual} to be close to ${expected} (within ±${delta})`,
            actual,
            expected
          );
        }
      },
      toBeTruthy() {
        const passed = Boolean(actual);
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated
              ? `Expected falsy value but received ${colors.red}${actual}${colors.reset}`
              : `Expected truthy value but received ${colors.red}${actual}${colors.reset}`,
            actual,
            !isNegated
          );
        }
      },
      toBeFalsy() {
        const passed = !actual;
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated
              ? `Expected truthy value but received ${colors.red}${actual}${colors.reset}`
              : `Expected falsy value but received ${colors.red}${actual}${colors.reset}`,
            actual,
            isNegated
          );
        }
      },
      toBeNull() {
        const passed = actual === null;
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated
              ? `Expected non-null value but received null`
              : `Expected null but received ${colors.red}${JSON.stringify(actual)}${colors.reset}`,
            actual,
            null
          );
        }
      },
      toBeDefined() {
        const passed = actual !== undefined;
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated ? `Expected undefined but received defined value` : `Expected value to be defined but was undefined`,
            actual,
            "defined"
          );
        }
      },
      toBeUndefined() {
        const passed = actual === undefined;
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated ? `Expected defined value but received undefined` : `Expected undefined but received ${actual}`,
            actual,
            undefined
          );
        }
      },
      toContain(item) {
        let passed = false;
        if (typeof actual === "string") {
          passed = actual.includes(item);
        } else if (Array.isArray(actual)) {
          passed = actual.some((x) => JSON.stringify(x) === JSON.stringify(item) || x === item);
        } else if (actual && typeof actual === "object") {
          passed = item in actual;
        }
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated
              ? `Expected container NOT to contain ${colors.cyan}${JSON.stringify(item)}${colors.reset}`
              : `Expected container to contain ${colors.cyan}${JSON.stringify(item)}${colors.reset}`,
            actual,
            item
          );
        }
      },
      toMatch(regex) {
        const passed = regex.test(String(actual));
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated
              ? `Expected "${actual}" NOT to match regex ${regex}`
              : `Expected "${actual}" to match regex ${regex}`,
            actual,
            regex.toString()
          );
        }
      },
      toHaveLength(expectedLength) {
        const len = actual ? actual.length : undefined;
        const passed = len === expectedLength;
        if (isNegated ? passed : !passed) {
          throw new AssertionError(
            isNegated
              ? `Expected length NOT to be ${expectedLength}`
              : `Expected length ${colors.cyan}${expectedLength}${colors.reset} but got ${colors.red}${len}${colors.reset}`,
            len,
            expectedLength
          );
        }
      },
      toThrow(expectedError) {
        if (typeof actual !== "function") {
          throw new AssertionError(`Actual value must be a function to test toThrow`);
        }
        let didThrow = false;
        let errorThrown = null;
        try {
          actual();
        } catch (err) {
          didThrow = true;
          errorThrown = err;
        }
        if (isNegated ? didThrow : !didThrow) {
          throw new AssertionError(
            isNegated
              ? `Expected function NOT to throw an error, but it threw "${errorThrown?.message}"`
              : `Expected function to throw an error, but it returned normally.`
          );
        }
        if (!isNegated && expectedError) {
          if (typeof expectedError === "string" && !errorThrown.message.includes(expectedError)) {
            throw new AssertionError(
              `Expected error message to include "${expectedError}", but got "${errorThrown.message}"`
            );
          } else if (expectedError instanceof RegExp && !expectedError.test(errorThrown.message)) {
            throw new AssertionError(
              `Expected error message to match ${expectedError}, but got "${errorThrown.message}"`
            );
          }
        }
      },
    };
  }

  const matchers = createMatchers(false);
  matchers.not = createMatchers(true);
  return matchers;
}

class TestSuiteRegistry {
  constructor() {
    this.suites = [];
    this.currentSuite = null;
  }

  describe(name, fn) {
    const suite = {
      name,
      tests: [],
      beforeEachFns: [],
      afterEachFns: [],
      parent: this.currentSuite,
    };
    if (this.currentSuite) {
      this.currentSuite.suites = this.currentSuite.suites || [];
      this.currentSuite.suites.push(suite);
    } else {
      this.suites.push(suite);
    }

    const prev = this.currentSuite;
    this.currentSuite = suite;
    fn();
    this.currentSuite = prev;
  }

  it(name, fn) {
    if (!this.currentSuite) {
      this.describe("Default Suite", () => {
        this.it(name, fn);
      });
      return;
    }
    this.currentSuite.tests.push({ name, fn });
  }

  beforeEach(fn) {
    if (this.currentSuite) {
      this.currentSuite.beforeEachFns.push(fn);
    }
  }

  afterEach(fn) {
    if (this.currentSuite) {
      this.currentSuite.afterEachFns.push(fn);
    }
  }

  async runSuite(suite, reporter = defaultReporter, context = {}) {
    reporter.onSuiteStart(suite.name);
    let passed = 0;
    let failed = 0;
    const failures = [];

    for (const test of suite.tests) {
      reporter.onTestStart(test.name);
      const startTime = performance.now();
      let error = null;

      try {
        for (const be of suite.beforeEachFns) {
          await be();
        }
        await test.fn();
        for (const ae of suite.afterEachFns) {
          await ae();
        }
        passed++;
        const duration = (performance.now() - startTime).toFixed(2);
        reporter.onTestPass(test.name, duration);
      } catch (err) {
        failed++;
        const duration = (performance.now() - startTime).toFixed(2);
        failures.push({ testName: test.name, error: err });
        reporter.onTestFail(test.name, duration, err);
      }
    }

    if (suite.suites) {
      for (const child of suite.suites) {
        const childRes = await this.runSuite(child, reporter, context);
        passed += childRes.passed;
        failed += childRes.failed;
        failures.push(...childRes.failures);
      }
    }

    reporter.onSuiteEnd(suite.name, passed, failed);
    return { passed, failed, failures, total: passed + failed };
  }

  async runAll(reporter = defaultReporter) {
    const startTime = performance.now();
    let totalPassed = 0;
    let totalFailed = 0;
    const allFailures = [];

    for (const suite of this.suites) {
      const res = await this.runSuite(suite, reporter);
      totalPassed += res.passed;
      totalFailed += res.failed;
      allFailures.push(...res.failures);
    }

    const totalDuration = ((performance.now() - startTime) / 1000).toFixed(3);
    reporter.onSummary(totalPassed, totalFailed, totalDuration, allFailures);

    return {
      passed: totalPassed,
      failed: totalFailed,
      total: totalPassed + totalFailed,
      durationSec: totalDuration,
      failures: allFailures,
    };
  }

  clear() {
    this.suites = [];
    this.currentSuite = null;
  }
}

export const defaultReporter = {
  onSuiteStart(name) {
    console.log(`\n${colors.bold}${colors.blue}▶ Suite: ${name}${colors.reset}`);
  },
  onTestStart(_name) {},
  onTestPass(name, duration) {
    console.log(`  ${colors.green}✔${colors.reset} ${name} ${colors.dim}(${duration}ms)${colors.reset}`);
  },
  onTestFail(name, duration, error) {
    console.log(`  ${colors.red}✖ ${name}${colors.reset} ${colors.dim}(${duration}ms)${colors.reset}`);
    console.log(`    ${colors.red}${error.message}${colors.reset}`);
    if (error.stack && !error.message.includes(error.stack.split("\n")[0])) {
      console.log(`    ${colors.dim}${error.stack.split("\n").slice(1, 3).join("\n    ")}${colors.reset}`);
    }
  },
  onSuiteEnd(name, passed, failed) {
    const status = failed === 0 ? `${colors.green}${passed} passed${colors.reset}` : `${colors.red}${failed} failed${colors.reset}, ${passed} passed`;
    console.log(`${colors.dim}  └─ ${name}: ${status}${colors.reset}`);
  },
  onSummary(passed, failed, durationSec, failures) {
    console.log(`\n${colors.bold}======================================================${colors.reset}`);
    if (failed === 0) {
      console.log(`${colors.bgGreen}${colors.bold} ALL TESTS PASSED ${colors.reset} ${colors.green}✔ Total: ${passed} | Time: ${durationSec}s${colors.reset}`);
    } else {
      console.log(`${colors.bgRed}${colors.bold} TESTS FAILED ${colors.reset} ${colors.red}✖ Failed: ${failed} | Passed: ${passed} | Total: ${passed + failed} | Time: ${durationSec}s${colors.reset}`);
      console.log(`\n${colors.bold}${colors.red}Failures Summary:${colors.reset}`);
      failures.forEach((f, idx) => {
        console.log(`  ${idx + 1}. ${f.testName}`);
        console.log(`     ${colors.red}${f.error.message}${colors.reset}`);
      });
    }
    console.log(`${colors.bold}======================================================${colors.reset}\n`);
  },
};

export const registry = new TestSuiteRegistry();
export const describe = registry.describe.bind(registry);
export const it = registry.it.bind(registry);
export const beforeEach = registry.beforeEach.bind(registry);
export const afterEach = registry.afterEach.bind(registry);
