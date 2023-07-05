interface Props {
  headline: string
  url: string
  subheadline: string
  github: string
  linkedin: string
  twitter: string
  website: string
}

export function ogUrl(props: Partial<Props>) {
  const url = "/og/profile"
  url.concat("?headline=", props.headline || "John Doe")
  url.concat("&url=", "Manok.dev")
  url.concat("&subheadline=", props.subheadline || "Software Engineer at XYZ")
  url.concat("&github=", props.github || "")
  url.concat("&linkedin=", props.linkedin || "")
  url.concat("&twitter=", props.twitter || "")
  url.concat("&website=", props.website || "")

  return url
}
