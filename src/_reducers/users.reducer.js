import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
      case userConstants.SD_DELETE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return {
          ...state,
          items: state.items.map(sd =>
            sd.ID === action.id
              ? { ...sd, deleting: true }
              : sd
          )
        };
      case userConstants.SD_DELETE_SUCCESS:
        // remove deleted user from state
        return {
          items: state.items.filter(sd => sd.ID !== action.id)
        };
      case userConstants.SD_DELETE_FAILURE:
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        return {
          ...state,
          items: state.items.map(sd => {
            if (sd.ID === action.id) {
              // make copy of user without 'deleting:true' property
              const { deleting, ...userCopy } = sd;
              // return copy of user with 'deleteError:[error]' property
              return { ...userCopy, deleteError: action.error };
            }
  
            return sd;
          })
        };
    default:
      return state
  }
}