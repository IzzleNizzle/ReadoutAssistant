import React, { Component } from 'react'
import axios from "axios"
import API from "../../utils/API";
import ManipulateAPIData from "../../utils/ManipulateAPIData";
import Dates from "../../utils/Dates";
import DataCard from "../DataCard";

class DataGatherer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSources: [
        {
          name: "Dashboard",
          progress: 0,
          shouldRender: false,
          data: '',
          link: null,
          fileName: String()
        },
        {
          name: "GroMobile",
          progress: 0,
          shouldRender: false,
          data: '',
          link: null,
          fileName: String()
        },
        {
          name: "GroSite",
          progress: 0,
          shouldRender: false,
          data: '',
          link: null,
          fileName: String()
        },
        {
          name: "GMV",
          progress: 0,
          shouldRender: false,
          data: '',
          link: null,
          fileName: String()
        },
        {
          name: "ActiveListings",
          progress: 0,
          shouldRender: false,
          data: '',
          link: null,
          fileName: String()
        },
        {
          name: "Conversion",
          progress: 0,
          shouldRender: false,
          data: '',
          link: null,
          fileName: String()
        },
        {
          name: "PhotoCount",
          progress: 0,
          shouldRender: false,
          data: '',
          link: null,
          fileName: String()
        },
        {
          name: "Returns",
          progress: 0,
          shouldRender: false,
          data: '',
          link: null,
          fileName: String()
        },
        {
          name: "SoldItem",
          progress: 0,
          shouldRender: false,
          data: '',
          link: null,
          fileName: String()
        },
      ],
      hideDownloadButton: true,
      userID: '',
      cancelTokens: []
    }
  }


  componentDidMount() {

    // Call for main function
    this.fakeAPICall()

  }


  componentWillUnmount() {

    // Cancel all active API calls
    this.fireAllCancels()

  }


  // This is the main function that goes and gets all of the data
  realAPICall = async () => {
    /* *** GAMEPLAN ***
  
    Perform all API calls. 
    
    Data needed for each API call:

    DASHBOARD API - Only Oracle Needed
    GMV API - Only Oracle Needed
    Active API - Only Oracle Needed
    Photos API - Only Oracle Needed
    Conversion API - Only Oracle Needed
  
    
    Returns API - NEEDS Previous or Trending dashboard
    Sold API - NEEDS Previous or Trending dashboard
  

    GRO Mobile - NEEDS First Day of Previous Year To Yesterday
    GRO Site - NEEDS First Day of Previous Year To Yesterday
    
    */

    // If an API call fails, i still want data to be pulled.
    // However, if a user cancels I want all subsequent api calls to stop
    // if a user cancels an api call all subsequent calls will still be made. This variable will be passed to all local api calls to trigger if user has cancelled
    let cancelApiRequest = false;


    // On the first day of the month yesterdaysDate() will produce a 00 day date, ie 2019/02/00. The api will throw an error with this.
    // Will need to use last day of previous month if it is the 'first day of the month'

    let yesterday

    if (new Date().getDate() === 1) {
      yesterday = Dates.previousMonthLastDay()
    }
    else {
      yesterday = Dates.yesterdaysDate()
    }

    // Prepping needed data for API calls
    let userInput = {
      oracle: this.props.oracle,
      // Getting first day last year
      firstDayFirstMonthLastYear: Dates.firstDayFirstMonthLastYear(),
      yesterday,
      cancelApiRequest
    };

    // Beginning API call process


    // Updating Progress for Dashboard data
    this.incrementProgress(0);

    let dashboard = API.getDashboard(userInput)

    // Saving cancel token
    this.addCancelToken(dashboard.cancelToken)

    // API Call
    await dashboard.axios
      .then(res => {
        // This function is different because the response has been modified, this is the only function that uses data.conData, the rest use data.content1

        // Adding download link to array
        this.addLinkToLinksArray(res.data.conData, 0);

        // Updating Progress for Dashboard data
        this.incrementProgress(0);

        // Calculate threeMonthCount
        let threeMonthCount = parseFloat(res.data.content1[1][2]);

        // Grab userID
        let userID = res.data.content1[1][1];

        // Getting Eval Dates
        let { to, from } = Dates.getEvalDates(threeMonthCount);

        // Updating User Input with the evaluation dates for the to and from, also including user ID
        userInput.to = to;
        userInput.from = from;
        userInput.userID = userID;

        // Setting State with Dashboard API Response's
        this.setState({
          threeMonthCount: threeMonthCount,
          to,
          from,
          userID
        });

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("getDashboard");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(0);
          this.incrementProgress(0);
        }

      });


    // Saving Variables for GRO data
    let mobileApiCall = API.getGroDataMobile(userInput);
    let siteApiCall = API.getGroDataSite(userInput);

    // Save cancel tokens
    this.addCancelToken(mobileApiCall.cancelToken)
    this.addCancelToken(siteApiCall.cancelToken)

    // Updating Progress for Gro data
    this.incrementProgress(1);
    this.incrementProgress(2);

    // Calling both GRO calls at once
    Promise.all([mobileApiCall.axios, siteApiCall.axios])
      .then(res => {

        // Mobile Data
        let cleanMobileData = ManipulateAPIData.cleanGroApiData(res[0].data);
        // Site Data
        let cleanSiteData = ManipulateAPIData.cleanGroApiData(res[1].data);
        // Extra processing for Gro data for mimicked .csv file
        let csvMobileData = ManipulateAPIData.formatGroResponseToCsv(cleanMobileData[0]);
        let csvSiteData = ManipulateAPIData.formatGroResponseToCsv(cleanSiteData[0]);


        // Sending Gro data to server to be stored in a .csv file

        // Prepare variables
        let siteParams = {
          oracle: userInput.oracle,
          groType: 'siteGRO',
          dataPayload: csvSiteData,
          userID: userInput.userID,
          cancelApiRequest
        }
        let mobileParams = {
          oracle: userInput.oracle,
          groType: 'mobileGRO',
          dataPayload: csvMobileData,
          userID: userInput.userID,
          cancelApiRequest
        }

        // Making API call to store data
        let mobile = API.storeGroData(siteParams)

        // Saving cancel token
        this.addCancelToken(mobile.cancelToken)

        mobile.axios
          .then(res => {
            // Store links from server for download button
            this.addLinkToLinksArray(res.data.conData, 2)
          })
          .catch(err => {
            console.log(err)
            console.log('error saving GRO .csv file mobile')
          })

        let site = API.storeGroData(mobileParams)

        // Saving cancel token
        this.addCancelToken(site.cancelToken)

        site.axios
          .then(res => {
            // Store links from server for download button
            this.addLinkToLinksArray(res.data.conData, 1)
          })
          .catch(err => {
            console.log(err)
            console.log('error saving GRO .csv file mobile')
          })

        // Updating Progress for Gro data
        this.incrementProgress(1);
        this.incrementProgress(2);

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("Promise.all");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(1);
          this.incrementProgress(1);
          this.incrementProgress(2);
          this.incrementProgress(2);

        }

      });


    // Updating Progress for GMV data
    this.incrementProgress(3);

    let gmv = API.getGmv(userInput)

    // Saving cancel token
    this.addCancelToken(gmv.cancelToken)

    gmv.axios
      .then(res => {

        // Calling to gather full data
        this.addLinkToLinksArray(res.data.content1, 3);
        // Updating Progress for GMV data
        this.incrementProgress(3);

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("getGmv");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(3);
          this.incrementProgress(3);
        }

      });


    // Updating Progress for Active Listings data
    this.incrementProgress(4);

    let active = API.getActiveListings(userInput)

    // Saving cancel token
    this.addCancelToken(active.cancelToken)

    await active.axios
      .then(res => {

        // Calling to gather full data
        this.addLinkToLinksArray(res.data.content1, 4);
        // Updating Progress for Active Listings data
        this.incrementProgress(4);

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("getActiveListings");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(4);
          this.incrementProgress(4);

        }

      });


    // Updating Progress for Conversion Listings data
    this.incrementProgress(5);

    let conversion = API.getConversion(userInput)

    // Saving cancel token
    this.addCancelToken(conversion.cancelToken)

    conversion.axios
      .then(res => {

        // Calling to gather full data
        this.addLinkToLinksArray(res.data.content1, 5);
        // Updating Progress for Conversion Listings data
        this.incrementProgress(5);

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("getConversion");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(5);
          this.incrementProgress(5);
        }

      });


    // Updating Progress for Photo Count Listings data
    this.incrementProgress(6);

    let photo = API.getPhotoCount(userInput)

    // Saving cancel token
    this.addCancelToken(photo.cancelToken)

    await photo.axios
      .then(res => {

        // Calling to gather full data
        this.addLinkToLinksArray(res.data.content1, 6);
        // Updating Progress for Photo Count Listings data
        this.incrementProgress(6);

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("getPhotoCount");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(6);
          this.incrementProgress(6);
        }

      });


    // Updating Progress for Returns data
    this.incrementProgress(7);

    let returns = API.getReturns(userInput)

    // Saving cancel token
    this.addCancelToken(returns.cancelToken)

    returns.axios
      .then(res => {

        // Calling to gather full data
        this.addLinkToLinksArray(res.data.content1, 7);
        // Updating Progress for Returns data
        this.incrementProgress(7);

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("getReturns");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(7);
          this.incrementProgress(7);
        }

      });


    // Updating Progress for Sold Items data
    this.incrementProgress(8);

    let sold = API.getSoldItem(userInput)

    // Saving cancel token
    this.addCancelToken(sold.cancelToken)

    await sold.axios
      .then(res => {

        // Calling to gather full data
        this.addLinkToLinksArray(res.data.content1, 8);
        // Updating Progress for Sold Items data
        this.incrementProgress(8);

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("getSoldItem");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(8);
          this.incrementProgress(8);
        }

      });

    // Toggle Download Button as now we have all Reports to download
    this.toggleHideDownloadButton();

    // As the process has completed, trigger parent component that it has been finished
    this.props.trigger()

  }

  // This is used simply for demo reasons
  fakeAPICall = async () => {
    
    // If an API call fails, i still want data to be pulled.
    // However, if a user cancels I want all subsequent api calls to stop
    // if a user cancels an api call all subsequent calls will still be made. This variable will be passed to all local api calls to trigger if user has cancelled
    let cancelApiRequest = false;


    // On the first day of the month yesterdaysDate() will produce a 00 day date, ie 2019/02/00. The api will throw an error with this.
    // Will need to use last day of previous month if it is the 'first day of the month'

    let yesterday

    if (new Date().getDate() === 1) {
      yesterday = Dates.previousMonthLastDay()
    }
    else {
      yesterday = Dates.yesterdaysDate()
    }

    // Prepping needed data for API calls
    let userInput = {
      oracle: this.props.oracle,
      // Getting first day last year
      firstDayFirstMonthLastYear: Dates.firstDayFirstMonthLastYear(),
      yesterday,
      cancelApiRequest
    };

    // Beginning API call process


    // Updating Progress for Dashboard data
    this.incrementProgress(0);

    let dashboard = API.fakeApiCall(userInput)

    // Saving cancel token
    this.addCancelToken(dashboard.cancelToken)

    // API Call
    await dashboard.axios
      .then(res => {
        // This function is different because the response has been modified, this is the only function that uses data.conData, the rest use data.content1

        // Adding download link to array
        // this.addLinkToLinksArray(res.data.conData, 0);

        // Updating Progress for Dashboard data
        this.incrementProgress(0);

        // Calculate threeMonthCount
        // let threeMonthCount = parseFloat(res.data.content1[1][2]);
        let threeMonthCount = 450; // Demo data


        // Grab userID
        // let userID = res.data.content1[1][1];
        let userID = this.props.title; // Demo Data
        

        // Getting Eval Dates
        let { to, from } = Dates.getEvalDates(threeMonthCount);

        // Updating User Input with the evaluation dates for the to and from, also including user ID
        userInput.to = to;
        userInput.from = from;
        userInput.userID = userID;

        // Setting State with Dashboard API Response's
        this.setState({
          threeMonthCount: threeMonthCount,
          to,
          from,
          userID
        });

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("getDashboard");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(0);
          this.incrementProgress(0);
        }

      });


    // Saving Variables for GRO data
    let mobileApiCall = API.fakeApiCall(userInput);
    let siteApiCall = API.fakeApiCall(userInput);

    // Save cancel tokens
    this.addCancelToken(mobileApiCall.cancelToken)
    this.addCancelToken(siteApiCall.cancelToken)

    // Updating Progress for Gro data
    this.incrementProgress(1);
    this.incrementProgress(2);

    // Calling both GRO calls at once
    Promise.all([mobileApiCall.axios, siteApiCall.axios])
      .then(res => {

        // Mobile Data
        // let cleanMobileData = ManipulateAPIData.cleanGroApiData(res[0].data);
        // Site Data
        // let cleanSiteData = ManipulateAPIData.cleanGroApiData(res[1].data);
        // Extra processing for Gro data for mimicked .csv file
        // let csvMobileData = ManipulateAPIData.formatGroResponseToCsv(cleanMobileData[0]);
        // let csvSiteData = ManipulateAPIData.formatGroResponseToCsv(cleanSiteData[0]);


        // Sending Gro data to server to be stored in a .csv file

        // Prepare variables
        // let siteParams = {
        //   oracle: userInput.oracle,
        //   groType: 'siteGRO',
        //   dataPayload: csvSiteData,
        //   userID: userInput.userID,
        //   cancelApiRequest
        // }
        // let mobileParams = {
        //   oracle: userInput.oracle,
        //   groType: 'mobileGRO',
        //   dataPayload: csvMobileData,
        //   userID: userInput.userID,
        //   cancelApiRequest
        // }

        // Making API call to store data
        // let mobile = API.storeGroData(siteParams)

        // Saving cancel token
        // this.addCancelToken(mobile.cancelToken)

        // mobile.axios
        //   .then(res => {
        //     // Store links from server for download button
        //     this.addLinkToLinksArray(res.data.conData, 2)
        //   })
        //   .catch(err => {
        //     console.log(err)
        //     console.log('error saving GRO .csv file mobile')
        //   })

        // let site = API.storeGroData(mobileParams)

        // // Saving cancel token
        // this.addCancelToken(site.cancelToken)

        // site.axios
        //   .then(res => {
        //     // Store links from server for download button
        //     this.addLinkToLinksArray(res.data.conData, 1)
        //   })
        //   .catch(err => {
        //     console.log(err)
        //     console.log('error saving GRO .csv file mobile')
        //   })

        // Updating Progress for Gro data
        this.incrementProgress(1);
        this.incrementProgress(2);

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("Promise.all");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(1);
          this.incrementProgress(1);
          this.incrementProgress(2);
          this.incrementProgress(2);

        }

      });


    // Updating Progress for GMV data
    this.incrementProgress(3);

    let gmv = API.fakeApiCall(userInput)

    // Saving cancel token
    this.addCancelToken(gmv.cancelToken)

    gmv.axios
      .then(res => {

        // Calling to gather full data
        // this.addLinkToLinksArray(res.data.content1, 3);
        // Updating Progress for GMV data
        this.incrementProgress(3);

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("getGmv");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(3);
          this.incrementProgress(3);
        }

      });


    // Updating Progress for Active Listings data
    this.incrementProgress(4);

    let active = API.fakeApiCall(userInput)

    // Saving cancel token
    this.addCancelToken(active.cancelToken)

    await active.axios
      .then(res => {

        // Calling to gather full data
        // this.addLinkToLinksArray(res.data.content1, 4);
        // Updating Progress for Active Listings data
        this.incrementProgress(4);

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("getActiveListings");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(4);
          this.incrementProgress(4);

        }

      });


    // Updating Progress for Conversion Listings data
    this.incrementProgress(5);

    let conversion = API.fakeApiCall(userInput)

    // Saving cancel token
    this.addCancelToken(conversion.cancelToken)

    conversion.axios
      .then(res => {

        // Calling to gather full data
        // this.addLinkToLinksArray(res.data.content1, 5);
        // Updating Progress for Conversion Listings data
        this.incrementProgress(5);

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("getConversion");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(5);
          this.incrementProgress(5);
        }

      });


    // Updating Progress for Photo Count Listings data
    this.incrementProgress(6);

    let photo = API.fakeApiCall(userInput)

    // Saving cancel token
    this.addCancelToken(photo.cancelToken)

    await photo.axios
      .then(res => {

        // Calling to gather full data
        // this.addLinkToLinksArray(res.data.content1, 6);
        // Updating Progress for Photo Count Listings data
        this.incrementProgress(6);

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("getPhotoCount");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(6);
          this.incrementProgress(6);
        }

      });


    // Updating Progress for Returns data
    this.incrementProgress(7);

    let returns = API.fakeApiCall(userInput)

    // Saving cancel token
    this.addCancelToken(returns.cancelToken)

    returns.axios
      .then(res => {

        // Calling to gather full data
        // this.addLinkToLinksArray(res.data.content1, 7);
        // Updating Progress for Returns data
        this.incrementProgress(7);

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("getReturns");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(7);
          this.incrementProgress(7);
        }

      });


    // Updating Progress for Sold Items data
    this.incrementProgress(8);

    let sold = API.fakeApiCall(userInput)

    // Saving cancel token
    this.addCancelToken(sold.cancelToken)

    await sold.axios
      .then(res => {

        // Calling to gather full data
        // this.addLinkToLinksArray(res.data.content1, 8);
        // Updating Progress for Sold Items data
        this.incrementProgress(8);

      })
      .catch(err => {

        // Catching cancellation
        if (axios.isCancel(err)) {
          // This is to notify next api calls to stop
          cancelApiRequest = true;
          console.log('Request canceled', err.message);
        } else {
          // handle error
          console.log("getSoldItem");
          console.log(err);
          // If error, increase progress outside of bounds
          this.incrementProgress(8);
          this.incrementProgress(8);
        }

      });

    // Toggle Download Button as now we have all Reports to download
    this.toggleHideDownloadButton();

    // As the process has completed, trigger parent component that it has been finished
    this.props.trigger()

  }

  // Helps in the process of updating state to reflect API call progress
  incrementProgress = index => {
    // Take an index of states and increase progress counter by one
    this.setState((prevState) => {
      // Using copy of prevState to use to manipulate without changing state directly
      let newState = { ...prevState };
      // Take previous progress count and increase by one
      newState.dataSources[index].progress++;
      // Updating State
      return { newState };
    })
  }


  // Self explanatory ;)
  toggleHideDownloadButton = () => {

    this.setState((prevState) => ({
      hideDownloadButton: !prevState.hideDownloadButton
    }))

  }


  addLinkToLinksArray = (link, i) => {
    // This function is for updating the state variable links. This variable is used for manual downloading reports if necessary.
    // The Array is null to begin with and will be updated as links come in

    // Format full link for Download
    let fullLink = `http://intentionally_removed/${link}`

    // Copy state object to avoid mutating state directly
    let stateUpdate = { ...this.state.dataSources }

    // Updating state object with full link and filename
    stateUpdate[i].link = fullLink
    stateUpdate[i].fileName = link

    this.setState({ datasources: stateUpdate })

  }


  addCancelToken = cancelToken => {

    // Using prevState as this could be called in rapid succession due to systematic nature of API call sequence.
    this.setState((prevState) => {

      // Copy state array to avoid mutating state directly
      let arr = [...prevState.cancelTokens]

      // Add to array
      arr.push(cancelToken)

      // Update State
      return {
        cancelTokens: arr
      }
    })

  }


  fireAllCancels = () => {
    // Loop through cancelTokens array and fire each cancellation
    this.state.cancelTokens.forEach(token => {
      // Message
      token.cancel('Operation canceled by the user.')
    })

  }


  render() {

    return (
      <DataCard
        userID={this.props.title} // For testing
        title={this.props.title}
        index={this.props.index}
        orace={this.props.oracle}
        dataSources={this.state.dataSources}
        hideDownloadButton={this.state.hideDownloadButton}
      />
    )
  }
}

export default DataGatherer