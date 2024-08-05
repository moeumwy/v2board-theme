export interface UserConfig {
  is_telegram: 0 | 1;
  telegram_discuss_link: string;
  stripe_pk: null;
  withdraw_methods: string[];
  withdraw_close: number;
  currency: string;
  currency_symbol: string;
  commission_distribution_enable: number;
  commission_distribution_l1: null;
  commission_distribution_l2: null;
  commission_distribution_l3: null;
}

export interface GuestConfig {
  tos_url: null;
  is_email_verify: 0 | 1;
  is_invite_force: 0 | 1;
  email_whitelist_suffix: number;
  is_recaptcha: 0 | 1;
  recaptcha_site_key: null;
  app_description: string;
  app_url: string;
  logo: null;
}
