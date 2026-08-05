import { timer } from "../../static/js/listingTimer.js"
import {describe, expect, it}  from "vitest"

describe("Frontend: Apply Tests", () => {
    it("Calculates 8 days", () => {
        const releaseDate = new Date("2026-08-09");
        const today = new Date("2026-08-01");
        expect(timer(releaseDate, today)).toBe(8);
    });

    it("Calculates 1 day", () => {
        const releaseDate = new Date("2026-08-06");
        const today = new Date("2026-08-05");
        expect(timer(releaseDate, today)).toBe(1);
    });
    
    it("Calculates 0 days", () => {
        const releaseDate = new Date("2026-08-05");
        const today = new Date("2026-08-05");
        expect(timer(releaseDate, today)).toBe(0);
    });
})