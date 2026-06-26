const SITE_URL = "https://ubayd.me";

export interface BreadcrumbSchemaItem {
  name: string;
  url: string;
}

/** Build schema.org BreadcrumbList JSON-LD from an ordered list of crumbs. */
export function buildBreadcrumbJsonLd(items: BreadcrumbSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Standard project page breadcrumb trail: Home → Projects → {title} */
export function buildProjectBreadcrumbJsonLd(slug: string, title: string) {
  return buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Projects", url: `${SITE_URL}/projects` },
    { name: title, url: `${SITE_URL}/projects/${slug}` },
  ]);
}
