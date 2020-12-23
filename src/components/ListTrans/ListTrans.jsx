import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';
import Addbutton from '../Addbutton/Addbutton';

const ListTrans = () => {
    const [trans, setTrans] = useState([]);

    const deleteTrans = async (id) => {
        try {
            await fetch(`http://localhost:5000/transaction/${id}`, {
                method: 'DELETE',
            });

            setTrans(trans.filter((tran) => tran.bid !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    const getTrans = async () => {
        try {
            const response = await (
                await fetch('http://localhost:5000/transaction')
            ).json();

            setTrans(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTrans();
    }, []);

    const absoluteTime = (tran) => {
        let tm = `${tran.date.split('-').join('')}${tran.time
            .split(':')
            .join('')}`;
        console.log(Number(tm));
        return Number(tm);
    };

    return (
        <Fragment>
            <div className="table-responsive">
                <table className="table table-striped table-hover text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Payer</th>
                            <th scope="col">Payee</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Description</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trans
                            .sort((a, b) => absoluteTime(b) - absoluteTime(a))
                            .map((tran) => (
                                <tr key={tran.bid}>
                                    <th>{tran.payer} </th>
                                    <td>{tran.payee}</td>
                                    <td>{tran.amount}</td>
                                    <td>
                                        <input
                                            type="date"
                                            value={tran.date}
                                            disabled
                                            style={{
                                                border: '0',
                                                background: 'transparent',
                                                width: 'auto',
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="time"
                                            value={tran.time}
                                            disabled
                                            style={{
                                                border: '0',
                                                background: 'transparent',
                                            }}
                                        />
                                    </td>
                                    <td>{tran.description}</td>
                                    <td>
                                        <Addbutton edit={true} tran={tran} />
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                deleteTrans(tran.bid)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export default ListTrans;
