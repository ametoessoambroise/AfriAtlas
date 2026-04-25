import { describe, it, expect } from "vitest";
import {
  formatDate,
  formatNumber,
  formatCurrency,
  formatRelativeTime,
  formatPlaceCategoryLabel,
  formatPriceFCFA,
  formatDateWithMonth,
  formatDecimal,
} from "../../../src/lib/utils/formatters";

describe("formatDate", () => {
  const testDate = new Date("2026-04-25T10:30:00Z");
  const testDateString = "2026-04-25T10:30:00Z";
  const testTimestamp = testDate.getTime();

  describe("short format (default)", () => {
    it("should format Date object in DD/MM/YYYY format", () => {
      const result = formatDate(testDate);
      expect(result).toBe("25/04/2026");
    });

    it("should format ISO string in DD/MM/YYYY format", () => {
      const result = formatDate(testDateString);
      expect(result).toBe("25/04/2026");
    });

    it("should format timestamp in DD/MM/YYYY format", () => {
      const result = formatDate(testTimestamp);
      expect(result).toBe("25/04/2026");
    });

    it("should use short format when explicitly specified", () => {
      const result = formatDate(testDate, "short");
      expect(result).toBe("25/04/2026");
    });
  });

  describe("long format", () => {
    it("should format Date object in DD MMM YYYY format", () => {
      const result = formatDate(testDate, "long");
      expect(result).toBe("25 avr. 2026");
    });

    it("should format ISO string in DD MMM YYYY format", () => {
      const result = formatDate(testDateString, "long");
      expect(result).toBe("25 avr. 2026");
    });

    it("should format timestamp in DD MMM YYYY format", () => {
      const result = formatDate(testTimestamp, "long");
      expect(result).toBe("25 avr. 2026");
    });
  });

  describe("French locale", () => {
    it("should use French month abbreviations", () => {
      const dates = [
        { date: new Date("2026-01-15"), expected: "15 janv. 2026" },
        { date: new Date("2026-02-15"), expected: "15 févr. 2026" },
        { date: new Date("2026-03-15"), expected: "15 mars 2026" },
        { date: new Date("2026-04-15"), expected: "15 avr. 2026" },
        { date: new Date("2026-05-15"), expected: "15 mai 2026" },
        { date: new Date("2026-06-15"), expected: "15 juin 2026" },
        { date: new Date("2026-07-15"), expected: "15 juil. 2026" },
        { date: new Date("2026-08-15"), expected: "15 août 2026" },
        { date: new Date("2026-09-15"), expected: "15 sept. 2026" },
        { date: new Date("2026-10-15"), expected: "15 oct. 2026" },
        { date: new Date("2026-11-15"), expected: "15 nov. 2026" },
        { date: new Date("2026-12-15"), expected: "15 déc. 2026" },
      ];

      dates.forEach(({ date, expected }) => {
        const result = formatDate(date, "long");
        expect(result).toBe(expected);
      });
    });
  });
});

describe("formatNumber", () => {
  describe("basic formatting", () => {
    it("should format numbers with space as thousands separator", () => {
      const result = formatNumber(1234);
      // French locale uses narrow no-break space (U+202F)
      expect(result).toMatch(/1[\s\u202F]234/);
    });

    it("should format large numbers with multiple spaces", () => {
      const result = formatNumber(1234567);
      // French locale uses narrow no-break space (U+202F)
      expect(result).toMatch(/1[\s\u202F]234[\s\u202F]567/);
    });

    it("should format numbers without thousands separator when less than 1000", () => {
      expect(formatNumber(999)).toBe("999");
    });

    it("should format zero", () => {
      expect(formatNumber(0)).toBe("0");
    });
  });

  describe("with options parameter", () => {
    it("should format decimals with comma separator when minimumFractionDigits is specified", () => {
      const result = formatNumber(1234.56, { minimumFractionDigits: 2 });
      expect(result).toContain(",");
      expect(result).toMatch(/1[\s\u202F]234,56/);
    });

    it("should format decimals with comma separator when maximumFractionDigits is specified", () => {
      const result = formatNumber(1234.5, { maximumFractionDigits: 2 });
      expect(result).toContain(",");
      expect(result).toMatch(/1[\s\u202F]234,5/);
    });

    it("should respect minimumFractionDigits option", () => {
      const result = formatNumber(1234, { minimumFractionDigits: 2 });
      expect(result).toMatch(/1[\s\u202F]234,00/);
    });

    it("should respect maximumFractionDigits option", () => {
      const result = formatNumber(1234.56789, { maximumFractionDigits: 2 });
      expect(result).toMatch(/1[\s\u202F]234,57/);
    });

    it("should handle both minimum and maximum fraction digits", () => {
      const result = formatNumber(1234.5, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
      });
      expect(result).toMatch(/1[\s\u202F]234,50/);
    });
  });

  describe("French locale conventions", () => {
    it("should use space as thousands separator (not comma)", () => {
      const result = formatNumber(1234567);
      // Check for narrow no-break space or regular space
      expect(result).toMatch(/[\s\u202F]/);
      // Should not have comma as thousands separator
      expect(result).not.toMatch(/\d,\d{3}/);
    });

    it("should use comma as decimal separator when decimals are present", () => {
      const result = formatNumber(1234.56, { minimumFractionDigits: 2 });
      expect(result).toContain(",");
      expect(result).toMatch(/1[\s\u202F]234,56/);
    });
  });
});

