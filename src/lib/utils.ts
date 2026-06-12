export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

export function getBasePath() {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/hsw4" : "");
}

export function path(route: string) {
  const base = getBasePath();
  const normalized = route.startsWith("/") ? route : `/${route}`;
  return `${base}${normalized}${normalized.endsWith("/") ? "" : "/"}`;
}
