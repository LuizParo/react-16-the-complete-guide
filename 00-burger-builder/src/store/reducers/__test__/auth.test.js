import authReducer from "../auth";
import { 
    AUTH_FAIL,
    AUTH_LOGOUT,
    AUTH_START,
    AUTH_SUCCESS
 } from "../../actions/actionTypes";

 describe('auth reducer', () => {
 
    it('should return the initial state', () => {
        const initialState = {
            token : '',
            userId : '',
            error : '',
            loading : false,
            redirectPath : '/'
        };

        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it('should store the token upon login', () => {
        const initialState = {
            token : '',
            userId : '',
            error : '',
            loading : false,
            redirectPath : '/'
        };

        const action = {
            type : AUTH_SUCCESS,
            userId : 'some-userId',
            token : 'some-token'
        };

        expect(authReducer(initialState, action)).toEqual({
            token : 'some-token',
            userId : 'some-userId',
            error : '',
            loading : false,
            redirectPath : '/'
        });
    });
 });