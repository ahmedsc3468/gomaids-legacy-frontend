import { SIGNUP_DATA } from "../actions/types";

const initialState = {
    username: "",
    email: "",
    password: "",
    c_password: "",
    fname: "",
    lname: "",
    role_id: "",
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SIGNUP_DATA:
            return { ...state, ...payload };

        default:
            return state;
    }
}
///jhkjhk