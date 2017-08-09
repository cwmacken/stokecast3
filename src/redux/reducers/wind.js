const initialState = {
  data: []
}

const wind = (state = initialState, action) => {
  switch (action.type) {
    case 'RECORDWIND':
      return {
        data: action.windData
      }
    default:
      return state
  }
}

export default wind
