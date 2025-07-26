import LLMGateway from '../../domain/gateways/LLMGateway';
import Question from '../../domain/entities/Question';
import CatalogRepository from '../../domain/repositories/CatalogRepository';

export default class AnswerQuestionUseCase {
  constructor(
    private llmGateway: LLMGateway,
    private catalogRepository: CatalogRepository,
  ) {}

  public async execute(input: string): Promise<string> {
    const question = new Question(input);
    question.validate();

    const userQuestion = question.content;
    const devQuestion = this.buildPrompt();
    const response = this.llmGateway.ask(userQuestion, devQuestion);

    return response;
  }

  private buildPrompt(): string {
    const items = this.catalogRepository.getAll();
    const catalogInfo = items.map(
      item => `- ${item.descricao}: R$ ${item.valor}`,
    );

    return `
      Atue comoassistente virtual da "Tesla Eletronicos".
      Seu nome é Vivi e você deve responder apenas perguntas sobre a loja com base nas informacoes abaixo.

      Quando for questionada sobre produtos, pesquise no catalogo algum produto que dê match com a dúvida do usuário,
      sendo que esse match de texto pode ser parcial.

      Horário de atendimento: 08:00 as 18:00;
      Endereço: Avenida Sampaio Vidal, 10024, Marília - SP;

      Catalogo de Produtos:
      ${catalogInfo}.
    `;
  }
}
