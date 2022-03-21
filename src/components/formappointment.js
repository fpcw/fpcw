import React, { useState } from "react";

/* eslint-disable no-useless-concat */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faCalendar, faUserFriends, faUser } from "@fortawesome/free-solid-svg-icons";

import "react-datepicker/dist/react-datepicker-cssmodules.css";

function BulmaControl({ children, name, hasLeftIcons, hasRightIcons }) {
    function getControlClass() {
        var className = "control";
        className = className.concat(hasLeftIcons ? " " + "has-icons-left" : "");
        className = className.concat(hasRightIcons ? " " + "has-icons-right" : "");
        return className;
    }

    return (
        <div className="field">
            <label className="label">{name}</label>
            <div className={getControlClass()}>{children}</div>
        </div>
    );
}

let refSources = [
    "Search Engine (Google, Yahoo, etc.)",
    "Social Media (Facebook, Instagram, etc.)",
    "Insurance Referral",
    "Word of Mouth",
    "Other"
];

let insuranceOp = refSources[2];
let womOp = refSources[3];
let otherOp = refSources[4];

function FormAppointment() {
    let [referralSource, setReferralSource] = useState("");

    function handleChange(event) {
        setReferralSource(event.target.value);
    }

    return (
        <form name="appointmentrequest" method="POST" netlify="true" action="/formsuccess/">
            <input type="hidden" name="form-name" value="appointmentrequest" />
            <input type="hidden" name="referral-insurer" />
            <input type="hidden" name="referral-wordofmouth-name" />
            <input type="hidden" name="referral-wordofmouth-phone" />
            <input type="hidden" name="referral-other-details" />

            <div className="columns">
                <div className="column is-6">
                    <div className="columns">
                        <div className="column">
                            <BulmaControl name="First Name">
                                <input className="input" type="text" placeholder="John" name="first-name" required />
                            </BulmaControl>
                        </div>
                        <div className="column">
                            <BulmaControl name="Last Name">
                                <input className="input" type="text" placeholder="Smith" name="last-name" required />
                            </BulmaControl>
                        </div>
                    </div>
                    <BulmaControl name="Email" hasLeftIcons>
                        <input className="input" type="email" placeholder="johnsmith@gmail.com" name="email" required />{" "}
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                    </BulmaControl>
                    <BulmaControl name="Phone" hasLeftIcons>
                        <input className="input" type="phone" placeholder="(123) 456-7890" name="phone" required />{" "}
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faPhone} />
                        </span>
                    </BulmaControl>
                    <BulmaControl name="Desired Appointment Date" hasLeftIcons>
                        <input
                            className="input"
                            type="date"
                            placeholder="12/05/1993"
                            name="appt-requested-date"
                            required
                        />{" "}
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faCalendar} />
                        </span>
                    </BulmaControl>
                </div>
                <div className="column is-6">
                    <BulmaControl name="How Did You Hear About Us?" hasLeftIcons>
                        <div className="select is-success is-fullwidth">
                            <select
                                name="referral-source"
                                value={referralSource}
                                onChange={handleChange}
                                onBlur={handleChange}
                                required
                            >
                                {refSources.map(source => {
                                    return <option key={source}>{source}</option>;
                                })}
                            </select>
                        </div>
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faUserFriends} />
                        </span>
                    </BulmaControl>
                    {referralSource === insuranceOp && (
                        <BulmaControl name="Referring Insurer" hasLeftIcons>
                            <input className="input" type="text" placeholder="Insurer" name="referral-insurer" />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        </BulmaControl>
                    )}
                    {referralSource === womOp && (
                        <>
                            <BulmaControl name="Word of Mouth Referrer" hasLeftIcons>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Name"
                                    name="referral-wordofmouth-name"
                                />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </BulmaControl>
                            <BulmaControl name="" hasLeftIcons>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="(123) 456-7890"
                                    name="referral-wordofmouth-phone"
                                />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faPhone} />
                                </span>
                            </BulmaControl>
                        </>
                    )}
                    {referralSource === otherOp && (
                        <BulmaControl name="Please Specify" hasLeftIcons>
                            <input className="input" type="text" placeholder="..." name="referral-other-details" />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        </BulmaControl>
                    )}
                </div>
            </div>
            <BulmaControl>
                <button className="button is-success is-outlined" type="submit" style={{ width: "100%" }}>
                    Submit
                </button>
            </BulmaControl>
        </form>
    );
}

export default FormAppointment;
