import React from 'react';
import TableRow from  '@material-ui/core/TableRow';
import TableCell from  '@material-ui/core/TableCell';

class Customer extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt=""/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell>{this.props.rmk}</TableCell>
                <TableCell>{this.props.create_dttm}</TableCell>
                <TableCell>{this.props.update_dttm}</TableCell>
            </TableRow>
        )
    }
}
export default Customer;