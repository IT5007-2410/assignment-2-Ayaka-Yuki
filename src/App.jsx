/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(), seat: "1A",
    isSelected: false
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(), seat: "1B",
    isSelected: false
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
  const cellStyle = {
    border: '0.1rem solid black',
    padding: '1rem',
    textAlign: 'center',
    marginBottom: '4rem'
  };
  return (
    <tr>
      <td style={cellStyle}>{props.traveller.id}</td>
      <td style={cellStyle}>{props.traveller.name}</td>
      <td style={cellStyle}>{props.traveller.phone}</td>
      <td style={cellStyle}>{props.traveller.bookingTime.toString()}</td>
      <td style={cellStyle}>{props.traveller.seat}</td>
      <td style={cellStyle}>
        <input type="checkbox" checked={props.traveller.isSelected} onChange={() => props.handleCheckboxChange(props.traveller.id)} id={props.traveller.id} />
      </td>
    </tr>
  );
}

function Display(props) {
  const tableStyle = {
    marginTop: '1rem',
    width: '100%',
    borderCollapse: 'collapse',
    flexGrow: 1,
    border: '0.2rem solid black'
  };

  const cellStyle = {
    border: '0.1rem solid black',
    padding: '1rem',
    textAlign: 'center',
    marginBottom: '4rem'
  };

  const deleteStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '3rem'
}

  const buttonStyle = {
    padding: '1rem 2rem',
    fontSize: '1.5rem',
    backgroundColor: 'grey',
    color: 'black', 
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    marginRight: '2rem'
  };
  
  /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  return (
  <div>
    <table className="bordered-table" style={tableStyle}>
    <thead>
      <tr>
        {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
      <th style={cellStyle}>ID</th>
      <th style={cellStyle}>Name</th>
      <th style={cellStyle}>Phone</th>
      <th style={cellStyle}>Booking Time</th>
      <th style={cellStyle}>Seat</th>
      <th style={cellStyle}>Selected</th>
      </tr>
    </thead>
    <tbody>
      {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/
      props.travellers.map(traveller => (<TravellerRow key={traveller.id} traveller={traveller} handleCheckboxChange={props.handleCheckboxChange}/>))
      }
    </tbody>
    </table>
    <div style={deleteStyle}>
      <button id="delete_button" style={buttonStyle} onClick={props.onDeleteSelected}>Delete Selected</button>
    </div>
    
  </div>
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
      seat:  form.travellerseat.value,
      isSelected: false
    });
    form.reset();
  }

  render() {
    const formContainerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '50%',
      width: '100%',
      maxWidth: '80%',
      paddingRight: '20%',
    };

    const formGroupStyle = {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      gap: '1rem',
    };
    
    const labelStyle = {
      width: '30%',
      margin: '0',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      minWidth: '100px',
      textAlign: 'right',
      flex: 1,
    };
    
    const inputStyle = {
      width: '70%',
      flex: 2,
      padding: '1rem',
      border: '0.05rem solid black',
      borderRadius: '0.05rem',
      fontSize: '1.5rem',
      minWidth: '20rem',
    };
    
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit} style={formContainerStyle}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <div className="form-group" style={formGroupStyle}>
          <label htmlFor="travellername" style={labelStyle}>Travller Name</label>
          <input id="travellername" type="text" name="travellername" placeholder="Name"  style={inputStyle} required />
        </div>
        <div className="form-group" style={formGroupStyle}> 
          <label htmlFor="travellerphone" style={labelStyle}>Travller Phone</label>
          <input id="travellerphone" type="number" name="travellerphone" placeholder="Phone" style={inputStyle} required />
        </div>
        <div className="form-group" style={formGroupStyle}>
          <label htmlFor="travellerseat" style={labelStyle}>Travller Seat</label>
          <input id="travellerseat" type="text" name="travellerseat" placeholder="Seat" style={inputStyle} required />
        </div>
        <div className="form-group" style={formGroupStyle}>
          <label htmlFor="submit" style={labelStyle}></label>
          <input id="submit" type="submit" value="Add" style={inputStyle}/>
        </div>
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
    form.reset();
  }

  render() {
      const formContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '50%',
        width: '100%',
        maxWidth: '80%',
        paddingRight: '20%',
      };
  
      const formGroupStyle = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        gap: '1rem',
      };
      
      const labelStyle = {
        width: '30%',
        margin: '0',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        minWidth: '100px',
        textAlign: 'right',
        flex: 1,
      };
      
      const inputStyle = {
        width: '70%',
        flex: 2,
        padding: '1rem',
        border: '0.05rem solid black',
        borderRadius: '0.05rem',
        fontSize: '1.5rem',
        minWidth: '20rem',
      };  
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit} style={formContainerStyle}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
      <div className="form-group" style={formGroupStyle}>
        <label htmlFor="delete_entry" style={labelStyle}>Traveller ID</label>
        <input id="delete_entry" type="number" step="1" min = "1" name="travellerid" required style={inputStyle}/>
      </div>
      <div className="form-group" style={formGroupStyle}>
        <label htmlFor="submit" style={labelStyle}></label>
        <input id= "submit" type="submit" value="Delete" style={inputStyle}/>
      </div>
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
      margin: '1rem',
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
                  width: '2rem',
                  height: '2rem',
                  margin: '0.5rem',
                  border: '0.1rem solid #ccc',
                  borderRadius: '0.5re,',
                  display: 'flex',
                  backgroundColor: isOccupied ? 'gray' : 'green',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
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

