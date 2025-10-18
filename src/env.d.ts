/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly COSMIC_BUCKET_SLUG: string;
  readonly COSMIC_READ_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}