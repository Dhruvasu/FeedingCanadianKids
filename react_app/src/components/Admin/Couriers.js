import React from "react";
import Sidebar from "./Sidebar";
import "./Couriers.css";

class Couriers extends React.PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			couriers: []
		}
	}

	componentDidMount = () => {
		fetch("http://localhost:9000/api/admin/couriers")
			.then((res) => res.json())
			.then((couriers) => this.setState({couriers}))
			.then(() => this.updateState())
	}

	updateState() {
		if (this.state.couriers) {
			this.setState({
				numCouriers: this.state.couriers.length
			})
		}
	}

	render() {
		var oddOrEven = "even";
		var indices = this.state.restaurantIndices;

		const numCouriers = this.state.numCouriers;

		var rows1 = []

	    for (var i = 0; i < numCouriers; i++) {
			oddOrEven === "even" ? oddOrEven = "odd" : oddOrEven = "even";
	      	var cell = []
	      	var courier = this.state.couriers[i]
	      	cell.push(<td><a href={ "courier/" + courier["courier_id"] }> { courier["name"] } </a></td>)
	      	cell.push(<td> { courier["email"] } </td>)
	      	rows1.push(<tr id={ oddOrEven }> { cell } </tr>)
	    }

		return (
			<div id="couriers">
				<Sidebar />
				<div class="jumbotron jumbotron-fluid">
				  <div class="container">
				    <h1 class="display-4">Couriers</h1>
				    <p class="lead">Following table lists the couriers signed-up with Feeding Canadian Kids</p>
				  </div>
				</div>

				<h3 class="tableHeadings">Couriers</h3>

				<table id="courierTable">
					<tr>
						<th id="tableHeader">
							Courier Name
						</th>
						<th id="tableHeader">
							Courier Email
						</th>
					</tr>
					{ rows1 }
				</table>

				<div id="footer"></div>
			</div>
		)
	}
}

export default Couriers;
