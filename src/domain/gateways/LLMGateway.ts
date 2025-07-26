export default interface LLMGateway {
  ask(userQuestion: string, devQuestion: string): Promise<string>;
}
