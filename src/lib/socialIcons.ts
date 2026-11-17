import {
  CodeIcon,
  DevToLogoIcon,
  FacebookLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MediumLogoIcon,
  SnapchatLogoIcon,
  StackOverflowLogoIcon,
  type Icon,
} from '@phosphor-icons/react'

/** Maps `SocialLink.icon` keys in profile.ts to Phosphor icons. */
const SOCIAL_ICONS: Record<string, Icon> = {
  LinkedIn: LinkedinLogoIcon,
  GitHub: GithubLogoIcon,
  StackOverflow: StackOverflowLogoIcon,
  DevTo: DevToLogoIcon,
  Medium: MediumLogoIcon,
  Facebook: FacebookLogoIcon,
  Instagram: InstagramLogoIcon,
  Snapchat: SnapchatLogoIcon,
}

export const socialIcon = (key: string): Icon => SOCIAL_ICONS[key] ?? CodeIcon
