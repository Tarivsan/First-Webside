import { getQuizes, createQuiz, vote } from "./quiz.repository";

export async function list() {
  const quizes = await getQuizes();
  return quizes;
}

export async function create(title: string) {
  const newQuiz = await createQuiz(title);

  return newQuiz;
}

export async function incrementVotes(id: string) {
  const updatedQuiz = await vote(id);

  return updatedQuiz;
}
