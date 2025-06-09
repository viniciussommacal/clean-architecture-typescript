import { HttpStatus } from '../utils/HttpStatus';
import { Router, Request, Response } from 'express';
import AnswerQuestionUseCase from '../../domain/useCase/AnswerQuestionUseCase';
import DomainException from '../../domain/exception/DomainException';
import CatalogJsonRepository from '../repository/CatalogJsonRepository';
import OpenAIGateway from '../gateway/OpenAIGateway';

const answerQuestionUseCase = new AnswerQuestionUseCase(
  new OpenAIGateway(),
  new CatalogJsonRepository(),
);

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { question } = req.body;

    const answer = await answerQuestionUseCase.execute(question);

    res.status(HttpStatus.OK).json({ answer });
  } catch (error: unknown) {
    if (error instanceof DomainException) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
      return;
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
  }
});

export default router;
