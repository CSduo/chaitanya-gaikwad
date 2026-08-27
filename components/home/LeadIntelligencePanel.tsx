"use client";

import { useState } from "react";
import Link from "next/link";
import { WORKBOOKS, type Workbook } from "@/lib/portfolio";
import { TACTILE_CLASSES, triggerHaptic } from "@/lib/tactile";

// Sample verified records to preview inside the interactive expandable drawer
const WORKBOOK_PREVIEWS: Record<string, { headers: string[]; rows: string[][] }> = {
  "cleaned-premium-fabric-import-buyer-shortlist": {
    headers: ["Rank", "Company / Importer", "City", "Category", "Verification"],
    rows: [
      ["01", "D'Decor Home Fabrics", "Mumbai", "High-End Drapery & Upholstery", "Active Import Verified"],
      ["02", "F&F (Floor & Furnishings)", "Gurugram", "European Jacquards & Linens", "Direct Route Confirmed"],
      ["03", "GM Syntex", "Mumbai", "Luxury Contract Textiles", "Decision-Maker Mapped"],
      ["04", "Pure Concept Luxury Living", "Delhi NCR", "Velvets & Silk Imports", "Verified 2026 Signal"],
    ],
  },
  "automotive-showroom-lead-intelligence": {
    headers: ["Rank", "Dealer / Flagship", "City", "Brand Focus", "Decision Route"],
    rows: [
      ["01", "Al-Futtaim BYD KSA (Khurais)", "Riyadh", "BYD EV / Hybrid Flagship", "Managing Director / Projects"],
      ["02", "Al-Futtaim BYD KSA (Dhahran)", "Dhahran", "Mall & Retail Showroom", "Dealer Operations / Projects"],
      ["03", "SAMACO Automotive (Porsche)", "Riyadh", "Luxury Dealership Flagship", "Marketing / Facilities"],
      ["04", "Mohamed Yousuf Naghi Motors", "Jeddah", "BMW / Rolls-Royce Network", "Dealer Dev / Facilities"],
    ],
  },
  "philippines-vip-approachable-lead-intelligence": {
    headers: ["Rank", "Developer / Practice", "Location", "Sector Focus", "Route Status"],
    rows: [
      ["01", "Ayala Land Premier Design", "Makati / BGC", "Ultra-Luxury Residential", "Executive Studio Route"],
      ["02", "Rockwell Land Corporation", "Makati", "High-Rise Residential & Retail", "Design Management Mapped"],
      ["03", "Megaworld Luxury Collection", "Taguig", "Hospitality & Townships", "Procurement Verified"],
    ],
  },
  "china-interior-markets-100plus": {
    headers: ["Rank", "Hub / Market Name", "City / Tier", "Market Focus", "Logistics Route"],
    rows: [
      ["01", "Lecong International Furniture Mall", "Foshan (Tier 2)", "High-End Wholesale & Custom", "Direct Container Logged"],
      ["02", "Louvre Furnishing Group", "Foshan", "Luxury European Furniture Imports", "Direct Wholesale Route"],
      ["03", "Yiwu International Trade City", "Yiwu (Tier 3)", "Interior Accessories & Lighting", "Export Verified"],
    ],
  },
};

