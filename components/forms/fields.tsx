"use client";

import { useId } from "react";

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
};

const controlBase =
  "w-full min-h-[48px] border bg-surface px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-faint focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

function labelClass(required?: boolean) {
  return `block text-sm font-medium text-ink ${required ? "" : ""}`;
}

function Wrapper({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass(required)}>
        {label}
        {required ? (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-ink-faint">Optional</span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-ink-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  name,
  error,
  required,
  hint,
  value,
  onChange,
  type = "text",
  autoComplete,
}: BaseProps & { type?: string; autoComplete?: string }) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} required={required} hint={hint} error={error}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={`${controlBase} ${error ? "border-error" : "border-rule hover:border-rule-strong"}`}
      />
    </Wrapper>
  );
}

export function TextArea({
  label,
  name,
  error,
  required,
  hint,
  value,
  onChange,
  rows = 6,
}: BaseProps & { rows?: number }) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} required={required} hint={hint} error={error}>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={`${controlBase} resize-y leading-relaxed ${
          error ? "border-error" : "border-rule hover:border-rule-strong"
        }`}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  name,
  error,
  required,
  hint,
  value,
  onChange,
  options,
  placeholder = "Select one",
}: BaseProps & {
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} required={required} hint={hint} error={error}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={`${controlBase} appearance-none bg-[length:auto] pr-10 ${
          error ? "border-error" : "border-rule hover:border-rule-strong"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export function CheckboxField({
  label,
  name,
  error,
  checked,
  onChange,
}: {
  label: React.ReactNode;
  name: string;
  error?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`peer h-5 w-5 cursor-pointer appearance-none rounded-xs border transition-all ${
              checked
                ? "border-ink bg-ink shadow-xs"
                : error
                ? "border-error bg-surface hover:border-ink"
                : "border-rule-strong bg-surface hover:border-ink"
            } focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-1`}
          />
          {checked ? (
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path d="M3.5 8.5l3 3 6-6" />
            </svg>
          ) : null}
        </div>
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-ink-soft select-none hover:text-ink">
          {label}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Off-screen honeypot. Not shown to users, ignored by assistive technology. */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="website-field">Website</label>
      <input
        id="website-field"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
