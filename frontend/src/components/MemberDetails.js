import React, { Component } from "react";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authentication";
import Select from "react-select";
import { Link } from "react-router-dom";
import Slider from "./Slider";

class MemberDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchValue: "",
      filteredDataList: [],
      selectedOption: "",
      sortBy: "",
      sortDir: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/profiles/editProfile/")
      .then(res => res.json())
      .then(result => {
        console.log("result", result);
        this.setState({ data: result });
      });
  }

  searchBy(value) {
    const { data, selectedOption } = this.state;
    if (selectedOption) {
      const tableData =
        data &&
        data.filter(info => {
          return info[`${selectedOption.value}`]
            .toLowerCase()
            .includes(value.toLowerCase());
        });
      this.setState({ filteredDataList: tableData });
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  renderDropdownButton() {
    const { selectedOption } = this.state;
    return (
      <div style={{ float: "center" }}>
        <h4 style={{ float: "left", color: "#5cb85c" }}> Search By : </h4>
        <Select
          style={{ width: "25%", marginLeft: "35%", marginRight: "35%" }}
          name="form-field-name"
          value={this.state.selectedOption}
          onChange={this.handleChange}
          menuContainerStyle={{
            width: "25%",
            marginLeft: "35%",
            marginRight: "35%"
          }}
          options={[
            { value: "name", label: "Name" },
            { value: "fathersName", label: "Fathers_Name" },
            { value: "age", label: "Age" },
            { value: "address", label: "Address" },
            { value: "occupation", label: "Occupation" }
          ]}
        />
        <br />
        {selectedOption ? (
          <div className="search">
            <span className="fa fa-search" />
            <input
              style={{ width: "300px", height: "35px", borderRadius: "5px" }}
              type="text"
              onChange={e => this.searchBy(e.target.value)}
              placeholder="Search..."
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  sortData(key) {
    var sortDir = this.state.sortDir;
    var sortBy = key;
    if (sortBy === this.state.sortBy) {
      sortDir = this.state.sortDir === "ASC" ? "DESC" : "ASC";
    } else {
      sortDir = "DESC";
    }
    var rows = this.state.data.slice();
    rows.sort((a, b) => {
      var sortVal = 0;
      if (a[sortBy] > b[sortBy]) {
        sortVal = 1;
      }
      if (a[sortBy] < b[sortBy]) {
        sortVal = -1;
      }

      if (sortDir === "DESC") {
        sortVal = sortVal * -1;
      }
      return sortVal;
    });

    this.setState({ sortBy, sortDir, data: rows });
  }

  render() {
    const { data, filteredDataList, sortBy, sortDir } = this.state;
    console.log("user", this.props.user);
    let sortDirArrow = "";
    if (sortDir !== null) {
      sortDirArrow = sortDir === "DESC" ? " ↓ " : " ↑ ";
    }

    return (
      <div>
        <Slider />
        <div
          className="register-profile"
          style={{
            width: "70%",
            marginLeft: "15%",
            marginRight: "15%",
            marginTop: "15px"
          }}
        >
          {this.renderDropdownButton()}
          <br />
          <h4 style={{ color: "#5cb85c" }}>List of Members</h4>
          <Table bordered hover style={{ align: "center" }}>
            <thead>
              <tr>
                {/* <th onClick={() => this.sortData("name")}>
                  {"Name" + (sortBy === "name" ? sortDirArrow : "")}{" "}
                </th>
                <th onClick={() => this.sortData("fathersName")}>
                  {"Fathers Name" +
                    (sortBy === "fathersName" ? sortDirArrow : "")}
                </th> */}
                <th onClick={() => this.sortData("name")}>
                  {"Full Name" + (sortBy === "name" ? sortDirArrow : "")}
                </th>
                <th onClick={() => this.sortData("age")}>
                  {"Age" + (sortBy === "age" ? sortDirArrow : "")}
                </th>
                <th onClick={() => this.sortData("address")}>
                  {"Address" + (sortBy === "address" ? sortDirArrow : "")}
                </th>
                <th onClick={() => this.sortData("occupation")}>
                  {"Occupation" + (sortBy === "occupation" ? sortDirArrow : "")}
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredDataList.length > 0
                ? filteredDataList.map((row, index) => (
                    <tr key={index}>
                      {/* <td> {row.name} </td>
                      <td> {row.fathersName} </td> */}
                      <td> {row.name + " " + row.fathersName} </td>
                      <td> {row.age}</td>
                      <td> {row.address} </td>
                      <td> {row.occupation} </td>
                      {this.props.user.fullName === row.name && (
                        <td>
                          <Link
                            to={`/editProfile/${row._id}`}
                            className="btn btn-success"
                          >
                            Edit
                          </Link>
                        </td>
                      )}
                    </tr>
                  ))
                : data.map(
                    (row, index) => (
                      console.log("row", row),
                      (
                        <tr key={index}>
                          {/* <td> {row.name} </td>
                      <td> {row.fathersName} </td> */}
                          <td> {row.name + " " + row.fathersName} </td>
                          <td> {row.age}</td>
                          <td> {row.address} </td>
                          <td> {row.occupation} </td>
                          {this.props.user.fullName === row.name && (
                            <td>
                              <Link
                                to={`/editProfile/${row._id}`}
                                className="btn btn-success"
                              >
                                Edit
                              </Link>
                            </td>
                          )}
                        </tr>
                      )
                    )
                  )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

MemberDetails.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { loginUser }
)(MemberDetails);