export function LeadIntelligencePanel() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expandedWorkbook, setExpandedWorkbook] = useState<Workbook | null>(null);

  const displayedWorkbooks =
    activeTab === "all"
      ? WORKBOOKS.slice(0, 4)
      : WORKBOOKS.filter((w) => w.slug.includes(activeTab));

  const totalSheets = WORKBOOKS.reduce((acc, w) => acc + w.sheetCount, 0);

  const handleOpenPreview = (w: Workbook) => {
    setExpandedWorkbook(w);
    triggerHaptic("medium");
  };

  const handleClosePreview = () => {
    setExpandedWorkbook(null);
    triggerHaptic("light");
  };

  return (
    <div className="w-full">
      {/* 01 — Top Compact Metrics Bar */}
      <div className="mb-6 grid grid-cols-3 gap-2 border border-rule bg-surface p-2 sm:p-3 rounded-lg">
        <div className="px-3 py-2 text-center sm:text-left">
          <p className="font-mono text-[0.5625rem] uppercase tracking-wider text-ink-muted">
            Intelligence Sets
          </p>
          <p className="display mt-0.5 text-xl font-medium text-ink sm:text-2xl">
            {WORKBOOKS.length}
          </p>
        </div>
        <div className="border-x border-rule px-3 py-2 text-center sm:text-left">
          <p className="font-mono text-[0.5625rem] uppercase tracking-wider text-ink-muted">
            Structured Sheets
          </p>
          <p className="display mt-0.5 text-xl font-medium text-ink sm:text-2xl">
            {totalSheets}
          </p>
        </div>
        <div className="px-3 py-2 text-center sm:text-left">
          <p className="font-mono text-[0.5625rem] uppercase tracking-wider text-ink-muted">
            Verified Markets
          </p>
          <p className="display mt-0.5 text-xl font-medium text-amber-600 sm:text-2xl">
            8 Global
          </p>
        </div>
      </div>

      {/* 02 — Region Selector Filter Pills */}
      <div className="mb-4 flex flex-wrap items-center gap-1.5 border-b border-rule pb-3">
        {[
          { id: "all", label: "All Datasets (4)" },
          { id: "fabric", label: "India · Fabrics" },
          { id: "automotive", label: "Middle East · Automotive" },
          { id: "philippines", label: "Philippines · VIP" },
          { id: "china", label: "China · Markets" },
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                triggerHaptic("selection");
              }}
              className={`rounded-xs px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-wider transition-all duration-150 ${
                isSelected
                  ? "bg-ink text-paper font-semibold shadow-xs"
                  : "bg-paper-deep text-ink-muted hover:bg-paper hover:text-ink border border-rule"
              } ${TACTILE_CLASSES.tab}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 03 — Compact Interactive Summary List */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {displayedWorkbooks.map((w) => (
          <div
            key={w.slug}
            className="group relative flex flex-col justify-between rounded-md border border-rule bg-surface p-4 transition-all duration-200 hover:border-amber-600/50 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-amber-700 font-semibold">
                  {w.region}
                </span>
                <span className="rounded-xs bg-amber-50 px-2 py-0.5 font-mono text-[0.5625rem] text-amber-800 border border-amber-200/60">
                  {w.sheetCount} {w.sheetCount === 1 ? "Sheet" : "Sheets"}
                </span>
              </div>

              <h4 className="mt-2 text-sm font-semibold text-ink leading-snug group-hover:text-amber-700 transition-colors">
                {w.title}
              </h4>

              <p className="mt-1.5 text-xs text-ink-muted line-clamp-2 leading-relaxed">
                {w.summary}
              </p>
            </div>

            {/* In-Place Preview Button */}
            <div className="mt-4 flex items-center justify-between border-t border-rule/60 pt-2.5">
              <button
                type="button"
                onClick={() => handleOpenPreview(w)}
                className={`inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:text-amber-800 ${TACTILE_CLASSES.buttonSubtle}`}
              >
                <span>Preview Data Sheet</span>
                <span aria-hidden="true">↓</span>
              </button>

              <Link
                href={`/work/research/${w.slug}`}
                className="font-mono text-[0.625rem] text-ink-muted hover:text-ink transition-colors"
              >
                Full Study &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 04 — Expandable Interactive Drawer / Modal (Preview Sheet) */}
      {expandedWorkbook && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 sm:p-6 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={handleClosePreview}
        >
          <div
            className="relative flex max-h-[85vh] w-full max-w-3xl flex-col rounded-lg border border-rule bg-paper shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-rule bg-paper-deep px-6 py-4">
              <div>
                <span className="font-mono text-[0.625rem] uppercase tracking-widest text-amber-700 font-semibold">
                  {expandedWorkbook.region} · Verified Sample Data
                </span>
                <h3 className="display mt-1 text-lg font-medium text-ink">
                  {expandedWorkbook.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClosePreview}
                className={`flex h-8 w-8 items-center justify-center rounded-xs border border-rule bg-paper text-sm text-ink hover:bg-paper-deep ${TACTILE_CLASSES.iconButton}`}
              >
                ✕
              </button>
            </div>

            {/* Modal Data Preview Table */}
            <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
              {WORKBOOK_PREVIEWS[expandedWorkbook.slug] ? (
                <table className="min-w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-rule bg-paper-deep">
                      {WORKBOOK_PREVIEWS[expandedWorkbook.slug].headers.map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2 font-mono text-[0.5625rem] font-medium uppercase tracking-wider text-ink-muted"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {WORKBOOK_PREVIEWS[expandedWorkbook.slug].rows.map((row, i) => (
                      <tr key={i} className="border-b border-rule/60 hover:bg-surface">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-3 py-2.5 text-xs ${
                              cIdx === 0
                                ? "font-mono font-semibold text-amber-700"
                                : cIdx === 1
                                ? "font-medium text-ink"
                                : "text-ink-muted"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-4 text-center text-sm text-ink-muted">
                  Full dataset contains {expandedWorkbook.sheetCount} structured sheets.
                </div>
              )}

              <p className="mt-4 font-mono text-[0.625rem] text-ink-faint">
                * Note: Direct contact details and personal IDs are withheld in public preview copy.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule bg-paper-deep px-6 py-3.5">
              <span className="font-mono text-xs text-ink-soft">
                {expandedWorkbook.sheetCount} sheets total in research library
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClosePreview}
                  className="px-4 py-2 font-mono text-xs text-ink-muted hover:text-ink"
                >
                  Close
                </button>
                <Link
                  href={`/work/research/${expandedWorkbook.slug}`}
                  className="rounded-xs bg-ink px-4 py-2 font-mono text-xs text-paper hover:bg-accent transition-colors"
                >
                  Open Complete Case Study &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
