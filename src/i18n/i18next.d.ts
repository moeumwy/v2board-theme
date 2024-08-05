import { KeyPrefix, Namespace } from "i18next";
import { UseTranslationOptions, UseTranslationResponse } from "react-i18next";
declare module "react-i18next" {
  export function useTranslation<
    N extends Namespace = "common",
    TKPrefix extends KeyPrefix<N> = Record<string, string>
  >(ns?: N | Readonly<N>, options?: UseTranslationOptions<TKPrefix>): UseTranslationResponse<N, TKPrefix>;
}
