"use client";

import { useEffect, useMemo, useState } from "react";

type Sheet = { name: string; data: (string | number | null)[][] };
type Workbook = { sheets: Sheet[] };

const PAGE_SIZE = 25;

/**
 * Workbook viewer for the published research portfolio.
 *
 * The previous site rendered every cell of every sheet into one table — up to
 * 6,777 cells in a single unvirtualised DOM. This paginates instead, searches
 * across the whole sheet rather than the visible page, and fetches the dataset
 * only when a visitor actually opens it.
 *
 * The published JSON is the redacted portfolio copy: contact details were
 * removed before publication and are not present in the source file.
 */
export function DataViewer({
  dataUrl,
  downloadUrl,
  title,
}: {
  dataUrl: string;
  downloadUrl: string;
  title: string;
}) {
  const [workbook, setWorkbook] = useState<Workbook | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [sheetIndex, setSheetIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  // Reset to loading when the dataset changes, adjusted during render rather
  // than in an effect so it does not trigger a cascading re-render.
  const [lastUrl, setLastUrl] = useState(dataUrl);
  if (dataUrl !== lastUrl) {
    setLastUrl(dataUrl);
    setWorkbook(null);
    setStatus("loading");
    setSheetIndex(0);
    setQuery("");
    setPage(0);
  }

  useEffect(() => {
    let cancelled = false;
    fetch(dataUrl)
      .then((r) => {
        // The site returns a real 404 for unknown paths, so this is meaningful.
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const type = r.headers.get("content-type") ?? "";
        if (!type.includes("json")) throw new Error("unexpected content type");
        return r.json();
      })
      .then((json: Workbook) => {
        if (cancelled) return;
        setWorkbook(json);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [dataUrl]);

  const cleanSheets = useMemo(() => {
    if (!workbook?.sheets?.length) return [];
    return workbook.sheets.filter(
      (s) => !/backup|scoring|executive summary|exclusive summary/i.test(s.name)
    );
  }, [workbook]);

  const sheet = cleanSheets[sheetIndex] ?? cleanSheets[0];

  const { headers, rows } = useMemo(() => {
    if (!sheet?.data?.length) return { headers: [] as string[], rows: [] as (string | number | null)[][] };
    const [head, ...body] = sheet.data;
    return {
      headers: head.map((h, i) => (h == null || h === "" ? `Column ${i + 1}` : String(h))),
      rows: body,
    };
  }, [sheet]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      row.some((cell) => cell != null && String(cell).toLowerCase().includes(q)),
    );
  }, [rows, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  function selectSheet(i: number) {
    setSheetIndex(i);
    setQuery("");
    setPage(0);
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-lg border border-rule bg-surface">
        <p className="label">Loading workbook…</p>
      </div>
    );
  }

  if (status === "error" || !cleanSheets.length) {
    return (
      <div className="rounded-lg border border-rule bg-surface p-8">
        <p className="text-base text-ink">This dataset could not be loaded.</p>
        <p className="mt-2 text-sm text-ink-muted">
          The redacted portfolio copy is still available to download.
        </p>
        <a
          href={downloadUrl}
          download
          className="mt-6 inline-flex min-h-[44px] items-center rounded-xs bg-ink px-5 text-sm text-paper transition-colors hover:bg-accent"
        >
          Download workbook
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-rule bg-surface overflow-hidden shadow-2xs">
      {/* Sheet tabs - horizontal scrollable on mobile */}
      <div
        role="tablist"
        aria-label={`Sheets in ${title}`}
        className="flex items-center gap-1.5 overflow-x-auto border-b border-rule bg-paper-deep/60 p-2 sm:p-2.5 scrollbar-none"
      >
        {cleanSheets.map((s, i) => {
          const on = i === sheetIndex;
          return (
            <button
              key={s.name}
              role="tab"
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onClick={() => selectSheet(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  selectSheet((i + 1) % cleanSheets.length);
                }
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  selectSheet((i - 1 + cleanSheets.length) % cleanSheets.length);
                }
              }}
              className={`min-h-[38px] whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-medium tracking-tight transition-all shrink-0 ${
                on
                  ? "bg-ink text-paper shadow-xs"
                  : "border border-rule bg-paper text-ink-muted hover:border-ink/50 hover:text-ink"
              }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 border-b border-rule px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-3">
          <span className="label shrink-0">Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Filter rows"
            className="min-h-[44px] w-full min-w-0 border border-rule bg-paper px-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus sm:w-56"
          />
        </label>

        <p className="meta" aria-live="polite">
          {filtered.length === rows.length
            ? `${rows.length} rows`
            : `${filtered.length} of ${rows.length} rows`}
          {" · "}
          {headers.length} fields
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[44rem] border-collapse text-left">
          <caption className="sr-only">
            {title} — sheet {sheet?.name}. Contact details are redacted in this published copy.
          </caption>
          <thead>
            <tr className="border-b border-rule bg-paper-deep">
              {headers.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-ink-muted"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length > 0 ? (
              visible.map((row, i) => (
                <tr key={safePage * PAGE_SIZE + i} className="border-b border-rule/70 align-top">
                  {headers.map((_, c) => {
                    const cell = row[c];
                    const text = cell == null || cell === "" ? null : String(cell);
                    const isUrl = text?.startsWith("http");
                    return (
                      <td
                        key={c}
                        className={`px-4 py-3 text-xs leading-relaxed ${
                          c === 0 ? "font-medium text-ink" : "text-ink-soft"
                        }`}
                      >
                        {text ? (
                          isUrl ? (
                            <a
                              href={text}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="break-all text-accent underline underline-offset-2"
                            >
                              {text.length > 48 ? `${text.slice(0, 48)}…` : text}
                            </a>
                          ) : (
                            <span className="line-clamp-4 max-w-[22rem]">{text}</span>
                          )
                        ) : (
                          <span className="text-ink-faint">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length || 1} className="px-4 py-16 text-center">
                  <p className="text-sm text-ink-muted">No rows match that search.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination + download */}
      <div className="flex flex-col gap-4 border-t border-rule px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safePage === 0}
            className="min-h-[44px] px-3 text-sm text-ink transition-colors hover:text-accent disabled:cursor-not-allowed disabled:text-ink-faint"
          >
            &larr; Previous
          </button>
          <span className="meta whitespace-nowrap">
            Page {safePage + 1} of {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={safePage >= pageCount - 1}
            className="min-h-[44px] px-3 text-sm text-ink transition-colors hover:text-accent disabled:cursor-not-allowed disabled:text-ink-faint"
          >
            Next &rarr;
          </button>
        </div>

        <a
          href={downloadUrl}
          download
          className="inline-flex min-h-[44px] items-center justify-center rounded-xs border border-rule-strong px-5 text-sm text-ink transition-colors hover:border-ink hover:bg-paper-deep"
        >
          Download redacted copy
        </a>
      </div>
    </div>
  );
}
