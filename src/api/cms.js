import request from '@/utils/request'

export function getContent({type, count}) {
    return request({
        url: '/mycms/content.php?type=' + type,
        method: 'get'
    })
}

export function getLayout({id}) {
    return request({
        url: '/mycms/a.json?id=' + id,
        method: 'get'
    })
}