import OpenAIGateway from '../../../../infrastructure/gateways/OpenAIGateway';
import OpenAI from 'openai';

jest.mock('openai');
const MockedOpenAI = OpenAI as jest.MockedClass<typeof OpenAI>;

describe('OpenAIGateway', () => {
  let gateway: OpenAIGateway;
  let mockCreate: jest.Mock;

  beforeEach(() => {
    process.env.OPENAI_API_KEY = 'test-key';

    mockCreate = jest.fn();
    MockedOpenAI.mockImplementation(
      () =>
        ({
          chat: {
            completions: {
              create: mockCreate,
            },
          },
        } as any),
    );

    gateway = new OpenAIGateway();
  });

  describe('ask', () => {
    it('deve retornar resposta da OpenAI', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Resposta da OpenAI',
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      const result = await gateway.ask(
        'Pergunta do usuário',
        'Pergunta do dev',
      );

      expect(result).toBe('Resposta da OpenAI');
    });
  });
});
