/*var HelloWorld = React.createClass({
    
	getInitialState: function() {
        return {
            counter: 0
        };
    },
    
    increment: function() {
        this.setState({ counter: this.state.counter+1 });
    },

    render: function() {
        return (
            <div>
				<FancyButton label={this.props.label} do_increment={this.increment}/>
				&nbsp;{this.state.counter}
			</div>
        );
    }
});

var FancyButton = React.createClass({	
    render: function() {
		return (
			<button className="btn btn-primary" onClick={this.props.do_increment}>
				{this.props.label}
			</button>
		);
    }
});*/

var TransactionView = React.createClass({
	getInitialState: function() {
        return {
            update_counter: 0
        };
    },
	
	update_status: function()
	{
		this.state.update_counter++;
		
		this.props.transactions.map(function double(transaction) {
			return transaction.state = 'OK';
		});
		
		this.update();
	},
	
	insert_row: function()
	{
		var index = this.props.transactions.length + 1;

		var date = new Date();
		var hours = date.getHours();
		if (hours < 10) hours = "0" + hours;
		var minutes = date.getMinutes();
		if (minutes < 10) minutes = "0" + minutes;
		var date_str = date.toDateString() + " " + hours + ":" + minutes;

		var new_transaction = {
			workflow_id: index, 
			ack_time: date_str, 
			vendors: [
				{vendor_name: 'vendor_' + index + '1'}, 
				{vendor_name: 'vendor_' + index + '2'}, 
				{vendor_name: 'vendor_' + index + '3'}
			], 
			response_time: index, 
			merchant_icon : index, 
			state: 'pending'
		};
		this.props.transactions.unshift(new_transaction);
		
		this.update();
	},
	
	update: function()
	{		
		ReactDOM.render(<TransactionView transactions={json_data}/>, document.getElementById('content'));
	},
	
	render: function()
	{
		return (
			<div>
				<TransactionTable transactions={this.props.transactions}/>
				<button className="btn btn-primary" onClick={this.update_status}>Set OK</button>
				<button className="btn btn-primary" onClick={this.insert_row}>Insert row</button>
			</div>
		);
	}
});

var TransactionTable = React.createClass({
	render: function()
	{
		var headerStyle = {
			border: '1px solid #999',
			padding: '0.5rem'
		};
		var centerStyle = {
			textAlign: 'center',
			borderWidth: '1px',
			borderStyle: 'solid',
			borderColor: 'black',			
		};
		var tableStyle = {
			borderWidth: '1px',
			borderStyle: 'solid',
			borderColor: 'black',
			width: '100%'
		};
		var rows = [];
		this.props.transactions.forEach(function(transaction) 
		{
			console.log("key: "+transaction.workflow_id);
			rows.push(<TransactionRow transaction={transaction} key={transaction.workflow_id} />);
		}.bind(this));
		return (
			<table className="reactTable"/* style={tableStyle}*/>
				<thead style={headerStyle}>
					<tr>
						<th style={centerStyle}>Workflow ID</th>
						<th style={centerStyle}>Acknowledge Time</th>
						<th style={centerStyle}>Vendors</th>
						<th style={centerStyle}>Response Time Time</th>
						<th style={centerStyle}>Merchant</th>
						<th style={centerStyle}>Status</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}
});

var TransactionRow = React.createClass({
	render: function() {
		var centerStyle = {
			textAlign: 'center',
			borderWidth: '1px',
			borderStyle: 'solid',
			borderColor: 'black',			
		};
		var vendors = "";
		for (var i = 0; i < this.props.transaction.vendors.length; i++)
		{
			vendors += this.props.transaction.vendors[i].vendor_name;
			if (i < (this.props.transaction.vendors.length - 1)) vendors += ", ";
		}
        return (
            <tr>
                <td style={centerStyle}>{this.props.transaction.workflow_id}</td>
                <td style={centerStyle}>{this.props.transaction.ack_time}</td>
                <td style={centerStyle}>{vendors}</td>
                <td style={centerStyle}>{this.props.transaction.response_time}</td>
                <td style={centerStyle}>{this.props.transaction.merchant_icon}</td>
                <td style={centerStyle}>{this.props.transaction.state}</td>
            </tr>
        );
    }
});

var date = new Date();
var hours = date.getHours();
if (hours < 10) hours = "0" + hours;
var minutes = date.getMinutes();
if (minutes < 10) minutes = "0" + minutes;
var date_str = date.toDateString() + " " + hours + ":" + minutes;

var json_data = [
	{workflow_id: 1, ack_time: date_str, vendors: [{vendor_name: 'vendor_11'}, {vendor_name: 'vendor_12'}, {vendor_name: 'vendor_13'}], response_time: 1, merchant_icon : 1, state: 'pending'},
	{workflow_id: 2, ack_time: date_str, vendors: [{vendor_name: 'vendor_21'}, {vendor_name: 'vendor_22'}, {vendor_name: 'vendor_23'}], response_time: 2, merchant_icon : 2, state: 'pending'},
	{workflow_id: 3, ack_time: date_str, vendors: [{vendor_name: 'vendor_31'}, {vendor_name: 'vendor_32'}, {vendor_name: 'vendor_33'}], response_time: 3, merchant_icon : 3, state: 'pending'},
	{workflow_id: 4, ack_time: date_str, vendors: [{vendor_name: 'vendor_41'}, {vendor_name: 'vendor_42'}, {vendor_name: 'vendor_43'}], response_time: 4, merchant_icon : 4, state: 'pending'},
	{workflow_id: 5, ack_time: date_str, vendors: [{vendor_name: 'vendor_51'}, {vendor_name: 'vendor_52'}, {vendor_name: 'vendor_53'}], response_time: 5, merchant_icon : 5, state: 'pending'}
];

ReactDOM.render(<TransactionView transactions={json_data}/>, document.getElementById('content'));