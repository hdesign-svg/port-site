/** Bullet used for masked card/account last-four — must match across Expenses and Accounting */
export const HCP_MASK_BULLET = "•";

export function formatMaskedLast4(last4: string): string {
  return `${HCP_MASK_BULLET.repeat(4)} ${last4}`;
}

export function formatLinkedAccountLabel(name: string, last4: string): string {
  return `${name} ${formatMaskedLast4(last4)}`;
}

export const HCP_LINKED_ACCOUNTS = {
  checking: formatLinkedAccountLabel("Chase Business Checking", "1233"),
  card: formatLinkedAccountLabel("Chase Ink Business", "8812"),
  amex: formatLinkedAccountLabel("Amex Business", "4401"),
} as const;

export const LINKED_ACCOUNTS_SYNC_DETAIL = "Chase & Amex · last synced 2 hours ago";
