const initialState = {
  data: []
}

const swell = (state = initialState, action) => {
  switch (action.type) {
    case 'RECORDSWELL':
      return {
        data: action.swellData
      }
    default:
      return state
  }
}

export default swell
