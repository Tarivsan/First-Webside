import { getQuizes, createQuiz, vote, delQuiz } from "./quiz.repository";

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

export async function removeQuiz(id: string) {
  const removedQuiz = await delQuiz(id);

  return removedQuiz;
}


