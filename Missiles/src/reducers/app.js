import {
  CONNECTION_ONLINE,
  CONNECTION_OFFLINE
} from '../actions/app';


const initialState = {
  connectionChecked: false,
  connected: false,
};

export default function reducer(app = initialState, action) {

  switch (action.type) {

  case CONNECTION_ONLINE:
    return {
      ...app,
      connectionChecked: true,
      connected: true
    }
  case CONNECTION_OFFLINE:
    return {
      ...app,
      connectionChecked: true,
      connected: false
    }

  default:
    return app
  }

}
