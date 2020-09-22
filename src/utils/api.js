import { get, post, $delete, put } from './http'

// 获取文章
export const getAllArticles = data => get('/articles/get_all_articles', data)

export const getArticleForId = data => get('/articles/get_article_for_id', data)

// 修改设备
export const apiUpdeteDavice = data => post('api/device', data)
// 修改设备
export const apiUpdeteDevice = data => put('api/device', data)
// 删除设备
export const apiDelDevice = data => $delete('api/device', data)
