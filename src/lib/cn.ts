/** Join truthy class names. Tiny on purpose: tokens are strict, so no merge logic is needed. */
export const cn = (...classes: Array<string | false | null | undefined>): string => classes.filter(Boolean).join(' ')
