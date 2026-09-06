"use client";

import { useSyncExternalStore } from "react";
import type { BrandDNA, CampaignPack, PlatformAccount } from "./types";
import { PLATFORMS } from "./platforms";

const BRAND_KEY = "riff.brand";
const PACK_KEY = "riff.pack";
const ACCOUNTS_KEY = "riff.accounts";
const STORE_EVENT = "riff-store";

function defaultAccounts(): PlatformAccount[] {
  return PLATFORMS.map((p) => ({
    id: p.id,
    name: p.label,
    status: "disconnected" as const,
  }));
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown | null) {
  if (typeof window === "undefined") return;
  if (value === null) localStorage.removeItem(key);
  else localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(STORE_EVENT));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(STORE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(STORE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getBrandSnapshot() {
  return readJson<BrandDNA | null>(BRAND_KEY, null);
}

function getPackSnapshot() {
  return readJson<CampaignPack | null>(PACK_KEY, null);
}

function getAccountsSnapshot() {
  return readJson<PlatformAccount[]>(ACCOUNTS_KEY, defaultAccounts());
}

function getServerNull() {
  return null;
}

function getServerAccounts() {
  return defaultAccounts();
}

export function useRiffStore() {
  const brand = useSyncExternalStore(subscribe, getBrandSnapshot, getServerNull);
  const pack = useSyncExternalStore(subscribe, getPackSnapshot, getServerNull);
  const accounts = useSyncExternalStore(subscribe, getAccountsSnapshot, getServerAccounts);

  function setBrand(next: BrandDNA | null) {
    writeJson(BRAND_KEY, next);
  }

  function setPack(next: CampaignPack | null | ((prev: CampaignPack | null) => CampaignPack | null)) {
    const resolved = typeof next === "function" ? next(getPackSnapshot()) : next;
    writeJson(PACK_KEY, resolved);
  }

  function connectAccount(id: PlatformAccount["id"], handle: string) {
    const next = getAccountsSnapshot().map((a) =>
      a.id === id
        ? {
            ...a,
            status: "connected" as const,
            handle,
            connectedAt: new Date().toISOString(),
          }
        : a,
    );
    writeJson(ACCOUNTS_KEY, next);
  }

  function disconnectAccount(id: PlatformAccount["id"]) {
    const next = getAccountsSnapshot().map((a) =>
      a.id === id
        ? { ...a, status: "disconnected" as const, handle: undefined, connectedAt: undefined }
        : a,
    );
    writeJson(ACCOUNTS_KEY, next);
  }

  function schedulePost(postId: string, when: string) {
    setPack((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        posts: prev.posts.map((p) =>
          p.id === postId ? { ...p, status: "scheduled", scheduledFor: when } : p,
        ),
      };
    });
  }

  function clearAll() {
    writeJson(BRAND_KEY, null);
    writeJson(PACK_KEY, null);
    writeJson(ACCOUNTS_KEY, defaultAccounts());
  }

  return {
    brand,
    setBrand,
    pack,
    setPack,
    accounts,
    connectAccount,
    disconnectAccount,
    schedulePost,
    clearAll,
    hydrated: typeof window !== "undefined",
  };
}
