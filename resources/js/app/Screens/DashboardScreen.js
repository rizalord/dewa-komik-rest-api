import React from "react";
import MUIDataTable from "mui-datatables";
import Constant from "../systems/constants";
import swal from "sweetalert2";
import { Link } from "react-router-dom";

export default class DashboardScreen extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: null
        };

        this._getData = this._getData.bind(this);
    }

    async componentWillMount() {
        document.title = "Dashboard | Dewa Komik";
        await this._getData();
    }

    async _getData() {
        await fetch(Constant.apiUrl + "get/dashboard")
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res
                });
            });
    }

    render() {
        return (
            <div class="page">
                <div class="page-content container-fluid">
                    <div
                        class="row"
                        data-plugin="matchHeight"
                        data-by-row="true"
                    >
                        <div class="col-xl-3 col-md-6">
                            <div
                                class="card card-shadow"
                                id="widgetLineareaOne"
                            >
                                <div class="card-block p-20 pt-10">
                                    <div class="clearfix">
                                        <div class="grey-800 float-left py-10">
                                            <i class="icon md-account grey-600 font-size-24 vertical-align-bottom mr-5"></i>{" "}
                                            User
                                        </div>
                                        <span class="float-right grey-700 font-size-30">
                                            {this.state.data != null
                                                ? this.state.data.totalUser
                                                : "0"}
                                        </span>
                                    </div>
                                    <div
                                        class="mb-20 grey-500"
                                        style={{ opacity: 0 }}
                                    >
                                        <i class="icon md-long-arrow-up green-500 font-size-16"></i>
                                        15% From this yesterday
                                    </div>
                                    <div class="ct-chart h-50"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div
                                class="card card-shadow"
                                id="widgetLineareaTwo"
                            >
                                <div class="card-block p-20 pt-10">
                                    <div class="clearfix">
                                        <div class="grey-800 float-left py-10">
                                            <i class="icon md-flash grey-600 font-size-24 vertical-align-bottom mr-5"></i>{" "}
                                            Manga
                                        </div>
                                        <span class="float-right grey-700 font-size-30">
                                            {this.state.data != null
                                                ? this.state.data.totalManga
                                                : "0"}
                                        </span>
                                    </div>
                                    <div
                                        class="mb-20 grey-500"
                                        style={{ opacity: 0 }}
                                    >
                                        <i class="icon md-long-arrow-up green-500 font-size-16"></i>{" "}
                                        34.2% From this week
                                    </div>
                                    <div class="ct-chart h-50"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div
                                class="card card-shadow"
                                id="widgetLineareaThree"
                            >
                                <div class="card-block p-20 pt-10">
                                    <div class="clearfix">
                                        <div class="grey-800 float-left py-10">
                                            <i class="icon md-chart grey-600 font-size-24 vertical-align-bottom mr-5"></i>{" "}
                                            Total Chapters
                                        </div>
                                        <span class="float-right grey-700 font-size-30">
                                            {this.state.data != null
                                                ? this.state.data.totalChapter
                                                : "0"}
                                        </span>
                                    </div>
                                    <div
                                        class="mb-20 grey-500"
                                        style={{ opacity: 0 }}
                                    >
                                        <i class="icon md-long-arrow-down red-500 font-size-16"></i>{" "}
                                        15% From this yesterday
                                    </div>
                                    <div class="ct-chart h-50"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div
                                class="card card-shadow"
                                id="widgetLineareaFour"
                            >
                                <div class="card-block p-20 pt-10">
                                    <div class="clearfix">
                                        <div class="grey-800 float-left py-10">
                                            <i class="icon md-view-list grey-600 font-size-24 vertical-align-bottom mr-5"></i>{" "}
                                            Admins
                                        </div>
                                        <span class="float-right grey-700 font-size-30">
                                            {this.state.data != null
                                                ? this.state.data.totalAdmin
                                                : "0"}
                                        </span>
                                    </div>
                                    <div
                                        class="mb-20 grey-500"
                                        style={{ opacity: 0 }}
                                    >
                                        <i class="icon md-long-arrow-up green-500 font-size-16"></i>{" "}
                                        18.4% From this yesterday
                                    </div>
                                    <div class="ct-chart h-50"></div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xxl-12 col-lg-12">
                            <div className="container card card-shadow">
                                <div className="row border border-top-0 border-left-0 border-right-0 border-light">
                                    <div className="col-md-6 mt-2 mb-1">
                                        <h4>Trending Manga</h4>
                                    </div>
                                </div>
                                <div className="row pt-2">
                                    {this.state.data != null
                                        ? this.state.data.trending.map(e => (
                                              <div className="col-md-2">
                                                  <img
                                                      className="imageTrending"
                                                      src={e.image}
                                                      style={{
                                                          width: "100%"
                                                      }}
                                                  />
                                                  <h5
                                                      style={{
                                                          marginBottom: 20,
                                                          textAlign: "center"
                                                      }}
                                                  >
                                                      {e.name}
                                                  </h5>
                                              </div>
                                          ))
                                        : null}
                                </div>
                            </div>
                        </div>

                        <div class="col-xxl-6 col-lg-6">
                            <div className="container card card-shadow">
                                <div className="row border border-top-0 border-left-0 border-right-0 border-light">
                                    <div
                                        className="col-md-12 mt-2 mb-1"
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <h4>Latest Added Manga</h4>
                                        <Link to="/admin/manga">
                                            <button
                                                className="btn btn-primary"
                                                style={{
                                                    paddingTop: 0,
                                                    paddingBottom: 0,
                                                    height: 40
                                                }}
                                            >
                                                {/* <i
                                                    class="icon md-plus"
                                                    aria-hidden="true"
                                                ></i> */}
                                                View All
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="row pt-2 px-2 pb-2">
                                    {this.state.data != null
                                        ? this.state.data.latestManga.map(e => (
                                              <div
                                                  style={{
                                                      display: "flex",
                                                      width: "100%",
                                                      height: 55,
                                                      flexDirection: "row",
                                                      marginBottom: 8,
                                                      paddingLeft: 6,
                                                      paddingRight: 6
                                                  }}
                                              >
                                                  <img
                                                      src={e.image}
                                                      style={{
                                                          height: 55,
                                                          width: 55,
                                                          objectFit: "cover"
                                                      }}
                                                  />
                                                  <div
                                                      style={{
                                                          width:
                                                              "calc(100% - 55px)",
                                                          height: "100%",
                                                          padding: 5,
                                                          paddingLeft: 10,
                                                          paddingRight: 10,
                                                          display: "flex",
                                                          flexDirection: "row",
                                                          alignItems: "center",
                                                          justifyContent:
                                                              "space-between"
                                                      }}
                                                  >
                                                      <h5
                                                          style={{
                                                              display:
                                                                  "inline-block"
                                                          }}
                                                      >
                                                          {e.name}
                                                      </h5>

                                                      <p
                                                          className="my-auto"
                                                          style={{
                                                              display: "flex",
                                                              alignSelf:
                                                                  "center",
                                                              verticalAlign:
                                                                  "center",
                                                              textAlign:
                                                                  "center"
                                                          }}
                                                      >
                                                          {e.created_at}
                                                      </p>
                                                  </div>
                                              </div>
                                          ))
                                        : "0"}
                                </div>
                            </div>
                        </div>

                        <div class="col-xxl-6 col-lg-6">
                            <div className="container card card-shadow">
                                <div className="row border border-top-0 border-left-0 border-right-0 border-light">
                                    <div
                                        className="col-md-12 mt-2 mb-1"
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <h4>Latest Added Chapters</h4>
                                    </div>
                                </div>
                                <div className="row pt-2 px-2 pb-2">
                                    {this.state.data != null
                                        ? this.state.data.latestChapter.map(
                                              e => (
                                                  <div
                                                      style={{
                                                          display: "flex",
                                                          width: "100%",
                                                          height: 55,
                                                          flexDirection: "row",
                                                          marginBottom: 8,
                                                          paddingLeft: 6,
                                                          paddingRight: 6
                                                      }}
                                                  >
                                                      <img
                                                          src={e.image}
                                                          style={{
                                                              height: 55,
                                                              width: 55,
                                                              objectFit: "cover"
                                                          }}
                                                      />
                                                      <div
                                                          style={{
                                                              width:
                                                                  "calc(100% - 55px)",
                                                              height: "100%",
                                                              padding: 5,
                                                              paddingLeft: 10,
                                                              paddingRight: 10,
                                                              display: "flex",
                                                              flexDirection:
                                                                  "row",
                                                              alignItems:
                                                                  "center",
                                                              justifyContent:
                                                                  "space-between"
                                                          }}
                                                      >
                                                          <h5
                                                              style={{
                                                                  display:
                                                                      "inline-block"
                                                              }}
                                                          >
                                                              {e.manga.name +
                                                                  " - Chapter  " +
                                                                  e.chapter_number}
                                                          </h5>

                                                          <p
                                                              className="my-auto"
                                                              style={{
                                                                  display:
                                                                      "flex",
                                                                  alignSelf:
                                                                      "center",
                                                                  verticalAlign:
                                                                      "center",
                                                                  textAlign:
                                                                      "center"
                                                              }}
                                                          >
                                                              {e.created_at}
                                                          </p>
                                                      </div>
                                                  </div>
                                              )
                                          )
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
