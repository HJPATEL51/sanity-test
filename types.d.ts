// types/sanity.d.ts

declare module "@sanity/client" {
  interface ClientConfig {
    projectId: string;
    dataset: string;
    useCdn?: boolean;
    token?: string;
    apiVersion: string,
  }

  interface SanityClient {
    (config: ClientConfig): SanityClient;
    create: (doc: any) => Promise<any>;
    fetch: (query: string, params?: Record<string, any>) => Promise<any>;
    patch: (id: string) => any;
  }

  export const createClient: (config: ClientConfig) => SanityClient;

  const sanityClient: SanityClient;
  export default sanityClient;
}

declare module "react-modal";

declare module "js-confetti";

declare module "scroll-to-bottomjs";
