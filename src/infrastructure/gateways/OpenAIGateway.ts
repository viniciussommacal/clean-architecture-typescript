import LLMGateway from '../../domain/gateways/LLMGateway';
import OpenAIMessage, { Role } from '../../application/dto/OpenAIMessage';
import OpenAI from 'openai';

export default class OpenAIGateway implements LLMGateway {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async ask(userQuestion: string, devQuestion: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? 'gpt-4.1',
      messages: [
        new OpenAIMessage(Role.System, devQuestion),
        new OpenAIMessage(Role.User, userQuestion),
      ],
    });

    return response.choices[0]?.message?.content ?? 'No response OpenAI';
  }
}
