import { getNews, createNews, delNews } from "../news/news.repository";

export async function list() {
  const news = await getNews();
  return news;
}

export async function create(title: string, description: string) {
  const newNews = await createNews(title, description);

  return newNews;
}

export async function removeNews(id: string) {
    const removedQuiz = await delNews(id);
  
    return removedQuiz;
  }
  
  