describe("formatRelativeTime", () => {
  describe("seconds range", () => {
    it("should return 'à l'instant' for times less than 60 seconds ago", () => {
      const now = new Date();
      const date30SecondsAgo = new Date(now.getTime() - 30 * 1000);
      const result = formatRelativeTime(date30SecondsAgo);
      expect(result).toBe("à l'instant");
    });

    it("should return 'à l'instant' for times just now (0 seconds)", () => {
      const now = new Date();
      const result = formatRelativeTime(now);
      expect(result).toBe("à l'instant");
    });

    it("should return 'à l'instant' for 59 seconds ago", () => {
      const now = new Date();
      const date59SecondsAgo = new Date(now.getTime() - 59 * 1000);
      const result = formatRelativeTime(date59SecondsAgo);
      expect(result).toBe("à l'instant");
    });
  });

  describe("minutes range", () => {
    it("should format 1 minute ago in French (singular)", () => {
      const now = new Date();
      const date1MinuteAgo = new Date(now.getTime() - 1 * 60 * 1000);
      const result = formatRelativeTime(date1MinuteAgo);
      expect(result).toBe("il y a 1 minute");
    });

    it("should format 2 minutes ago in French (plural)", () => {
      const now = new Date();
      const date2MinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);
      const result = formatRelativeTime(date2MinutesAgo);
      expect(result).toBe("il y a 2 minutes");
    });

    it("should format 30 minutes ago in French", () => {
      const now = new Date();
      const date30MinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
      const result = formatRelativeTime(date30MinutesAgo);
      expect(result).toBe("il y a 30 minutes");
    });

    it("should format 59 minutes ago in French", () => {
      const now = new Date();
      const date59MinutesAgo = new Date(now.getTime() - 59 * 60 * 1000);
      const result = formatRelativeTime(date59MinutesAgo);
      expect(result).toBe("il y a 59 minutes");
    });
  });

  describe("hours range", () => {
    it("should format 1 hour ago in French (singular)", () => {
      const now = new Date();
      const date1HourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000);
      const result = formatRelativeTime(date1HourAgo);
      expect(result).toBe("il y a 1 heure");
    });

    it("should format 2 hours ago in French (plural)", () => {
      const now = new Date();
      const date2HoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
      const result = formatRelativeTime(date2HoursAgo);
      expect(result).toBe("il y a 2 heures");
    });

    it("should format 12 hours ago in French", () => {
      const now = new Date();
      const date12HoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
      const result = formatRelativeTime(date12HoursAgo);
      expect(result).toBe("il y a 12 heures");
    });

    it("should format 23 hours ago in French", () => {
      const now = new Date();
      const date23HoursAgo = new Date(now.getTime() - 23 * 60 * 60 * 1000);
      const result = formatRelativeTime(date23HoursAgo);
      expect(result).toBe("il y a 23 heures");
    });
  });

  describe("days range", () => {
    it("should format 1 day ago in French (singular)", () => {
      const now = new Date();
      const date1DayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date1DayAgo);
      expect(result).toBe("il y a 1 jour");
    });

    it("should format 2 days ago in French (plural)", () => {
      const now = new Date();
      const date2DaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date2DaysAgo);
      expect(result).toBe("il y a 2 jours");
    });

    it("should format 5 days ago in French", () => {
      const now = new Date();
      const date5DaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date5DaysAgo);
      expect(result).toBe("il y a 5 jours");
    });

    it("should format 6 days ago in French", () => {
      const now = new Date();
      const date6DaysAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date6DaysAgo);
      expect(result).toBe("il y a 6 jours");
    });
  });

  describe("weeks range", () => {
    it("should format 1 week ago in French (singular)", () => {
      const now = new Date();
      const date1WeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date1WeekAgo);
      expect(result).toBe("il y a 1 semaine");
    });

    it("should format 2 weeks ago in French (plural)", () => {
      const now = new Date();
      const date2WeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date2WeeksAgo);
      expect(result).toBe("il y a 2 semaines");
    });

    it("should format 3 weeks ago in French", () => {
      const now = new Date();
      const date3WeeksAgo = new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date3WeeksAgo);
      expect(result).toBe("il y a 3 semaines");
    });
  });

  describe("months range", () => {
    it("should format 1 month ago in French (singular 'mois')", () => {
      const now = new Date();
      const date1MonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date1MonthAgo);
      expect(result).toBe("il y a 1 mois");
    });

    it("should format 2 months ago in French (plural 'mois')", () => {
      const now = new Date();
      const date2MonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date2MonthsAgo);
      expect(result).toBe("il y a 2 mois");
    });

    it("should format 6 months ago in French", () => {
      const now = new Date();
      const date6MonthsAgo = new Date(
        now.getTime() - 180 * 24 * 60 * 60 * 1000,
      );
      const result = formatRelativeTime(date6MonthsAgo);
      expect(result).toBe("il y a 6 mois");
    });

    it("should format 11 months ago in French", () => {
      const now = new Date();
      const date11MonthsAgo = new Date(
        now.getTime() - 330 * 24 * 60 * 60 * 1000,
      );
      const result = formatRelativeTime(date11MonthsAgo);
      expect(result).toBe("il y a 11 mois");
    });
  });

  describe("years range", () => {
    it("should format 1 year ago in French (singular)", () => {
      const now = new Date();
      const date1YearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date1YearAgo);
      expect(result).toBe("il y a 1 an");
    });

    it("should format 2 years ago in French (plural)", () => {
      const now = new Date();
      const date2YearsAgo = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date2YearsAgo);
      expect(result).toBe("il y a 2 ans");
    });

    it("should format 5 years ago in French", () => {
      const now = new Date();
      const date5YearsAgo = new Date(
        now.getTime() - 1825 * 24 * 60 * 60 * 1000,
      );
      const result = formatRelativeTime(date5YearsAgo);
      expect(result).toBe("il y a 5 ans");
    });
  });

  describe("input type handling", () => {
    it("should accept Date object", () => {
      const now = new Date();
      const date2DaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date2DaysAgo);
      expect(result).toBe("il y a 2 jours");
    });

    it("should accept ISO string", () => {
      const now = new Date();
      const date2DaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
      const isoString = date2DaysAgo.toISOString();
      const result = formatRelativeTime(isoString);
      expect(result).toBe("il y a 2 jours");
    });

    it("should accept timestamp number", () => {
      const now = new Date();
      const date2DaysAgo = now.getTime() - 2 * 24 * 60 * 60 * 1000;
      const result = formatRelativeTime(date2DaysAgo);
      expect(result).toBe("il y a 2 jours");
    });
  });

  describe("French language conventions", () => {
    it("should use 'il y a' prefix for past times", () => {
      const now = new Date();
      const date1DayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date1DayAgo);
      expect(result).toContain("il y a");
    });

    it("should use singular forms correctly (minute, heure, jour, semaine, an)", () => {
      const now = new Date();

      const date1MinuteAgo = new Date(now.getTime() - 1 * 60 * 1000);
      expect(formatRelativeTime(date1MinuteAgo)).toContain("minute");

      const date1HourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000);
      expect(formatRelativeTime(date1HourAgo)).toContain("heure");

      const date1DayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(date1DayAgo)).toContain("jour");

      const date1WeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(date1WeekAgo)).toContain("semaine");

      const date1YearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(date1YearAgo)).toContain("an");
    });

    it("should use plural forms correctly (minutes, heures, jours, semaines, ans)", () => {
      const now = new Date();

      const date2MinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);
      expect(formatRelativeTime(date2MinutesAgo)).toContain("minutes");

      const date2HoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
      expect(formatRelativeTime(date2HoursAgo)).toContain("heures");

      const date2DaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(date2DaysAgo)).toContain("jours");

      const date2WeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(date2WeeksAgo)).toContain("semaines");

      const date2YearsAgo = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(date2YearsAgo)).toContain("ans");
    });

    it("should use 'mois' for both singular and plural (French convention)", () => {
      const now = new Date();

      const date1MonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(date1MonthAgo)).toBe("il y a 1 mois");

      const date2MonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(date2MonthsAgo)).toBe("il y a 2 mois");
    });
  });

  describe("edge cases", () => {
    it("should handle boundary between minutes and hours (60 minutes)", () => {
      const now = new Date();
      const date60MinutesAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const result = formatRelativeTime(date60MinutesAgo);
      expect(result).toBe("il y a 1 heure");
    });

    it("should handle boundary between hours and days (24 hours)", () => {
      const now = new Date();
      const date24HoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date24HoursAgo);
      expect(result).toBe("il y a 1 jour");
    });

    it("should handle boundary between days and weeks (7 days)", () => {
      const now = new Date();
      const date7DaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date7DaysAgo);
      expect(result).toBe("il y a 1 semaine");
    });

    it("should handle boundary between weeks and months (4 weeks / 28 days)", () => {
      const now = new Date();
      const date28DaysAgo = new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date28DaysAgo);
      // 28 days = 4 weeks, but the function uses 30 days as the month threshold
      // So 28 days should still be in weeks range
      expect(result).toBe("il y a 4 semaines");
    });

    it("should handle boundary between months and years (12 months / 365 days)", () => {
      const now = new Date();
      const date365DaysAgo = new Date(
        now.getTime() - 365 * 24 * 60 * 60 * 1000,
      );
      const result = formatRelativeTime(date365DaysAgo);
      expect(result).toBe("il y a 1 an");
    });
  });
});

