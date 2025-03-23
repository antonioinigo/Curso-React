// Override Next.js generated types for this specific page
declare module "*/app/admin/products/[id]/edit/page" {
    export interface PageProps {
      params: {
        id: string
      }
      searchParams?: Record<string, string | string[] | undefined>
    }
  }