export const USERS_GET = 'USERS_GET'

export function getUsers(users) {
    return {
        type: USERS_GET,
        users: users
    }
}