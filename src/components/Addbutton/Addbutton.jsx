import React, { Fragment } from 'react';
import { useState } from 'react';

import styles from './Addbutton.module.css';

let Addbutton = ({ edit, tran }) => {
    const [payer, setPayer] = useState(edit ? tran.payer : 'self');
    const [payee, setPayee] = useState(edit ? tran.payee : '');
    const [amount, setAmount] = useState(edit ? tran.amount : 0);
    const [date, setDate] = useState(edit ? tran.date : '');
    const [time, setTime] = useState(edit ? tran.time : '');
    const [description, setDescription] = useState(
        edit ? tran.description : ''
    );

    const setBack = () => {
        setPayer(edit ? tran.payer : 'self');
        setPayee(edit ? tran.payee : '');
        setAmount(edit ? tran.amount : 0);
        setDate(edit ? tran.date : '');
        setTime(edit ? tran.time : '');
        setDescription(edit ? tran.description : '');
    };

    const onSubmitForm = async () => {
        try {
            const body = {
                payer: payer,
                payee: payee,
                amount: amount,
                description: description,
                date: date,
                time: time,
            };

            await fetch(
                `http://localhost:5000/transaction/${edit ? tran.bid : ''}`,
                {
                    method: edit ? 'PATCH' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                }
            );

            window.location = '/';
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <button
                type="button"
                className={`btn ${
                    edit ? 'btn-warning' : 'btn-success'
                } font-weight-bold ${edit ? '' : styles.addButton}`}
                data-toggle="modal"
                data-target={`#id${edit ? tran.bid : 'add'}`}
            >
                {edit ? 'EDIT' : 'ADD'}
            </button>

            <div
                className="modal fade text-left"
                id={`id${edit ? tran.bid : 'add'}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
                onClick={() => setBack()}
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="exampleModalLongTitle"
                            >
                                {`${edit ? 'Edit' : 'Add'} Transaction`}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setBack()}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPayer">
                                            Payer
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputPayer"
                                            placeholder="Payer"
                                            value={payer}
                                            onChange={(e) => {
                                                setPayer(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPayee">
                                            Payee
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputPayee"
                                            placeholder="Payee"
                                            value={payee}
                                            onChange={(e) => {
                                                setPayee(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputAmount">
                                            Amount
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="inputAmount"
                                            placeholder="100"
                                            value={amount}
                                            onChange={(e) => {
                                                setAmount(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group col-md-5">
                                        <label htmlFor="inputDate">Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="inputDate"
                                            value={date}
                                            onChange={(e) => {
                                                setDate(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputTime">Time</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            id="inputTime"
                                            value={time}
                                            onChange={(e) => {
                                                setTime(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        value={description}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                        }}
                                    ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={() => setBack()}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={onSubmitForm}
                            >
                                {`${edit ? 'Edit' : 'Add'}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Addbutton;
