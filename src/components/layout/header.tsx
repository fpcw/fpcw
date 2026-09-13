import { useState } from "react";
import { Container, Level, Navbar } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const telehealthCallout = "Now offering telehealth services all across California.";

const primaryLinks = [
    ["Home", "/"],
    ["Appointments", "/appointments"],
    ["Contact", "/contact"],
    ["Patient Portal", "https://www.valant.io/portal/FamilyPsychiatryCounseling"],
];

const secondaryLinks = [
    ["Services", "/services"],
    ["Providers", "/providers"],
    ["Staff", "/staff"],
    ["Careers", "/careers"],
    ["Library", "/library"],
    ["Gallery", "/gallery"],
];

export function Header() {
    const [active, setActive] = useState(false);

    return (
        <Navbar fixed="top" active={active} className="tw-shadow-sm">
            <Container>
                <Navbar.Brand>
                    <Navbar.Item href="/">
                        <img width={80} src="/images/logo-fitted.png" alt="Logo" />
                    </Navbar.Item>
                    <Navbar.Burger
                        className="tw-text-[#48C744]"
                        onClick={() => setActive((prev) => !prev)}
                    />
                </Navbar.Brand>
                <Navbar.Menu>
                    <Navbar.Container align="left" mobile={{ display: "hidden" }}>
                        <Navbar.Item href="/appointments">
                            <Level>
                                <Level.Item className="tw-text-[#ffe08a]">
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                </Level.Item>
                                <Level.Item mx={3}>
                                    <span className="tw-font-sans">{telehealthCallout}</span>
                                </Level.Item>
                                <Level.Item className="tw-text-[#ffe08a]">
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                </Level.Item>
                            </Level>
                        </Navbar.Item>
                    </Navbar.Container>
                    <Navbar.Container align="right">
                        {primaryLinks.map(([name, value]) =>
                            value.startsWith("/") ? (
                                <Navbar.Item key={name} href={value}>
                                    <span className="tw-font-sans">{name}</span>
                                </Navbar.Item>
                            ) : (
                                <Navbar.Item key={name} href={value}>
                                    <span className="tw-font-sans">{name}</span>
                                </Navbar.Item>
                            ),
                        )}
                        <Navbar.Item href="#" hoverable={true}>
                            <Navbar.Link>
                                <p className="tw-font-sans">About</p>
                            </Navbar.Link>
                            <Navbar.Dropdown>
                                {secondaryLinks.map(([name, value]) =>
                                    value.startsWith("/") ? (
                                        <Navbar.Item key={name} href={value}>
                                            <span className="tw-font-sans">{name}</span>
                                        </Navbar.Item>
                                    ) : (
                                        <Navbar.Item key={name} href={value} textColor="dark">
                                            <span className="tw-font-sans">{name}</span>
                                        </Navbar.Item>
                                    ),
                                )}
                            </Navbar.Dropdown>
                        </Navbar.Item>
                    </Navbar.Container>
                </Navbar.Menu>
            </Container>
        </Navbar>
    );
}
