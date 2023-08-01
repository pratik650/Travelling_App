export const logIn = (payload) => {
    return{
        type : "LOGIN",
        payload : payload
    }
}

export const logOut = () => {
    return{
        type : "LOGOUT"
    }
}