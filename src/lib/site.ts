import type { Metadata } from "next";

export const SITE_URL = "https://caliprint.example.com";
export const SITE_NAME = "CaliPrint";
export const SITE_DESCRIPTION =
  "A print studio for prototypes, functional parts and short runs. Send a model, receive the object — FDM and resin printing, finished by hand.";

/**
 * Per-page metadata: canonical URL, Open Graph and Twitter card in one place.
 *
 * Next merges metadata down the tree, and anything a page leaves out it
 * inherits from the layout. That is a quiet trap for two fields in
 * particular. A canonical URL in the root layout is inherited verbatim, so
 * every page ends up declaring itself a copy of the home page — which is an
 * instruction to search engines to drop them from the index. og:title and
 * og:url inherit the same way, so a shared link to any page shows the home
 * page's card and sends the reader to the home page.
 *
 * Both are addressed by giving every route its own metadata through this
 * helper rather than by remembering to override two particular fields.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** the page's own title; the layout template appends the site name */
  title?: string;
  description: string;
  /** site-root-relative, e.g. "/work" — "/" for the home page */
  path: string;
}): Metadata {
  const social = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Print Studio`;
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: social,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
    },
  };
}
