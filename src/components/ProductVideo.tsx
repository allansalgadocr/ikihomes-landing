"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { sendGAEvent } from "@next/third-parties/google";
import { PRODUCT_VIDEO_ID, PRODUCT_VIDEO_POSTER, youtubeEmbedUrl } from "@/lib/productVideo";

interface ProductVideoProps {
  playLabel: string;
  playerTitle: string;
}

/**
 * Click-to-play walkthrough. Until play is pressed this is our own poster and a
 * button: the YouTube player, its scripts and its requests load only after the
 * click, so the page stays light for everyone who never watches.
 */
export function ProductVideo({ playLabel, playerTitle }: ProductVideoProps) {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  // The play button unmounts on click; hand keyboard focus to the player.
  useEffect(() => {
    if (playing) playerRef.current?.focus();
  }, [playing]);

  return (
    <div className="proof-video">
      {playing ? (
        <iframe
          ref={playerRef}
          src={youtubeEmbedUrl(PRODUCT_VIDEO_ID)}
          title={playerTitle}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="proof-video-play"
          aria-label={playLabel}
          onClick={() => {
            setPlaying(true);
            sendGAEvent("event", "agent_video_played", {
              category: "landing",
              source: "product_proof",
            });
          }}
        >
          <Image
            src={PRODUCT_VIDEO_POSTER}
            alt=""
            fill
            sizes="(max-width: 1240px) 100vw, 1160px"
            quality={90}
          />
          <span className="proof-video-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.98-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
