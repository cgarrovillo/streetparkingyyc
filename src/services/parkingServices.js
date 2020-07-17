const express = require('express')
const axios = require('axios').default

const app = express()
const socrataToken = process.env.SOCRATA_TOKEN

async function checkByParkingZone(zone) {
  const url = `https://data.calgary.ca/resource/rhkg-vwwp.json?parking_zone=${zone}`
  axios
    .post({
      method: 'POST',
      url: url,
      timeout: 5000,
      headers: {
        'X-App-Token': socrataToken,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      //Request was made and server responded with status code != 2xx
      if (error.response) {
        console.log(error.response)
      }
      //Request was made but server did not respond
      else if (error.request) {
        console.log(error.request)
      }
      return
    })
}

module.exports = checkByParkingZone()
