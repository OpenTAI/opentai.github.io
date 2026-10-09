"use client";

import Image from "next/image";
import { useReducer } from "react";
import { type Locale, t } from "@/lib/i18n";

type IntroProps = { locale: Locale; videoHref: string; posterHref: string };
type IntroState = "poster" | "playing" | "error";
type IntroEvent = "activate" | "error";

export function introVideoReducer(state: IntroState, event: IntroEvent): IntroState {
  if (event === "activate") return "playing";
  if (state === "playing") return "error";
  return state;
}

export function IntroVideoFrame({ locale, videoHref, posterHref, state, dispatch }: IntroProps & {
  state: IntroState;
  dispatch: (event: IntroEvent) => void;
}) {
  const introduction = t(locale, "41-second introduction");

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#101828]">
      {state === "playing" ? (
        <video
          ref={(video) => {
            video?.focus();
          }}
          aria-label={introduction}
          className="h-full w-full object-contain"
          src={videoHref}
          poster={posterHref}
          autoPlay
          controls
          playsInline
          preload="none"
          onError={() => dispatch("error")}
        />
      ) : (
        <>
          <Image
            alt=""
            className="object-contain"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            src={posterHref}
            unoptimized
          />
          {state === "error" ? (
            <div className="absolute inset-0 grid place-content-center gap-3 bg-black/65 px-4 text-center text-white">
              <p className="text-sm leading-6" role="alert">
                {t(locale, "Could not load the video. Please try again.")}
              </p>
              <button
                className="justify-self-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#101828] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                onClick={() => dispatch("activate")}
                type="button"
              >
                {t(locale, "Retry playback")}
              </button>
            </div>
          ) : (
            <button
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/10 text-white transition-colors hover:bg-black/20 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
              onClick={() => dispatch("activate")}
              type="button"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#101828] shadow-lg" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                  <path d="M8 5v14l11-7-11-7Z" />
                </svg>
              </span>
              <span className="rounded-full bg-black/65 px-3 py-1.5 text-sm font-medium">
                {introduction}
              </span>
            </button>
          )}
        </>
      )}
    </div>
  );
}

export function AiSafetyHotIntro(props: IntroProps) {
  const [state, dispatch] = useReducer(introVideoReducer, "poster");
  return <IntroVideoFrame {...props} state={state} dispatch={dispatch} />;
}
