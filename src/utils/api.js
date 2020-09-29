import { get, post } from './http'

export const getAllArticles = data => get('/articles/get_all_articles', data)

export const getArticleForId = data => get('/articles/get_article_for_id', data)

export const addArticle = data => post('/articles/add_article', data)

export const delArticle = data => post('/articles/del_article', data)

export const login = data => post('/user/login', data)

export const register = data => post('/user/register', data)
