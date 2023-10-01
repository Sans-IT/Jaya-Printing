import { User, Post, Pricelist } from "@prisma/client";

declare global {
  interface PostWithUser extends Post {
    author: User;
  }

  interface PostWithPricelist extends Post {
    pricelist: Pricelist;
  }

  interface PricelistWithPost extends Pricelist {
    post: Post;
  }
}
