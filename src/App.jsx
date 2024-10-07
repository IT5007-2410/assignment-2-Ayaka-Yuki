/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(), seat: "1A"
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(), seat: "1B"
  },
];

const initialSeatMap = [[true, true, false, false],
[false, false, false, false],
[false, false, false, false],
[false, false, false, false],
[false, false, false, false],
[false, false, false, false]];

function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{props.traveller.id}</td>
      <td>{props.traveller.name}</td>
      <td>{props.traveller.phone}</td>
      <td>{props.traveller.bookingTime.toString()}</td>
      <td>{props.traveller.seat}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	        {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>Seat</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/
        props.travellers.map(traveller => (<TravellerRow key={traveller.id} traveller={traveller} />))
        }
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    const maxId = Math.max(...this.props.travellers.map(t => t.id), 0);
    this.props.bookTraveller({ 
      id: maxId + 1,
      name: form.travellername.value, 
      phone: form.travellerphone.value,
      bookingTime: new Date(),
      seat:  form.travellerseat.value
    });
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <input type="text" name="travellerphone" placeholder="Phone" />
        <input type="text" name="travellerseat" placeholder="Seat" />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    const passenger = parseInt(form.travellerid.value);
    this.props.deleteTraveller(passenger);
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="number" name="travellerid" placeholder="ID" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '20px',
    };
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        <h1>Seat Reservation</h1>
        <div className="seat-container" style={containerStyle}>
          {this.props.seat.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row" style={{ display: 'flex' }}>
              {row.map((isOccupied, seatIndex) => {
                const seatStyle = {
                  width: '30px',
                  height: '30px',
                  margin: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  display: 'inline-block',
                  backgroundColor: isOccupied ? 'gray' : 'green', //
                };
                const seatName = `${rowIndex + 1}${String.fromCharCode('A'.charCodeAt(0) + seatIndex)}`;
                return (
                <div
                  key={seatIndex}
                  className="seat"
                  style={seatStyle}
                >
                  {seatName}
                </div>
                );
        })}
            </div>
          ))}
        </div>
	</div>);
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], seat : [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
      this.setState({ seat: initialSeatMap });
      console.log('Data loaded', this.state.travellers, this.state.seat);
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      // check if all seats in seat map are booked
      if (this.state.travellers.length >= this.state.seat.length * this.state.seat[0].length) {
        alert('All seats are booked.');
        return;
      }
      const seatRowIndex = parseInt(passenger.seat[0]) - 1;
      const seatColumnIndex = passenger.seat.charCodeAt(1) - 'A'.charCodeAt(0);
      if (seatRowIndex >= this.state.seat.length || seatRowIndex < 0  || seatColumnIndex >= this.state.seat[0].length || seatColumnIndex < 0) {
        alert('Invalid seat.');
        return;
      } else if (this.state.seat[seatRowIndex][seatColumnIndex] === true) {
        alert('Curent seat is already booked.');
        return;
      } else {
      this.setState((prevState) => {
        const newSeat = [...prevState.seat];
        newSeat[seatRowIndex][seatColumnIndex] = true;
        return {
          travellers: [...prevState.travellers, passenger],
          seat: newSeat
        };
      }, () => {
        // This callback runs after the state has been updated
        console.log('Traveller added', this.state.travellers, this.state.seat);
      });
    };
  };

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    if (!this.state.travellers.some(traveller => traveller.id === passenger)) {
      alert('Traveller not found in the database.');
      return;
    }
    this.setState((prevState) => {
      // this will delete all travellers with the same id as the passengerid
      const newSeat = [...prevState.seat];
      const travellerToDelete = prevState.travellers.find(traveller => traveller.id === passenger);
      const seatRowIndex = parseInt(travellerToDelete.seat[0]) - 1;
      const seatColumnIndex = travellerToDelete.seat.charCodeAt(1) - 'A'.charCodeAt(0);
      newSeat[seatRowIndex][seatColumnIndex] = false;
      return {
      travellers: prevState.travellers.filter(traveller => traveller.id !== passenger),
      seat: newSeat
      };
    }, () => {
      // This callback runs after the state has been updated
      console.log('Traveller deleted', this.state.travellers,this.state.seat);
    });
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
	  <div>
      {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
        <button onClick={() => this.setSelector(1)}>Homepage</button>
        <button onClick={() => this.setSelector(2)}>Display Travellers</button>
        <button onClick={() => this.setSelector(3)}>Add Traveller</button>
        <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
	  </div>
	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/
    this.state.selector === 1 && <Homepage travellers={this.state.travellers} seat={this.state.seat} />}
		{/*Q3. Code to call component that Displays Travellers.*/
    this.state.selector === 2 && <Display travellers={this.state.travellers} />}
		
		{/*Q4. Code to call the component that adds a traveller.*/
    this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} travellers={this.state.travellers} seat={this.state.seat}/>}
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/
    this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller} travellers={this.state.travellers} seat={this.state.seat} />}
	</div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
