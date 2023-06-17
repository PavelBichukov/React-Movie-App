export function* getToken() {
    const token = localStorage.getItem('access');
    const respVerify: Response = yield fetch('https://studapi.teachmeskills.by/auth/jwt/verify/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ token })
    });
    if (respVerify.status === 200) {
        return token
    } else {
        const refreshToken = localStorage.getItem('refresh');
        const respRefresh: Response = yield fetch('https://studapi.teachmeskills.by/auth/jwt/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ refresh: refreshToken })
        });
        const data: { access: string } = yield respRefresh.json();
        const { access } = data;
        localStorage.setItem('access', access);
        return access;
    }
}