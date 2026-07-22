import timer from "../static/js/listingTimer.js"
import {describe, expect, it}  from "vitest"

describe("Frontend: Apply Tests", () => {
    
    expect(timer()).toBe(0);
})