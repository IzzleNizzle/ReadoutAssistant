import React, { Component } from 'react';
import DownloadReports from "../DownloadReports";
import loading from "../../images/loading.gif";
import loading2 from "../../images/loading2.gif";
import check from "../../images/check.svg";
import alert from "../../images/alert.svg";


class DataCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // This function is used to choose what ot display in table depending on progress of data call
  progressRender = prog => {
    switch (prog) {
      case 0:
        return <div>
          Paused
            </div>
      case 1:
        return <div>
          Loading.. <img src={loading} alt="loading" />
            </div>
      case 2:
        return <div>
          <img src={check} alt="check" /> Loaded!
            </div>
      default:
        return <div>
          <img src={alert} alt="error" /> Error
            </div>
    }
  }

  render() {
    let uniqueId = `${this.props.userID}_${this.props.index}`

    return (
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              {this.props.userID ? this.props.userID : this.props.title}
            </h5>

            {this.props.hideDownloadButton ? (<h6 className="card-subtitle mb-2 text-muted">Loading.. <img src={loading2} alt="loading" />
            </h6>) : <h6 className="card-subtitle mb-2 text-muted">Done!</h6>}


            <p className="card-text">
              <DownloadReports
                links={this.props.dataSources}
                hidden={this.props.hideDownloadButton}
                oracle={this.props.oracle}
              />

              <button
                className="btn btn-primary btn-sm"
                type="button"
                data-toggle="collapse"
                data-target={`#${uniqueId}`}
                aria-expanded="false"
                aria-controls="collapseExample">
                Details
              </button>
            </p>

            {/* This is the section for listing all the seperate api calls and their progresses */}
            <div
              className="collapse"
              id={uniqueId}
            >
              {this.props.dataSources.map((source, i) => {
                return <div
                  className='row'
                  key={i}
                >
                  <div className='col-md-6'>
                    {source.name}
                  </div>
                  <div className='col-md-6'>
                    {this.progressRender(source.progress)}
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default DataCard;