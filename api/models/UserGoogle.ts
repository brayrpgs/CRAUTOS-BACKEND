export interface UserGoogle {
  id: string
  displayName: string
  name: Name
  emails: Email[]
  photos: Photo[]
  provider: string
  _raw: string
  _json: Json
}

interface Name {
  familyName: string
  givenName: string
}

interface Email {
  value: string
  verified: boolean
}

interface Photo {
  value: string
}

interface Json {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
}
