var Firebase = require("firebase")
var config = require("../../../config")
var axios = require('axios')

Firebase.initializeApp(config.firebase);

module.exports = {
  // called at app start
  getSwellData: function() {
    return function(dispatch, getState) {
      const currentState = getState();

      if (currentState.swell.data.length === 0) {

        axios.post('/server/swellData', {
            on: currentState
          })
          .then(function(response) {

            // TODO: check for status ok

            dispatch({
              type: "RECORDSWELL",
              swellData: response.data
            })
          })
          .catch(function(error) {

            console.log(error)
            // dispatch({
            //     type: "POSTRESPONSE",
            //     postText: "error"
            // })
          });


      }

    }
  },

  getWindData: function() {
    return function(dispatch, getState) {
      const currentState = getState();

      if (currentState.wind.data.length === 0) {

        axios.post('/server/windData', {
            on: currentState
          })
          .then(function(response) {

            // TODO: check for status ok

            console.log(response.data)

            dispatch({
              type: "RECORDWIND",
              windData: response.data
            })
          })
          .catch(function(error) {

            console.log(error)
            // dispatch({
            //     type: "POSTRESPONSE",
            //     postText: "error"
            // })
          });


      }

    }
  },

  createAccount: function(email, password) {
    return function(dispatch, getState) {

      dispatch({
        type: 'STARTAUTH',
        email: email,
        password: password
      });

      Firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch({
          type: 'CREATEACCCOUNTERROR',
          errorCode: errorCode,
          errorMessage: errorMessage
        });
      });


    }
  },

  getTest: function() {
    return function(dispatch) {
      axios.get('/server/data')
        .then(function(response) {
          dispatch({
            type: "GETRESPONSE",
            text: response.data.text
          })
        })
        .catch(function(error) {
          dispatch({
            type: "GETRESPONSE",
            text: "Error"
          })
        });
    }
  },

  postTest: function() {
    return function(dispatch, getState) {

      var state = getState().endpoint.postState

      axios.post('/server/postData', {
          on: state
        })
        .then(function(response) {
          dispatch({
            type: "POSTRESPONSE",
            postText: response.data.text
          })
        })
        .catch(function(error) {
          dispatch({
            type: "POSTRESPONSE",
            postText: "error"
          })
        });

    }
  },

  watchUserChange: function() {
    return function(dispatch, getState) {
      Firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          dispatch({
            type: 'USERINFO',
            user: user
          })
        }
      });

    }
  },

  login: function(email, password) {

    return function(dispatch, getState) {

      Firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch({
          type: 'CREATEACCCOUNTERROR',
          errorCode: errorCode,
          errorMessage: errorMessage
        });
      });

    }
  },

  sampleOne: function() {
    return function(dispatch) {
      dispatch({
        type: 'SAMPLEONE'
      })
    }
  },

  sampleTwo: function(text) {
    return function(dispatch) {
      dispatch({
        type: 'SAMPLETWO',
        text: text
      })
    }
  },

  signout: function() {
    return function(dispatch, getState) {

      Firebase.auth().signOut().then(function() {
        // Sign-out successful.
        dispatch({
          type: 'SIGNOUTWORKED'
        });
      }, function(error) {
        // An error happened.
        dispatch({
          type: 'SIGNOUTBROKE',
          errorCode: "signout broke",
          errorMessage: "singout broke"
        });
      });

    }
  }

};
