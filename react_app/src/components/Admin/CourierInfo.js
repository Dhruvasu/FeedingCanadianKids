import React from "react";
import Sidebar from "./Sidebar";
import "./CourierInfo.css";

class CourierInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			courier: [[]]
		}
	}

	componentDidMount = () => {
		const id = this.props.match.params.id;
		const fetchURL = "http://localhost:9000/api/admin/courier/" + id;
		fetch(fetchURL)
			.then((res) => res.json())
			.then((courier) => this.setState({courier}, () => console.log(this.state.courier)))
	}

	render() {
		var day = [];
	    if (this.state.courier[0]["monday"] === 1) {
			day.push("Yes")
	  	} else {
	  		day.push("No")
	  	}
	  	if (this.state.courier[0]["tuesday"] === 1) {
			day.push("Yes")
	  	} else {
	  		day.push("No")
	  	}
	  	if (this.state.courier[0]["wednesday"] === 1) {
			day.push("Yes")
	  	} else {
	  		day.push("No")
	  	}
	  	if (this.state.courier[0]["thursday"] === 1) {
			day.push("Yes")
	  	} else {
	  		day.push("No")
	  	}
	  	if (this.state.courier[0]["friday"] === 1) {
			day.push("Yes")
	  	} else {
	  		day.push("No")
	  	}
		return (
			<div id="courierInfo">
				<div>
				<Sidebar />
				</div>
				<div class="jumbotron jumbotron-fluid infoTitle">
				  <div class="container">
				    <h1 class="display-5 courierName">Courier Name: { this.state.courier[0]["name"] }</h1>
				  </div>
				</div>

				<table id="courierTable">
					<tr id="even">
						<td class="narrow">
							Email
						</td>
						<td class="wide">
							{ this.state.courier[0]["email"]}
						</td>
					</tr>
					<tr id="odd">
						<td class="narrow">
							Area of service
						</td>
						<td class="wide">
							{ this.state.courier[0]["area_service"]}
						</td>
					</tr>
					<tr id="even">
						<td class="narrow">
							Vehicle Description
						</td>
						<td class="wide">
							{ this.state.courier[0]["vehicle_description"]}
						</td>
					</tr>
					<tr id="odd">
						<td class="narrow">
							Available on Monday
						</td>
						<td class="wide">
							{ day[0] }
						</td>
					</tr>
					<tr id="even">
						<td class="narrow">
							Available on Tuesday
						</td>
						<td class="wide">
							{ day[1] }
						</td>
					</tr>
					<tr id="odd">
						<td class="narrow">
							Available on Wednesday
						</td>
						<td class="wide">
							{ day[2] }
						</td>
					</tr>
					<tr id="even">
						<td class="narrow">
							Available on Thursday
						</td>
						<td class="wide">
							{ day[3] }
						</td>
					</tr>
					<tr id="odd">
						<td class="narrow">
							Available on Friday
						</td>
						<td class="wide">
							{ day[4] }
						</td>
					</tr>
				</table>

				<div id="footer"></div>
			</div>
		)
	}
}

export default CourierInfo;