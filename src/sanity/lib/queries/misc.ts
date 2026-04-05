import { defineQuery } from "next-sanity";

export const sitemapQuery = defineQuery(`
  *[_type in ["page", "post", "service", "blogPage", "servicesPage"] && defined(slug.current)] {
    "href": select(
      _type == "page" => "/" + slug.current,
      _type == "post" => "/blog/" + slug.current,
      _type == "blogPage" => "/blog",
      _type == "service" => "/services/" + slug.current,
      _type == "servicesPage" => "/services",
      slug.current
    ),
    _updatedAt
  }
`)

export const redirectsQuery = defineQuery(`
  *[_type == "redirect" && isEnabled == true] {
      source,
      destination,
      permanent
  }
`);