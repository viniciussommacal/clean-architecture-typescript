import DomainException from '../exception/DomainException';

export default class Question {
  public readonly timestamp: Date;

  constructor(public content: string) {
    this.timestamp = new Date();
  }

  validate(): this {
    if (!this.content || this.content.trim().length === 0) {
      throw new DomainException('Question cannot be empty');
    }

    if (this.content.length > 1000) {
      throw new DomainException('Question too long (max: 1000 characters)');
    }

    return this;
  }
}
