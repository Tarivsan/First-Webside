import { NewsModel } from "./news.model";
import { StatusError } from "../core/error.handler";

export async function getNews() {
  try {
    const result = await NewsModel.find({});

    return result;
  } catch (err) {
    throw new StatusError(404, err.message);
  }
}

export async function createNews(title: string, description: string) {
  try {
    const created = await NewsModel.create({ title, description });

    return created;
  } catch (err) {
    throw new StatusError(500, err.message);
  }
}

export async function delNews(id: string) {
  try {
    const found = await NewsModel.findById(id);

    console.log(found);

    if (!found) {
      throw new StatusError(404, "Quiz with that id is not existing");
    }

    await NewsModel.deleteOne({ _id: id });

    return `News "${found.title}" has been deleted`;
  } catch (err) {
    throw new StatusError(err.status, err.message);
  }
}