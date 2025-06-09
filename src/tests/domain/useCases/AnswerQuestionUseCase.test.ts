import AnswerQuestionUseCase from '../../../domain/useCase/AnswerQuestionUseCase';
import LLMGateway from '../../../domain/gateway/LLMGateway';
import CatalogRepository from '../../../domain/repository/CatalogRepository';
import DomainException from '../../../../src/domain/exception/DomainException';

describe('AnswerQuestionUseCase', () => {
  const mockLLM: jest.Mocked<LLMGateway> = {
    ask: jest.fn(),
  };

  const mockCatalog: jest.Mocked<CatalogRepository> = {
    getAll: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve chamar o LLMGateway com a pergunta do usuário e o prompt gerado', async () => {
    mockCatalog.getAll.mockReturnValue([
      { descricao: 'Resistor 10k', valor: 0.25 },
      { descricao: 'Capacitor 100nF', valor: 0.15 },
    ]);

    mockLLM.ask.mockResolvedValue('Resposta gerada pela IA');

    const answerQuestionUseCase = new AnswerQuestionUseCase(
      mockLLM,
      mockCatalog,
    );
    const input = 'Vocês vendem resistores?';

    const response = await answerQuestionUseCase.execute(input);

    expect(mockCatalog.getAll).toHaveBeenCalled();
    expect(mockLLM.ask).toHaveBeenCalled();

    const [userQuestionArg, devPromptArg] = mockLLM.ask.mock.calls[0];

    expect(userQuestionArg).toBe(input);
    expect(devPromptArg).toContain('Resistor 10k');
    expect(devPromptArg).toContain('Tesla Eletronicos');
    expect(response).toBe('Resposta gerada pela IA');
  });

  it('deve lançar exceção se a pergunta for vazia', async () => {
    const useCase = new AnswerQuestionUseCase(mockLLM, mockCatalog);

    await expect(useCase.execute('   ')).rejects.toThrow(DomainException);
    expect(mockLLM.ask).not.toHaveBeenCalled();
    expect(mockCatalog.getAll).not.toHaveBeenCalled();
  });
});
