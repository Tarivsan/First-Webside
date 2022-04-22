import { QuizModel } from "./quiz.model";
import { StatusError } from "../core/error.handler";

export async function getQuizes() {
  try {
    const result = await QuizModel.find({});

    return result;
  } catch (err) {
    throw new StatusError(404, err.message);
  }
}

export async function createQuiz(title: string) {
  try {
    const created = await QuizModel.create({ title });

    return created;
  } catch (err) {
    throw new StatusError(500, err.message);
  }
}

export async function vote(id: string) {
  try {
    const found = await QuizModel.findById(id);

    console.log(found);

    if (!found) {
      throw new StatusError(404, "Quiz not found");
    }

    await QuizModel.updateOne({ _id: id }, { vote: found.vote + 1 });

    const updatedQuiz = await QuizModel.findById(id);

    if (!updatedQuiz) {
      throw new StatusError(404, "Quiz not found!");
    }

    return updatedQuiz;
  } catch (err) {
    throw new StatusError(err.status, err.message);
  }
}

export async function delQuiz(id: string) {
  try {
    const found = await QuizModel.findById(id);

    console.log(found);

    if (!found) {
      throw new StatusError(404, "Quiz with that id is not existing");
    }

    await QuizModel.deleteOne({ _id: id });

    return `quiz "${found.title}" has been deleted`;
  } catch (err) {
    throw new StatusError(err.status, err.message);
  }
}
