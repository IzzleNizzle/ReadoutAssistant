import axios from "axios";
const CancelToken = axios.CancelToken;

let links = {
  gmv: "http://intentionally_removed/customGMV_v2.php"
  , activeListings: "http://intentionally_removed/customActiveListings.php"
  , returns: "http://intentionally_removed/customReturnsOverview.php"
  , conversion: "http://intentionally_removed/customConversion.php"
  , soldItem: "http://intentionally_removed/customSoldItems.php"
  , photoCount: "http://intentionally_removed/customPhoto.php"
  , dashboard: "http://intentionally_removed/customSellerDashboard.php"
  , testData: "http://intentionally_removed/testData.csv"
  , reports: "http://intentionally_removed/reports/"
  ,
  storeGroData: "http://intentionally_removed/customGroHandler.php"
}

export default {
  // Gets Gmv Data
  getGmv: function (inputObject) {

    // If user has cancelled request, perform no further API calls
    if (inputObject.cancelApiRequest) {
      return null
    }

    // Config cancel token
    const source = CancelToken.source();

    // URL Parsing Paramaters, as per servers needs...
    const data = new URLSearchParams();

    //Only needs one parameter
    data.append('oracle', inputObject.oracle)

    // Adding userID parameter for file naming clarity
    data.append('userID', inputObject.userID)


    // Axios Post to Server, configured
    return {
      cancelToken: source,
      axios: axios.post(
        // url
        links.gmv,
        // data
        data,
        // config
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          cancelToken: source.token
        })
    }

  },
  // Gets ActiveListings Data
  getActiveListings: function (inputObject) {

    // If user has cancelled request, perform no further API calls
    if (inputObject.cancelApiRequest) {
      return null
    }

    // Config cancel token
    const source = CancelToken.source();

    // URL Parsing Paramaters, as per servers needs...
    const data = new URLSearchParams();

    // Only needs one parameter
    data.append('oracle', inputObject.oracle);

    // Adding userID parameter for file naming clarity
    data.append('userID', inputObject.userID)

    // Axios Post to Server, configured
    return {
      cancelToken: source,
      axios: axios.post(
        // url
        links.activeListings,
        // data
        data,
        // config
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          cancelToken: source.token
        })
    }

  },
  // Gets Conversion Data
  getConversion: function (inputObject) {

    // If user has cancelled request, perform no further API calls
    if (inputObject.cancelApiRequest) {
      return null
    }

    // Config cancel token
    const source = CancelToken.source();

    // URL Parsing Paramaters, as per servers needs...
    const data = new URLSearchParams();

    //Only needs one parameter
    data.append('oracle', inputObject.oracle);

    // Adding userID parameter for file naming clarity
    data.append('userID', inputObject.userID)

    // Axios Post to Server, configured
    return {
      cancelToken: source,
      axios: axios.post(
        // url
        links.conversion,
        // data
        data,
        // config
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          cancelToken: source.token
        })
    }

  },
  getDashboard: function (inputObject) {

    // If user has cancelled request, perform no further API calls
    if (inputObject.cancelApiRequest) {
      return null
    }

    // Config cancel token
    const source = CancelToken.source();

    // URL Parsing Paramaters, as per servers needs...
    const data = new URLSearchParams();

    // Only needs one parameter
    data.append('oracle', inputObject.oracle);

    // Cannot add userID parameter here as I don't have it until this call finishes

    // Axios Post to Server, configured
    return {
      cancelToken: source,
      axios: axios.post(
        // url
        links.dashboard,
        // data
        data,
        // config
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          cancelToken: source.token
        })
    }

  },
  // Gets PhotoCount Data
  getPhotoCount: function (inputObject) {

    // If user has cancelled request, perform no further API calls
    if (inputObject.cancelApiRequest) {
      return null
    }

    // Config cancel token
    const source = CancelToken.source();

    // URL Parsing Paramaters, as per servers needs...
    const data = new URLSearchParams();

    //Only needs one parameter
    data.append('oracle', inputObject.oracle);

    // Adding userID parameter for file naming clarity
    data.append('userID', inputObject.userID)

    // Axios Post to Server, configured
    return {
      cancelToken: source,
      axios: axios.post(
        // url
        links.photoCount,
        // data
        data,
        // config
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          cancelToken: source.token
        })
    }

  },
  // Gets Returns Data
  getReturns: function (inputObject) {

    // If user has cancelled request, perform no further API calls
    if (inputObject.cancelApiRequest) {
      return null
    }

    // Config cancel token
    const source = CancelToken.source();

    // URL Parsing Paramaters, as per servers needs...
    const data = new URLSearchParams();

    // Needs three parameters
    data.append('oracle', inputObject.oracle);
    data.append('from', inputObject.from);
    data.append('to', inputObject.to);

    // Adding userID parameter for file naming clarity
    data.append('userID', inputObject.userID)

    // Axios Post to Server, configured
    return {
      cancelToken: source,
      axios: axios.post(
        // url
        links.returns,
        // data
        data,
        // config
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          cancelToken: source.token
        })
    }

  },
  // Gets SoldItem Data
  getSoldItem: function (inputObject) {

    // If user has cancelled request, perform no further API calls
    if (inputObject.cancelApiRequest) {
      return null
    }

    // Config cancel token
    const source = CancelToken.source();

    // URL Parsing Paramaters, as per servers needs...
    const data = new URLSearchParams();

    // Needs three parameters
    data.append('oracle', inputObject.oracle);
    data.append('from', inputObject.from);
    data.append('to', inputObject.to);

    // Adding userID parameter for file naming clarity
    data.append('userID', inputObject.userID)

    // Axios Post to Server, configured
    return {
      cancelToken: source,
      axios: axios.post(
        // url
        links.soldItem,
        // data
        data,
        // config
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          cancelToken: source.token
        })
    }

  },
  // Gets GroMobile Data
  getGroDataMobile: function (inputObject) {

    // If user has cancelled request, perform no further API calls
    if (inputObject.cancelApiRequest) {
      return null
    }

    // Config cancel token
    const source = CancelToken.source();

    // Date inputs come in like this yyyy-mm-dd when url needs it yyyy/mm/dd. So a little RegEx can fix that
    // inputObject.from = inputObject.from.replace(/-/g, "/");
    // inputObject.to = inputObject.to.replace(/-/g, "/");

    return {
      cancelToken: source,
      axios: axios({
        url: `http://intentionally_removed/${inputObject.oracle}/list_srch_vi_purchase_gmb.json?start=${inputObject.firstDayFirstMonthLastYear}&end=${inputObject.yesterday}&exp=mobile&vrtcl=%2Cb%26i%2Ccollectibles%2Celectronics%2Cfashion%2Chome%26garden%2Clifestyle%2Cmedia%2Cp%26a%2Cunknown`,
        method: 'get',
        cancelToken: source.token
      })
    }

  },
  // Gets GroSite Data
  getGroDataSite: function (inputObject) {

    // If user has cancelled request, perform no further API calls
    if (inputObject.cancelApiRequest) {
      return null
    }

    // Config cancel token
    const source = CancelToken.source();

    // Date inputs come in like this yyyy-mm-dd when url needs it yyyy/mm/dd. So a little RegEx can fix that
    // inputObject.from = inputObject.from.replace(/-/g, "/");
    // inputObject.to = inputObject.to.replace(/-/g, "/");

    return {
      cancelToken: source,
      axios: axios({
        url: `http://intentionally_removed/${inputObject.oracle}/list_srch_vi_purchase_gmb.json?start=${inputObject.firstDayFirstMonthLastYear}&end=${inputObject.yesterday}&exp=site&vrtcl=%2Cb%26i%2Ccollectibles%2Celectronics%2Cfashion%2Chome%26garden%2Clifestyle%2Cmedia%2Cp%26a%2Cunknown`,
        method: 'get',
        cancelToken: source.token
      })
    }

  },
  storeGroData: inputObject => {

    // If user has cancelled request, perform no further API calls
    if (inputObject.cancelApiRequest) {
      return null
    }

    // Config cancel token
    const source = CancelToken.source();

    // URL Parsing Paramaters, as per servers needs...
    const data = new URLSearchParams();

    // Needs three parameters
    data.append('oracle', inputObject.oracle);
    data.append('groType', inputObject.groType);
    data.append('dataPayload', inputObject.dataPayload);

    // Adding userID parameter for file naming clarity
    data.append('userID', inputObject.userID)

    // Axios Post to Server, configured
    return {
      cancelToken: source,
      axios: axios.post(
        // url
        links.storeGroData,
        // data
        data,
        // config
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          cancelToken: source.token
        })
    }

  },
  fakeApiCall: () => {

    // Config fake cancel token
    const source = CancelToken.source();

    return {
      cancelToken: source,
      axios: new Promise(res => {
        setTimeout(() => {
          res("Fake API data received")
        }, 2700)
      })
    }
  }
};
