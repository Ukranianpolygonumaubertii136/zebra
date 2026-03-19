/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module "*.properties" {
  const content: { [key: string]: string };
  export default content;
}
/// <reference types="vite-plugin-pwa/client" />