describe("formatCurrency", () => {
  describe("basic formatting with default currency (XOF)", () => {
    it("should format currency with space as thousands separator", () => {
      const result = formatCurrency(1234);
      // French locale uses narrow no-break space (U+202F)
      expect(result).toMatch(/1[\s\u202F]234/);
      expect(result).toContain("CFA");
    });

    it("should format currency without decimals (XOF is zero-decimal currency)", () => {
      const result = formatCurrency(1234.56);
      // XOF rounds to whole numbers (no decimal places)
      expect(result).toMatch(/1[\s\u202F]235/);
      expect(result).toContain("CFA");
      expect(result).not.toContain(",");
    });

    it("should format large numbers with multiple spaces", () => {
      const result = formatCurrency(1234567.89);
      expect(result).toMatch(/1[\s\u202F]234[\s\u202F]568/);
      expect(result).toContain("CFA");
    });

    it("should format zero", () => {
      const result = formatCurrency(0);
      expect(result).toContain("0");
      expect(result).toContain("CFA");
    });

    it("should format negative amounts", () => {
      const result = formatCurrency(-1234.56);
      expect(result).toContain("-");
      expect(result).toMatch(/1[\s\u202F]235/);
      expect(result).toContain("CFA");
    });
  });

  describe("with custom currency parameter", () => {
    it("should format EUR currency", () => {
      const result = formatCurrency(1234.56, "EUR");
      expect(result).toContain(",");
      expect(result).toMatch(/1[\s\u202F]234,56/);
      expect(result).toContain("€");
    });

    it("should format USD currency", () => {
      const result = formatCurrency(1234.56, "USD");
      expect(result).toContain(",");
      expect(result).toMatch(/1[\s\u202F]234,56/);
      expect(result).toContain("$US");
    });

    it("should format GBP currency", () => {
      const result = formatCurrency(1234.56, "GBP");
      expect(result).toContain(",");
      expect(result).toMatch(/1[\s\u202F]234,56/);
    });
  });

  describe("French locale conventions", () => {
    it("should use space as thousands separator (not comma)", () => {
      const result = formatCurrency(1234567, "EUR");
      // Check for narrow no-break space or regular space
      expect(result).toMatch(/[\s\u202F]/);
      // Should not have comma as thousands separator
      expect(result).not.toMatch(/\d,\d{3}/);
    });

    it("should use comma as decimal separator for decimal currencies", () => {
      const result = formatCurrency(1234.56, "EUR");
      expect(result).toContain(",");
      // Should not have period as decimal separator
      expect(result).not.toMatch(/\d\.\d{2}/);
    });

    it("should format decimal currencies with two decimal places", () => {
      const result = formatCurrency(1234, "EUR");
      expect(result).toMatch(/1[\s\u202F]234,00/);
    });

    it("should round decimal currencies to two decimal places", () => {
      const result = formatCurrency(1234.567, "EUR");
      expect(result).toMatch(/1[\s\u202F]234,57/);
    });

    it("should format zero-decimal currencies without decimals", () => {
      const result = formatCurrency(1234.56, "XOF");
      // XOF should not show decimals
      expect(result).not.toContain(",");
      expect(result).toMatch(/1[\s\u202F]235/);
    });
  });

  describe("edge cases", () => {
    it("should handle very small amounts with decimal currencies", () => {
      const result = formatCurrency(0.01, "EUR");
      expect(result).toContain("0,01");
    });

    it("should handle very large amounts", () => {
      const result = formatCurrency(999999999.99, "EUR");
      expect(result).toMatch(/999[\s\u202F]999[\s\u202F]999,99/);
    });

    it("should handle fractional cents correctly with decimal currencies", () => {
      const result = formatCurrency(1234.999, "EUR");
      // Should round to 1235.00
      expect(result).toMatch(/1[\s\u202F]235,00/);
    });

    it("should round zero-decimal currencies to nearest whole number", () => {
      const result = formatCurrency(1234.999, "XOF");
      // Should round to 1235
      expect(result).toMatch(/1[\s\u202F]235/);
      expect(result).not.toContain(",");
    });
  });
});
