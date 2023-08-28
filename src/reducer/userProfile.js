import { USER_PROFILE } from "../actions/types";

const initialState = {
    user_id: "",
    role_id: "",
    dob: "",
    identity: "",
    mobile_no: "",
    street_address: "",
    city: "",
    state_id: "",
    country_id: "",
    postal_code: "",
    default_address: "",
    image: "",
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_PROFILE:
            return { ...state, ...payload };

        default:
            return state;
    }
}
