export default interface Server {
  id: number;
  group_id: string[];
  route_id: string[] | null;
  parent_id: number;
  tags: string[] | null;
  name: string;
  rate: string;
  host: string;
  port: number;
  server_port: number;
  cipher?: Cipher;
  obfs?: null;
  obfs_settings?: null;
  show: number;
  sort: number;
  created_at: number;
  updated_at: number;
  type: Type;
  last_check_at: string;
  tls?: number;
  network?: string;
  rules?: null;
  networkSettings?: null;
  tlsSettings?: null;
  ruleSettings?: null;
  dnsSettings?: null;
}

export enum Cipher {
  Chacha20IETFPoly1305 = "chacha20-ietf-poly1305"
}
export enum Type {
  Shadowsocks = "shadowsocks",
  V2Ray = "v2ray"
}
