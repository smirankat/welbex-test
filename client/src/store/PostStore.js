import { makeAutoObservable } from "mobx";

export default class PostStore {
  constructor() {
    this._posts = [];
    this._selectedPost = {};
    makeAutoObservable(this);
  }

  setPosts(posts) {
    this._posts = posts;
  }
  add(post) {
    this._posts.push(post);
  }
  get posts() {
    return this._posts;
  }
}
