export enum Role {
  System = 'system',
  User = 'user',
}

export default class OpenAIMessage {
  constructor(public role: Role, public content: string) {}
}
