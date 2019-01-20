import React from 'react';
import swal from 'sweetalert';

import DeleteForever from '@material-ui/icons/DeleteForever';

class Table extends React.Component {

    onDelete = (e) => {
        const props = this.props;
        let target = 0;

        if(e.target.tagName != "BUTTON") {
            target = e.target.closest('button').getAttribute('data-target');
        } else {
            target = e.target.getAttribute('data-target');
        }

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                // ajax to delete
                fetch("http://gentle-beyond-76280.herokuapp.com/affiliates/" + target, {
                    headers: {
                        'id': localStorage.getItem('id'),
                    }
                })
                .then((resp) => {
                    props.methods.refreshAffiliates();
                    swal("Poof! "+ target +" has been deleted!", {
                        icon: "success",
                    });
                })

            } else {
                swal("The affiliate is safe!");
            }
        });
    };

    render() {
        return (
            <div className="">
                <h2>List of affiliates</h2>

                <div className="overflow-auto">
                    <table className="f6 w-100 mw8 center" cellSpacing="0">
                        <thead>
                        <tr className="stripe-dark">
                            <th className="fw6 tl pa3 bg-white">#</th>
                            <th className="fw6 tl pa3 bg-white">Name</th>
                            <th className="fw6 tl pa3 bg-white">Email</th>
                            <th className="fw6 tl pa3 bg-white">Created</th>
                            <th className="fw6 tl pa3 bg-white">Company</th>
                            <th className="fw6 tl pa3 bg-white">Address</th>
                            <th className="fw6 tl pa3 bg-white"></th>
                        </tr>
                        </thead>
                        <tbody className="lh-copy">
                        {this.props.data.map((person, i) => {
                            return(<tr key={i}>
                                <td>{person.id}</td>
                                <td>{person.firstname} {person.lastname}</td>
                                <td>{person.email}</td>
                                <td>{new Date(person.created_at).toLocaleDateString()}</td>
                                <td>{person.company.name}</td>
                                <td>{person.address}</td>
                                <td>
                                    <button className="f6 link dim br3 ph2 pv1 mb2 dib white bg-red" data-target={person.id} onClick={this.onDelete.bind(this)}>
                                        <DeleteForever/>
                                    </button>
                                </td>
                            </tr>)
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default Table;