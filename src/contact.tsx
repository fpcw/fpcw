import { Box, Columns, Container, Section, Table } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Layout, Seo } from "./components";
import { ContentfulClient } from "./data";

interface ContactProps {
    title: string;
    description: string;
}

export async function query(): Promise<ContactProps> {
    const pageId = "2Md8UmvcqjkVCxCOBWCnbt";
    const client = new ContentfulClient();
    const page = await client.getPage(pageId);
    return {
        title: page.metaTitle ?? "",
        description: (page.metaDescription as string) ?? "",
    };
}

export function Head(props: ContactProps) {
    return <Seo title={props.title} description={props.description} />;
}

export default function Contact(_: ContactProps) {
    return (
        <Layout>
            <Section>
                <Container>
                    {/* @ts-ignore: @todo: not sure why gap is not found on Columns component */}
                    <Columns gap={8}>
                        <Columns.Column size={6}>
                            <h1 className="tw-font-serif tw-text-6xl tw-mb-4">
                                Contact information
                            </h1>
                            <p className="tw-font-sans tw-text-lg tw-mb-4">
                                Family Psychiatry is serving patients all across California via a
                                HIPAA-compliant telehealth platform. Our transcranial magnetic
                                stimulation (TMS) services are provided at our main office in
                                Westlake Village, California.
                            </p>

                            <p className="tw-font-sans tw-text-lg tw-mb-4">
                                Our office is located at:
                            </p>

                            <p className="tw-font-sans tw-text-lg tw-mb-4 tw-ml-4">
                                31194 La Baya Drive <br />
                                Suite 202 <br /> Westlake Village, CA 91362
                            </p>

                            <p className="tw-font-sans tw-text-lg tw-mb-4">
                                You can also reach us using one of the methods below:
                            </p>

                            <Table>
                                <tbody className="tw-font-sans">
                                    <tr>
                                        <td>
                                            <FontAwesomeIcon icon={faPhone} />
                                        </td>
                                        <td>
                                            <a href="tel:8053413416">(805) 341-3416</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </td>
                                        <td>
                                            <a href="mailto:fpcw@familypsychiatry101.com">
                                                fpcw@familypsychiatry101.com
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <FontAwesomeIcon icon={faCalendar} />
                                        </td>
                                        <td>Monday - Thursday - 9:00am - 5:00pm PST</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <FontAwesomeIcon icon={faCalendar} />
                                        </td>
                                        <td>Friday - 8:00am - 3:00pm PST</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <p className="tw-font-sans tw-text-lg">
                                Our office is closed on weekends and holidays.
                            </p>
                        </Columns.Column>

                        <Columns.Column size={6}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6603.282201614023!2d-118.80153120000001!3d34.155523099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e8245ccc95cfc5%3A0x9d68e491496f16f2!2s31194%20La%20Baya%20Dr%2C%20Westlake%20Village%2C%20CA%2091362!5e0!3m2!1sen!2sus!4v1730930331227!5m2!1sen!2sus"
                                className="tw-w-full tw-h-[50vh] lg:tw-h-full"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </Columns.Column>
                    </Columns>

                    <Columns centered={true}>
                        <Columns.Column>
                            <Box>
                                <img
                                    src="/images/location1.png"
                                    alt="La Baya Drive location exterior"
                                    height={200}
                                />
                            </Box>
                        </Columns.Column>
                        <Columns.Column>
                            <Box>
                                <img
                                    src="/images/location2.png"
                                    alt="Agoura Road location exterior"
                                    height={300}
                                />
                            </Box>
                        </Columns.Column>
                        <Columns.Column>
                            <Box>
                                <img
                                    src="/images/location3.png"
                                    alt="La Baya Drive location exterior"
                                    height={200}
                                />
                            </Box>
                        </Columns.Column>
                        <Columns.Column>
                            <Box>
                                <img
                                    src="/images/location4.png"
                                    alt="Agoura Road location exterior test3"
                                    height={200}
                                />
                            </Box>
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
        </Layout>
    );
}
