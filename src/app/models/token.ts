export interface TokenDecoded {
  "id": string,
  "profile_id": number,
  "profile_name": string,
  "profile_detail": string,
  "name": string,
  "email": string,
  "expiration_date"?: string,
  "theme": string,
  "iat": number,
  "exp": number
}
