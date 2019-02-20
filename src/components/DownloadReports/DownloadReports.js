import React, { Component } from 'react';
import download from "../../images/cloud-download.svg";


class DownloadReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  downloadReports = () => {

    let link = document.createElement('a');

    link.style.display = 'none';

    document.getElementById("downloadReports").appendChild(link);

    for (var i = 0; i < this.props.links.length; i++) {
      // This array is already filled out with null values, if no data report is available link will be null 
      if (this.props.links[i].link === null) {
        // If link is null, do nothing
      }
      else {
        // Otherwise do the necessary to send download link`
        link.setAttribute('href', this.props.links[i].link);
        link.setAttribute('download', this.props.links[i].fileName);

        link.click();

      }
    }

    document.getElementById("downloadReports").removeChild(link);
  }

  render() {
    return (
      <span id='downloadReports'>
        <button
          className={`btn btn-warning btn-sm`}
          disabled={this.props.hidden}
          onClick={this.downloadReports}
        >
          <img src={download} alt="download"/> Download Reports
      </button>
      </span>
    );

  }
}

export default DownloadReports;