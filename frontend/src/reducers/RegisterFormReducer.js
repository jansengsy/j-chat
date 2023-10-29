export default function RegisterFormReducer(state, action) {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, [action.field + 'Error']: action.value };
    case 'RESET':
      return action.value;
    default:
      return state;
  }
}
