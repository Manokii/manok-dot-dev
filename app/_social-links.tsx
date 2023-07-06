import { buttonVariants } from "@/components/ui/button"
import NextLink from "next/link"
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
  IconWorldWww,
} from "@tabler/icons-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface Props {
  github?: string
  linkedin?: string
  twitter?: string
  website?: string
  publicEmail?: string | null
}

export function SocialLinks(props: Props) {
  return (
    <div className="flex items-center gap-2 mt-4">
      {props?.github && (
        <div className="flex items-center">
          <NextLink
            href={props.github}
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
            })}
          >
            <IconBrandGithub />
          </NextLink>
        </div>
      )}
      {props?.linkedin && (
        <div className="flex items-center">
          <NextLink
            href={props.linkedin}
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
            })}
          >
            <IconBrandLinkedin />
          </NextLink>
        </div>
      )}
      {props?.twitter && (
        <div className="flex items-center">
          <NextLink
            href={props.twitter}
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
            })}
          >
            <IconBrandTwitter />
          </NextLink>
        </div>
      )}
      {props?.website && (
        <div className="flex items-center">
          <NextLink
            href={props.website}
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
            })}
          >
            <IconWorldWww />
          </NextLink>
        </div>
      )}
      {props.publicEmail && (
        <div className="flex items-center">
          <NextLink
            href={`mailto:${props.publicEmail}`}
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
            })}
          >
            <IconMail />
          </NextLink>
        </div>
      )}

      <ThemeToggle />
    </div>
  )
}
