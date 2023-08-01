const getAccessToken = JSON.parse(window.localStorage.getItem('accessToken'));
const userDetails = JSON.parse(window.localStorage.getItem('userDetails'))

const initialState = {
    isLoggedIn : getAccessToken ? true : false ,
    details : getAccessToken ? userDetails : null,
    accessToken:getAccessToken
}



const userReducer = (state=initialState,action) => {
    switch(action.type){
        case "LOGIN" : {
            return {
                isLoggedIn : true,
                details : action.payload.userDetails,
                accessToken:action.payload.accessToken
            }
        }
        case "LOGOUT" : {
            return {
                isLoggedIn : false,
                details : null,
                accessToken:null
            }
        }
        default : {
            return {
                ...initialState
            }
        }
        
    }
}
export default userReducer;