class Header extends React.Component {
  constructor() {
    super();
    this.state = { hoveredButton: null };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(index) {
    this.setState({ hoveredButton: index });
  }

  handleMouseLeave() {
    this.setState({ hoveredButton: null });
  }

  render() {
    const headerStyle = {
      height: '5.5rem',
      backgroundColor: 'black',
      width: '100%',
      position: 'fixed',
      zIndex: 999,
      top: 0,
    };

    const headerContainerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      maxWidth: '76.5rem',
      height: '100%',
      margin: '0 auto',
      padding: '0 1.5rem',
    };

    const headerTitleStyle = {
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      height: '100%',
    };

    const navDesktopStyle = {
      display: 'flex',
      alignItems: 'center',
    };

    const ulStyle = {
      display: 'flex',
      alignItems: 'center',
    };

    const liStyle = {
      fontSize: '1.5rem',
      color: 'white',
      marginRight: '3rem',
      fontWeight: 700,
    };

    const aStyle = {
      display: 'block',
      color: 'white',
      textAlign: 'center',
      padding: '0.875rem 1rem',
      textDecoration: 'none',
    };

    return (
      <header style={headerStyle}>
        <div className="header-container" style={headerContainerStyle}>
          <div className="header-title" style={headerTitleStyle}>
            <h1>Ticket To Ride</h1>
          </div>
          <nav style={navDesktopStyle}>
            <ul style={ulStyle}>
              {['Homepage', 'Display Travellers', 'Add Traveller', 'Delete Traveller'].map(
                (label, index) => (
                  <li key={index} style={liStyle}>
                    <a
                      style={{
                        ...aStyle,
                        backgroundColor: this.state.hoveredButton === index ? 'white' : 'transparent',
                        color: this.state.hoveredButton === index ? 'black' : 'white',
                      }}
                      onMouseEnter={() => this.handleMouseEnter(index)}
                      onMouseLeave={() => this.handleMouseLeave()}
                      onClick={() => this.props.onSelect(index + 1)}
                    >
                      {label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], seat : [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
    this.selectTraveller = this.selectTraveller.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.resetIsSelected = this.resetIsSelected.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    // If selector changes and we are going to Display (selector = 2), reset isSelected
    if (prevState.selector !== this.state.selector && this.state.selector === 2) {
      this.resetIsSelected();  // Reset selection when entering Display section
    }
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
      if (isNaN(seatRowIndex) || isNaN(seatColumnIndex) || 
      seatRowIndex >= this.state.seat.length || seatRowIndex < 0 
      || seatColumnIndex >= this.state.seat[0].length || seatColumnIndex < 0) {
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

  selectTraveller = (id, isSelected) => {
    this.setState((prevState) => ({
      travellers: prevState.travellers.map(traveller =>
      traveller.id === id ? { ...traveller, isSelected: isSelected } : traveller
      )
    }));
  }

  deleteSelected = () => {
    const selectedTravellers = this.state.travellers.filter(traveller => traveller.isSelected);
    selectedTravellers.forEach(traveller => this.deleteTraveller(traveller.id));
  };

  handleCheckboxChange(travellerId) {
    this.setState((prevState) => ({
      travellers: prevState.travellers.map(traveller =>
        traveller.id === travellerId ? { ...traveller, isSelected: !traveller.isSelected } : traveller
      ),
    }));
  }

  resetIsSelected() {
    // Set isSelected to false for all travellers
    this.setState(prevState => ({
      travellers: prevState.travellers.map(traveller => ({
        ...traveller,
        isSelected: false
      }))
    }));
  }

  render() {
      {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
    const sectionStyle = {
      width: '100%',
      top: '0',
      flexDirection: 'column',
      alignItems: 'center',    
      height: '100%',
      paddingTop: '5.5rem',   
    };

    return (
    <div>
      <Header onSelect={this.setSelector} />
      <div style={sectionStyle}>
        {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
        {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/
        this.state.selector === 1 && <Homepage travellers={this.state.travellers} seat={this.state.seat} />}
        {/*Q3. Code to call component that Displays Travellers.*/
        this.state.selector === 2 && <Display travellers={this.state.travellers} onDeleteSelected={this.deleteSelected} onSelectTraveller={this.selectTraveller} handleCheckboxChange={this.handleCheckboxChange}/>}
        
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
