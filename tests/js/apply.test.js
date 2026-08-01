import { timer } from "../../static/js/listingTimer.js"
import {describe, expect, it}  from "vitest"

describe("Frontend: Apply Tests", () => {
    it("Calculates 8 days", () => {
        const releaseDate = new Date("2026-08-09");
        const today = new Date("2026-08-01");
        expect(timer(releaseDate, today)).toBe(8);
    });
    
})