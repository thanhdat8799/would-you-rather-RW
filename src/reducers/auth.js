import { SET_CURRENT_USER } from "../actions/auth";

const initState = null

export default function auth(
  state = initState,
  action
) {
  switch (action.type) {
    case SET_CURRENT_USER:
      const user = action.user;
      // if (user) {
      //   localStorage.setItem(
      //     'currentUser',
      //     JSON.stringify(user)
      //   );
      // } else {
      //   localStorage.removeItem('currentUser');
      // }
      return user;
    default:
      return state;
  }
}