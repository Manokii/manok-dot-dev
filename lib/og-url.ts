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
    .concat("?headline=", props.headline || "John Doe")
    .concat("&url=", "Manok.dev")
    .concat("&subheadline=", props.subheadline || "Software Engineer at XYZ")
    .concat("&github=", props.github || "")
    .concat("&linkedin=", props.linkedin || "")
    .concat("&twitter=", props.twitter || "")
    .concat("&website=", props.website || "")

  return encodeURI(url)
}
