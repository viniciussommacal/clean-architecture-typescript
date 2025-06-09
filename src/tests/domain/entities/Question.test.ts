import Question from '../../../domain/entity/Question';
import DomainException from '../../../../src/domain/exception/DomainException';

describe('Question', () => {
  it('deve criar uma pergunta válida com timestamp', () => {
    const question = new Question('O que é um capacitor?');
    expect(question.content).toBe('O que é um capacitor?');
    expect(question.timestamp).toBeInstanceOf(Date);
  });

  it('deve validar corretamente uma pergunta válida', () => {
    const question = new Question('Como funciona um transistor?');
    expect(() => question.validate()).not.toThrow();
  });

  it('deve lançar exceção se a pergunta for vazia', () => {
    const question = new Question('   ');
    expect(() => question.validate()).toThrow(DomainException);
    expect(() => question.validate()).toThrow('Question cannot be empty');
  });

  it('deve lançar exceção se a pergunta for muito longa', () => {
    const longText = 'a'.repeat(1001);
    const question = new Question(longText);
    expect(() => question.validate()).toThrow(DomainException);
    expect(() => question.validate()).toThrow(
      'Question too long (max: 1000 characters)',
    );
  });
});
